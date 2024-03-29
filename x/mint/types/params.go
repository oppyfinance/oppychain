package types

import (
	"errors"
	"fmt"
	"strings"

	yaml "gopkg.in/yaml.v2"

	epochtypes "gitlab.com/oppy-finance/oppychain/x/epochs/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	paramtypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"gitlab.com/oppy-finance/oppychain/utils"
)

// Parameter store keys.
var (
	KeyMintDenom                            = []byte("MintDenom")
	KeyGenesisEpochProvisions               = []byte("GenesisEpochProvisions")
	KeyEpochIdentifier                      = []byte("EpochIdentifier")
	KeyReductionPeriodInEpochs              = []byte("ReductionPeriodInEpochs")
	KeyReductionFactor                      = []byte("ReductionFactor")
	KeyPoolAllocationRatio                  = []byte("PoolAllocationRatio")
	KeyDeveloperRewardsReceiver             = []byte("DeveloperRewardsReceiver")
	KeyMintingRewardsDistributionStartEpoch = []byte("MintingRewardsDistributionStartEpoch")
)

var (
	GenesisEpochProvisions = sdk.MustNewDecFromStr("821917.808219178082191780")
	EpochIdentifier        = "day"                      // 1 day
	ReductionPeriodInEpoch = 365                        // 1 year
	ReductionFactor        = sdk.NewDecWithPrec(25, 2)  // 0.5
	Staking                = sdk.NewDecWithPrec(375, 3) // 0.375
	PoolIncentives         = sdk.NewDecWithPrec(625, 3) // 0.625
	DeveloperRewards       = sdk.NewDecWithPrec(0, 1)   // 0
	CommunityPool          = sdk.NewDecWithPrec(0, 1)   // 0

)

// ParamTable for minting module.
func ParamKeyTable() paramtypes.KeyTable {
	return paramtypes.NewKeyTable().RegisterParamSet(&Params{})
}

func NewParams(
	mintDenom string, genesisEpochProvisions sdk.Dec, epochIdentifier string,
	reductionFactor sdk.Dec, reductionPeriodInEpochs int64, distrProportions DistributionProportions,
	weightedDevRewardsReceivers []WeightedAddress, mintingRewardsDistributionStartEpoch int64,
) Params {
	return Params{
		MintDenom:                            mintDenom,
		GenesisEpochProvisions:               genesisEpochProvisions,
		EpochIdentifier:                      epochIdentifier,
		ReductionPeriodInEpochs:              reductionPeriodInEpochs,
		ReductionFactor:                      reductionFactor,
		DistributionProportions:              distrProportions,
		WeightedDeveloperRewardsReceivers:    weightedDevRewardsReceivers,
		MintingRewardsDistributionStartEpoch: mintingRewardsDistributionStartEpoch,
	}
}

// default minting module parameters.
func DefaultParams() Params {
	return Params{
		MintDenom:               utils.DefaultBondDenom,
		GenesisEpochProvisions:  GenesisEpochProvisions,
		EpochIdentifier:         EpochIdentifier,          // 1 minute
		ReductionPeriodInEpochs: 156,                      // 3 years
		ReductionFactor:         sdk.NewDecWithPrec(5, 1), // 0.5
		DistributionProportions: DistributionProportions{
			Staking:          Staking,          // 0.25
			PoolIncentives:   PoolIncentives,   // 0.2/0.55=0.3636
			DeveloperRewards: DeveloperRewards, // 0
			CommunityPool:    CommunityPool,    // 0.5
		},
		WeightedDeveloperRewardsReceivers:    []WeightedAddress{},
		MintingRewardsDistributionStartEpoch: 0,
	}
}

// validate params.
func (p Params) Validate() error {
	if err := validateMintDenom(p.MintDenom); err != nil {
		return err
	}
	if err := validateGenesisEpochProvisions(p.GenesisEpochProvisions); err != nil {
		return err
	}
	if err := epochtypes.ValidateEpochIdentifierInterface(p.EpochIdentifier); err != nil {
		return err
	}
	if err := validateReductionPeriodInEpochs(p.ReductionPeriodInEpochs); err != nil {
		return err
	}
	if err := validateReductionFactor(p.ReductionFactor); err != nil {
		return err
	}
	if err := validateDistributionProportions(p.DistributionProportions); err != nil {
		return err
	}
	if err := validateWeightedDeveloperRewardsReceivers(p.WeightedDeveloperRewardsReceivers); err != nil {
		return err
	}
	if err := validateMintingRewardsDistributionStartEpoch(p.MintingRewardsDistributionStartEpoch); err != nil {
		return err
	}

	return nil
}

// String implements the Stringer interface.
func (p Params) String() string {
	out, _ := yaml.Marshal(p)
	return string(out)
}

