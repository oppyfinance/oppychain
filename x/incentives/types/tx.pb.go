// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: incentives/tx.proto

package types

import (
	context "context"
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	types1 "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/gogo/protobuf/gogoproto"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	github_com_gogo_protobuf_types "github.com/gogo/protobuf/types"
	types "gitlab.com/oppy-finance/oppychain/x/lockup/types"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	_ "google.golang.org/protobuf/types/known/timestamppb"
	io "io"
	math "math"
	math_bits "math/bits"
	time "time"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf
var _ = time.Kitchen

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type MsgCreateGauge struct {
	// flag to show if it's perpetual or multi-epoch
	// distribution incentives by third party
	IsPerpetual bool   `protobuf:"varint,1,opt,name=is_perpetual,json=isPerpetual,proto3" json:"is_perpetual,omitempty"`
	Owner       string `protobuf:"bytes,2,opt,name=owner,proto3" json:"owner,omitempty" yaml:"owner"`
	// distribute condition of a lock which meet one of these conditions
	DistributeTo types.QueryCondition `protobuf:"bytes,3,opt,name=distribute_to,json=distributeTo,proto3" json:"distribute_to"`
	// can distribute multiple coins
	Coins github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,4,rep,name=coins,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"coins"`
	// distribution start time
	StartTime time.Time `protobuf:"bytes,5,opt,name=start_time,json=startTime,proto3,stdtime" json:"start_time" yaml:"timestamp"`
	// number of epochs distribution will be done
	NumEpochsPaidOver uint64 `protobuf:"varint,6,opt,name=num_epochs_paid_over,json=numEpochsPaidOver,proto3" json:"num_epochs_paid_over,omitempty"`
}

func (m *MsgCreateGauge) Reset()         { *m = MsgCreateGauge{} }
func (m *MsgCreateGauge) String() string { return proto.CompactTextString(m) }
func (*MsgCreateGauge) ProtoMessage()    {}
func (*MsgCreateGauge) Descriptor() ([]byte, []int) {
	return fileDescriptor_805659ab13f8660e, []int{0}
}
func (m *MsgCreateGauge) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgCreateGauge) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgCreateGauge.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgCreateGauge) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgCreateGauge.Merge(m, src)
}
func (m *MsgCreateGauge) XXX_Size() int {
	return m.Size()
}
func (m *MsgCreateGauge) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgCreateGauge.DiscardUnknown(m)
}

var xxx_messageInfo_MsgCreateGauge proto.InternalMessageInfo

func (m *MsgCreateGauge) GetIsPerpetual() bool {
	if m != nil {
		return m.IsPerpetual
	}
	return false
}

func (m *MsgCreateGauge) GetOwner() string {
	if m != nil {
		return m.Owner
	}
	return ""
}

func (m *MsgCreateGauge) GetDistributeTo() types.QueryCondition {
	if m != nil {
		return m.DistributeTo
	}
	return types.QueryCondition{}
}

func (m *MsgCreateGauge) GetCoins() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.Coins
	}
	return nil
}

func (m *MsgCreateGauge) GetStartTime() time.Time {
	if m != nil {
		return m.StartTime
	}
	return time.Time{}
}

func (m *MsgCreateGauge) GetNumEpochsPaidOver() uint64 {
	if m != nil {
		return m.NumEpochsPaidOver
	}
	return 0
}

type MsgCreateGaugeResponse struct {
}

func (m *MsgCreateGaugeResponse) Reset()         { *m = MsgCreateGaugeResponse{} }
func (m *MsgCreateGaugeResponse) String() string { return proto.CompactTextString(m) }
func (*MsgCreateGaugeResponse) ProtoMessage()    {}
func (*MsgCreateGaugeResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_805659ab13f8660e, []int{1}
}
func (m *MsgCreateGaugeResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgCreateGaugeResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgCreateGaugeResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgCreateGaugeResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgCreateGaugeResponse.Merge(m, src)
}
func (m *MsgCreateGaugeResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgCreateGaugeResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgCreateGaugeResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgCreateGaugeResponse proto.InternalMessageInfo

type MsgAddToGauge struct {
	Owner   string                                   `protobuf:"bytes,1,opt,name=owner,proto3" json:"owner,omitempty" yaml:"owner"`
	GaugeId uint64                                   `protobuf:"varint,2,opt,name=gauge_id,json=gaugeId,proto3" json:"gauge_id,omitempty"`
	Rewards github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,3,rep,name=rewards,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"rewards"`
}

func (m *MsgAddToGauge) Reset()         { *m = MsgAddToGauge{} }
func (m *MsgAddToGauge) String() string { return proto.CompactTextString(m) }
func (*MsgAddToGauge) ProtoMessage()    {}
func (*MsgAddToGauge) Descriptor() ([]byte, []int) {
	return fileDescriptor_805659ab13f8660e, []int{2}
}
func (m *MsgAddToGauge) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgAddToGauge) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgAddToGauge.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgAddToGauge) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgAddToGauge.Merge(m, src)
}
func (m *MsgAddToGauge) XXX_Size() int {
	return m.Size()
}
func (m *MsgAddToGauge) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgAddToGauge.DiscardUnknown(m)
}

