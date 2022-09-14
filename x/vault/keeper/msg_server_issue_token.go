package keeper

import (
	"context"
	"encoding/hex"
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/tendermint/tendermint/crypto"

	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

func (k msgServer) CreateIssueToken(goCtx context.Context, msg *types.MsgCreateIssueToken) (*types.MsgCreateIssueTokenResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Check if the value already exists
	_, isFound := k.GetIssueToken(ctx, msg.Index)
	if isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("index %v already set", msg.Index))
	}

	pools, err := k.getLastTwoPools(goCtx)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "fail to get the pool address")
	}

	inPool := k.checkAddressInPool(pools, msg.Creator.Bytes())
	if !inPool {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("creator %s is not in pool addresses set", msg.Creator.String()))
	}

	err = k.bankKeeper.MintCoins(ctx, types.ModuleName, sdk.NewCoins(msg.Coin))
	if err != nil {
		k.Logger(ctx).Error("fail to mint token")
		return nil, err
	}
	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, msg.Receiver, sdk.NewCoins(msg.Coin))
	if err != nil {
		k.Logger(ctx).Error("fail to send token to account")
		return nil, err
	}

	issueToken := types.IssueToken{
		Index:    msg.Index,
		Creator:  msg.Creator,
		Coin:     &msg.Coin,
		Receiver: msg.Receiver,
	}

	k.SetIssueToken(
		ctx,
		issueToken,
	)

	ctx.TxBytes()

	id := crypto.Sha256(ctx.TxBytes())
	hid := hex.EncodeToString(id)

	ctx.EventManager().EmitEvents(sdk.Events{
		sdk.NewEvent(
			types.EventIssueToken,
			sdk.NewAttribute(types.AttrIssueTokenIndex, msg.Index),
			sdk.NewAttribute(types.AttrIssueTokenTxID, hid),
		),
	})

	return &types.MsgCreateIssueTokenResponse{Successful: true}, nil
}