// Implements params.ParamSet.
func (p *Params) ParamSetPairs() paramtypes.ParamSetPairs {
	return paramtypes.ParamSetPairs{
		paramtypes.NewParamSetPair(KeyMintDenom, &p.MintDenom, validateMintDenom),
		paramtypes.NewParamSetPair(KeyGenesisEpochProvisions, &p.GenesisEpochProvisions, validateGenesisEpochProvisions),
		paramtypes.NewParamSetPair(KeyEpochIdentifier, &p.EpochIdentifier, epochtypes.ValidateEpochIdentifierInterface),
		paramtypes.NewParamSetPair(KeyReductionPeriodInEpochs, &p.ReductionPeriodInEpochs, validateReductionPeriodInEpochs),
		paramtypes.NewParamSetPair(KeyReductionFactor, &p.ReductionFactor, validateReductionFactor),
		paramtypes.NewParamSetPair(KeyPoolAllocationRatio, &p.DistributionProportions, validateDistributionProportions),
		paramtypes.NewParamSetPair(KeyDeveloperRewardsReceiver, &p.WeightedDeveloperRewardsReceivers, validateWeightedDeveloperRewardsReceivers),
		paramtypes.NewParamSetPair(KeyMintingRewardsDistributionStartEpoch, &p.MintingRewardsDistributionStartEpoch, validateMintingRewardsDistributionStartEpoch),
	}
}

func validateMintDenom(i interface{}) error {
	v, ok := i.(string)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	if strings.TrimSpace(v) == "" {
		return errors.New("mint denom cannot be blank")
	}
	if err := sdk.ValidateDenom(v); err != nil {
		return err
	}

	return nil
}

func validateGenesisEpochProvisions(i interface{}) error {
	v, ok := i.(sdk.Dec)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	if v.LT(sdk.ZeroDec()) {
		return fmt.Errorf("genesis epoch provision must be non-negative")
	}

	return nil
}

func validateReductionPeriodInEpochs(i interface{}) error {
	v, ok := i.(int64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	if v <= 0 {
		return fmt.Errorf("max validators must be positive: %d", v)
	}

	return nil
}

func validateReductionFactor(i interface{}) error {
	v, ok := i.(sdk.Dec)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	if v.GT(sdk.NewDec(1)) {
		return fmt.Errorf("reduction factor cannot be greater than 1")
	}

	if v.IsNegative() {
		return fmt.Errorf("reduction factor cannot be negative")
	}

	return nil
}

func validateDistributionProportions(i interface{}) error {
	v, ok := i.(DistributionProportions)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	if v.Staking.IsNegative() {
		return errors.New("staking distribution ratio should not be negative")
	}

	if v.PoolIncentives.IsNegative() {
		return errors.New("pool incentives distribution ratio should not be negative")
	}

	if v.DeveloperRewards.IsNegative() {
		return errors.New("developer rewards distribution ratio should not be negative")
	}

	// TODO: Maybe we should allow this :joy:, lets you burn osmo from community pool
	// for new chains
	if v.CommunityPool.IsNegative() {
		return errors.New("community pool distribution ratio should not be negative")
	}

	totalProportions := v.Staking.Add(v.PoolIncentives).Add(v.DeveloperRewards).Add(v.CommunityPool)

	if !totalProportions.Equal(sdk.NewDec(1)) {
		return errors.New("total distributions ratio should be 1")
	}

	return nil
}

func validateWeightedDeveloperRewardsReceivers(i interface{}) error {
	v, ok := i.([]WeightedAddress)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	// fund community pool when rewards address is empty
	if len(v) == 0 {
		return nil
	}

	weightSum := sdk.NewDec(0)
	for i, w := range v {
		// we allow address to be "" to go to community pool
		if w.Address != "" {
			_, err := sdk.AccAddressFromBech32(w.Address)
			if err != nil {
				return fmt.Errorf("invalid address at %dth", i)
			}
		}
		if !w.Weight.IsPositive() {
			return fmt.Errorf("non-positive weight at %dth", i)
		}
		if w.Weight.GT(sdk.NewDec(1)) {
			return fmt.Errorf("more than 1 weight at %dth", i)
		}
		weightSum = weightSum.Add(w.Weight)
	}

	if !weightSum.Equal(sdk.NewDec(1)) {
		return fmt.Errorf("invalid weight sum: %s", weightSum.String())
	}

	return nil
}

func validateMintingRewardsDistributionStartEpoch(i interface{}) error {
	v, ok := i.(int64)
	if !ok {
		return fmt.Errorf("invalid parameter type: %T", i)
	}

	if v < 0 {
		return fmt.Errorf("start epoch must be non-negative")
	}

	return nil
}
