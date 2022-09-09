package keeper

import (
	"sort"
	"strconv"
	"time"

	"github.com/cosmos/cosmos-sdk/telemetry"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	stakingtypes "github.com/cosmos/cosmos-sdk/x/staking/types"
	abci "github.com/tendermint/tendermint/abci/types"

	vaulttypes "gitlab.com/oppy-finance/oppychain/x/vault/types"
)

func (k Keeper) StakingInfo(ctx sdk.Context) {
	stakingKeeper := k.vaultStaking
	params := k.GetParams(ctx)

	stakingKeeper.IterateLastValidators(ctx, func(index int64, validator stakingtypes.ValidatorI) (stop bool) {
		consAddr, err := validator.GetConsAddr()
		if err != nil {
			panic("get cons should never fail")
		}
		current, found := k.GetStandbyPower(ctx, consAddr.String())
		if !found {
			item := vaulttypes.StandbyPower{
				Addr:  consAddr.String(),
				Power: params.Power,
			}
			k.SetStandbyPower(ctx, consAddr.String(), item)
			return false
		}
		if current.Power < 0 {
			k.DelStandbyPower(ctx, consAddr.String())
			return false
		}
		current.Power -= params.Step
		k.SetStandbyPower(ctx, consAddr.String(), current)
		return false
	})
}

func (k Keeper) getEligibleValidators(ctx sdk.Context) ([]vaulttypes.ValidatorPowerInfo, error) {
	params := k.GetParams(ctx)

	boundedValidators := k.vaultStaking.GetBondedValidatorsByPower(ctx)
	var candidates []vaulttypes.ValidatorPowerInfo

	candidateDec := sdk.NewDecWithPrec(int64(len(boundedValidators)), 0)
	candidateNumDec := candidateDec.MulTruncate(params.CandidateRatio)

	candidateNum := uint32(candidateNumDec.TruncateInt64())

	for _, validator := range boundedValidators {
		validatorWithPower := vaulttypes.ValidatorPowerInfo{
			Validator: validator,
			Power:     validator.PotentialConsensusPower(sdk.DefaultPowerReduction),
		}
		candidates = append(candidates, validatorWithPower)
	}
	// we get rotate the nodes
	for i := 0; i < len(candidates); i++ {
		consAddr, err := candidates[i].Validator.GetConsAddr()
		if err != nil {
			panic("it should never fail to get the cons addr")
		}
		standbyPower, found := k.GetStandbyPower(ctx, consAddr.String())
		if !found {
			item := vaulttypes.StandbyPower{
				Addr:  consAddr.String(),
				Power: params.Power,
			}
			k.SetStandbyPower(ctx, consAddr.String(), item)

			standbyPower = item
		}
		candidates[i].Power += standbyPower.GetPower()
	}
	sort.Slice(candidates, func(i, j int) bool {
		return candidates[i].Power > candidates[j].Power
	})

	return candidates[:candidateNum], nil
}

func (k Keeper) updateValidators(ctx sdk.Context) error {
	vs, err := k.getEligibleValidators(ctx)
	if err != nil {
		return sdkerrors.Wrap(vaulttypes.ErrFormat, "fail to convert the format")
	}

	stakingValidators := make([]*vaulttypes.Validator, len(vs))

	for i, el := range vs {
		key, err := el.Validator.ConsPubKey()
		if err != nil {
			return sdkerrors.Wrap(vaulttypes.ErrFormat, "fail to convert the format")
		}
		v := vaulttypes.Validator{
			Pubkey: key.Bytes(),
			Power:  el.Power,
		}
		stakingValidators[i] = &v
	}

	v := vaulttypes.Validators{
		AllValidators: stakingValidators,
		Height:        ctx.BlockHeight(),
	}
	k.SetValidators(ctx, strconv.FormatInt(ctx.BlockHeight(), 10), v)
	return nil
}

func (k Keeper) NewUpdate(ctx sdk.Context) []abci.ValidatorUpdate {
	defer telemetry.ModuleMeasureSince(vaulttypes.ModuleName, time.Now(), telemetry.MetricKeyEndBlocker)

	blockHeight := k.GetParams(ctx).BlockChurnInterval
	if ctx.BlockHeight()%blockHeight == 0 {
		ctx.EventManager().EmitEvents(sdk.Events{
			sdk.NewEvent(
				vaulttypes.EventTypeCompleteChurn,
				sdk.NewAttribute(vaulttypes.AttributeValidators, "oppy_churn"),
			),
		})
		err := k.updateValidators(ctx)
		if err != nil {
			ctx.Logger().Error("error in update the validator with err %v", err)
		}
	}
	return []abci.ValidatorUpdate{}
}
