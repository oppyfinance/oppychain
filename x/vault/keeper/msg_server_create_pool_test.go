package keeper_test

import (
	"encoding/hex"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	types2 "github.com/cosmos/cosmos-sdk/x/staking/types"
	"gitlab.com/oppy-finance/oppychain/utils"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

func TestCreatePoolMsgServerCreate(t *testing.T) {
	utils.SetAddressPrefixes()
	app, srv, wctx := setupMsgServer(t)
	k := &app.VaultKeeper

	sk := ed25519.GenPrivKey()
	desc := types2.NewDescription("tester", "testId", "www.test.com", "aaa", "aaa")
	creatorStr := "oppy1fase3jev95k9lsj6hn0echk4e37kyhpspmluqd"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)
	valAddr, err := sdk.ValAddressFromHex(hex.EncodeToString(creator.Bytes()))
	assert.Nil(t, err)
	testValidator, err := types2.NewValidator(valAddr, sk.PubKey(), desc)
	require.NoError(t, err)

	pubkey := "oppypub1addwnpepqf2vlt7kmvc5guasrfha8lqcuz6s7j3y2z2hl8lw7mr0g5t2vfyjqc9cwdp"

	ctx := sdk.UnwrapSDKContext(wctx)
	historyInfo := types2.HistoricalInfo{
		Valset: types2.Validators{testValidator},
	}
	app.StakingKeeper.SetHistoricalInfo(ctx, int64(1), &historyInfo)

	expected := &types.MsgCreateCreatePool{Creator: creator, BlockHeight: "1", PoolPubKey: pubkey}
	_, err = srv.CreateCreatePool(wctx, expected)
	require.NoError(t, err)

	rst, found := k.GetCreatePool(ctx, expected.BlockHeight)
	require.True(t, found)
	assert.Equal(t, expected.PoolPubKey, rst.Proposal[0].PoolPubKey)
}

func TestCreatePoolMsgServerCreateNotValidator(t *testing.T) {
	utils.SetAddressPrefixes()
	app, srv, wctx := setupMsgServer(t)
	k := &app.VaultKeeper
	ctx := sdk.UnwrapSDKContext(wctx)

	sk := ed25519.GenPrivKey()
	desc := types2.NewDescription("tester", "testId", "www.test.com", "aaa", "aaa")

	valAddr := sk.PubKey().Address().Bytes()
	testValidator, err := types2.NewValidator(valAddr, sk.PubKey(), desc)
	require.NoError(t, err)
	historyInfo := types2.HistoricalInfo{
		Valset: types2.Validators{testValidator},
	}
	app.StakingKeeper.SetHistoricalInfo(ctx, int64(1), &historyInfo)

	creatorStr := "oppy1fase3jev95k9lsj6hn0echk4e37kyhpspmluqd"
	creator, err := sdk.AccAddressFromBech32(creatorStr)
	assert.Nil(t, err)
	expected := &types.MsgCreateCreatePool{Creator: creator, BlockHeight: "1", PoolPubKey: creatorStr}
	_, err = srv.CreateCreatePool(wctx, expected)
	require.NoError(t, err)
	_, found := k.GetCreatePool(ctx, expected.BlockHeight)
	require.False(t, found)
}
