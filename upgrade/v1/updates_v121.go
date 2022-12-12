package v1

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	vaultmodulekeeper "gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	vaulttypes "gitlab.com/oppy-finance/oppychain/x/vault/types"
)

const V121UpgradeName = "v121_upgrade"

func CreateUpgradeHandlerForV121Upgrade(
	mm *module.Manager,
	configurator module.Configurator,
	vaultKeeper vaultmodulekeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, _plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {
		for i := 0; i < 20; i++ {
			ctx.Logger().Info("we update the chain to version v1.2.1")
		}
		vm["vault"] = 3
		m := vaultmodulekeeper.NewMigrator(vaultKeeper)
		if err := configurator.RegisterMigration(vaulttypes.ModuleName, 3, m.Migrate3to4); err != nil {
			panic(err)
		}
		return mm.RunMigrations(ctx, configurator, vm)
	}
}
