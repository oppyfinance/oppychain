package keeper_test

import (
	abci "github.com/tendermint/tendermint/abci/types"

	minttypes "gitlab.com/oppy-finance/oppychain/x/mint/types"
	"gitlab.com/oppy-finance/oppychain/x/pool_incentives/types"

	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	"github.com/cosmos/cosmos-sdk/x/distribution"
	distrtypes "github.com/cosmos/cosmos-sdk/x/distribution/types"
)

func (suite *KeeperTestSuite) TestAllocateAssetToCommunityPoolWhenNoDistrRecords() {
	mintKeeper := suite.App.MintKeeper
	params := suite.App.MintKeeper.GetParams(suite.Ctx)
	params.WeightedDeveloperRewardsReceivers = []minttypes.WeightedAddress{
		{
			Address: sdk.AccAddress([]byte("addr1---------------")).String(),
			Weight:  sdk.NewDec(1),
		},
	}
	suite.App.MintKeeper.SetParams(suite.Ctx, params)

	// At this time, there is no distr record, so the asset should be allocated to the community pool.
	mintCoin := sdk.NewCoin("stake", sdk.NewInt(100000))
	mintCoins := sdk.Coins{mintCoin}
	err := mintKeeper.MintCoins(suite.Ctx, mintCoins)
	suite.NoError(err)

	err = mintKeeper.DistributeMintedCoin(suite.Ctx, mintCoin) // this calls AllocateAsset via hook
	suite.NoError(err)

	distribution.BeginBlocker(suite.Ctx, abci.RequestBeginBlock{}, suite.App.DistrKeeper)

	feePool := suite.App.DistrKeeper.GetFeePool(suite.Ctx)

	paramsMint := suite.App.MintKeeper.GetParams(suite.Ctx)
	proportions := paramsMint.DistributionProportions
	stakingIncentivesCoins := sdk.NewCoins(suite.App.MintKeeper.GetProportions(suite.Ctx, mintCoin, proportions.Staking))
	communityPoolCoins := sdk.NewCoins(mintCoin).Sub(stakingIncentivesCoins)
	// allocate asset will send tokens to the community pool as the pool-incentives guage is empty
	suite.Equal(stakingIncentivesCoins.String(), suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(authtypes.FeeCollectorName), "stake").String())
	suite.Equal(sdk.NewDecCoinsFromCoins(communityPoolCoins[0]).String(), feePool.CommunityPool.String())
	// the distribution account balance is the same as the distribution module as fund community move fund to the distribution account
	suite.Equal(communityPoolCoins[0].String(), suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(distrtypes.ModuleName), "stake").String())

	// Community pool should be increased

	coin := suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(authtypes.FeeCollectorName), "stake")
	c2 := coin.Add(coin)

	communityCoinsNow := communityPoolCoins[0].Add(communityPoolCoins[0])
	communityCoinsNowDec := sdk.NewDecCoinFromCoin(communityCoinsNow)
	mintCoin = sdk.NewCoin("stake", sdk.NewInt(100000))
	mintCoins = sdk.Coins{mintCoin}
	err = mintKeeper.MintCoins(suite.Ctx, mintCoins)
	suite.NoError(err)
	err = mintKeeper.DistributeMintedCoin(suite.Ctx, mintCoin) // this calls AllocateAsset via hook
	suite.NoError(err)

	distribution.BeginBlocker(suite.Ctx, abci.RequestBeginBlock{}, suite.App.DistrKeeper)

	feePool = suite.App.DistrKeeper.GetFeePool(suite.Ctx)

	// as each mint, staking get 4000, so we have 8000stake now
	suite.Equal(c2.String(), suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(authtypes.FeeCollectorName), "stake").String())
	// community pool = previous community pool*2 =12000stake
	suite.Equal(feePool.CommunityPool.String(), communityCoinsNowDec.String())
	suite.Equal(communityCoinsNow, suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(distrtypes.ModuleName), "stake"))
}

// GetProportions gets the balance of the `MintedDenom` from minted coins and returns coins according to the `AllocationRatio`.
func getProportions(mintedCoin sdk.Coin, ratio sdk.Dec) sdk.Coin {
	return sdk.NewCoin(mintedCoin.Denom, mintedCoin.Amount.ToDec().Mul(ratio).TruncateInt())
}