var xxx_messageInfo_MsgAddToGauge proto.InternalMessageInfo

func (m *MsgAddToGauge) GetOwner() string {
	if m != nil {
		return m.Owner
	}
	return ""
}

func (m *MsgAddToGauge) GetGaugeId() uint64 {
	if m != nil {
		return m.GaugeId
	}
	return 0
}

func (m *MsgAddToGauge) GetRewards() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.Rewards
	}
	return nil
}

type MsgAddToGaugeResponse struct {
}

func (m *MsgAddToGaugeResponse) Reset()         { *m = MsgAddToGaugeResponse{} }
func (m *MsgAddToGaugeResponse) String() string { return proto.CompactTextString(m) }
func (*MsgAddToGaugeResponse) ProtoMessage()    {}
func (*MsgAddToGaugeResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_805659ab13f8660e, []int{3}
}
func (m *MsgAddToGaugeResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgAddToGaugeResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgAddToGaugeResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgAddToGaugeResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgAddToGaugeResponse.Merge(m, src)
}
func (m *MsgAddToGaugeResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgAddToGaugeResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgAddToGaugeResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgAddToGaugeResponse proto.InternalMessageInfo

func init() {
	proto.RegisterType((*MsgCreateGauge)(nil), "oppyfinance.oppychain.incentives.MsgCreateGauge")
	proto.RegisterType((*MsgCreateGaugeResponse)(nil), "oppyfinance.oppychain.incentives.MsgCreateGaugeResponse")
	proto.RegisterType((*MsgAddToGauge)(nil), "oppyfinance.oppychain.incentives.MsgAddToGauge")
	proto.RegisterType((*MsgAddToGaugeResponse)(nil), "oppyfinance.oppychain.incentives.MsgAddToGaugeResponse")
}

func init() { proto.RegisterFile("incentives/tx.proto", fileDescriptor_805659ab13f8660e) }

var fileDescriptor_805659ab13f8660e = []byte{
	// 606 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xac, 0x94, 0x4d, 0x4f, 0xd4, 0x40,
	0x18, 0xc7, 0x77, 0xdc, 0xe5, 0x6d, 0x16, 0x0c, 0x54, 0xc4, 0xb2, 0x31, 0x6d, 0xed, 0xc1, 0xf4,
	0x20, 0x33, 0x80, 0x26, 0x1a, 0x6f, 0x2e, 0x31, 0xc6, 0x03, 0x8a, 0x0d, 0x09, 0x89, 0x97, 0x66,
	0xda, 0x0e, 0x65, 0xc2, 0x76, 0xa6, 0xe9, 0x4c, 0x17, 0xf6, 0x5b, 0xf0, 0x15, 0xbc, 0xfa, 0x0d,
	0xfc, 0x06, 0x1c, 0x39, 0x7a, 0x02, 0x03, 0xdf, 0x80, 0x93, 0x47, 0x33, 0x7d, 0x81, 0xdd, 0xc4,
	0xa8, 0x24, 0x9e, 0x66, 0xe6, 0x99, 0xe7, 0xf9, 0xcf, 0x33, 0xbf, 0xff, 0xb4, 0xf0, 0x01, 0xe3,
	0x11, 0xe5, 0x8a, 0x0d, 0xa9, 0xc4, 0xea, 0x18, 0x65, 0xb9, 0x50, 0xc2, 0x70, 0x44, 0x96, 0x8d,
	0xf6, 0x19, 0x27, 0x3c, 0xa2, 0x48, 0xcf, 0xa3, 0x03, 0xc2, 0x38, 0xba, 0x4d, 0xed, 0x2d, 0x27,
	0x22, 0x11, 0x65, 0x32, 0xd6, 0xb3, 0xaa, 0xae, 0x67, 0x27, 0x42, 0x24, 0x03, 0x8a, 0xcb, 0x55,
	0x58, 0xec, 0x63, 0xc5, 0x52, 0x2a, 0x15, 0x49, 0xb3, 0x3a, 0xc1, 0x8a, 0x84, 0x4c, 0x85, 0xc4,
	0x21, 0x91, 0x14, 0x0f, 0x37, 0x42, 0xaa, 0xc8, 0x06, 0x8e, 0x04, 0xe3, 0xf5, 0xfe, 0xca, 0x58,
	0x37, 0x09, 0x29, 0x12, 0x5a, 0xc7, 0x97, 0x06, 0x22, 0x3a, 0x2c, 0x32, 0xac, 0x87, 0x2a, 0xe4,
	0x7e, 0x69, 0xc3, 0xfb, 0xdb, 0x32, 0xd9, 0xca, 0x29, 0x51, 0xf4, 0x9d, 0xce, 0x35, 0x9e, 0xc0,
	0x79, 0x26, 0x83, 0x8c, 0xe6, 0x19, 0x55, 0x05, 0x19, 0x98, 0xc0, 0x01, 0xde, 0xac, 0xdf, 0x65,
	0x72, 0xa7, 0x09, 0x19, 0x4f, 0xe1, 0x94, 0x38, 0xe2, 0x34, 0x37, 0xef, 0x39, 0xc0, 0x9b, 0xeb,
	0x2f, 0x5e, 0x9f, 0xdb, 0xf3, 0x23, 0x92, 0x0e, 0x5e, 0xbb, 0x65, 0xd8, 0xf5, 0xab, 0x6d, 0x63,
	0x0f, 0x2e, 0xc4, 0x4c, 0xaa, 0x9c, 0x85, 0x85, 0xa2, 0x81, 0x12, 0x66, 0xdb, 0x01, 0x5e, 0x77,
	0xf3, 0x19, 0xfa, 0x3d, 0x99, 0xaa, 0x3d, 0xf4, 0xa9, 0xa0, 0xf9, 0x68, 0x4b, 0xf0, 0x98, 0x29,
	0x26, 0x78, 0xbf, 0x73, 0x7a, 0x6e, 0xb7, 0xfc, 0xf9, 0x5b, 0xa1, 0x5d, 0x61, 0x10, 0x38, 0xa5,
	0xef, 0x2b, 0xcd, 0x8e, 0xd3, 0xf6, 0xba, 0x9b, 0xab, 0xa8, 0x22, 0x82, 0x34, 0x11, 0x54, 0x13,
	0x41, 0x5b, 0x82, 0xf1, 0xfe, 0xba, 0xae, 0xfe, 0x7a, 0x61, 0x7b, 0x09, 0x53, 0x07, 0x45, 0x88,
	0x22, 0x91, 0xe2, 0x1a, 0x5f, 0x35, 0xac, 0xc9, 0xf8, 0x10, 0xab, 0x51, 0x46, 0x65, 0x59, 0x20,
	0xfd, 0x4a, 0xd9, 0xd8, 0x83, 0x50, 0x2a, 0x92, 0xab, 0x40, 0xd3, 0x37, 0xa7, 0xca, 0xc6, 0x7b,
	0xa8, 0xb2, 0x06, 0x35, 0xd6, 0xa0, 0xdd, 0xc6, 0x9a, 0xfe, 0x63, 0x7d, 0xd0, 0xf5, 0xb9, 0xbd,
	0x58, 0x81, 0xb8, 0xf1, 0xcc, 0x3d, 0xb9, 0xb0, 0x81, 0x3f, 0x57, 0x6a, 0xe9, 0x6c, 0x03, 0xc3,
	0x65, 0x5e, 0xa4, 0x01, 0xcd, 0x44, 0x74, 0x20, 0x83, 0x8c, 0xb0, 0x38, 0x10, 0x43, 0x9a, 0x9b,
	0xd3, 0x0e, 0xf0, 0x3a, 0xfe, 0x12, 0x2f, 0xd2, 0xb7, 0xe5, 0xd6, 0x0e, 0x61, 0xf1, 0xc7, 0x21,
	0xcd, 0x5d, 0x13, 0xae, 0x4c, 0x5a, 0xe4, 0x53, 0x99, 0x09, 0x2e, 0xa9, 0xfb, 0x0d, 0xc0, 0x85,
	0x6d, 0x99, 0xbc, 0x89, 0xe3, 0x5d, 0x51, 0x99, 0x77, 0xe3, 0x0c, 0xf8, 0xb3, 0x33, 0xab, 0x70,
	0xb6, 0x7c, 0x19, 0x01, 0x8b, 0x4b, 0x13, 0x3b, 0xfe, 0x4c, 0xb9, 0x7e, 0x1f, 0x1b, 0x14, 0xce,
	0xe4, 0xf4, 0x88, 0xe4, 0xb1, 0x34, 0xdb, 0xff, 0x9f, 0x6e, 0xa3, 0xed, 0x3e, 0x82, 0x0f, 0x27,
	0x5a, 0x6f, 0x2e, 0xb5, 0xf9, 0x13, 0xc0, 0xf6, 0xb6, 0x4c, 0x8c, 0x11, 0xec, 0x8e, 0x3f, 0xcb,
	0x75, 0xf4, 0xb7, 0xcf, 0x09, 0x4d, 0x52, 0xea, 0xbd, 0xba, 0x6b, 0x45, 0xd3, 0x82, 0x31, 0x84,
	0x70, 0x8c, 0x29, 0xfe, 0x27, 0x9d, 0xdb, 0x82, 0xde, 0xcb, 0x3b, 0x16, 0x34, 0xe7, 0xf6, 0x3f,
	0x9c, 0x5e, 0x5a, 0xe0, 0xec, 0xd2, 0x02, 0x3f, 0x2e, 0x2d, 0x70, 0x72, 0x65, 0xb5, 0xce, 0xae,
	0xac, 0xd6, 0xf7, 0x2b, 0xab, 0xf5, 0xf9, 0x45, 0xc2, 0xd4, 0x80, 0x54, 0x80, 0xb5, 0xe0, 0x5a,
	0xad, 0x8e, 0x6f, 0xd4, 0xf1, 0x31, 0x1e, 0xff, 0x09, 0x69, 0xe4, 0xe1, 0x74, 0xf9, 0x4e, 0x9f,
	0xff, 0x0a, 0x00, 0x00, 0xff, 0xff, 0xe0, 0x47, 0x3c, 0xcb, 0x9f, 0x04, 0x00, 0x00,
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
	CreateGauge(ctx context.Context, in *MsgCreateGauge, opts ...grpc.CallOption) (*MsgCreateGaugeResponse, error)
	AddToGauge(ctx context.Context, in *MsgAddToGauge, opts ...grpc.CallOption) (*MsgAddToGaugeResponse, error)
}

type msgClient struct {
	cc grpc1.ClientConn
}

func NewMsgClient(cc grpc1.ClientConn) MsgClient {
	return &msgClient{cc}
}

func (c *msgClient) CreateGauge(ctx context.Context, in *MsgCreateGauge, opts ...grpc.CallOption) (*MsgCreateGaugeResponse, error) {
	out := new(MsgCreateGaugeResponse)
	err := c.cc.Invoke(ctx, "/oppyfinance.oppychain.incentives.Msg/CreateGauge", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) AddToGauge(ctx context.Context, in *MsgAddToGauge, opts ...grpc.CallOption) (*MsgAddToGaugeResponse, error) {
	out := new(MsgAddToGaugeResponse)
	err := c.cc.Invoke(ctx, "/oppyfinance.oppychain.incentives.Msg/AddToGauge", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MsgServer is the server API for Msg service.
type MsgServer interface {
	CreateGauge(context.Context, *MsgCreateGauge) (*MsgCreateGaugeResponse, error)
	AddToGauge(context.Context, *MsgAddToGauge) (*MsgAddToGaugeResponse, error)
}

// UnimplementedMsgServer can be embedded to have forward compatible implementations.
type UnimplementedMsgServer struct {
}

func (*UnimplementedMsgServer) CreateGauge(ctx context.Context, req *MsgCreateGauge) (*MsgCreateGaugeResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateGauge not implemented")
}
func (*UnimplementedMsgServer) AddToGauge(ctx context.Context, req *MsgAddToGauge) (*MsgAddToGaugeResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddToGauge not implemented")
}

func RegisterMsgServer(s grpc1.Server, srv MsgServer) {
	s.RegisterService(&_Msg_serviceDesc, srv)
}

func _Msg_CreateGauge_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgCreateGauge)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).CreateGauge(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/oppyfinance.oppychain.incentives.Msg/CreateGauge",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).CreateGauge(ctx, req.(*MsgCreateGauge))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_AddToGauge_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgAddToGauge)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).AddToGauge(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/oppyfinance.oppychain.incentives.Msg/AddToGauge",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).AddToGauge(ctx, req.(*MsgAddToGauge))
	}
	return interceptor(ctx, in, info, handler)
}

