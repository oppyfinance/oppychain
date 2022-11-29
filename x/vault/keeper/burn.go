package keeper

import (
	"html"

	types2 "github.com/cosmos/cosmos-sdk/x/auth/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

func (k Keeper) BurnTokens(ctx sdk.Context, addr sdk.AccAddress) error {
	coinsBalance := k.bankKeeper.GetAllBalances(ctx, addr)
	var coins sdk.Coins
	for _, el := range coinsBalance {
		if el.IsZero() {
			continue
		}
		coins = append(coins, el)
	}
	if coins.Empty() {
		return nil
	}
	err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, addr, types.ModuleName, coins)
	if err != nil {
		k.Logger(ctx).Error("fail to send token to account")
		return err
	}
	defer func() {
		tick := html.UnescapeString("&#" + "128293" + ";")
		msg := tick + " burn"
		k.Logger(ctx).Info(msg, "coins", coins.String(), "address", addr.String())
	}()
	return k.bankKeeper.BurnCoins(ctx, types.ModuleName, coins)
}

func (k Keeper) sendFeesToValidators(ctx sdk.Context, addr sdk.AccAddress) bool {

	coinsBalance := k.bankKeeper.GetAllBalances(ctx, addr)
	fee := k.GetAllFeeAmount(ctx)
	fee.Sort()
	coinsBalance.Sort()
	if coinsBalance.IsAnyGTE(fee) && !fee.Empty() {
		err := k.bankKeeper.SendCoinsFromAccountToModule(ctx, addr, types2.FeeCollectorName, fee)
		if err != nil {
			k.Logger(ctx).Error("vault", "fail to send fee", err)
			return false
		}
		tick := html.UnescapeString("&#" + "128176" + ";")
		k.Logger(ctx).Info(tick, "money distributed", fee)

		for i := range fee {
			fee[i].Amount = sdk.NewInt(0)
		}
		k.SetStoreFeeAmount(ctx, fee)
		return true
	}
	if fee.Empty() {
		return true
	}
	return false
}

func (k Keeper) ProcessAccountLeft(ctx sdk.Context) {
	wctx := sdk.WrapSDKContext(ctx)
	moduleAccount, err := k.GetModuleAddress(wctx, &types.QueryModuleAccount{})
	if err != nil {
		k.Logger(ctx).Error("vault", "module acocunt", "incorrect module account")
		return
	}

	acc, err := sdk.AccAddressFromBech32(moduleAccount.Address)
	if err != nil {
		panic("module account should never fail in conversion")
	}

	totalCoins := k.bankKeeper.GetAllBalances(ctx, acc)
	k.ProcessQuota(ctx, totalCoins)

	// we only send fee to validators from the latest pool
	transferred := k.sendFeesToValidators(ctx, acc)
	if !transferred {
		ctx.Logger().Info("vault", "send Fee to validator", "not enough token to be paid as fee")
	}

	err = k.BurnTokens(ctx, acc)
	if err != nil {
		k.Logger(ctx).Error("fail to burn the token")
		return
	}

	c1After := k.bankKeeper.GetAllBalances(ctx, acc)
	if !c1After.Empty() {
		panic("after burn the tokens, pool should have ZERO coins")
	}
}
