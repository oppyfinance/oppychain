package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

func hasAttribute(src []abci.EventAttribute, targets []abci.EventAttribute) string {
	// since the transfer event has the fixed order, so we check the sequence by
	var amount string
	if src[0].String() == targets[0].String() || src[0].String() == targets[1].String() {
		amount = string(src[2].GetValue())
	}

	return amount
}

func getPools(ctx sdk.Context, keeper Keeper) []sdk.AccAddress {
	req := types.QueryLatestPoolRequest{}
	wctx := sdk.WrapSDKContext(ctx)

	resp, err := keeper.GetLastPool(wctx, &req)
	if err != nil || resp == nil || len(resp.Pools) != 2 {
		return nil
	}

	pool0 := resp.Pools[0].CreatePool.PoolAddr
	pool1 := resp.Pools[1].CreatePool.PoolAddr

	return []sdk.AccAddress{pool0, pool1}
}

func newHistory(height int64, amount sdk.Coins) *types.HistoricalAmount {
	return &types.HistoricalAmount{
		BlockHeight: height,
		Amount:      amount,
	}
}

func processHistory(historyLength int32, newItem *types.HistoricalAmount, coinsQuota *types.CoinsQuota) *types.CoinsQuota {
	if int32(len(coinsQuota.History)) < historyLength {
		coinsQuota.History = append(coinsQuota.History, newItem)
		coinsQuota.CoinsSum.Sort()
		newItem.Amount.Sort()
		coinsQuota.CoinsSum = coinsQuota.CoinsSum.Add(newItem.Amount...)
		return coinsQuota
	}
	// now we pop up the old and add the new one
	old := coinsQuota.History[0]
	coinsQuota.History = coinsQuota.History[1:]
	coinsQuota.CoinsSum = coinsQuota.CoinsSum.Sub(old.GetAmount()).Add(newItem.Amount...)
	coinsQuota.History = append(coinsQuota.History, newItem)
	return coinsQuota
}

func (k Keeper) ProcessEvent(ctx sdk.Context) {
	events := ctx.EventManager().Events()

	pools := getPools(ctx, k)
	a1 := sdk.NewAttribute(banktypes.AttributeKeyRecipient, pools[0].String())
	a2 := sdk.NewAttribute(banktypes.AttributeKeyRecipient, pools[1].String())

	var totalCoins sdk.Coins
	for _, el := range events {
		if el.Type == banktypes.EventTypeTransfer {
			amount := hasAttribute(el.Attributes, []abci.EventAttribute{a1.ToKVPair(), a2.ToKVPair()})
			transferredCoins, err := sdk.ParseCoinsNormalized(amount)
			if err != nil {
				ctx.Logger().Error("vault", "quota Check", "invalid coins in transfer")
				continue
			}
			transferredCoins.Sort()
			totalCoins = totalCoins.Add(transferredCoins...)
		}
	}

	quotaData, found := k.GetQuotaData(ctx)
	if !found {
		panic("this item should be always be available")
	}
	entry := newHistory(ctx.BlockHeight(), totalCoins)

	// now we pop out one item from history and add the new one in
	params := k.GetParams(ctx)
	newQuotaData := processHistory(params.HistoryLength, entry, &quotaData)
	k.SetQuotaData(ctx, *newQuotaData)
}

//
type VaultQuotaDecorator struct {
	vaultKeeper Keeper
}

func NewVaultQuotaDecorate(keeper Keeper) VaultQuotaDecorator {
	return VaultQuotaDecorator{
		vaultKeeper: keeper,
	}
}

// QuotaCheck if quotaCheck return TRUE, it can continue process the tx
func (k Keeper) QuotaCheck(ctx sdk.Context, coins sdk.Coins) bool {
	targetQuota := k.TargetQuota(ctx)
	currentQuota, found := k.GetQuotaData(ctx)
	if !found {
		ctx.Logger().Error("the quota info cannot be found")
		return true
	}

	tempCurrent := sdk.NewCoins(currentQuota.CoinsSum...)

	coins.Sort()
	tempCurrent.Sort()
	targetQuota.Sort()

	afterTransfer := coins.Add(tempCurrent...)
	return afterTransfer.IsAllLTE(targetQuota)
}

func (vd VaultQuotaDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	msgs := tx.GetMsgs()
	for _, el := range msgs {
		switch msg := el.(type) {
		case *banktypes.MsgSend:
			pools := getPools(ctx, vd.vaultKeeper)
			if len(pools) < 2 {
				return next(ctx, tx, simulate)
			}
			if msg.ToAddress == pools[0].String() || msg.ToAddress == pools[1].String() {
				if vd.vaultKeeper.QuotaCheck(ctx, msg.Amount) {
					return next(ctx, tx, simulate)
				}

				return ctx, sdkerrors.Wrapf(
					ErrSuspend,
					"pool %v is suspended currently",
					msg.ToAddress,
				)
			}

		default:
			return next(ctx, tx, simulate)
		}
	}
	return next(ctx, tx, simulate)
}
