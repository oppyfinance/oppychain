package vault

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	abci "github.com/tendermint/tendermint/abci/types"
	"gitlab.com/oppy-finance/oppychain/x/vault/keeper"
)

func EndBlock(ctx sdk.Context, keeper keeper.Keeper) []abci.ValidatorUpdate {
	// we burn the token after the first churn of the network
	err := keeper.MoveCoinsToLatestPool(ctx)
	if err != nil {
		keeper.Logger(ctx).Error("fail to move coins from old pool to new pool", "err=", err)
	}
	keeper.ProcessAccountLeft(ctx)
	return keeper.NewUpdate(ctx)
}