func (suite *KeeperTestSuite) TestAllocateAsset() {
	keeper := suite.App.PoolIncentivesKeeper
	mintKeeper := suite.App.MintKeeper
	params := suite.App.MintKeeper.GetParams(suite.Ctx)
	params.WeightedDeveloperRewardsReceivers = []minttypes.WeightedAddress{
		{
			Address: sdk.AccAddress([]byte("addr1---------------")).String(),
			Weight:  sdk.NewDec(1),
		},
	}
	suite.App.MintKeeper.SetParams(suite.Ctx, params)

	poolId := suite.PrepareBalancerPool()

	// LockableDurations should be 1, 3, 7 hours from the default genesis state.
	lockableDurations := keeper.GetLockableDurations(suite.Ctx)
	suite.Equal(3, len(lockableDurations))

	for i, duration := range lockableDurations {
		suite.Equal(duration, types.DefaultGenesisState().GetLockableDurations()[i])
	}

	gauge1Id, err := keeper.GetPoolGaugeId(suite.Ctx, poolId, lockableDurations[0])
	suite.NoError(err)

	gauge2Id, err := keeper.GetPoolGaugeId(suite.Ctx, poolId, lockableDurations[1])
	suite.NoError(err)

	gauge3Id, err := keeper.GetPoolGaugeId(suite.Ctx, poolId, lockableDurations[2])
	suite.NoError(err)

	// Create 3 records
	err = keeper.ReplaceDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: gauge1Id,
		Weight:  sdk.NewInt(100),
	}, types.DistrRecord{
		GaugeId: gauge2Id,
		Weight:  sdk.NewInt(200),
	}, types.DistrRecord{
		GaugeId: gauge3Id,
		Weight:  sdk.NewInt(300),
	})
	suite.NoError(err)

	// In this time, there are 3 records, so the assets to be allocated to the gauges proportionally.
	mintCoin := sdk.NewCoin("stake", sdk.NewInt(100000))
	mintCoins := sdk.Coins{mintCoin}
	err = mintKeeper.MintCoins(suite.Ctx, mintCoins)
	suite.NoError(err)

	err = mintKeeper.DistributeMintedCoin(suite.Ctx, mintCoin) // this calls AllocateAsset via hook
	suite.NoError(err)

	stakingCoins := sdk.NewCoins(getProportions(mintCoin, minttypes.Staking))
	distribution.BeginBlocker(suite.Ctx, abci.RequestBeginBlock{}, suite.App.DistrKeeper)

	suite.Equal(stakingCoins[0].String(), suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(authtypes.FeeCollectorName), "stake").String())

	// 6060606=36363636/(100+200+300)*(100)
	poolIncentivesCoins := sdk.NewCoins(getProportions(mintCoin, minttypes.PoolIncentives))
	a := sdk.MustNewDecFromStr("100")
	b := sdk.MustNewDecFromStr("200")
	c := sdk.MustNewDecFromStr("300")
	total := sdk.MustNewDecFromStr("600")
	first := sdk.NewCoins(getProportions(poolIncentivesCoins[0], a.Quo(total)))[0]
	second := sdk.NewCoins(getProportions(poolIncentivesCoins[0], b.Quo(total)))[0]
	third := sdk.NewCoins(getProportions(poolIncentivesCoins[0], c.Quo(total)))[0]

	gauge1, err := suite.App.IncentivesKeeper.GetGaugeByID(suite.Ctx, gauge1Id)
	suite.NoError(err)
	suite.Equal(first.String(), gauge1.Coins.String())

	gauge2, err := suite.App.IncentivesKeeper.GetGaugeByID(suite.Ctx, gauge2Id)
	suite.NoError(err)
	suite.Equal(second.String(), gauge2.Coins.String())

	gauge3, err := suite.App.IncentivesKeeper.GetGaugeByID(suite.Ctx, gauge3Id)
	suite.NoError(err)
	suite.Equal(third.String(), gauge3.Coins.String())

	// Allocate more.
	mintCoin = sdk.NewCoin("stake", sdk.NewInt(50000))
	mintCoins = sdk.Coins{mintCoin}

	poolIncentivesCoins2 := sdk.NewCoins(getProportions(mintCoin, minttypes.PoolIncentives))[0]

	leftover := suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(types.ModuleName), "stake")

	poolIncentivesCoins2 = leftover.AddAmount(poolIncentivesCoins2.Amount)

	stakingCoins2 := sdk.NewCoins(getProportions(mintCoin, minttypes.Staking))

	first2 := sdk.NewCoins(getProportions(poolIncentivesCoins2, a.Quo(total)))[0]
	second2 := sdk.NewCoins(getProportions(poolIncentivesCoins2, b.Quo(total)))[0]
	third2 := sdk.NewCoins(getProportions(poolIncentivesCoins2, c.Quo(total)))[0]

	err = mintKeeper.MintCoins(suite.Ctx, mintCoins)
	suite.NoError(err)
	err = mintKeeper.DistributeMintedCoin(suite.Ctx, mintCoin) // this calls AllocateAsset via hook
	suite.NoError(err)

	distribution.BeginBlocker(suite.Ctx, abci.RequestBeginBlock{}, suite.App.DistrKeeper)

	// It has very small margin of error.
	suite.Equal(stakingCoins[0].Add(stakingCoins2[0]).String(), suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(authtypes.FeeCollectorName), "stake").String())

	// Allocated assets should be increased.
	gauge1, err = suite.App.IncentivesKeeper.GetGaugeByID(suite.Ctx, gauge1Id)
	suite.NoError(err)
	suite.Equal(first.Add(first2).String(), gauge1.Coins.String())

	gauge2, err = suite.App.IncentivesKeeper.GetGaugeByID(suite.Ctx, gauge2Id)
	suite.NoError(err)
	suite.Equal(second.Add(second2).String(), gauge2.Coins.String())

	gauge3, err = suite.App.IncentivesKeeper.GetGaugeByID(suite.Ctx, gauge3Id)
	suite.NoError(err)
	suite.Equal(third.Add(third2).String(), gauge3.Coins.String())

	// ------------ test community pool distribution when gaugeId is zero ------------ //

	// record original community pool balance
	feePoolOrigin := suite.App.DistrKeeper.GetFeePool(suite.Ctx)

	// Create 3 records including community pool
	err = keeper.ReplaceDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: 0,
		Weight:  sdk.NewInt(700),
	}, types.DistrRecord{
		GaugeId: gauge1Id,
		Weight:  sdk.NewInt(100),
	}, types.DistrRecord{
		GaugeId: gauge2Id,
		Weight:  sdk.NewInt(200),
	})
	suite.NoError(err)

	// In this time, there are 3 records, so the assets to be allocated to the gauges proportionally.
	leftovernow := suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(types.ModuleName), "stake")
	mintCoin = sdk.NewCoin("stake", sdk.NewInt(100000))
	mintCoins = sdk.Coins{mintCoin}
	err = mintKeeper.MintCoins(suite.Ctx, mintCoins)
	suite.NoError(err)
	err = mintKeeper.DistributeMintedCoin(suite.Ctx, mintCoin) // this calls AllocateAsset via hook
	suite.NoError(err)

	distribution.BeginBlocker(suite.Ctx, abci.RequestBeginBlock{}, suite.App.DistrKeeper)

	// check community pool balance increase
	feePoolNew := suite.App.DistrKeeper.GetFeePool(suite.Ctx)

	a = sdk.MustNewDecFromStr("700")
	total = sdk.MustNewDecFromStr("1000")

	poolIncentiveGet := leftovernow.AddAmount(poolIncentivesCoins[0].Amount)

	poolIncentivesCoins = sdk.NewCoins(getProportions(mintCoin, minttypes.PoolIncentives))
	firstc := sdk.NewCoins(getProportions(poolIncentiveGet, a.Quo(total)))[0]

	communityPoolCoins := mintCoins.Sub(stakingCoins).Sub(poolIncentivesCoins)

	expecetd := feePoolOrigin.CommunityPool.Add(sdk.NewDecCoinFromCoin(firstc)).Add(sdk.NewDecCoinFromCoin(communityPoolCoins[0]))

	suite.Equal(expecetd, feePoolNew.CommunityPool)

	// ------------ test community pool distribution when no distribution records are set ------------ //

	// record original community pool balance
	feePoolOrigin = suite.App.DistrKeeper.GetFeePool(suite.Ctx)

	leftovernow = suite.App.BankKeeper.GetBalance(suite.Ctx, suite.App.AccountKeeper.GetModuleAddress(types.ModuleName), "stake")

	// set empty records set
	err = keeper.ReplaceDistrRecords(suite.Ctx)
	suite.NoError(err)

	// In this time, all should be allocated to community pool
	mintCoin = sdk.NewCoin("stake", sdk.NewInt(100000))
	mintCoins = sdk.Coins{mintCoin}
	err = mintKeeper.MintCoins(suite.Ctx, mintCoins)
	suite.NoError(err)
	err = mintKeeper.DistributeMintedCoin(suite.Ctx, mintCoin) // this calls AllocateAsset via hook
	suite.NoError(err)

	distribution.BeginBlocker(suite.Ctx, abci.RequestBeginBlock{}, suite.App.DistrKeeper)

	// we need to add the leftover from the poolincentive
	communityPoolCoins = mintCoins.Sub(stakingCoins).Add(leftovernow)
	// check community pool balance increase
	feePoolNew = suite.App.DistrKeeper.GetFeePool(suite.Ctx)
	suite.Equal(feePoolOrigin.CommunityPool.Add(sdk.NewDecCoinFromCoin(communityPoolCoins[0])), feePoolNew.CommunityPool)
}