var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "oppyfinance.oppychain.incentives.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "CreateGauge",
			Handler:    _Msg_CreateGauge_Handler,
		},
		{
			MethodName: "AddToGauge",
			Handler:    _Msg_AddToGauge_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "incentives/tx.proto",
}

func (m *MsgCreateGauge) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgCreateGauge) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgCreateGauge) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.NumEpochsPaidOver != 0 {
		i = encodeVarintTx(dAtA, i, uint64(m.NumEpochsPaidOver))
		i--
		dAtA[i] = 0x30
	}
	n1, err1 := github_com_gogo_protobuf_types.StdTimeMarshalTo(m.StartTime, dAtA[i-github_com_gogo_protobuf_types.SizeOfStdTime(m.StartTime):])
	if err1 != nil {
		return 0, err1
	}
	i -= n1
	i = encodeVarintTx(dAtA, i, uint64(n1))
	i--
	dAtA[i] = 0x2a
	if len(m.Coins) > 0 {
		for iNdEx := len(m.Coins) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Coins[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintTx(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x22
		}
	}
	{
		size, err := m.DistributeTo.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintTx(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x1a
	if len(m.Owner) > 0 {
		i -= len(m.Owner)
		copy(dAtA[i:], m.Owner)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Owner)))
		i--
		dAtA[i] = 0x12
	}
	if m.IsPerpetual {
		i--
		if m.IsPerpetual {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func (m *MsgCreateGaugeResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgCreateGaugeResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgCreateGaugeResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func (m *MsgAddToGauge) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgAddToGauge) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgAddToGauge) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Rewards) > 0 {
		for iNdEx := len(m.Rewards) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Rewards[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintTx(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x1a
		}
	}
	if m.GaugeId != 0 {
		i = encodeVarintTx(dAtA, i, uint64(m.GaugeId))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Owner) > 0 {
		i -= len(m.Owner)
		copy(dAtA[i:], m.Owner)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Owner)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgAddToGaugeResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgAddToGaugeResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgAddToGaugeResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
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
func (m *MsgCreateGauge) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.IsPerpetual {
		n += 2
	}
	l = len(m.Owner)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = m.DistributeTo.Size()
	n += 1 + l + sovTx(uint64(l))
	if len(m.Coins) > 0 {
		for _, e := range m.Coins {
			l = e.Size()
			n += 1 + l + sovTx(uint64(l))
		}
	}
	l = github_com_gogo_protobuf_types.SizeOfStdTime(m.StartTime)
	n += 1 + l + sovTx(uint64(l))
	if m.NumEpochsPaidOver != 0 {
		n += 1 + sovTx(uint64(m.NumEpochsPaidOver))
	}
	return n
}

