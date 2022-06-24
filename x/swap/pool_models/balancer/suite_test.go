package balancer_test

import (
	"testing"

	"github.com/stretchr/testify/suite"

	"gitlab.com/oppy-finance/oppychain/app/apptesting"
	"gitlab.com/oppy-finance/oppychain/x/swap/types"
)

type KeeperTestSuite struct {
	apptesting.KeeperTestHelper

	queryClient types.QueryClient
}

func TestKeeperTestSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}

func (suite *KeeperTestSuite) SetupTest() {
	suite.Setup()
	suite.queryClient = types.NewQueryClient(suite.QueryHelper)
	// be post-bug
	suite.Ctx = suite.Ctx.WithBlockHeight(4713064)
}
