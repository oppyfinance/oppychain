package incentives

import (
	"gitlab.com/oppy-finance/oppychain/x/incentives/keeper"
	"gitlab.com/oppy-finance/oppychain/x/incentives/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	k.SetParams(ctx, genState.Params)
	k.SetLockableDurations(ctx, genState.LockableDurations)
	for _, gauge := range genState.Gauges {
		each := gauge
		err := k.SetGaugeWithRefKey(ctx, &each)
		if err != nil {
			panic(err)
		}
	}
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	return &types.GenesisState{
		Params:            k.GetParams(ctx),
		LockableDurations: k.GetLockableDurations(ctx),
		Gauges:            k.GetNotFinishedGauges(ctx),
	}
}
