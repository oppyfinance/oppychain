package keeper_test

import (
	gocontext "context"
	"time"

	"gitlab.com/oppy-finance/oppychain/x/epochs/types"
)

func (suite *KeeperTestSuite) TestQueryEpochInfos() {
	suite.SetupTest()
	queryClient := suite.queryClient

	chainStartTime := suite.Ctx.BlockHeader().Time
	epochInfo := types.EpochInfo{
		Identifier:            "day",
		StartTime:             chainStartTime,
		Duration:              time.Hour * 24,
		CurrentEpoch:          0,
		CurrentEpochStartTime: chainStartTime,
		EpochCountingStarted:  false,
	}
	suite.App.EpochsKeeper.SetEpochInfo(suite.Ctx, epochInfo)

	epochInfo = types.EpochInfo{
		Identifier:            "minute",
		StartTime:             chainStartTime,
		Duration:              time.Minute,
		CurrentEpoch:          0,
		CurrentEpochStartTime: chainStartTime,
		EpochCountingStarted:  false,
	}
	suite.App.EpochsKeeper.SetEpochInfo(suite.Ctx, epochInfo)

	epochInfo = types.EpochInfo{
		Identifier:            "week",
		StartTime:             chainStartTime,
		Duration:              time.Hour * 24 * 7,
		CurrentEpoch:          0,
		CurrentEpochStartTime: chainStartTime,
		EpochCountingStarted:  false,
	}
	suite.App.EpochsKeeper.SetEpochInfo(suite.Ctx, epochInfo)

	// Invalid param
	epochInfosResponse, err := queryClient.EpochInfos(gocontext.Background(), &types.QueryEpochsInfoRequest{})
	suite.Require().NoError(err)
	suite.Require().Len(epochInfosResponse.Epochs, 4)

	// check if EpochInfos are correct
	suite.Require().Equal(epochInfosResponse.Epochs[0].Identifier, "day")
	suite.Require().Equal(epochInfosResponse.Epochs[0].StartTime, chainStartTime)
	suite.Require().Equal(epochInfosResponse.Epochs[0].Duration, time.Hour*24)
	suite.Require().Equal(epochInfosResponse.Epochs[0].CurrentEpoch, int64(0))
	suite.Require().Equal(epochInfosResponse.Epochs[0].CurrentEpochStartTime, chainStartTime)
	suite.Require().Equal(epochInfosResponse.Epochs[0].EpochCountingStarted, false)
	suite.Require().Equal(epochInfosResponse.Epochs[2].Identifier, "minute")
	suite.Require().Equal(epochInfosResponse.Epochs[2].StartTime, chainStartTime)
	suite.Require().Equal(epochInfosResponse.Epochs[2].Duration, time.Minute)
	suite.Require().Equal(epochInfosResponse.Epochs[2].CurrentEpoch, int64(0))
	suite.Require().Equal(epochInfosResponse.Epochs[2].CurrentEpochStartTime, chainStartTime)
	suite.Require().Equal(epochInfosResponse.Epochs[2].EpochCountingStarted, false)

	suite.Require().Equal(epochInfosResponse.Epochs[3].Identifier, "week")
	suite.Require().Equal(epochInfosResponse.Epochs[3].StartTime, chainStartTime)
	suite.Require().Equal(epochInfosResponse.Epochs[3].Duration, time.Hour*24*7)
	suite.Require().Equal(epochInfosResponse.Epochs[3].CurrentEpoch, int64(0))
	suite.Require().Equal(epochInfosResponse.Epochs[3].CurrentEpochStartTime, chainStartTime)
	suite.Require().Equal(epochInfosResponse.Epochs[3].EpochCountingStarted, false)
}
