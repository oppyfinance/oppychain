package types_test

import (
	"testing"

	"github.com/stretchr/testify/require"

	sdk "github.com/cosmos/cosmos-sdk/types"

	"gitlab.com/oppy-finance/oppychain/x/pool_incentives/types"
)

func TestDistrRecord(t *testing.T) {
	zeroWeight := types.DistrRecord{
		GaugeId: 1,
		Weight:  sdk.NewInt(0),
	}

	require.NoError(t, zeroWeight.ValidateBasic())

	negativeWeight := types.DistrRecord{
		GaugeId: 1,
		Weight:  sdk.NewInt(-1),
	}

	require.Error(t, negativeWeight.ValidateBasic())

	positiveWeight := types.DistrRecord{
		GaugeId: 1,
		Weight:  sdk.NewInt(1),
	}

	require.NoError(t, positiveWeight.ValidateBasic())
}