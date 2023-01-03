package v1

import (
	"encoding/binary"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	stakingkeeper "github.com/cosmos/cosmos-sdk/x/staking/keeper"
	upgradetypes "github.com/cosmos/cosmos-sdk/x/upgrade/types"
)

const V121UpgradeName = "v121_upgrade"

func CreateUpgradeHandlerForV121Upgrade(
	mm *module.Manager,
	keeper stakingkeeper.Keeper,
	configurator module.Configurator,
) upgradetypes.UpgradeHandler {
	return func(ctx sdk.Context, _plan upgradetypes.Plan, fromVm module.VersionMap) (module.VersionMap, error) {
		for i := 0; i < 2; i++ {
			ctx.Logger().Info("we update the parameter for v121")
		}

		iterator := keeper.ValidatorsPowerStoreIterator(ctx)

		defer iterator.Close()

		for ; iterator.Valid(); iterator.Next() {
			// everything that is iterated in this loop is becoming or already a
			// part of the bonded validator set
			valAddr := sdk.ValAddress(iterator.Value())
			validator, found := keeper.GetValidator(ctx, valAddr)
			if !found {
				panic("not found")
			}

			val := iterator.Key()

			tokens := binary.BigEndian.Uint64(val[1:9])
			fmt.Printf(">>>>>%v\n", tokens)
			fmt.Printf(">>>>>>%v\n", validator.Tokens)

			keeper.SetValidatorByPowerIndex(ctx, validator)
			validator.Tokens = sdk.NewIntFromUint64(tokens).Mul(sdk.DefaultPowerReduction)
			keeper.DeleteValidatorByPowerIndex(ctx, validator)

		}

		return mm.RunMigrations(ctx, configurator, fromVm)
	}
}
