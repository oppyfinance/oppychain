// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: incentives/gauge.proto

package types

import (
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	types1 "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
	github_com_gogo_protobuf_types "github.com/gogo/protobuf/types"
	types "gitlab.com/oppy-finance/oppychain/x/lockup/types"
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

type Gauge struct {
	// unique ID of a Gauge
	Id uint64 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	// flag to show if it's perpetual or multi-epoch
	// distribution incentives by third party
	IsPerpetual bool `protobuf:"varint,2,opt,name=is_perpetual,json=isPerpetual,proto3" json:"is_perpetual,omitempty"`
	// Rewards are distributed to lockups that are are returned by at least one of
	// these queries
	DistributeTo types.QueryCondition `protobuf:"bytes,3,opt,name=distribute_to,json=distributeTo,proto3" json:"distribute_to"`
	// total amount of Coins that has been in the gauge.
	// can distribute multiple coins
	Coins github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,4,rep,name=coins,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"coins"`
	// distribution start time
	StartTime time.Time `protobuf:"bytes,5,opt,name=start_time,json=startTime,proto3,stdtime" json:"start_time" yaml:"start_time"`
	// number of epochs distribution will be done
	NumEpochsPaidOver uint64 `protobuf:"varint,6,opt,name=num_epochs_paid_over,json=numEpochsPaidOver,proto3" json:"num_epochs_paid_over,omitempty"`
	// number of epochs distributed already
	FilledEpochs uint64 `protobuf:"varint,7,opt,name=filled_epochs,json=filledEpochs,proto3" json:"filled_epochs,omitempty"`
	// already distributed coins
	DistributedCoins github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,8,rep,name=distributed_coins,json=distributedCoins,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"distributed_coins"`
}

func (m *Gauge) Reset()         { *m = Gauge{} }
func (m *Gauge) String() string { return proto.CompactTextString(m) }
func (*Gauge) ProtoMessage()    {}
func (*Gauge) Descriptor() ([]byte, []int) {
	return fileDescriptor_42e345ad98f26913, []int{0}
}
func (m *Gauge) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Gauge) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Gauge.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Gauge) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Gauge.Merge(m, src)
}
func (m *Gauge) XXX_Size() int {
	return m.Size()
}
func (m *Gauge) XXX_DiscardUnknown() {
	xxx_messageInfo_Gauge.DiscardUnknown(m)
}

var xxx_messageInfo_Gauge proto.InternalMessageInfo

func (m *Gauge) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

func (m *Gauge) GetIsPerpetual() bool {
	if m != nil {
		return m.IsPerpetual
	}
	return false
}

func (m *Gauge) GetDistributeTo() types.QueryCondition {
	if m != nil {
		return m.DistributeTo
	}
	return types.QueryCondition{}
}

func (m *Gauge) GetCoins() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.Coins
	}
	return nil
}

func (m *Gauge) GetStartTime() time.Time {
	if m != nil {
		return m.StartTime
	}
	return time.Time{}
}

func (m *Gauge) GetNumEpochsPaidOver() uint64 {
	if m != nil {
		return m.NumEpochsPaidOver
	}
	return 0
}

func (m *Gauge) GetFilledEpochs() uint64 {
	if m != nil {
		return m.FilledEpochs
	}
	return 0
}

func (m *Gauge) GetDistributedCoins() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.DistributedCoins
	}
	return nil
}

type LockableDurationsInfo struct {
	LockableDurations []time.Duration `protobuf:"bytes,1,rep,name=lockable_durations,json=lockableDurations,proto3,stdduration" json:"lockable_durations" yaml:"lockable_durations"`
}

func (m *LockableDurationsInfo) Reset()         { *m = LockableDurationsInfo{} }
func (m *LockableDurationsInfo) String() string { return proto.CompactTextString(m) }
func (*LockableDurationsInfo) ProtoMessage()    {}
func (*LockableDurationsInfo) Descriptor() ([]byte, []int) {
	return fileDescriptor_42e345ad98f26913, []int{1}
}
func (m *LockableDurationsInfo) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *LockableDurationsInfo) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_LockableDurationsInfo.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *LockableDurationsInfo) XXX_Merge(src proto.Message) {
	xxx_messageInfo_LockableDurationsInfo.Merge(m, src)
}
func (m *LockableDurationsInfo) XXX_Size() int {
	return m.Size()
}
func (m *LockableDurationsInfo) XXX_DiscardUnknown() {
	xxx_messageInfo_LockableDurationsInfo.DiscardUnknown(m)
}

var xxx_messageInfo_LockableDurationsInfo proto.InternalMessageInfo

