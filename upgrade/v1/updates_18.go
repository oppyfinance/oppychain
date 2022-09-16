package v1

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
	vaultmodulekeeper "gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	vaulttypes "gitlab.com/oppy-finance/oppychain/x/vault/types"
)

const V18UpgradeName = "v18_upgrade"

func CreateUpgradeHandlerForV18Upgrade(
	mm *module.Manager,
	configurator module.Configurator,
	vaultKeeper vaultmodulekeeper.Keeper,
	stakingKeeper stakingkeeper.Keeper,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, _plan upgradetypes.Plan, vm module.VersionMap) (module.VersionMap, error) {
		for i := 0; i < 2; i++ {
			ctx.Logger().Info("we update the parameter for staking and vault")
		}

		height := vaultKeeper.BlockChurnInterval(ctx)
		power := vaultKeeper.Power(ctx)
		step := vaultKeeper.Step(ctx)
		candidate := vaultKeeper.CandidateRatio(ctx)

		tokensQuota, err := sdk.ParseCoinsNormalized(vaulttypes.TARGETQUOTA)
		if err != nil {
			panic("fail to upgrade ")
		}
		historyLength := int32(14400)

		coinsQuota := vaulttypes.CoinsQuota{
			History:  []*vaulttypes.HistoricalAmount{},
			CoinsSum: sdk.Coins{},
		}
		newParams := vaulttypes.NewParams(height, power, step, candidate, tokensQuota, historyLength)
		vaultKeeper.SetParams(ctx, newParams)
		vaultKeeper.SetQuotaData(ctx, coinsQuota)

		return mm.RunMigrations(ctx, configurator, vm)
	}
}
