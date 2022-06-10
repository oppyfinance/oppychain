// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: swap/pool_models/balancer/balancerPool.proto

// this is a temporary package setup, needs migration logic

package balancer

import (
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	types1 "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/cosmos/cosmos-sdk/x/auth/types"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	github_com_gogo_protobuf_types "github.com/gogo/protobuf/types"
	_ "github.com/regen-network/cosmos-proto"
	types "gitlab.com/oppy-finance/oppychain/x/swap/types"
	_ "google.golang.org/protobuf/types/known/durationpb"
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

// Parameters for changing the weights in a balancer pool smoothly from
// a start weight and end weight over a period of time.
// Currently, the only smooth change supported is linear changing between
// the two weights, but more types may be added in the future.
// When these parameters are set, the weight w(t) for pool time `t` is the
// following:
//   t <= start_time: w(t) = initial_pool_weights
//   start_time < t <= start_time + duration:
//     w(t) = initial_pool_weights + (t - start_time) *
//       (target_pool_weights - initial_pool_weights) / (duration)
//   t > start_time + duration: w(t) = target_pool_weights
type SmoothWeightChangeParams struct {
	// The start time for beginning the weight change.
	// If a parameter change / pool instantiation leaves this blank,
	// it should be generated by the state_machine as the current time.
	StartTime time.Time `protobuf:"bytes,1,opt,name=start_time,json=startTime,proto3,stdtime" json:"start_time" yaml:"start_time"`
	// Duration for the weights to change over
	Duration time.Duration `protobuf:"bytes,2,opt,name=duration,proto3,stdduration" json:"duration,omitempty" yaml:"duration"`
	// The initial pool weights. These are copied from the pool's settings
	// at the time of weight change instantiation.
	// The amount PoolAsset.token.amount field is ignored if present,
	// future type refactorings should just have a type with the denom & weight
	// here.
	InitialPoolWeights []types.PoolAsset `protobuf:"bytes,3,rep,name=initialPoolWeights,proto3" json:"initialPoolWeights" yaml:"initial_pool_weights"`
	// The target pool weights. The pool weights will change linearly with respect
	// to time between start_time, and start_time + duration. The amount
	// PoolAsset.token.amount field is ignored if present, future type
	// refactorings should just have a type with the denom & weight here.
	TargetPoolWeights []types.PoolAsset `protobuf:"bytes,4,rep,name=targetPoolWeights,proto3" json:"targetPoolWeights" yaml:"target_pool_weights"`
}

func (m *SmoothWeightChangeParams) Reset()         { *m = SmoothWeightChangeParams{} }
func (m *SmoothWeightChangeParams) String() string { return proto.CompactTextString(m) }
func (*SmoothWeightChangeParams) ProtoMessage()    {}
func (*SmoothWeightChangeParams) Descriptor() ([]byte, []int) {
	return fileDescriptor_228c189ac50954fe, []int{0}
}
func (m *SmoothWeightChangeParams) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *SmoothWeightChangeParams) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_SmoothWeightChangeParams.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *SmoothWeightChangeParams) XXX_Merge(src proto.Message) {
	xxx_messageInfo_SmoothWeightChangeParams.Merge(m, src)
}
func (m *SmoothWeightChangeParams) XXX_Size() int {
	return m.Size()
}
func (m *SmoothWeightChangeParams) XXX_DiscardUnknown() {
	xxx_messageInfo_SmoothWeightChangeParams.DiscardUnknown(m)
}

var xxx_messageInfo_SmoothWeightChangeParams proto.InternalMessageInfo

func (m *SmoothWeightChangeParams) GetStartTime() time.Time {
	if m != nil {
		return m.StartTime
	}
	return time.Time{}
}

func (m *SmoothWeightChangeParams) GetDuration() time.Duration {
	if m != nil {
		return m.Duration
	}
	return 0
}

func (m *SmoothWeightChangeParams) GetInitialPoolWeights() []types.PoolAsset {
	if m != nil {
		return m.InitialPoolWeights
	}
	return nil
}