func (m *LockableDurationsInfo) GetLockableDurations() []time.Duration {
	if m != nil {
		return m.LockableDurations
	}
	return nil
}

func init() {
	proto.RegisterType((*Gauge)(nil), "oppyfinance.oppychain.incentives.Gauge")
	proto.RegisterType((*LockableDurationsInfo)(nil), "oppyfinance.oppychain.incentives.LockableDurationsInfo")
}

func init() { proto.RegisterFile("incentives/gauge.proto", fileDescriptor_42e345ad98f26913) }

var fileDescriptor_42e345ad98f26913 = []byte{
	// 557 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xac, 0x93, 0xc1, 0x6e, 0xd3, 0x40,
	0x10, 0x86, 0xe3, 0x34, 0x29, 0x65, 0x93, 0x22, 0x62, 0x15, 0xe4, 0x46, 0xc2, 0x09, 0x41, 0x48,
	0x39, 0xd0, 0x5d, 0x5a, 0x38, 0x71, 0x4c, 0x41, 0x08, 0x09, 0x41, 0x89, 0x2a, 0x81, 0xb8, 0x58,
	0x6b, 0x7b, 0xe3, 0xac, 0x62, 0x7b, 0x2c, 0xef, 0x3a, 0x6a, 0xde, 0x80, 0x63, 0x8f, 0x1c, 0x39,
	0xf3, 0x24, 0x3d, 0xf6, 0xc8, 0xa9, 0x45, 0xc9, 0x1b, 0xf0, 0x04, 0x68, 0x77, 0x6d, 0x52, 0x05,
	0x8e, 0x9c, 0xbc, 0x99, 0x99, 0x7f, 0x66, 0xfe, 0x4f, 0x13, 0x74, 0x9f, 0xa7, 0x01, 0x4b, 0x25,
	0x9f, 0x33, 0x41, 0x22, 0x5a, 0x44, 0x0c, 0x67, 0x39, 0x48, 0xb0, 0xfb, 0x90, 0x65, 0x8b, 0x09,
	0x4f, 0x69, 0x1a, 0x30, 0xac, 0xde, 0xc1, 0x94, 0xf2, 0x14, 0xaf, 0xab, 0xbb, 0x7b, 0x11, 0x44,
	0xa0, 0x8b, 0x89, 0x7a, 0x19, 0x5d, 0xd7, 0x8d, 0x00, 0xa2, 0x98, 0x11, 0xfd, 0xcb, 0x2f, 0x26,
	0x24, 0x2c, 0x72, 0x2a, 0x39, 0xa4, 0x65, 0xbe, 0xb7, 0x99, 0x97, 0x3c, 0x61, 0x42, 0xd2, 0x24,
	0xab, 0x1a, 0x04, 0x20, 0x12, 0x10, 0xc4, 0xa7, 0x82, 0x91, 0xf9, 0xa1, 0xcf, 0x24, 0x3d, 0x24,
	0x01, 0xf0, 0xaa, 0x41, 0x27, 0x86, 0x60, 0x56, 0x64, 0x44, 0x7d, 0x4c, 0x68, 0xf0, 0xad, 0x81,
	0x9a, 0xaf, 0xd5, 0xee, 0xf6, 0x1d, 0x54, 0xe7, 0xa1, 0x63, 0xf5, 0xad, 0x61, 0x63, 0x5c, 0xe7,
	0xa1, 0xfd, 0x10, 0xb5, 0xb9, 0xf0, 0x32, 0x96, 0x67, 0x4c, 0x16, 0x34, 0x76, 0xea, 0x7d, 0x6b,
	0xb8, 0x33, 0x6e, 0x71, 0x71, 0x52, 0x85, 0xec, 0x8f, 0x68, 0x37, 0xe4, 0x42, 0xe6, 0xdc, 0x2f,
	0x24, 0xf3, 0x24, 0x38, 0x5b, 0x7d, 0x6b, 0xd8, 0x3a, 0x7a, 0x82, 0xff, 0x0d, 0xc0, 0x4c, 0xc7,
	0x1f, 0x0a, 0x96, 0x2f, 0x8e, 0x21, 0x0d, 0xb9, 0xf2, 0x36, 0x6a, 0x5c, 0x5c, 0xf5, 0x6a, 0xe3,
	0xf6, 0xba, 0xd1, 0x29, 0xd8, 0x14, 0x35, 0xd5, 0xda, 0xc2, 0x69, 0xf4, 0xb7, 0x86, 0xad, 0xa3,
	0x7d, 0x6c, 0x8c, 0x61, 0x65, 0x0c, 0x97, 0xc6, 0xf0, 0x31, 0xf0, 0x74, 0xf4, 0x54, 0xa9, 0xbf,
	0x5f, 0xf7, 0x86, 0x11, 0x97, 0xd3, 0xc2, 0xc7, 0x01, 0x24, 0xa4, 0xa4, 0x60, 0x3e, 0x07, 0x22,
	0x9c, 0x11, 0xb9, 0xc8, 0x98, 0xd0, 0x02, 0x31, 0x36, 0x9d, 0xed, 0x4f, 0x08, 0x09, 0x49, 0x73,
	0xe9, 0x29, 0x88, 0x4e, 0x53, 0x2f, 0xde, 0xc5, 0x86, 0x30, 0xae, 0x08, 0xe3, 0xd3, 0x8a, 0xf0,
	0xe8, 0x81, 0x1a, 0xf4, 0xeb, 0xaa, 0xd7, 0x59, 0xd0, 0x24, 0x7e, 0x31, 0x58, 0x6b, 0x07, 0xe7,
	0xd7, 0x3d, 0x6b, 0x7c, 0x5b, 0x07, 0x54, 0xb9, 0x4d, 0xd0, 0x5e, 0x5a, 0x24, 0x1e, 0xcb, 0x20,
	0x98, 0x0a, 0x2f, 0xa3, 0x3c, 0xf4, 0x60, 0xce, 0x72, 0x67, 0x5b, 0xa3, 0xed, 0xa4, 0x45, 0xf2,
	0x4a, 0xa7, 0x4e, 0x28, 0x0f, 0xdf, 0xcf, 0x59, 0x6e, 0x3f, 0x42, 0xbb, 0x13, 0x1e, 0xc7, 0x2c,
	0x2c, 0x35, 0xce, 0x2d, 0x5d, 0xd9, 0x36, 0x41, 0x53, 0x6c, 0x9f, 0xa1, 0xce, 0x1a, 0x51, 0xe8,
	0x19, 0x3c, 0x3b, 0xff, 0x1f, 0xcf, 0xdd, 0x1b, 0x53, 0x74, 0x64, 0xf0, 0xc5, 0x42, 0xf7, 0xde,
	0x42, 0x30, 0xa3, 0x7e, 0xcc, 0x5e, 0x96, 0x17, 0x29, 0xde, 0xa4, 0x13, 0xb0, 0x01, 0xd9, 0x71,
	0x99, 0xf0, 0xaa, 0x5b, 0x15, 0x8e, 0x55, 0x2e, 0xb5, 0xc9, 0xb2, 0xd2, 0x8e, 0x1e, 0x97, 0x28,
	0xf7, 0x0d, 0xca, 0xbf, 0x5b, 0x0c, 0xbe, 0x2a, 0xa4, 0x9d, 0x78, 0x73, 0xe8, 0xe8, 0xdd, 0xc5,
	0xd2, 0xb5, 0x2e, 0x97, 0xae, 0xf5, 0x73, 0xe9, 0x5a, 0xe7, 0x2b, 0xb7, 0x76, 0xb9, 0x72, 0x6b,
	0x3f, 0x56, 0x6e, 0xed, 0xf3, 0xf3, 0x88, 0xcb, 0x98, 0x1a, 0x83, 0xea, 0xe2, 0x0e, 0xca, 0xf3,
	0x23, 0x7f, 0xce, 0x8f, 0x9c, 0x91, 0x1b, 0xff, 0x57, 0x6d, 0xd9, 0xdf, 0xd6, 0xcb, 0x3d, 0xfb,
	0x1d, 0x00, 0x00, 0xff, 0xff, 0x36, 0x12, 0xc2, 0x44, 0xca, 0x03, 0x00, 0x00,
}

