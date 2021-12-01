// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: vault/tx.proto

package types

import (
	context "context"
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/gogo/protobuf/gogoproto"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

// this line is used by starport scaffolding # proto/tx/message
type MsgCreateIssueToken struct {
	Creator  github_com_cosmos_cosmos_sdk_types.AccAddress `protobuf:"bytes,1,opt,name=creator,proto3,casttype=github.com/cosmos/cosmos-sdk/types.AccAddress" json:"creator,omitempty"`
	Index    string                                        `protobuf:"bytes,2,opt,name=index,proto3" json:"index,omitempty"`
	Coin     github_com_cosmos_cosmos_sdk_types.Coin       `protobuf:"bytes,3,opt,name=coin,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Coin" json:"coin"`
	Receiver github_com_cosmos_cosmos_sdk_types.AccAddress `protobuf:"bytes,4,opt,name=receiver,proto3,casttype=github.com/cosmos/cosmos-sdk/types.AccAddress" json:"receiver,omitempty"`
}

func (m *MsgCreateIssueToken) Reset()         { *m = MsgCreateIssueToken{} }
func (m *MsgCreateIssueToken) String() string { return proto.CompactTextString(m) }
func (*MsgCreateIssueToken) ProtoMessage()    {}
func (*MsgCreateIssueToken) Descriptor() ([]byte, []int) {
	return fileDescriptor_3c640aec03520319, []int{0}
}
func (m *MsgCreateIssueToken) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgCreateIssueToken) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgCreateIssueToken.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgCreateIssueToken) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgCreateIssueToken.Merge(m, src)
}
func (m *MsgCreateIssueToken) XXX_Size() int {
	return m.Size()
}
func (m *MsgCreateIssueToken) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgCreateIssueToken.DiscardUnknown(m)
}

var xxx_messageInfo_MsgCreateIssueToken proto.InternalMessageInfo

func (m *MsgCreateIssueToken) GetCreator() github_com_cosmos_cosmos_sdk_types.AccAddress {
	if m != nil {
		return m.Creator
	}
	return nil
}

func (m *MsgCreateIssueToken) GetIndex() string {
	if m != nil {
		return m.Index
	}
	return ""
}

func (m *MsgCreateIssueToken) GetReceiver() github_com_cosmos_cosmos_sdk_types.AccAddress {
	if m != nil {
		return m.Receiver
	}
	return nil
}

type MsgCreateIssueTokenResponse struct {
	Successful bool `protobuf:"varint,1,opt,name=successful,proto3" json:"successful,omitempty"`
}

func (m *MsgCreateIssueTokenResponse) Reset()         { *m = MsgCreateIssueTokenResponse{} }
func (m *MsgCreateIssueTokenResponse) String() string { return proto.CompactTextString(m) }
func (*MsgCreateIssueTokenResponse) ProtoMessage()    {}
func (*MsgCreateIssueTokenResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_3c640aec03520319, []int{1}
}
func (m *MsgCreateIssueTokenResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgCreateIssueTokenResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgCreateIssueTokenResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgCreateIssueTokenResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgCreateIssueTokenResponse.Merge(m, src)
}
func (m *MsgCreateIssueTokenResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgCreateIssueTokenResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgCreateIssueTokenResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgCreateIssueTokenResponse proto.InternalMessageInfo

func (m *MsgCreateIssueTokenResponse) GetSuccessful() bool {
	if m != nil {
		return m.Successful
	}
	return false
}

type MsgCreateCreatePool struct {
	Creator     github_com_cosmos_cosmos_sdk_types.AccAddress `protobuf:"bytes,1,opt,name=creator,proto3,casttype=github.com/cosmos/cosmos-sdk/types.AccAddress" json:"creator,omitempty"`
	PoolPubKey  string                                        `protobuf:"bytes,2,opt,name=poolPubKey,proto3" json:"poolPubKey,omitempty"`
	BlockHeight string                                        `protobuf:"bytes,3,opt,name=blockHeight,proto3" json:"blockHeight,omitempty"`
}

func (m *MsgCreateCreatePool) Reset()         { *m = MsgCreateCreatePool{} }
func (m *MsgCreateCreatePool) String() string { return proto.CompactTextString(m) }
func (*MsgCreateCreatePool) ProtoMessage()    {}
func (*MsgCreateCreatePool) Descriptor() ([]byte, []int) {
	return fileDescriptor_3c640aec03520319, []int{2}
}
func (m *MsgCreateCreatePool) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgCreateCreatePool) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgCreateCreatePool.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgCreateCreatePool) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgCreateCreatePool.Merge(m, src)
}
func (m *MsgCreateCreatePool) XXX_Size() int {
	return m.Size()
}
func (m *MsgCreateCreatePool) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgCreateCreatePool.DiscardUnknown(m)
}