func (suite *KeeperTestSuite) TestReplaceDistrRecords() uint64 {
	suite.SetupTest()

	keeper := suite.App.PoolIncentivesKeeper

	// Not existent gauge.
	err := keeper.ReplaceDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: 1,
		Weight:  sdk.NewInt(100),
	})
	suite.Error(err)

	poolId := suite.PrepareBalancerPool()

	// LockableDurations should be 1, 3, 7 hours from the default genesis state for testing
	lockableDurations := keeper.GetLockableDurations(suite.Ctx)
	suite.Equal(3, len(lockableDurations))

	gaugeId, err := keeper.GetPoolGaugeId(suite.Ctx, poolId, lockableDurations[0])
	suite.NoError(err)

	err = keeper.ReplaceDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: gaugeId,
		Weight:  sdk.NewInt(100),
	})
	suite.NoError(err)
	distrInfo := keeper.GetDistrInfo(suite.Ctx)
	suite.Equal(1, len(distrInfo.Records))
	suite.Equal(gaugeId, distrInfo.Records[0].GaugeId)
	suite.Equal(sdk.NewInt(100), distrInfo.Records[0].Weight)
	suite.Equal(sdk.NewInt(100), distrInfo.TotalWeight)

	// adding two of the same gauge id at once should error
	err = keeper.ReplaceDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: gaugeId,
		Weight:  sdk.NewInt(100),
	}, types.DistrRecord{
		GaugeId: gaugeId,
		Weight:  sdk.NewInt(200),
	})
	suite.Error(err)

	gaugeId2 := gaugeId + 1
	gaugeId3 := gaugeId + 2

	err = keeper.ReplaceDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: gaugeId2,
		Weight:  sdk.NewInt(100),
	}, types.DistrRecord{
		GaugeId: gaugeId3,
		Weight:  sdk.NewInt(200),
	})
	suite.NoError(err)

	distrInfo = keeper.GetDistrInfo(suite.Ctx)
	suite.Equal(2, len(distrInfo.Records))
	suite.Equal(gaugeId2, distrInfo.Records[0].GaugeId)
	suite.Equal(gaugeId3, distrInfo.Records[1].GaugeId)
	suite.Equal(sdk.NewInt(100), distrInfo.Records[0].Weight)
	suite.Equal(sdk.NewInt(200), distrInfo.Records[1].Weight)
	suite.Equal(sdk.NewInt(300), distrInfo.TotalWeight)

	// Can replace the registered gauge id
	err = keeper.ReplaceDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: gaugeId2,
		Weight:  sdk.NewInt(100),
	})
	suite.NoError(err)

	return gaugeId
}