func (m *Gauge) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Gauge) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Gauge) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.DistributedCoins) > 0 {
		for iNdEx := len(m.DistributedCoins) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.DistributedCoins[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintGauge(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x42
		}
	}
	if m.FilledEpochs != 0 {
		i = encodeVarintGauge(dAtA, i, uint64(m.FilledEpochs))
		i--
		dAtA[i] = 0x38
	}
	if m.NumEpochsPaidOver != 0 {
		i = encodeVarintGauge(dAtA, i, uint64(m.NumEpochsPaidOver))
		i--
		dAtA[i] = 0x30
	}
	n1, err1 := github_com_gogo_protobuf_types.StdTimeMarshalTo(m.StartTime, dAtA[i-github_com_gogo_protobuf_types.SizeOfStdTime(m.StartTime):])
	if err1 != nil {
		return 0, err1
	}
	i -= n1
	i = encodeVarintGauge(dAtA, i, uint64(n1))
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
				i = encodeVarintGauge(dAtA, i, uint64(size))
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
		i = encodeVarintGauge(dAtA, i, uint64(size))
	}
	i--
	dAtA[i] = 0x1a
	if m.IsPerpetual {
		i--
		if m.IsPerpetual {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x10
	}
	if m.Id != 0 {
		i = encodeVarintGauge(dAtA, i, uint64(m.Id))
		i--
		dAtA[i] = 0x8
	}
	return len(dAtA) - i, nil
}