func (m *MsgCreateGaugeResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func (m *MsgAddToGauge) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Owner)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	if m.GaugeId != 0 {
		n += 1 + sovTx(uint64(m.GaugeId))
	}
	if len(m.Rewards) > 0 {
		for _, e := range m.Rewards {
			l = e.Size()
			n += 1 + l + sovTx(uint64(l))
		}
	}
	return n
}

func (m *MsgAddToGaugeResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func sovTx(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozTx(x uint64) (n int) {
	return sovTx(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *MsgCreateGauge) Unmarshal(dAtA []byte) error {
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
			return fmt.Errorf("proto: MsgCreateGauge: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgCreateGauge: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field IsPerpetual", wireType)
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
			m.IsPerpetual = bool(v != 0)
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Owner", wireType)
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
			m.Owner = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field DistributeTo", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.DistributeTo.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Coins", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Coins = append(m.Coins, types1.Coin{})
			if err := m.Coins[len(m.Coins)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field StartTime", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_gogo_protobuf_types.StdTimeUnmarshal(&m.StartTime, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 6:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field NumEpochsPaidOver", wireType)
			}
			m.NumEpochsPaidOver = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.NumEpochsPaidOver |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
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
func (m *MsgCreateGaugeResponse) Unmarshal(dAtA []byte) error {
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
			return fmt.Errorf("proto: MsgCreateGaugeResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgCreateGaugeResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
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
func (m *MsgAddToGauge) Unmarshal(dAtA []byte) error {
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
			return fmt.Errorf("proto: MsgAddToGauge: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgAddToGauge: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Owner", wireType)
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
			m.Owner = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field GaugeId", wireType)
			}
			m.GaugeId = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.GaugeId |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Rewards", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Rewards = append(m.Rewards, types1.Coin{})
			if err := m.Rewards[len(m.Rewards)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
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
func (m *MsgAddToGaugeResponse) Unmarshal(dAtA []byte) error {
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
			return fmt.Errorf("proto: MsgAddToGaugeResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgAddToGaugeResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
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
