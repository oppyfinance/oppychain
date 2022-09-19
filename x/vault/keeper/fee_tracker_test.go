package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
)

func TestSetStoreFeeAmount(t *testing.T) {
	app, ctx := keepertest.SetupVaultApp(t)
	a := sdk.NewCoin("mock", sdk.NewInt(12))
	b := sdk.NewCoin("mock2", sdk.NewInt(22))

	fees := sdk.NewCoins(a, b)
	app.VaultKeeper.SetStoreFeeAmount(ctx, fees)

	feeGet, ok := app.VaultKeeper.GetFeeAmount(ctx, "mock")
	assert.Equal(t, true, ok)
	assert.True(t, feeGet.IsEqual(sdk.NewCoin("mock", sdk.NewInt(12))))

	feesGet := app.VaultKeeper.GetAllFeeAmount(ctx)
	assert.Equal(t, true, feesGet.IsEqual(fees))

	feesGet[0].Amount = sdk.NewInt(2222)
	app.VaultKeeper.SetStoreFeeAmount(ctx, feesGet)
	feesGet = app.VaultKeeper.GetAllFeeAmount(ctx)
	assert.Equal(t, true, feesGet[0].Amount.Equal(sdk.NewInt(2222)))
}