func (m *LockableDurationsInfo) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *LockableDurationsInfo) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *LockableDurationsInfo) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.LockableDurations) > 0 {
		for iNdEx := len(m.LockableDurations) - 1; iNdEx >= 0; iNdEx-- {
			n, err := github_com_gogo_protobuf_types.StdDurationMarshalTo(m.LockableDurations[iNdEx], dAtA[i-github_com_gogo_protobuf_types.SizeOfStdDuration(m.LockableDurations[iNdEx]):])
			if err != nil {
				return 0, err
			}
			i -= n
			i = encodeVarintGauge(dAtA, i, uint64(n))
			i--
			dAtA[i] = 0xa
		}
	}
	return len(dAtA) - i, nil
}

func encodeVarintGauge(dAtA []byte, offset int, v uint64) int {
	offset -= sovGauge(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Gauge) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if m.Id != 0 {
		n += 1 + sovGauge(uint64(m.Id))
	}
	if m.IsPerpetual {
		n += 2
	}
	l = m.DistributeTo.Size()
	n += 1 + l + sovGauge(uint64(l))
	if len(m.Coins) > 0 {
		for _, e := range m.Coins {
			l = e.Size()
			n += 1 + l + sovGauge(uint64(l))
		}
	}
	l = github_com_gogo_protobuf_types.SizeOfStdTime(m.StartTime)
	n += 1 + l + sovGauge(uint64(l))
	if m.NumEpochsPaidOver != 0 {
		n += 1 + sovGauge(uint64(m.NumEpochsPaidOver))
	}
	if m.FilledEpochs != 0 {
		n += 1 + sovGauge(uint64(m.FilledEpochs))
	}
	if len(m.DistributedCoins) > 0 {
		for _, e := range m.DistributedCoins {
			l = e.Size()
			n += 1 + l + sovGauge(uint64(l))
		}
	}
	return n
}

func (m *LockableDurationsInfo) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if len(m.LockableDurations) > 0 {
		for _, e := range m.LockableDurations {
			l = github_com_gogo_protobuf_types.SizeOfStdDuration(e)
			n += 1 + l + sovGauge(uint64(l))
		}
	}
	return n
}

func sovGauge(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozGauge(x uint64) (n int) {
	return sovGauge(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Gauge) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowGauge
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
			return fmt.Errorf("proto: Gauge: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: Gauge: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Id", wireType)
			}
			m.Id = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGauge
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
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field IsPerpetual", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGauge
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
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field DistributeTo", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGauge
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
				return ErrInvalidLengthGauge
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGauge
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
					return ErrIntOverflowGauge
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
				return ErrInvalidLengthGauge
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGauge
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
					return ErrIntOverflowGauge
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
				return ErrInvalidLengthGauge
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGauge
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
					return ErrIntOverflowGauge
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
		case 7:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field FilledEpochs", wireType)
			}
			m.FilledEpochs = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGauge
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.FilledEpochs |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 8:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field DistributedCoins", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGauge
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
				return ErrInvalidLengthGauge
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGauge
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.DistributedCoins = append(m.DistributedCoins, types1.Coin{})
			if err := m.DistributedCoins[len(m.DistributedCoins)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipGauge(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthGauge
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
func (m *LockableDurationsInfo) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowGauge
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
			return fmt.Errorf("proto: LockableDurationsInfo: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: LockableDurationsInfo: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field LockableDurations", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowGauge
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
				return ErrInvalidLengthGauge
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthGauge
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.LockableDurations = append(m.LockableDurations, time.Duration(0))
			if err := github_com_gogo_protobuf_types.StdDurationUnmarshal(&(m.LockableDurations[len(m.LockableDurations)-1]), dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipGauge(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthGauge
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
func skipGauge(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowGauge
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
					return 0, ErrIntOverflowGauge
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
					return 0, ErrIntOverflowGauge
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
				return 0, ErrInvalidLengthGauge
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupGauge
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthGauge
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthGauge        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowGauge          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupGauge = fmt.Errorf("proto: unexpected end of group")
)
