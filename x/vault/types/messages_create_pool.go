package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/bech32/legacybech32" //nolint
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgCreateCreatePool{}

func NewMsgCreateCreatePool(creator sdk.AccAddress, poolPubKey string, blockHeight string) *MsgCreateCreatePool {
	return &MsgCreateCreatePool{
		Creator:     creator,
		PoolPubKey:  poolPubKey,
		BlockHeight: blockHeight,
	}
}

func (msg *MsgCreateCreatePool) Route() string {
	return RouterKey
}

func (msg *MsgCreateCreatePool) Type() string {
	return "CreateCreatePool"
}

func (msg *MsgCreateCreatePool) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{msg.Creator}
}

func (msg *MsgCreateCreatePool) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgCreateCreatePool) ValidateBasic() error {
	_, err := legacybech32.UnmarshalPubKey(legacybech32.AccPK, msg.PoolPubKey) //nolint
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidPubKey, "invalid pubkey (%s)", err)
	}
	return nil
}
