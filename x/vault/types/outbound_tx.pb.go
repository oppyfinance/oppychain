// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: vault/outbound_tx.proto

package types

import (
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	types "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/gogo/protobuf/gogoproto"
	proto "github.com/gogo/protobuf/proto"
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

type Entity struct {
	Address github_com_cosmos_cosmos_sdk_types.AccAddress `protobuf:"bytes,1,opt,name=address,proto3,casttype=github.com/cosmos/cosmos-sdk/types.AccAddress" json:"address,omitempty"`
	Feecoin github_com_cosmos_cosmos_sdk_types.Coins      `protobuf:"bytes,2,rep,name=feecoin,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"feecoin"`
}

func (m *Entity) Reset()         { *m = Entity{} }
func (m *Entity) String() string { return proto.CompactTextString(m) }
func (*Entity) ProtoMessage()    {}
func (*Entity) Descriptor() ([]byte, []int) {
	return fileDescriptor_8a010d4577ca88c6, []int{0}
}
func (m *Entity) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Entity) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Entity.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Entity) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Entity.Merge(m, src)
}
func (m *Entity) XXX_Size() int {
	return m.Size()
}
func (m *Entity) XXX_DiscardUnknown() {
	xxx_messageInfo_Entity.DiscardUnknown(m)
}

var xxx_messageInfo_Entity proto.InternalMessageInfo

func (m *Entity) GetAddress() github_com_cosmos_cosmos_sdk_types.AccAddress {
	if m != nil {
		return m.Address
	}
	return nil
}

func (m *Entity) GetFeecoin() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.Feecoin
	}
	return nil
}

type Proposals struct {
	Entry []*Entity `protobuf:"bytes,1,rep,name=entry,proto3" json:"entry,omitempty"`
}

func (m *Proposals) Reset()         { *m = Proposals{} }
func (m *Proposals) String() string { return proto.CompactTextString(m) }
func (*Proposals) ProtoMessage()    {}
func (*Proposals) Descriptor() ([]byte, []int) {
	return fileDescriptor_8a010d4577ca88c6, []int{1}
}
func (m *Proposals) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *Proposals) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_Proposals.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *Proposals) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Proposals.Merge(m, src)
}
func (m *Proposals) XXX_Size() int {
	return m.Size()
}
func (m *Proposals) XXX_DiscardUnknown() {
	xxx_messageInfo_Proposals.DiscardUnknown(m)
}

var xxx_messageInfo_Proposals proto.InternalMessageInfo

func (m *Proposals) GetEntry() []*Entity {
	if m != nil {
		return m.Entry
	}
	return nil
}

