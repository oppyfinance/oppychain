package v1

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	vaultmodulekeeper "gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	vaulttypes "gitlab.com/oppy-finance/oppychain/x/vault/types"
)

const FeeDistributionUpgradeName = "feedistribution_upgrade"

func CreateUpgradeHandlerFeeDistributionUpgrade(
	mm *module.Manager,
	configurator module.Configurator,
	vaultKeeper vaultmodulekeeper.Keeper,
	stakingKeeper stakingkeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, _plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {
		for i := 0; i < 2; i++ {
			ctx.Logger().Info("we update the parameter for staking and vault")
		}
		vm["vault"] = 2
		m := vaultmodulekeeper.NewMigrator(vaultKeeper)
		if err := configurator.RegisterMigration(vaulttypes.ModuleName, 2, m.Migrate2to3); err != nil {
			panic(err)
		}
		return mm.RunMigrations(ctx, configurator, vm)
	}
}
