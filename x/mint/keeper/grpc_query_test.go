package keeper_test

import (
	gocontext "context"
	"testing"

	"gitlab.com/oppy-finance/oppychain/app/apptesting"

	"github.com/stretchr/testify/suite"
	"gitlab.com/oppy-finance/oppychain/x/mint/types"
)

type MintTestSuite struct {
	apptesting.KeeperTestHelper
	queryClient types.QueryClient
}

func (suite *MintTestSuite) SetupTest() {
	suite.Setup()
	suite.queryClient = types.NewQueryClient(suite.QueryHelper)
}

func (suite *MintTestSuite) TestGRPCParams() {
	_, _, queryClient := suite.App, suite.Ctx, suite.queryClient

	_, err := queryClient.Params(gocontext.Background(), &types.QueryParamsRequest{})
	suite.Require().NoError(err)

	_, err = queryClient.EpochProvisions(gocontext.Background(), &types.QueryEpochProvisionsRequest{})
	suite.Require().NoError(err)
}

func TestMintTestSuite(t *testing.T) {
	suite.Run(t, new(MintTestSuite))
}