func (m *SmoothWeightChangeParams) GetTargetPoolWeights() []types.PoolAsset {
	if m != nil {
		return m.TargetPoolWeights
	}
	return nil
}

// PoolParams defined the parameters that will be managed by the pool
// governance in the future. This params are not managed by the chain
// governance. Instead they will be managed by the token holders of the pool.
// The pool's token holders are specified in future_pool_governor.
type PoolParams struct {
	SwapFee                  github_com_cosmos_cosmos_sdk_types.Dec `protobuf:"bytes,1,opt,name=swapFee,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Dec" json:"swapFee" yaml:"swap_fee"`
	ExitFee                  github_com_cosmos_cosmos_sdk_types.Dec `protobuf:"bytes,2,opt,name=exitFee,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Dec" json:"exitFee" yaml:"exit_fee"`
	SmoothWeightChangeParams *SmoothWeightChangeParams              `protobuf:"bytes,3,opt,name=smoothWeightChangeParams,proto3" json:"smoothWeightChangeParams,omitempty" yaml:"smooth_weight_change_params"`
}

func (m *PoolParams) Reset()         { *m = PoolParams{} }
func (m *PoolParams) String() string { return proto.CompactTextString(m) }
func (*PoolParams) ProtoMessage()    {}
func (*PoolParams) Descriptor() ([]byte, []int) {
	return fileDescriptor_228c189ac50954fe, []int{1}
}
func (m *PoolParams) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *PoolParams) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_PoolParams.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *PoolParams) XXX_Merge(src proto.Message) {
	xxx_messageInfo_PoolParams.Merge(m, src)
}
func (m *PoolParams) XXX_Size() int {
	return m.Size()
}
func (m *PoolParams) XXX_DiscardUnknown() {
	xxx_messageInfo_PoolParams.DiscardUnknown(m)
}

var xxx_messageInfo_PoolParams proto.InternalMessageInfo

func (m *PoolParams) GetSmoothWeightChangeParams() *SmoothWeightChangeParams {
	if m != nil {
		return m.SmoothWeightChangeParams
	}
	return nil
}

type Pool struct {
	Address    string     `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty" yaml:"address"`
	Id         uint64     `protobuf:"varint,2,opt,name=id,proto3" json:"id,omitempty"`
	PoolParams PoolParams `protobuf:"bytes,3,opt,name=poolParams,proto3" json:"poolParams" yaml:"balancer_pool_params"`
	// This string specifies who will govern the pool in the future.
	// Valid forms of this are:
	// {token name},{duration}
	// {duration}
	// where {token name} if specified is the token which determines the
	// governor, and if not specified is the LP token for this pool.duration is
	// a time specified as 0w,1w,2w, etc. which specifies how long the token
	// would need to be locked up to count in governance. 0w means no lockup.
	// TODO: Further improve these docs
	FuturePoolGovernor string `protobuf:"bytes,4,opt,name=future_pool_governor,json=futurePoolGovernor,proto3" json:"future_pool_governor,omitempty" yaml:"future_pool_governor"`
	// sum of all LP tokens sent out
	TotalShares types1.Coin `protobuf:"bytes,5,opt,name=totalShares,proto3" json:"totalShares" yaml:"total_shares"`
	// These are assumed to be sorted by denomiation.
	// They contain the pool asset and the information about the weight
	PoolAssets []types.PoolAsset `protobuf:"bytes,6,rep,name=poolAssets,proto3" json:"poolAssets" yaml:"pool_assets"`
	// sum of all non-normalized pool weights
	TotalWeight github_com_cosmos_cosmos_sdk_types.Int `protobuf:"bytes,7,opt,name=totalWeight,proto3,customtype=github.com/cosmos/cosmos-sdk/types.Int" json:"totalWeight" yaml:"total_weight"`
}

func (m *Pool) Reset()      { *m = Pool{} }
func (*Pool) ProtoMessage() {}
func (*Pool) Descriptor() ([]byte, []int) {
	return fileDescriptor_228c189ac50954fe, []int{2}
}
func (m *Pool) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Pool) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Pool.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Pool) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Pool.Merge(m, src)
}
func (m *Pool) XXX_Size() int {
	return m.Size()
}
func (m *Pool) XXX_DiscardUnknown() {
	xxx_messageInfo_Pool.DiscardUnknown(m)
}