type OutboundTx struct {
	Index     string               `protobuf:"bytes,1,opt,name=index,proto3" json:"index,omitempty"`
	Processed bool                 `protobuf:"varint,2,opt,name=processed,proto3" json:"processed,omitempty"`
	Items     map[string]Proposals `protobuf:"bytes,3,rep,name=items,proto3" json:"items" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
}

func (m *OutboundTx) Reset()         { *m = OutboundTx{} }
func (m *OutboundTx) String() string { return proto.CompactTextString(m) }
func (*OutboundTx) ProtoMessage()    {}
func (*OutboundTx) Descriptor() ([]byte, []int) {
	return fileDescriptor_8a010d4577ca88c6, []int{2}
}
func (m *OutboundTx) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *OutboundTx) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_OutboundTx.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *OutboundTx) XXX_Merge(src proto.Message) {
	xxx_messageInfo_OutboundTx.Merge(m, src)
}
func (m *OutboundTx) XXX_Size() int {
	return m.Size()
}
func (m *OutboundTx) XXX_DiscardUnknown() {
	xxx_messageInfo_OutboundTx.DiscardUnknown(m)
}

var xxx_messageInfo_OutboundTx proto.InternalMessageInfo

func (m *OutboundTx) GetIndex() string {
	if m != nil {
		return m.Index
	}
	return ""
}

func (m *OutboundTx) GetProcessed() bool {
	if m != nil {
		return m.Processed
	}
	return false
}

func (m *OutboundTx) GetItems() map[string]Proposals {
	if m != nil {
		return m.Items
	}
	return nil
}

func init() {
	proto.RegisterType((*Entity)(nil), "oppyfinance.oppychain.vault.entity")
	proto.RegisterType((*Proposals)(nil), "oppyfinance.oppychain.vault.proposals")
	proto.RegisterType((*OutboundTx)(nil), "oppyfinance.oppychain.vault.OutboundTx")
	proto.RegisterMapType((map[string]Proposals)(nil), "oppyfinance.oppychain.vault.OutboundTx.ItemsEntry")
}

func init() { proto.RegisterFile("vault/outbound_tx.proto", fileDescriptor_8a010d4577ca88c6) }

var fileDescriptor_8a010d4577ca88c6 = []byte{
	// 434 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x92, 0xc1, 0x6e, 0xd3, 0x30,
	0x1c, 0xc6, 0xeb, 0x96, 0x6e, 0xcc, 0xe3, 0x80, 0xac, 0x49, 0x84, 0x82, 0xd2, 0xaa, 0x48, 0xa8,
	0x97, 0xda, 0xb4, 0x5c, 0x00, 0x71, 0x59, 0x11, 0x48, 0x13, 0x12, 0x48, 0x11, 0x27, 0x2e, 0xe0,
	0x38, 0xff, 0x75, 0xd6, 0x5a, 0x3b, 0x8a, 0x9d, 0x2a, 0x79, 0x0b, 0x9e, 0x83, 0x67, 0xe0, 0x01,
	0x76, 0xdc, 0x91, 0xd3, 0x40, 0xed, 0x1b, 0x70, 0xe4, 0x84, 0x6c, 0x67, 0xed, 0xad, 0xe2, 0x94,
	0x7f, 0x62, 0x7f, 0xdf, 0xef, 0xcb, 0x67, 0xe3, 0x07, 0x2b, 0x5e, 0x2e, 0x2c, 0xd3, 0xa5, 0x4d,
	0x75, 0xa9, 0xb2, 0x2f, 0xb6, 0xa2, 0x79, 0xa1, 0xad, 0x26, 0x8f, 0x74, 0x9e, 0xd7, 0xe7, 0x52,
	0x71, 0x25, 0x80, 0xba, 0x59, 0x5c, 0x70, 0xa9, 0xa8, 0xdf, 0xde, 0x3b, 0x99, 0xeb, 0xb9, 0xf6,
	0xfb, 0x98, 0x9b, 0x82, 0xa4, 0x17, 0x0b, 0x6d, 0x96, 0xda, 0xb0, 0x94, 0x1b, 0x60, 0xab, 0x49,
	0x0a, 0x96, 0x4f, 0x98, 0xd0, 0x52, 0x85, 0xf5, 0xe1, 0x0f, 0x84, 0x0f, 0x40, 0x59, 0x69, 0x6b,
	0xf2, 0x1e, 0x1f, 0xf2, 0x2c, 0x2b, 0xc0, 0x98, 0x08, 0x0d, 0xd0, 0xe8, 0xde, 0x6c, 0xf2, 0xf7,
	0xa6, 0x3f, 0x9e, 0x4b, 0x7b, 0x51, 0xa6, 0x54, 0xe8, 0x25, 0x6b, 0xac, 0xc2, 0x63, 0x6c, 0xb2,
	0x4b, 0x66, 0xeb, 0x1c, 0x0c, 0x3d, 0x15, 0xe2, 0x34, 0x08, 0x93, 0x5b, 0x07, 0x02, 0xf8, 0xf0,
	0x1c, 0xc0, 0x81, 0xa2, 0xf6, 0xa0, 0x33, 0x3a, 0x9e, 0x3e, 0xa4, 0x41, 0x47, 0x5d, 0x12, 0xda,
	0x24, 0xa1, 0x6f, 0xb4, 0x54, 0xb3, 0x67, 0x57, 0x37, 0xfd, 0xd6, 0xf7, 0x5f, 0xfd, 0xd1, 0x7f,
	0xb0, 0x9c, 0xc0, 0x24, 0xb7, 0xde, 0xc3, 0x77, 0xf8, 0x28, 0x2f, 0x74, 0xae, 0x0d, 0x5f, 0x18,
	0xf2, 0x12, 0x77, 0x41, 0xd9, 0xa2, 0x8e, 0x90, 0x27, 0x3e, 0xa1, 0x7b, 0xea, 0xa2, 0xe1, 0xa7,
	0x93, 0xa0, 0x18, 0xfe, 0x41, 0x18, 0x7f, 0x6c, 0xfa, 0xfe, 0x54, 0x91, 0x13, 0xdc, 0x95, 0x2a,
	0x83, 0xca, 0x17, 0x71, 0x94, 0x84, 0x17, 0xf2, 0xd8, 0xc3, 0x04, 0x18, 0x03, 0x59, 0xd4, 0x1e,
	0xa0, 0xd1, 0xdd, 0x64, 0xf7, 0x81, 0x7c, 0xc0, 0x5d, 0x69, 0x61, 0x69, 0xa2, 0x8e, 0xa7, 0x4f,
	0xf7, 0xd2, 0x77, 0x2c, 0x7a, 0xe6, 0x44, 0x6f, 0x5d, 0x8a, 0xd9, 0x1d, 0x57, 0x44, 0x12, 0x6c,
	0x7a, 0x5f, 0x31, 0xde, 0x2d, 0x91, 0xfb, 0xb8, 0x73, 0x09, 0x75, 0x93, 0xc7, 0x8d, 0xe4, 0x35,
	0xee, 0xae, 0xf8, 0xa2, 0x04, 0x9f, 0xe4, 0x78, 0xfa, 0x74, 0x2f, 0x6f, 0x5b, 0x52, 0x12, 0x44,
	0xaf, 0xda, 0x2f, 0xd0, 0xec, 0xec, 0x6a, 0x1d, 0xa3, 0xeb, 0x75, 0x8c, 0x7e, 0xaf, 0x63, 0xf4,
	0x6d, 0x13, 0xb7, 0xae, 0x37, 0x71, 0xeb, 0xe7, 0x26, 0x6e, 0x7d, 0x66, 0x73, 0x69, 0x17, 0x3c,
	0x9c, 0x84, 0xb3, 0x1a, 0x37, 0xbe, 0x6c, 0xeb, 0xcb, 0x2a, 0x16, 0x6e, 0xa9, 0x3f, 0x96, 0xf4,
	0xc0, 0xdf, 0xa6, 0xe7, 0xff, 0x02, 0x00, 0x00, 0xff, 0xff, 0xd2, 0xb4, 0xc3, 0x86, 0xbb, 0x02,
	0x00, 0x00,
}

func (m *Entity) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Entity) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Entity) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Feecoin) > 0 {
		for iNdEx := len(m.Feecoin) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Feecoin[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintOutboundTx(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x12
		}
	}
	if len(m.Address) > 0 {
		i -= len(m.Address)
		copy(dAtA[i:], m.Address)
		i = encodeVarintOutboundTx(dAtA, i, uint64(len(m.Address)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *Proposals) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *Proposals) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *Proposals) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Entry) > 0 {
		for iNdEx := len(m.Entry) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.Entry[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintOutboundTx(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0xa
		}
	}
	return len(dAtA) - i, nil
}

func (m *OutboundTx) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *OutboundTx) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *OutboundTx) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Items) > 0 {
		for k := range m.Items {
			v := m.Items[k]
			baseI := i
			{
				size, err := (&v).MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintOutboundTx(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x12
			i -= len(k)
			copy(dAtA[i:], k)
			i = encodeVarintOutboundTx(dAtA, i, uint64(len(k)))
			i--
			dAtA[i] = 0xa
			i = encodeVarintOutboundTx(dAtA, i, uint64(baseI-i))
			i--
			dAtA[i] = 0x1a
		}
	}
	if m.Processed {
		i--
		if m.Processed {
			dAtA[i] = 1
		} else {
			dAtA[i] = 0
		}
		i--
		dAtA[i] = 0x10
	}
	if len(m.Index) > 0 {
		i -= len(m.Index)
		copy(dAtA[i:], m.Index)
		i = encodeVarintOutboundTx(dAtA, i, uint64(len(m.Index)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintOutboundTx(dAtA []byte, offset int, v uint64) int {
	offset -= sovOutboundTx(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *Entity) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Address)
	if l > 0 {
		n += 1 + l + sovOutboundTx(uint64(l))
	}
	if len(m.Feecoin) > 0 {
		for _, e := range m.Feecoin {
			l = e.Size()
			n += 1 + l + sovOutboundTx(uint64(l))
		}
	}
	return n
}

func (m *Proposals) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if len(m.Entry) > 0 {
		for _, e := range m.Entry {
			l = e.Size()
			n += 1 + l + sovOutboundTx(uint64(l))
		}
	}
	return n
}

func (m *OutboundTx) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Index)
	if l > 0 {
		n += 1 + l + sovOutboundTx(uint64(l))
	}
	if m.Processed {
		n += 2
	}
	if len(m.Items) > 0 {
		for k, v := range m.Items {
			_ = k
			_ = v
			l = v.Size()
			mapEntrySize := 1 + len(k) + sovOutboundTx(uint64(len(k))) + 1 + l + sovOutboundTx(uint64(l))
			n += mapEntrySize + 1 + sovOutboundTx(uint64(mapEntrySize))
		}
	}
	return n
}

func sovOutboundTx(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozOutboundTx(x uint64) (n int) {
	return sovOutboundTx(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *Entity) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowOutboundTx
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
			return fmt.Errorf("proto: entity: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: entity: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Address", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowOutboundTx
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
				return ErrInvalidLengthOutboundTx
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthOutboundTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Address = append(m.Address[:0], dAtA[iNdEx:postIndex]...)
			if m.Address == nil {
				m.Address = []byte{}
			}
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Feecoin", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowOutboundTx
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
				return ErrInvalidLengthOutboundTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthOutboundTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Feecoin = append(m.Feecoin, types.Coin{})
			if err := m.Feecoin[len(m.Feecoin)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipOutboundTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthOutboundTx
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
func (m *Proposals) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowOutboundTx
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
			return fmt.Errorf("proto: proposals: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: proposals: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Entry", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowOutboundTx
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
				return ErrInvalidLengthOutboundTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthOutboundTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Entry = append(m.Entry, &Entity{})
			if err := m.Entry[len(m.Entry)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipOutboundTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthOutboundTx
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
func (m *OutboundTx) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowOutboundTx
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
			return fmt.Errorf("proto: OutboundTx: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: OutboundTx: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Index", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowOutboundTx
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
				return ErrInvalidLengthOutboundTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthOutboundTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Index = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Processed", wireType)
			}
			var v int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowOutboundTx
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
			m.Processed = bool(v != 0)
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Items", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowOutboundTx
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
				return ErrInvalidLengthOutboundTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthOutboundTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Items == nil {
				m.Items = make(map[string]Proposals)
			}
			var mapkey string
			mapvalue := &Proposals{}
			for iNdEx < postIndex {
				entryPreIndex := iNdEx
				var wire uint64
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowOutboundTx
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
				if fieldNum == 1 {
					var stringLenmapkey uint64
					for shift := uint(0); ; shift += 7 {
						if shift >= 64 {
							return ErrIntOverflowOutboundTx
						}
						if iNdEx >= l {
							return io.ErrUnexpectedEOF
						}
						b := dAtA[iNdEx]
						iNdEx++
						stringLenmapkey |= uint64(b&0x7F) << shift
						if b < 0x80 {
							break
						}
					}
					intStringLenmapkey := int(stringLenmapkey)
					if intStringLenmapkey < 0 {
						return ErrInvalidLengthOutboundTx
					}
					postStringIndexmapkey := iNdEx + intStringLenmapkey
					if postStringIndexmapkey < 0 {
						return ErrInvalidLengthOutboundTx
					}
					if postStringIndexmapkey > l {
						return io.ErrUnexpectedEOF
					}
					mapkey = string(dAtA[iNdEx:postStringIndexmapkey])
					iNdEx = postStringIndexmapkey
				} else if fieldNum == 2 {
					var mapmsglen int
					for shift := uint(0); ; shift += 7 {
						if shift >= 64 {
							return ErrIntOverflowOutboundTx
						}
						if iNdEx >= l {
							return io.ErrUnexpectedEOF
						}
						b := dAtA[iNdEx]
						iNdEx++
						mapmsglen |= int(b&0x7F) << shift
						if b < 0x80 {
							break
						}
					}
					if mapmsglen < 0 {
						return ErrInvalidLengthOutboundTx
					}
					postmsgIndex := iNdEx + mapmsglen
					if postmsgIndex < 0 {
						return ErrInvalidLengthOutboundTx
					}
					if postmsgIndex > l {
						return io.ErrUnexpectedEOF
					}
					mapvalue = &Proposals{}
					if err := mapvalue.Unmarshal(dAtA[iNdEx:postmsgIndex]); err != nil {
						return err
					}
					iNdEx = postmsgIndex
				} else {
					iNdEx = entryPreIndex
					skippy, err := skipOutboundTx(dAtA[iNdEx:])
					if err != nil {
						return err
					}
					if (skippy < 0) || (iNdEx+skippy) < 0 {
						return ErrInvalidLengthOutboundTx
					}
					if (iNdEx + skippy) > postIndex {
						return io.ErrUnexpectedEOF
					}
					iNdEx += skippy
				}
			}
			m.Items[mapkey] = *mapvalue
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipOutboundTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthOutboundTx
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
func skipOutboundTx(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowOutboundTx
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
					return 0, ErrIntOverflowOutboundTx
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
					return 0, ErrIntOverflowOutboundTx
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
				return 0, ErrInvalidLengthOutboundTx
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupOutboundTx
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthOutboundTx
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthOutboundTx        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowOutboundTx          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupOutboundTx = fmt.Errorf("proto: unexpected end of group")
)
