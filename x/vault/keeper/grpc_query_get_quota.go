package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetQuota(goCtx context.Context, req *types.QueryGetQuotaRequest) (*types.QueryGetQuotaResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	// TODO: Process the query
	_ = ctx
	result, found := k.GetQuotaData(ctx)
	if !found {
		return nil, status.Error(codes.InvalidArgument, "Coin quota data is not ready")
	}

	return &types.QueryGetQuotaResponse{CoinQuotaResponse: result}, nil
}
