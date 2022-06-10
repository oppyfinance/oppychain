package app

import (
	epochtypes "gitlab.com/oppy-finance/oppychain/x/epochs/types"
	lockuptypes "gitlab.com/oppy-finance/oppychain/x/lockup/types"
	minttypes "gitlab.com/oppy-finance/oppychain/x/mint/types"
	swaptypes "gitlab.com/oppy-finance/oppychain/x/swap/types"
)

func (app *App) setupHooks() {
	app.SwapKeeper = *app.SwapKeeper.SetHooks(
		swaptypes.NewMultiSwapHooks(
			app.PoolIncentivesKeeper.Hooks(),
		),
	)

	app.LockupKeeper = *app.LockupKeeper.SetHooks(
		lockuptypes.NewMultiLockupHooks())
	app.MintKeeper = *app.MintKeeper.SetHooks(
		minttypes.NewMultiMintHooks(
			app.PoolIncentivesKeeper.Hooks(),
		),
	)

	app.EpochsKeeper = *app.EpochsKeeper.SetHooks(
		epochtypes.NewMultiEpochHooks(
			// insert epoch hooks receivers here
			app.IncentivesKeeper.Hooks(),
			app.MintKeeper.Hooks(),
		),
	)
}
