package pool_incentives

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	"gitlab.com/oppy-finance/oppychain/x/pool_incentives/keeper"
	"gitlab.com/oppy-finance/oppychain/x/pool_incentives/types"
)

func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState *types.GenesisState) {
	k.SetParams(ctx, genState.Params)
	k.SetLockableDurations(ctx, genState.LockableDurations)
	if genState.DistrInfo == nil {
		k.SetDistrInfo(ctx, types.DistrInfo{
			TotalWeight: sdk.NewInt(0),
			Records:     nil,
		})
	} else {
		k.SetDistrInfo(ctx, *genState.DistrInfo)
	}
}

func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	distrInfo := k.GetDistrInfo(ctx)

	return &types.GenesisState{
		Params:            k.GetParams(ctx),
		LockableDurations: k.GetLockableDurations(ctx),
		DistrInfo:         &distrInfo,
	}
}
