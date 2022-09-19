package keeper_test

import (
	"encoding/hex"
	"math/rand"
	"strconv"
	"testing"
	"time"

	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	"github.com/cosmos/cosmos-sdk/types/simulation"
	types2 "github.com/cosmos/cosmos-sdk/x/staking/types"
	"github.com/stretchr/testify/assert"
	"github.com/tendermint/tendermint/crypto/secp256k1"
	"gitlab.com/oppy-finance/oppychain/testutil/simapp"
	"gitlab.com/oppy-finance/oppychain/utils"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/stretchr/testify/require"

	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/keeper"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

// Prevent strconv unused error
var _ = strconv.IntSize

func generateNValidators(t *testing.T, n int) (types2.Validators, []sdk.AccAddress) {
	testValidators := make(types2.Validators, n)
	creators := make([]sdk.AccAddress, n)
	for i := 0; i < n; i++ {
		sk := ed25519.GenPrivKey()
		desc := types2.NewDescription("tester", "testId", "www.test.com", "aaa", "aaa")

		skCreator := secp256k1.GenPrivKey()

		skCreator.PubKey().Address()
		creator := skCreator.PubKey().Address().Bytes()

		valAddr, err := sdk.ValAddressFromHex(hex.EncodeToString(creator))
		require.NoError(t, err)
		testValidator, err := types2.NewValidator(valAddr, sk.PubKey(), desc)
		require.NoError(t, err)
		testValidators[i] = testValidator
		creators[i] = creator
	}
	return testValidators, creators
}

func TestOutboundTxMsgServerCreate(t *testing.T) {
	utils.SetAddressPrefixes()
	app, ctx := keepertest.SetupVaultApp(t)
	k := app.VaultKeeper
	srv := keeper.NewMsgServerImpl(k)

	testValidators, creators := generateNValidators(t, 4)

	for _, el := range creators {
		err := simapp.FundAccount(app.BankKeeper, ctx, el, sdk.Coins{sdk.Coin{Denom: "mock", Amount: sdk.NewInt(1000)}})
		assert.NoError(t, err)
	}

	p1 := types.PoolProposal{PoolAddr: creators[0], Nodes: []sdk.AccAddress{creators[0], creators[1], creators[2]}}
	params := k.GetParams(ctx)
	params.BlockChurnInterval = 20
	k.SetParams(ctx, params)

	position1 := ctx.BlockHeight() - params.BlockChurnInterval + 1
	position2 := ctx.BlockHeight() - params.BlockChurnInterval*2 + 1

	createPool := types.CreatePool{
		BlockHeight: strconv.FormatInt(position1, 10),
		Validators:  testValidators,
		Proposal:    []*types.PoolProposal{&p1, &p1, &p1},
	}
	k.SetCreatePool(ctx, createPool)

	p1 = types.PoolProposal{PoolAddr: creators[1], Nodes: []sdk.AccAddress{creators[0], creators[1], creators[2]}}
	createPool = types.CreatePool{
		BlockHeight: strconv.FormatInt(position2, 10),
		Validators:  testValidators,
		Proposal:    []*types.PoolProposal{&p1, &p1, &p1},
	}
	k.SetCreatePool(ctx, createPool)

	historyInfo := types2.HistoricalInfo{
		Valset: testValidators,
	}
	app.StakingKeeper.SetHistoricalInfo(ctx, int64(100), &historyInfo)

	r := rand.New(rand.NewSource(time.Now().Unix()))
	accs := simulation.RandomAccounts(r, 1)

	expected := &types.MsgCreateOutboundTx{
		Creator:     accs[0].Address,
		RequestID:   strconv.Itoa(12),
		BlockHeight: "100",
		OutboundTx:  "123",
	}
	wctx := sdk.WrapSDKContext(ctx)
	// if it is not the validator, it should fail to submit the proposal
	_, err := srv.CreateOutboundTx(wctx, expected)
	require.Error(t, err)

	expected = &types.MsgCreateOutboundTx{
		Creator:     creators[0],
		RequestID:   strconv.Itoa(1),
		BlockHeight: "100",
		OutboundTx:  "123",
		Feecoin:     sdk.NewCoins(sdk.Coin{Denom: "mock", Amount: sdk.NewInt(12)}),
	}
	ret, err := srv.CreateOutboundTx(wctx, expected)
	require.True(t, ret.Successful)
	require.NoError(t, err)

	index := strconv.Itoa(1)
	rst, found := k.GetOutboundTx(ctx,
		index,
	)
	require.True(t, found)
	require.Equal(t, len(rst.Items), 1)
	require.Equal(t, expected.Creator.String(), rst.Items["123"].Entry[0].Address.String())

	expected = &types.MsgCreateOutboundTx{
		Creator:     creators[1],
		RequestID:   strconv.Itoa(1),
		BlockHeight: "100",
		OutboundTx:  "123",
		Feecoin:     sdk.NewCoins(sdk.Coin{Denom: "mock", Amount: sdk.NewInt(12)}),
	}
	ret, err = srv.CreateOutboundTx(wctx, expected)
	require.True(t, ret.Successful)
	require.NoError(t, err)

	index = strconv.Itoa(1)
	rst, found = k.GetOutboundTx(ctx,
		index,
	)
	require.True(t, found)
	require.Equal(t, rst.Processed, true)
	require.Equal(t, 2, len(rst.Items["123"].Entry))

	fee := k.GetAllFeeAmount(ctx)
	expectedFee := sdk.Coin{Denom: "mock", Amount: sdk.NewInt(12)}
	require.Equal(t, expectedFee.IsEqual(fee[0]), true)
}
