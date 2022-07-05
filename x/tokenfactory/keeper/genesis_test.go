package keeper_test

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"os"
	path2 "path"
	"runtime"
	"testing"

	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	oppyapp "gitlab.com/oppy-finance/oppychain/app"

	"gitlab.com/oppy-finance/oppychain/testutil/simapp"

	"gitlab.com/oppy-finance/oppychain/x/tokenfactory/types"
)

func setupBech32Prefix() {
	config := sdk.GetConfig()
	config.SetBech32PrefixForAccount("oppy", "oppypub")
	config.SetBech32PrefixForValidator("oppyval", "oppyvpub")
	config.SetBech32PrefixForConsensusNode("oppyvalcons", "oppycpub")
}

func TestGenesis(t *testing.T) {
	setupBech32Prefix()

	genesisState := types.GenesisState{
		FactoryDenoms: []types.GenesisDenom{
			{
				Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/bitcoin",
				AuthorityMetadata: types.DenomAuthorityMetadata{
					Admin: "oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7",
				},
			},
			{
				Denom: "factory/oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7/litecoin",
				AuthorityMetadata: types.DenomAuthorityMetadata{
					Admin: "oppy1txtsnx4gr4effr8542778fsxc20j5vzq7wu7r7",
				},
			},
		},
	}

	dir := os.TempDir()
	pc, _, _, _ := runtime.Caller(1)
	tempPath := path2.Join(dir, runtime.FuncForPC(pc).Name())
	defer func(tempPath string) {
		err := os.RemoveAll(tempPath)
		require.NoError(t, err)
	}(tempPath)
	app := simapp.New(tempPath).(*oppyapp.App)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})

	app.TokenFactoryKeeper.InitGenesis(ctx, genesisState)
	exportedGenesis := app.TokenFactoryKeeper.ExportGenesis(ctx)
	require.NotNil(t, exportedGenesis)
	require.Equal(t, genesisState, *exportedGenesis)
}
