package vault_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
	"gitlab.com/oppy-finance/oppychain/testutil/nullify"
	"gitlab.com/oppy-finance/oppychain/x/vault"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		OutboundTxList: []types.OutboundTx{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	app, ctx := keepertest.SetupVaultApp(t)
	vault.InitGenesis(ctx, app.VaultKeeper, genesisState)
	got := vault.ExportGenesis(ctx, app.VaultKeeper)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.OutboundTxList, got.OutboundTxList)
	// this line is used by starport scaffolding # genesis/test/assert
}