var xxx_messageInfo_Pool proto.InternalMessageInfo

func init() {
	proto.RegisterType((*SmoothWeightChangeParams)(nil), "oppyfinance.oppychain.swap.v1beta1.SmoothWeightChangeParams")
	proto.RegisterType((*PoolParams)(nil), "oppyfinance.oppychain.swap.v1beta1.PoolParams")
	proto.RegisterType((*Pool)(nil), "oppyfinance.oppychain.swap.v1beta1.Pool")
}

func init() {
	proto.RegisterFile("swap/pool_models/balancer/balancerPool.proto", fileDescriptor_228c189ac50954fe)
}

var fileDescriptor_228c189ac50954fe = []byte{
	// 788 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xa4, 0x55, 0x4f, 0x4f, 0xdb, 0x48,
	0x14, 0x8f, 0x93, 0x00, 0xcb, 0x20, 0xb1, 0x62, 0x16, 0x69, 0x4d, 0xd0, 0xc6, 0xc8, 0x2b, 0xad,
	0xd0, 0x8a, 0xd8, 0x82, 0xbd, 0xa1, 0xed, 0x81, 0x40, 0x5b, 0x71, 0xa3, 0xa6, 0x12, 0xa8, 0x3d,
	0x58, 0x93, 0x64, 0x62, 0x8f, 0x6a, 0x7b, 0x2c, 0xcf, 0x04, 0xc8, 0xa9, 0x52, 0x4f, 0x3d, 0x72,
	0xe4, 0xc8, 0xa1, 0x1f, 0xa1, 0x1f, 0x82, 0x4b, 0x25, 0xd4, 0x53, 0xd5, 0x83, 0x5b, 0x41, 0x4f,
	0x95, 0x7a, 0xc9, 0x27, 0xa8, 0xe6, 0x8f, 0x03, 0x0a, 0x44, 0xa5, 0xf4, 0x14, 0xcf, 0xfb, 0xf3,
	0x7b, 0xbf, 0xdf, 0x7b, 0x6f, 0x26, 0x60, 0x85, 0x1d, 0xa2, 0xd4, 0x4d, 0x29, 0x8d, 0xfc, 0x98,
	0x76, 0x70, 0xc4, 0xdc, 0x16, 0x8a, 0x50, 0xd2, 0xc6, 0xd9, 0xf0, 0x63, 0x87, 0xd2, 0xc8, 0x49,
	0x33, 0xca, 0x29, 0xb4, 0x69, 0x9a, 0xf6, 0xbb, 0x24, 0x11, 0x76, 0x47, 0x7c, 0xb7, 0x43, 0x44,
	0x12, 0x47, 0x60, 0x38, 0x07, 0xab, 0x2d, 0xcc, 0xd1, 0x6a, 0x6d, 0xa1, 0x4d, 0x59, 0x4c, 0x99,
	0x2f, 0x33, 0x5c, 0x75, 0x50, 0xe9, 0xb5, 0xf9, 0x80, 0x06, 0x54, 0xd9, 0xc5, 0x97, 0xb6, 0xd6,
	0x03, 0x4a, 0x83, 0x08, 0xbb, 0xf2, 0xd4, 0xea, 0x75, 0xdd, 0x4e, 0x2f, 0x43, 0x9c, 0xd0, 0x44,
	0xfb, 0xad, 0x51, 0x3f, 0x27, 0x31, 0x66, 0x1c, 0xc5, 0x69, 0x01, 0xa0, 0x8a, 0xb8, 0xa8, 0xc7,
	0x43, 0x57, 0xd3, 0x90, 0x87, 0x11, 0x7f, 0x0b, 0x31, 0x3c, 0xf4, 0xb7, 0x29, 0x29, 0x0a, 0xfc,
	0x29, 0x7b, 0x50, 0x38, 0xd2, 0xa1, 0x5c, 0xfb, 0x4b, 0x05, 0x98, 0xbb, 0x31, 0xa5, 0x3c, 0xdc,
	0xc3, 0x24, 0x08, 0xf9, 0x66, 0x88, 0x92, 0x00, 0xef, 0xa0, 0x0c, 0xc5, 0x0c, 0xee, 0x03, 0xc0,
	0x38, 0xca, 0xb8, 0x2f, 0xe8, 0x98, 0xc6, 0x92, 0xb1, 0x3c, 0xb3, 0x56, 0x73, 0x14, 0x57, 0xa7,
	0xe0, 0xea, 0x3c, 0x2d, 0xb8, 0x36, 0xff, 0x3a, 0xcb, 0xad, 0xd2, 0x20, 0xb7, 0xe6, 0xfa, 0x28,
	0x8e, 0xd6, 0xed, 0xab, 0x5c, 0xfb, 0xf8, 0x93, 0x65, 0x78, 0xd3, 0xd2, 0x20, 0xc2, 0x61, 0x08,
	0x7e, 0x2b, 0x5a, 0x60, 0x96, 0x25, 0xee, 0xc2, 0x0d, 0xdc, 0x2d, 0x1d, 0xd0, 0x5c, 0x15, 0xb0,
	0x5f, 0x73, 0x0b, 0x16, 0x29, 0x2b, 0x34, 0x26, 0x1c, 0xc7, 0x29, 0xef, 0x0f, 0x72, 0xeb, 0x77,
	0x55, 0xac, 0xf0, 0xd9, 0x27, 0xa2, 0xd4, 0x10, 0x1d, 0xbe, 0x32, 0x00, 0x24, 0x09, 0xe1, 0x04,
	0x45, 0x62, 0xca, 0x4a, 0x25, 0x33, 0x2b, 0x4b, 0x95, 0xe5, 0x99, 0xb5, 0x86, 0xf3, 0xe3, 0x69,
	0x3b, 0x22, 0x6d, 0x83, 0x31, 0xcc, 0x9b, 0x7f, 0x6b, 0x7d, 0x8b, 0xaa, 0xa4, 0x86, 0xf5, 0xe5,
	0x6a, 0x1d, 0x2a, 0x60, 0xdb, 0xbb, 0xa5, 0x1a, 0x7c, 0x09, 0xe6, 0x38, 0xca, 0x02, 0xcc, 0xaf,
	0x53, 0xa8, 0xde, 0x87, 0x82, 0xad, 0x29, 0xd4, 0x14, 0x05, 0x85, 0x3a, 0xc2, 0xe0, 0x66, 0x2d,
	0xfb, 0x5b, 0x19, 0x00, 0x71, 0xd6, 0x83, 0x7d, 0x0e, 0xa6, 0x04, 0xfe, 0x23, 0xac, 0xa6, 0x3a,
	0xdd, 0xdc, 0x10, 0xb0, 0x1f, 0x73, 0xeb, 0x9f, 0x80, 0xf0, 0xb0, 0xd7, 0x72, 0xda, 0x34, 0xd6,
	0x7b, 0xad, 0x7f, 0x1a, 0xac, 0xf3, 0xc2, 0xe5, 0xfd, 0x14, 0x33, 0x67, 0x0b, 0xb7, 0xaf, 0xda,
	0x2e, 0x60, 0xfc, 0x2e, 0xc6, 0xb6, 0x57, 0x20, 0x0a, 0x70, 0x7c, 0x44, 0xb8, 0x00, 0x2f, 0xff,
	0x1a, 0xb8, 0x80, 0xd1, 0xe0, 0x1a, 0x11, 0xbe, 0x31, 0x80, 0xc9, 0xc6, 0xec, 0xab, 0x59, 0x91,
	0x9b, 0xf4, 0xff, 0x5d, 0x3a, 0x3a, 0x6e, 0xe7, 0x9b, 0xff, 0x9e, 0xe5, 0x96, 0x31, 0xc8, 0x2d,
	0x5b, 0xeb, 0x93, 0x71, 0xba, 0xb7, 0x7e, 0x5b, 0x46, 0xfa, 0xa9, 0x0c, 0xb5, 0xbd, 0xb1, 0x4c,
	0xec, 0x77, 0x55, 0x50, 0x15, 0xfd, 0x86, 0x2b, 0x60, 0x0a, 0x75, 0x3a, 0x19, 0x66, 0x4c, 0x77,
	0x1a, 0x0e, 0x72, 0x6b, 0x56, 0x61, 0x6b, 0x87, 0xed, 0x15, 0x21, 0x70, 0x16, 0x94, 0x49, 0x47,
	0x76, 0xad, 0xea, 0x95, 0x49, 0x07, 0x32, 0x00, 0xd2, 0xe1, 0xd4, 0xb4, 0x3c, 0xe7, 0xae, 0x0b,
	0xa3, 0x05, 0x8d, 0x2c, 0x6d, 0xf1, 0xe4, 0xa9, 0x9d, 0x29, 0x94, 0x5c, 0x2b, 0x03, 0x9f, 0x80,
	0xf9, 0x6e, 0x8f, 0xf7, 0x32, 0xac, 0x42, 0x02, 0x7a, 0x80, 0xb3, 0x84, 0x66, 0x66, 0x55, 0xf2,
	0xb7, 0xae, 0xa0, 0x6e, 0x8b, 0xb2, 0x3d, 0xa8, 0xcc, 0x82, 0xc1, 0x63, 0x6d, 0x84, 0xfb, 0x60,
	0x86, 0x53, 0x8e, 0xa2, 0xdd, 0x10, 0x65, 0x98, 0x99, 0x13, 0xfa, 0xc6, 0xeb, 0x97, 0x53, 0x3c,
	0x5a, 0x43, 0xe6, 0x9b, 0x94, 0x24, 0xcd, 0x45, 0xcd, 0xf9, 0x0f, 0xbd, 0xe5, 0x22, 0xd7, 0x67,
	0x32, 0xd9, 0xf6, 0xae, 0x43, 0x41, 0xa2, 0x3a, 0x24, 0x2f, 0x07, 0x33, 0x27, 0xef, 0x73, 0xa5,
	0x6a, 0xba, 0x18, 0x54, 0xc5, 0xa4, 0x1c, 0x24, 0xf1, 0x74, 0x5f, 0x14, 0x38, 0x0c, 0xb4, 0x08,
	0x35, 0x6e, 0x73, 0x4a, 0xb6, 0xe3, 0xe1, 0x4f, 0xec, 0xf6, 0x76, 0xc2, 0x47, 0x35, 0xa9, 0xbd,
	0x2a, 0x34, 0x29, 0xe4, 0xf5, 0xb9, 0xd7, 0xa7, 0x56, 0xe9, 0xe4, 0xd4, 0x2a, 0xbd, 0x7f, 0xdb,
	0x98, 0x10, 0x3c, 0xb7, 0x9b, 0x7b, 0x67, 0x17, 0x75, 0xe3, 0xfc, 0xa2, 0x6e, 0x7c, 0xbe, 0xa8,
	0x1b, 0xc7, 0x97, 0xf5, 0xd2, 0xf9, 0x65, 0xbd, 0xf4, 0xe1, 0xb2, 0x5e, 0x7a, 0xf6, 0x20, 0x20,
	0x3c, 0x42, 0xaa, 0xb0, 0x90, 0xda, 0xd0, 0xba, 0xdd, 0xa1, 0x6e, 0xf7, 0xc8, 0x1d, 0xfb, 0x0f,
	0xd8, 0x9a, 0x94, 0xcf, 0xed, 0x7f, 0xdf, 0x03, 0x00, 0x00, 0xff, 0xff, 0xba, 0x24, 0x00, 0x11,
	0x25, 0x07, 0x00, 0x00,
}

