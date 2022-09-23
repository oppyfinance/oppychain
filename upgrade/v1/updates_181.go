package v1

import (
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	vaultmodulekeeper "gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

const V181UpgradeName = "v181_upgrade"

func CreateUpgradeHandlerForV181Upgrade(
	mm *module.Manager,
	configurator module.Configurator,
	vaultKeeper vaultmodulekeeper.Keeper,
	stakingKeeper stakingkeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, _plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {
		for i := 0; i < 2; i++ {
			ctx.Logger().Info("we update the parameter for staking and vault")
		}

		// we set the setp of the vault to be deducted by 10^7
		params := vaultKeeper.GetParams(ctx)

		params.Power = 10000
		params.Step = 1000
		vaultKeeper.SetParams(ctx, params)

		// we clean up all the standby power history
		v := vaultKeeper.DoGetAllStandbyPower(ctx)
		for _, el := range v {
			vaultKeeper.DelStandbyPower(ctx, el.Addr)
		}

		var poolInfo []types.CreatePool
		height := ctx.BlockHeight()
		for {
			v1, found := vaultKeeper.GetCreatePool(ctx, strconv.FormatInt(height, 10))
			if found {
				poolInfo = append(poolInfo, v1)
				if len(poolInfo) == 2 {
					break
				}
			}
			height--
		}

		vaultKeeper.UpdateLastTwoPool(ctx, poolInfo[1])
		vaultKeeper.UpdateLastTwoPool(ctx, poolInfo[0])

		return mm.RunMigrations(ctx, configurator, vm)
	}
}
