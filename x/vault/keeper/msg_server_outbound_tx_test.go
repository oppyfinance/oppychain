package keeper_test

import (
	"encoding/hex"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	"github.com/cosmos/cosmos-sdk/types/simulation"
	types2 "github.com/cosmos/cosmos-sdk/x/staking/types"
	"gitlab.com/oppy-finance/oppychain/utils"
	"strconv"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	"math/rand"
	"time"

	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func TestOutboundTxMsgServerCreate(t *testing.T) {
	utils.SetAddressPrefixes()
	app, ctx := keepertest.SetupVaultApp(t)
	k := app.VaultKeeper
	srv := keeper.NewMsgServerImpl(k)
	wctx := sdk.WrapSDKContext(ctx)

	sk := ed25519.GenPrivKey()
	desc := types2.NewDescription("tester", "testId", "www.test.com", "aaa", "aaa")

	creatorStr := "oppy1fase3jev95k9lsj6hn0echk4e37kyhpspmluqd"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	require.NoError(t, err)

	valAddr, err := sdk.ValAddressFromHex(hex.EncodeToString(creator.Bytes()))
	require.NoError(t, err)
	testValidator, err := types2.NewValidator(valAddr, sk.PubKey(), desc)
	require.NoError(t, err)

	historyInfo := types2.HistoricalInfo{
		Valset: types2.Validators{testValidator},
	}
	app.StakingKeeper.SetHistoricalInfo(ctx, int64(100), &historyInfo)

	r := rand.New(rand.NewSource(time.Now().Unix()))
	accs := simulation.RandomAccounts(r, 1)

	expected := &types.MsgCreateOutboundTx{Creator: accs[0].Address,
		RequestID:   strconv.Itoa(12),
		BlockHeight: "100",
		OutboundTx:  "123",
	}
	// if it is not the validator, it should fail to submit the proposal
	_, err = srv.CreateOutboundTx(wctx, expected)
	require.Error(t, err)

	for i := 0; i < 5; i++ {
		expected := &types.MsgCreateOutboundTx{Creator: creator,
			RequestID:   strconv.Itoa(i),
			BlockHeight: "100",
			OutboundTx:  "123",
		}
		ret, err := srv.CreateOutboundTx(wctx, expected)
		require.True(t, ret.Successful)
		require.NoError(t, err)

		index := strconv.Itoa(i)
		rst, found := k.GetOutboundTx(ctx,
			index,
		)
		require.True(t, found)
		require.Equal(t, len(rst.Items), 1)
		require.Equal(t, expected.Creator.String(), rst.Items["123"].Address[0].String())
	}
}