var xxx_messageInfo_MsgCreateCreatePool proto.InternalMessageInfo

func (m *MsgCreateCreatePool) GetCreator() github_com_cosmos_cosmos_sdk_types.AccAddress {
	if m != nil {
		return m.Creator
	}
	return nil
}

func (m *MsgCreateCreatePool) GetPoolPubKey() string {
	if m != nil {
		return m.PoolPubKey
	}
	return ""
}

func (m *MsgCreateCreatePool) GetBlockHeight() string {
	if m != nil {
		return m.BlockHeight
	}
	return ""
}

type MsgCreateCreatePoolResponse struct {
	Successful bool `protobuf:"varint,1,opt,name=successful,proto3" json:"successful,omitempty"`
}

func (m *MsgCreateCreatePoolResponse) Reset()         { *m = MsgCreateCreatePoolResponse{} }
func (m *MsgCreateCreatePoolResponse) String() string { return proto.CompactTextString(m) }
func (*MsgCreateCreatePoolResponse) ProtoMessage()    {}
func (*MsgCreateCreatePoolResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_3c640aec03520319, []int{3}
}
func (m *MsgCreateCreatePoolResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgCreateCreatePoolResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgCreateCreatePoolResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgCreateCreatePoolResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgCreateCreatePoolResponse.Merge(m, src)
}
func (m *MsgCreateCreatePoolResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgCreateCreatePoolResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgCreateCreatePoolResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgCreateCreatePoolResponse proto.InternalMessageInfo

func (m *MsgCreateCreatePoolResponse) GetSuccessful() bool {
	if m != nil {
		return m.Successful
	}
	return false
}

func init() {
	proto.RegisterType((*MsgCreateIssueToken)(nil), "joltify.joltifychain.vault.MsgCreateIssueToken")
	proto.RegisterType((*MsgCreateIssueTokenResponse)(nil), "joltify.joltifychain.vault.MsgCreateIssueTokenResponse")
	proto.RegisterType((*MsgCreateCreatePool)(nil), "joltify.joltifychain.vault.MsgCreateCreatePool")
	proto.RegisterType((*MsgCreateCreatePoolResponse)(nil), "joltify.joltifychain.vault.MsgCreateCreatePoolResponse")
}

func init() { proto.RegisterFile("vault/tx.proto", fileDescriptor_3c640aec03520319) }

var fileDescriptor_3c640aec03520319 = []byte{
	// 417 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xac, 0x93, 0x3f, 0xef, 0xd2, 0x40,
	0x18, 0xc7, 0x5b, 0x40, 0x85, 0xd3, 0x18, 0x73, 0x32, 0x34, 0x98, 0x1c, 0x84, 0x45, 0x16, 0x7a,
	0x51, 0x07, 0x27, 0x07, 0x60, 0x50, 0x43, 0x48, 0x48, 0xe3, 0xe4, 0xd6, 0x5e, 0x8f, 0x72, 0x52,
	0xfa, 0x34, 0xbd, 0x2b, 0x81, 0xc4, 0xc5, 0xdd, 0xc1, 0x17, 0xe1, 0x8b, 0x61, 0x64, 0x34, 0x0e,
	0xc4, 0xc0, 0xbb, 0x70, 0x32, 0xfd, 0x23, 0xd4, 0x80, 0x49, 0x7f, 0xbf, 0xfc, 0x96, 0x5e, 0xef,
	0xc9, 0x3d, 0xdf, 0xef, 0x73, 0x9f, 0xe7, 0x1e, 0xf4, 0x78, 0x65, 0xc7, 0xbe, 0xa2, 0x6a, 0x6d,
	0x86, 0x11, 0x28, 0xc0, 0xad, 0x4f, 0xe0, 0x2b, 0x31, 0xdb, 0x98, 0xf9, 0xca, 0xe6, 0xb6, 0x08,
	0xcc, 0xf4, 0x50, 0xab, 0xe9, 0x81, 0x07, 0xe9, 0x31, 0x9a, 0xfc, 0x65, 0x19, 0xdd, 0xaf, 0x15,
	0xf4, 0x74, 0x22, 0xbd, 0x51, 0xc4, 0x6d, 0xc5, 0xdf, 0x4b, 0x19, 0xf3, 0x0f, 0xb0, 0xe0, 0x01,
	0x1e, 0xa3, 0x07, 0x2c, 0x89, 0x41, 0x64, 0xe8, 0x1d, 0xbd, 0xf7, 0x68, 0xf8, 0xe2, 0xf7, 0xbe,
	0xdd, 0xf7, 0x84, 0x9a, 0xc7, 0x8e, 0xc9, 0x60, 0x49, 0x19, 0xc8, 0x25, 0xc8, 0x7c, 0xe9, 0x4b,
	0x77, 0x41, 0xd5, 0x26, 0xe4, 0xd2, 0x1c, 0x30, 0x36, 0x70, 0xdd, 0x88, 0x4b, 0x69, 0xfd, 0x55,
	0xc0, 0x4d, 0x74, 0x4f, 0x04, 0x2e, 0x5f, 0x1b, 0x95, 0x8e, 0xde, 0x6b, 0x58, 0xd9, 0x06, 0x8f,
	0x50, 0x8d, 0x81, 0x08, 0x8c, 0x6a, 0xaa, 0x4f, 0xb7, 0xfb, 0xb6, 0xf6, 0x73, 0xdf, 0x7e, 0x5e,
	0xc2, 0x63, 0x04, 0x22, 0xb0, 0xd2, 0x64, 0x3c, 0x41, 0xf5, 0x88, 0x33, 0x2e, 0x56, 0x3c, 0x32,
	0x6a, 0xb7, 0x2d, 0xf4, 0x24, 0xd1, 0x7d, 0x83, 0x9e, 0x5d, 0xa1, 0x61, 0x71, 0x19, 0x42, 0x20,
	0x39, 0x26, 0x08, 0xc9, 0x98, 0x31, 0x2e, 0xe5, 0x2c, 0xf6, 0x53, 0x30, 0x75, 0xab, 0x10, 0xe9,
	0x7e, 0xd7, 0x0b, 0x34, 0xb3, 0xef, 0x14, 0xc0, 0xbf, 0x5b, 0x9a, 0x04, 0xa1, 0x10, 0xc0, 0x9f,
	0xc6, 0xce, 0x98, 0x6f, 0x72, 0xa4, 0x85, 0x08, 0xee, 0xa0, 0x87, 0x8e, 0x0f, 0x6c, 0xf1, 0x8e,
	0x0b, 0x6f, 0xae, 0x52, 0xbc, 0x0d, 0xab, 0x18, 0xfa, 0xe7, 0x96, 0xe7, 0x2a, 0xcb, 0xde, 0xf2,
	0xe5, 0x97, 0x0a, 0xaa, 0x4e, 0xa4, 0x87, 0x3f, 0xa3, 0x27, 0x17, 0xef, 0x86, 0x9a, 0xff, 0x7f,
	0x82, 0xe6, 0x15, 0xb4, 0xad, 0xd7, 0x37, 0x4c, 0x38, 0x55, 0x79, 0x72, 0x2f, 0x70, 0x2e, 0xe7,
	0x7e, 0x4e, 0x28, 0xe9, 0x7e, 0xc9, 0x68, 0xf8, 0x76, 0x7b, 0x20, 0xfa, 0xee, 0x40, 0xf4, 0x5f,
	0x07, 0xa2, 0x7f, 0x3b, 0x12, 0x6d, 0x77, 0x24, 0xda, 0x8f, 0x23, 0xd1, 0x3e, 0x26, 0x6d, 0xf5,
	0xed, 0xac, 0xad, 0xb9, 0x28, 0x2d, 0x8a, 0xd3, 0x35, 0xcd, 0xa7, 0x36, 0xe9, 0xb0, 0x73, 0x3f,
	0x9d, 0xc3, 0x57, 0x7f, 0x02, 0x00, 0x00, 0xff, 0xff, 0x22, 0x6d, 0x21, 0xb1, 0xcb, 0x03, 0x00,
	0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// MsgClient is the client API for Msg service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type MsgClient interface {
	// this line is used by starport scaffolding # proto/tx/rpc
	CreateIssueToken(ctx context.Context, in *MsgCreateIssueToken, opts ...grpc.CallOption) (*MsgCreateIssueTokenResponse, error)
	CreateCreatePool(ctx context.Context, in *MsgCreateCreatePool, opts ...grpc.CallOption) (*MsgCreateCreatePoolResponse, error)
}

type msgClient struct {
	cc grpc1.ClientConn
}

func NewMsgClient(cc grpc1.ClientConn) MsgClient {
	return &msgClient{cc}
}

func (c *msgClient) CreateIssueToken(ctx context.Context, in *MsgCreateIssueToken, opts ...grpc.CallOption) (*MsgCreateIssueTokenResponse, error) {
	out := new(MsgCreateIssueTokenResponse)
	err := c.cc.Invoke(ctx, "/joltify.joltifychain.vault.Msg/CreateIssueToken", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) CreateCreatePool(ctx context.Context, in *MsgCreateCreatePool, opts ...grpc.CallOption) (*MsgCreateCreatePoolResponse, error) {
	out := new(MsgCreateCreatePoolResponse)
	err := c.cc.Invoke(ctx, "/joltify.joltifychain.vault.Msg/CreateCreatePool", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MsgServer is the server API for Msg service.
type MsgServer interface {
	// this line is used by starport scaffolding # proto/tx/rpc
	CreateIssueToken(context.Context, *MsgCreateIssueToken) (*MsgCreateIssueTokenResponse, error)
	CreateCreatePool(context.Context, *MsgCreateCreatePool) (*MsgCreateCreatePoolResponse, error)
}

// UnimplementedMsgServer can be embedded to have forward compatible implementations.
type UnimplementedMsgServer struct {
}

func (*UnimplementedMsgServer) CreateIssueToken(ctx context.Context, req *MsgCreateIssueToken) (*MsgCreateIssueTokenResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateIssueToken not implemented")
}
func (*UnimplementedMsgServer) CreateCreatePool(ctx context.Context, req *MsgCreateCreatePool) (*MsgCreateCreatePoolResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateCreatePool not implemented")
}

func RegisterMsgServer(s grpc1.Server, srv MsgServer) {
	s.RegisterService(&_Msg_serviceDesc, srv)
}

func _Msg_CreateIssueToken_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgCreateIssueToken)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).CreateIssueToken(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/joltify.joltifychain.vault.Msg/CreateIssueToken",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).CreateIssueToken(ctx, req.(*MsgCreateIssueToken))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_CreateCreatePool_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgCreateCreatePool)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).CreateCreatePool(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/joltify.joltifychain.vault.Msg/CreateCreatePool",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).CreateCreatePool(ctx, req.(*MsgCreateCreatePool))
	}
	return interceptor(ctx, in, info, handler)
}