func (suite *KeeperTestSuite) TestUpdateDistrRecords() uint64 {
	suite.SetupTest()

	keeper := suite.App.PoolIncentivesKeeper

	// Not existent gauge.
	err := keeper.UpdateDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: 1,
		Weight:  sdk.NewInt(100),
	})
	suite.Error(err)

	poolId := suite.PrepareBalancerPool()

	// LockableDurations should be 1, 3, 7 hours from the default genesis state for testing
	lockableDurations := keeper.GetLockableDurations(suite.Ctx)
	suite.Equal(3, len(lockableDurations))

	gaugeId, err := keeper.GetPoolGaugeId(suite.Ctx, poolId, lockableDurations[0])
	suite.NoError(err)

	err = keeper.UpdateDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: 0,
		Weight:  sdk.NewInt(100),
	}, types.DistrRecord{
		GaugeId: gaugeId,
		Weight:  sdk.NewInt(100),
	})
	suite.NoError(err)
	distrInfo := keeper.GetDistrInfo(suite.Ctx)
	suite.Equal(2, len(distrInfo.Records))
	suite.Equal(sdk.NewInt(100), distrInfo.Records[0].Weight)
	suite.Equal(sdk.NewInt(100), distrInfo.Records[1].Weight)
	suite.Equal(sdk.NewInt(200), distrInfo.TotalWeight)

	// adding two of the same gauge id at once should error
	err = keeper.UpdateDistrRecords(suite.Ctx, types.DistrRecord{
		GaugeId: 0,
		Weight:  sdk.NewInt(0),
	}, types.DistrRecord{
		GaugeId: gaugeId,
		Weight:  sdk.NewInt(200),
	}, types.DistrRecord{
		GaugeId: gaugeId + 1,
		Weight:  sdk.NewInt(150),
	})
	suite.NoError(err)
	distrInfo = keeper.GetDistrInfo(suite.Ctx)
	suite.Equal(2, len(distrInfo.Records))
	suite.Equal(sdk.NewInt(200), distrInfo.Records[0].Weight)
	suite.Equal(sdk.NewInt(150), distrInfo.Records[1].Weight)
	suite.Equal(sdk.NewInt(350), distrInfo.TotalWeight, distrInfo.TotalWeight.String())

	return gaugeId
}
