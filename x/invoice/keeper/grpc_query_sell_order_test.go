package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"gitlab.com/oppy-finance/oppychain/x/invoice/types"
)

func TestSellOrderQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNSellOrder(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetSellOrderRequest
		response *types.QueryGetSellOrderResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetSellOrderRequest{Index: "0"},
			response: &types.QueryGetSellOrderResponse{SellOrder: &msgs[0]},
		},
		{
			desc:     "Second",
			request:  &types.QueryGetSellOrderRequest{Index: "1"},
			response: &types.QueryGetSellOrderResponse{SellOrder: &msgs[1]},
		},
		{
			desc:    "KeyNotFound",
			request: &types.QueryGetSellOrderRequest{Index: "missing"},
			err:     status.Error(codes.InvalidArgument, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.SellOrder(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.Equal(t, tc.response, response)
			}
		})
	}
}

func TestSellOrderQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNSellOrder(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllSellOrderRequest {
		return &types.QueryAllSellOrderRequest{
			Pagination: &query.PageRequest{
				Key:        next,
				Offset:     offset,
				Limit:      limit,
				CountTotal: total,
			},
		}
	}
	t.Run("ByOffset", func(t *testing.T) {
		step := 2
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.SellOrderAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			for j := i; j < len(msgs) && j < i+step; j++ {
				assert.Equal(t, &msgs[j], resp.SellOrder[j-i])
			}
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.SellOrderAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			for j := i; j < len(msgs) && j < i+step; j++ {
				assert.Equal(t, &msgs[j], resp.SellOrder[j-i])
			}
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.SellOrderAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.SellOrderAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