var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "joltify.joltifychain.vault.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "CreateIssueToken",
			Handler:    _Msg_CreateIssueToken_Handler,
		},
		{
			MethodName: "CreateCreatePool",
			Handler:    _Msg_CreateCreatePool_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "vault/tx.proto",
}

func (m *MsgCreateIssueToken) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgCreateIssueToken) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgCreateIssueToken) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Receiver) > 0 {
		i -= len(m.Receiver)
		copy(dAtA[i:], m.Receiver)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Receiver)))
		i--
		dAtA[i] = 0x22
	}
	{
		size := m.Coin.Size()
		i -= size
		if _, err := m.Coin.MarshalTo(dAtA[i:]); err != nil {
			return 0, err
		}
		i = encodeVarintTx(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x1a
	if len(m.Index) > 0 {
		i -= len(m.Index)
		copy(dAtA[i:], m.Index)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Index)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgCreateIssueTokenResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgCreateIssueTokenResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgCreateIssueTokenResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Successful {
		i--
		if m.Successful {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func (m *MsgCreateCreatePool) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgCreateCreatePool) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgCreateCreatePool) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.BlockHeight) > 0 {
		i -= len(m.BlockHeight)
		copy(dAtA[i:], m.BlockHeight)
		i = encodeVarintTx(dAtA, i, uint64(len(m.BlockHeight)))
		i--
		dAtA[i] = 0x1a
	}
	if len(m.PoolPubKey) > 0 {
		i -= len(m.PoolPubKey)
		copy(dAtA[i:], m.PoolPubKey)
		i = encodeVarintTx(dAtA, i, uint64(len(m.PoolPubKey)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Creator) > 0 {
		i -= len(m.Creator)
		copy(dAtA[i:], m.Creator)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Creator)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgCreateCreatePoolResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgCreateCreatePoolResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgCreateCreatePoolResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.Successful {
		i--
		if m.Successful {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func encodeVarintTx(dAtA []byte, offset int, v uint64) int {
	offset -= sovTx(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *MsgCreateIssueToken) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.Index)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = m.Coin.Size()
	n += 1 + l + sovTx(uint64(l))
	l = len(m.Receiver)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	return n
}

func (m *MsgCreateIssueTokenResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Successful {
		n += 2
	}
	return n
}

func (m *MsgCreateCreatePool) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Creator)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.PoolPubKey)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.BlockHeight)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	return n
}

func (m *MsgCreateCreatePoolResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Successful {
		n += 2
	}
	return n
}

func sovTx(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozTx(x uint64) (n int) {
	return sovTx(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *MsgCreateIssueToken) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgCreateIssueToken: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgCreateIssueToken: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = append(m.Creator[:0], dAtA[iNdEx:postIndex]...)
			if m.Creator == nil {
				m.Creator = []byte{}
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Index", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Index = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Coin", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.Coin.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Receiver", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Receiver = append(m.Receiver[:0], dAtA[iNdEx:postIndex]...)
			if m.Receiver == nil {
				m.Receiver = []byte{}
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *MsgCreateIssueTokenResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgCreateIssueTokenResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgCreateIssueTokenResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Successful", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				v |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			m.Successful = bool(v != 0)
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *MsgCreateCreatePool) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgCreateCreatePool: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgCreateCreatePool: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Creator", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				byteLen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if byteLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Creator = append(m.Creator[:0], dAtA[iNdEx:postIndex]...)
			if m.Creator == nil {
				m.Creator = []byte{}
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PoolPubKey", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.PoolPubKey = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field BlockHeight", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.BlockHeight = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *MsgCreateCreatePoolResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgCreateCreatePoolResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgCreateCreatePoolResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Successful", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				v |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			m.Successful = bool(v != 0)
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipTx(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowTx
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowTx
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowTx
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthTx
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupTx
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthTx
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthTx        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowTx          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupTx = fmt.Errorf("proto: unexpected end of group")
)
