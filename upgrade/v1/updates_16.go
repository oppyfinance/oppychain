package v1

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	vaultmodulekeeper "gitlab.com/oppy-finance/oppychain/x/vault/keeper"
)

const ParamUpgradeName = "parameter_upgrade"

func CreateUpgradeHandlerParamUpgrade(
	mm *module.Manager,
	configurator module.Configurator,
	vaultKeeper vaultmodulekeeper.Keeper,
	stakingKeeper stakingkeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, _plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {
		for i := 0; i < 2; i++ {
			ctx.Logger().Info("we update the parameter for staking and vault")
		}

		vaultParam := vaultKeeper.GetParams(ctx)
		vaultParam.BlockChurnInterval = 16600
		vaultKeeper.SetParams(ctx, vaultParam)

		// set staking parameter
		stakingParam := stakingKeeper.GetParams(ctx)
		stakingParam.HistoricalEntries = 120000
		stakingKeeper.SetParams(ctx, stakingParam)

		return mm.RunMigrations(ctx, configurator, vm)
	}
}
