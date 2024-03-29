package balancer_test

import (
	"testing"
	"time"

	"github.com/cosmos/cosmos-sdk/store/rootmulti"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"
	"github.com/tendermint/tendermint/libs/log"
	tmtypes "github.com/tendermint/tendermint/proto/tendermint/types"
	dbm "github.com/tendermint/tm-db"

	"gitlab.com/oppy-finance/oppychain/x/swap/pool_models/balancer"
	"gitlab.com/oppy-finance/oppychain/x/swap/types"
)

func createTestPool(t *testing.T, swapFee, exitFee sdk.Dec, poolAssets ...balancer.PoolAsset) types.PoolI {
	pool, err := balancer.NewBalancerPool(
		1,
		balancer.NewPoolParams(swapFee, exitFee, nil),
		poolAssets,
		"",
		time.Now(),
	)
	require.NoError(t, err)

	return &pool
}

func createTestContext(t *testing.T) sdk.Context {
	db := dbm.NewMemDB()
	logger := log.NewNopLogger()

	ms := rootmulti.NewStore(db, logger)

	return sdk.NewContext(ms, tmtypes.Header{}, false, logger)
}
