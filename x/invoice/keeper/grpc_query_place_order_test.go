package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	keepertest "gitlab.com/oppy-finance/oppychain/testutil/keeper"
	"gitlab.com/oppy-finance/oppychain/x/invoice/types"
)

func TestPlaceOrderQuerySingle(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNPlaceOrder(keeper, ctx, 2)
	for _, tc := range []struct {
		desc     string
		request  *types.QueryGetPlaceOrderRequest
		response *types.QueryGetPlaceOrderResponse
		err      error
	}{
		{
			desc:     "First",
			request:  &types.QueryGetPlaceOrderRequest{Index: msgs[0].PlaceOrderIndex},
			response: &types.QueryGetPlaceOrderResponse{PlaceOrder: &msgs[0]},
		},
		{
			desc:     "Second",
			request:  &types.QueryGetPlaceOrderRequest{Index: msgs[1].PlaceOrderIndex},
			response: &types.QueryGetPlaceOrderResponse{PlaceOrder: &msgs[1]},
		},
		{
			desc:    "KeyNotFound",
			request: &types.QueryGetPlaceOrderRequest{Index: "missing"},
			err:     status.Error(codes.InvalidArgument, "not found"),
		},
		{
			desc: "InvalidRequest",
			err:  status.Error(codes.InvalidArgument, "invalid request"),
		},
	} {
		tc := tc
		t.Run(tc.desc, func(t *testing.T) {
			response, err := keeper.PlaceOrder(wctx, tc.request)
			if tc.err != nil {
				require.ErrorIs(t, err, tc.err)
			} else {
				require.Equal(t, tc.response, response)
			}
		})
	}
}

func TestPlaceOrderQueryPaginated(t *testing.T) {
	keeper, ctx := keepertest.SetupKeeper(t)
	wctx := sdk.WrapSDKContext(ctx)
	msgs := createNPlaceOrder(keeper, ctx, 5)

	request := func(next []byte, offset, limit uint64, total bool) *types.QueryAllPlaceOrderRequest {
		return &types.QueryAllPlaceOrderRequest{
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
			resp, err := keeper.PlaceOrderAll(wctx, request(nil, uint64(i), uint64(step), false))
			require.NoError(t, err)
			for j := i; j < len(msgs) && j < i+step; j++ {
				assert.Equal(t, &msgs[j], resp.PlaceOrder[j-i])
			}
		}
	})
	t.Run("ByKey", func(t *testing.T) {
		step := 2
		var next []byte
		for i := 0; i < len(msgs); i += step {
			resp, err := keeper.PlaceOrderAll(wctx, request(next, 0, uint64(step), false))
			require.NoError(t, err)
			for j := i; j < len(msgs) && j < i+step; j++ {
				assert.Equal(t, &msgs[j], resp.PlaceOrder[j-i])
			}
			next = resp.Pagination.NextKey
		}
	})
	t.Run("Total", func(t *testing.T) {
		resp, err := keeper.PlaceOrderAll(wctx, request(nil, 0, 0, true))
		require.NoError(t, err)
		require.Equal(t, len(msgs), int(resp.Pagination.Total))
	})
	t.Run("InvalidRequest", func(t *testing.T) {
		_, err := keeper.PlaceOrderAll(wctx, nil)
		require.ErrorIs(t, err, status.Error(codes.InvalidArgument, "invalid request"))
	})
}
