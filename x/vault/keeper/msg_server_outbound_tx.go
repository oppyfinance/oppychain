package keeper

import (
	"context"
	"fmt"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"gitlab.com/oppy-finance/oppychain/x/vault/types"
)

func (k msgServer) CreateOutboundTx(goCtx context.Context, msg *types.MsgCreateOutboundTx) (*types.MsgCreateOutboundTxResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	height, err := strconv.ParseInt(msg.BlockHeight, 10, 64)
	if err != nil {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("invalid block height %v", msg.BlockHeight))
	}

	history, get := k.vaultStaking.GetHistoricalInfo(ctx, height)
	if !get {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintf("too early, we cannot find the block %v", msg.BlockHeight))
	}

	// now we check whether the msg is sent from the validator
	validators := history.GetValset()
	isValidator := false
	for _, el := range validators {
		if el.GetOperator().Equals(msg.Creator) {
			isValidator = true
			break
		}
	}
	if !isValidator {
		ctx.Logger().Info("not a validator update tss message", "result", "false")
		return &types.MsgCreateOutboundTxResponse{Successful: false}, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintln("not a validator"))
	}
	info, isFound := k.GetOutboundTx(ctx, msg.RequestID)
	if isFound {
		proposal, ok := info.Items[msg.OutboundTx]
		if ok {
			for _, el := range proposal.Entry {
				if el.Address.Equals(msg.Creator) {
					ctx.Logger().Info("the creator has already submitted the outbound tx")
					return &types.MsgCreateOutboundTxResponse{Successful: false}, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, fmt.Sprintln("already submitted"))
				}
			}
			thisProposal := types.Entity{Address: msg.Creator, Feecoin: msg.Feecoin}
			proposal.Entry = append(proposal.Entry, &thisProposal)
			info.Items[msg.OutboundTx] = proposal

			// here we check whether we need to send the fee to the validator module
			k.sendFeeToStakes(ctx, len(validators), msg.OutboundTx, &info)

			k.SetOutboundTx(
				ctx,
				info,
			)
			return &types.MsgCreateOutboundTxResponse{Successful: true}, nil
		}

		thisProposal := types.Entity{Address: msg.Creator, Feecoin: msg.Feecoin}
		info.Items[msg.OutboundTx] = types.Proposals{Entry: []*types.Entity{&thisProposal}}
		k.SetOutboundTx(
			ctx,
			info,
		)
		return &types.MsgCreateOutboundTxResponse{Successful: true}, nil
	}

	items := make(map[string]types.Proposals)

	thisProposal := types.Entity{Address: msg.Creator, Feecoin: msg.Feecoin}
	items[msg.OutboundTx] = types.Proposals{Entry: []*types.Entity{&thisProposal}}
	newInfo := types.OutboundTx{
		Index:     msg.RequestID,
		Items:     items,
		Processed: false,
	}

	k.SetOutboundTx(
		ctx,
		newInfo,
	)
	return &types.MsgCreateOutboundTxResponse{Successful: true}, nil
}

func (k msgServer) sendFeeToStakes(ctx sdk.Context, totalValidatorNum int, outboundTx string, info *types.OutboundTx) {
	if info.Processed {
		return
	}
	candidateDec := sdk.NewDecWithPrec(int64(totalValidatorNum), 0)
	params := k.GetParams(ctx)
	candidateNumDec := candidateDec.Mul(params.CandidateRatio).MulTruncate(sdk.MustNewDecFromStr("0.6667"))
	candidateNum := int(candidateNumDec.TruncateInt64())

	proposal := info.Items[outboundTx]
	if len(proposal.Entry) < candidateNum {
		return
	}
	feeCoinMap := make(map[string]int)
	for _, el := range proposal.Entry {
		feeCoinMap[el.Feecoin.String()]++

		if feeCoinMap[el.Feecoin.String()] >= candidateNum {
			// transfer
			req := types.QueryLatestPoolRequest{}

			lastPoolsInfoResp, err := k.GetLastPool(sdk.WrapSDKContext(ctx), &req)
			if err != nil {
				ctx.Logger().Error("vault", "error", "fail to get the last pool")
				return
			}
			if len(lastPoolsInfoResp.Pools) < 2 {
				ctx.Logger().Error("vault", "error", "less than two pool we skip fee distribution")
				return
			}
			previousFee := k.GetAllFeeAmount(ctx)
			previousFee.Sort()
			el.Feecoin.Sort()
			newFee := previousFee.Add(el.Feecoin...)
			k.SetStoreFeeAmount(ctx, newFee)
			info.Processed = true
			ctx.Logger().Info("vault", "fee to be distributed", el.Feecoin.String())
			break
		}
	}
}