func (m *SmoothWeightChangeParams) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *SmoothWeightChangeParams) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *SmoothWeightChangeParams) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.TargetPoolWeights) > 0 {
		for iNdEx := len(m.TargetPoolWeights) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.TargetPoolWeights[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintBalancerPool(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x22
		}
	}
	if len(m.InitialPoolWeights) > 0 {
		for iNdEx := len(m.InitialPoolWeights) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.InitialPoolWeights[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintBalancerPool(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x1a
		}
	}
	n1, err1 := github_com_gogo_protobuf_types.StdDurationMarshalTo(m.Duration, dAtA[i-github_com_gogo_protobuf_types.SizeOfStdDuration(m.Duration):])
	if err1 != nil {
		return 0, err1
	}
	i -= n1
	i = encodeVarintBalancerPool(dAtA, i, uint64(n1))
	i--
	dAtA[i] = 0x12
	n2, err2 := github_com_gogo_protobuf_types.StdTimeMarshalTo(m.StartTime, dAtA[i-github_com_gogo_protobuf_types.SizeOfStdTime(m.StartTime):])
	if err2 != nil {
		return 0, err2
	}
	i -= n2
	i = encodeVarintBalancerPool(dAtA, i, uint64(n2))
	i--
	dAtA[i] = 0xa
	return len(dAtA) - i, nil
}

func (m *PoolParams) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *PoolParams) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *PoolParams) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if m.SmoothWeightChangeParams != nil {
		{
			size, err := m.SmoothWeightChangeParams.MarshalToSizedBuffer(dAtA[:i])
			if err != nil {
				return 0, err
			}
			i -= size
			i = encodeVarintBalancerPool(dAtA, i, uint64(size))
		}
		i--
		dAtA[i] = 0x1a
	}
	{
		size := m.ExitFee.Size()
		i -= size
		if _, err := m.ExitFee.MarshalTo(dAtA[i:]); err != nil {
			return 0, err
		}
		i = encodeVarintBalancerPool(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x12
	{
		size := m.SwapFee.Size()
		i -= size
		if _, err := m.SwapFee.MarshalTo(dAtA[i:]); err != nil {
			return 0, err
		}
		i = encodeVarintBalancerPool(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0xa
	return len(dAtA) - i, nil
}

func (m *Pool) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Pool) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Pool) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	{
		size := m.TotalWeight.Size()
		i -= size
		if _, err := m.TotalWeight.MarshalTo(dAtA[i:]); err != nil {
			return 0, err
		}
		i = encodeVarintBalancerPool(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x3a
	if len(m.PoolAssets) > 0 {
		for iNdEx := len(m.PoolAssets) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.PoolAssets[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintBalancerPool(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x32
		}
	}
	{
		size, err := m.TotalShares.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintBalancerPool(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x2a
	if len(m.FuturePoolGovernor) > 0 {
		i -= len(m.FuturePoolGovernor)
		copy(dAtA[i:], m.FuturePoolGovernor)
		i = encodeVarintBalancerPool(dAtA, i, uint64(len(m.FuturePoolGovernor)))
		i--
		dAtA[i] = 0x22
	}
	{
		size, err := m.PoolParams.MarshalToSizedBuffer(dAtA[:i])
		if err != nil {
			return 0, err
		}
		i -= size
		i = encodeVarintBalancerPool(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x1a
	if m.Id != 0 {
		i = encodeVarintBalancerPool(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Address) > 0 {
		i -= len(m.Address)
		copy(dAtA[i:], m.Address)
		i = encodeVarintBalancerPool(dAtA, i, uint64(len(m.Address)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintBalancerPool(dAtA []byte, offset int, v uint64) int {
	offset -= sovBalancerPool(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *SmoothWeightChangeParams) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = github_com_gogo_protobuf_types.SizeOfStdTime(m.StartTime)
	n += 1 + l + sovBalancerPool(uint64(l))
	l = github_com_gogo_protobuf_types.SizeOfStdDuration(m.Duration)
	n += 1 + l + sovBalancerPool(uint64(l))
	if len(m.InitialPoolWeights) > 0 {
		for _, e := range m.InitialPoolWeights {
			l = e.Size()
			n += 1 + l + sovBalancerPool(uint64(l))
		}
	}
	if len(m.TargetPoolWeights) > 0 {
		for _, e := range m.TargetPoolWeights {
			l = e.Size()
			n += 1 + l + sovBalancerPool(uint64(l))
		}
	}
	return n
}

func (m *PoolParams) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = m.SwapFee.Size()
	n += 1 + l + sovBalancerPool(uint64(l))
	l = m.ExitFee.Size()
	n += 1 + l + sovBalancerPool(uint64(l))
	if m.SmoothWeightChangeParams != nil {
		l = m.SmoothWeightChangeParams.Size()
		n += 1 + l + sovBalancerPool(uint64(l))
	}
	return n
}

func (m *Pool) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Address)
	if l > 0 {
		n += 1 + l + sovBalancerPool(uint64(l))
	}
	if m.Id != 0 {
		n += 1 + sovBalancerPool(uint64(m.Id))
	}
	l = m.PoolParams.Size()
	n += 1 + l + sovBalancerPool(uint64(l))
	l = len(m.FuturePoolGovernor)
	if l > 0 {
		n += 1 + l + sovBalancerPool(uint64(l))
	}
	l = m.TotalShares.Size()
	n += 1 + l + sovBalancerPool(uint64(l))
	if len(m.PoolAssets) > 0 {
		for _, e := range m.PoolAssets {
			l = e.Size()
			n += 1 + l + sovBalancerPool(uint64(l))
		}
	}
	l = m.TotalWeight.Size()
	n += 1 + l + sovBalancerPool(uint64(l))
	return n
}

func sovBalancerPool(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozBalancerPool(x uint64) (n int) {
	return sovBalancerPool(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *SmoothWeightChangeParams) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowBalancerPool
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
			return fmt.Errorf("proto: SmoothWeightChangeParams: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: SmoothWeightChangeParams: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field StartTime", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_gogo_protobuf_types.StdTimeUnmarshal(&m.StartTime, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Duration", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := github_com_gogo_protobuf_types.StdDurationUnmarshal(&m.Duration, dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field InitialPoolWeights", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.InitialPoolWeights = append(m.InitialPoolWeights, types.PoolAsset{})
			if err := m.InitialPoolWeights[len(m.InitialPoolWeights)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TargetPoolWeights", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.TargetPoolWeights = append(m.TargetPoolWeights, types.PoolAsset{})
			if err := m.TargetPoolWeights[len(m.TargetPoolWeights)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipBalancerPool(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthBalancerPool
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
func (m *PoolParams) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowBalancerPool
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
			return fmt.Errorf("proto: PoolParams: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: PoolParams: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field SwapFee", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.SwapFee.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ExitFee", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.ExitFee.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field SmoothWeightChangeParams", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.SmoothWeightChangeParams == nil {
				m.SmoothWeightChangeParams = &SmoothWeightChangeParams{}
			}
			if err := m.SmoothWeightChangeParams.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipBalancerPool(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthBalancerPool
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
func (m *Pool) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowBalancerPool
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
			return fmt.Errorf("proto: Pool: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Pool: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Address", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Address = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Id |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PoolParams", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.PoolParams.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 4:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field FuturePoolGovernor", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.FuturePoolGovernor = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 5:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TotalShares", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.TotalShares.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 6:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field PoolAssets", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.PoolAssets = append(m.PoolAssets, types.PoolAsset{})
			if err := m.PoolAssets[len(m.PoolAssets)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		case 7:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field TotalWeight", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowBalancerPool
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
				return ErrInvalidLengthBalancerPool
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthBalancerPool
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if err := m.TotalWeight.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipBalancerPool(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthBalancerPool
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
func skipBalancerPool(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowBalancerPool
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
					return 0, ErrIntOverflowBalancerPool
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
					return 0, ErrIntOverflowBalancerPool
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
				return 0, ErrInvalidLengthBalancerPool
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupBalancerPool
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthBalancerPool
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthBalancerPool        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowBalancerPool          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupBalancerPool = fmt.Errorf("proto: unexpected end of group")
)
