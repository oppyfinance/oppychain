package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgCreateOutboundTx{}, "vault/CreateOutboundTx", nil)
	// this line is used by starport scaffolding # 2
	cdc.RegisterConcrete(&MsgCreateIssueToken{}, "vault/CreateIssueToken", nil)
	cdc.RegisterConcrete(&MsgCreateCreatePool{}, "vault/CreateCreatePool", nil)
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateOutboundTx{},
	)
	// this line is used by starport scaffolding # 3
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateIssueToken{},
	)
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateCreatePool{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)
