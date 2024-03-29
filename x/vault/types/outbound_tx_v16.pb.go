// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: vault/outbound_tx_v16.proto

package types

import (
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
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

type AddressV16 struct {
	Address []github_com_cosmos_cosmos_sdk_types.AccAddress `protobuf:"bytes,1,rep,name=address,proto3,casttype=github.com/cosmos/cosmos-sdk/types.AccAddress" json:"address,omitempty"`
}

func (m *AddressV16) Reset()         { *m = AddressV16{} }
func (m *AddressV16) String() string { return proto.CompactTextString(m) }
func (*AddressV16) ProtoMessage()    {}
func (*AddressV16) Descriptor() ([]byte, []int) {
	return fileDescriptor_dc4a71e09f917bdb, []int{0}
}
func (m *AddressV16) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *AddressV16) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_AddressV16.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *AddressV16) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AddressV16.Merge(m, src)
}
func (m *AddressV16) XXX_Size() int {
	return m.Size()
}
func (m *AddressV16) XXX_DiscardUnknown() {
	xxx_messageInfo_AddressV16.DiscardUnknown(m)
}

var xxx_messageInfo_AddressV16 proto.InternalMessageInfo

func (m *AddressV16) GetAddress() []github_com_cosmos_cosmos_sdk_types.AccAddress {
	if m != nil {
		return m.Address
	}
	return nil
}

type OutboundTxV16 struct {
	Index string                `protobuf:"bytes,1,opt,name=index,proto3" json:"index,omitempty"`
	Items map[string]AddressV16 `protobuf:"bytes,2,rep,name=items,proto3" json:"items" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
}

func (m *OutboundTxV16) Reset()         { *m = OutboundTxV16{} }
func (m *OutboundTxV16) String() string { return proto.CompactTextString(m) }
func (*OutboundTxV16) ProtoMessage()    {}
func (*OutboundTxV16) Descriptor() ([]byte, []int) {
	return fileDescriptor_dc4a71e09f917bdb, []int{1}
}
func (m *OutboundTxV16) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *OutboundTxV16) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_OutboundTxV16.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *OutboundTxV16) XXX_Merge(src proto.Message) {
	xxx_messageInfo_OutboundTxV16.Merge(m, src)
}
func (m *OutboundTxV16) XXX_Size() int {
	return m.Size()
}
func (m *OutboundTxV16) XXX_DiscardUnknown() {
	xxx_messageInfo_OutboundTxV16.DiscardUnknown(m)
}

var xxx_messageInfo_OutboundTxV16 proto.InternalMessageInfo

func (m *OutboundTxV16) GetIndex() string {
	if m != nil {
		return m.Index
	}
	return ""
}

func (m *OutboundTxV16) GetItems() map[string]AddressV16 {
	if m != nil {
		return m.Items
	}
	return nil
}

func init() {
	proto.RegisterType((*AddressV16)(nil), "oppyfinance.oppychain.vault.addressV16")
	proto.RegisterType((*OutboundTxV16)(nil), "oppyfinance.oppychain.vault.OutboundTxV16")
	proto.RegisterMapType((map[string]AddressV16)(nil), "oppyfinance.oppychain.vault.OutboundTxV16.ItemsEntry")
}

func init() { proto.RegisterFile("vault/outbound_tx_v16.proto", fileDescriptor_dc4a71e09f917bdb) }

var fileDescriptor_dc4a71e09f917bdb = []byte{
	// 338 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0x92, 0x2e, 0x4b, 0x2c, 0xcd,
	0x29, 0xd1, 0xcf, 0x2f, 0x2d, 0x49, 0xca, 0x2f, 0xcd, 0x4b, 0x89, 0x2f, 0xa9, 0x88, 0x2f, 0x33,
	0x34, 0xd3, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0x92, 0xce, 0x2f, 0x28, 0xa8, 0x4c, 0xcb, 0xcc,
	0x4b, 0xcc, 0x4b, 0x4e, 0xd5, 0x03, 0xb1, 0x93, 0x33, 0x12, 0x33, 0xf3, 0xf4, 0xc0, 0x5a, 0xa4,
	0x44, 0xd2, 0xf3, 0xd3, 0xf3, 0xc1, 0xea, 0xf4, 0x41, 0x2c, 0x88, 0x16, 0xa5, 0x58, 0x2e, 0xae,
	0xc4, 0x94, 0x94, 0xa2, 0xd4, 0xe2, 0xe2, 0x30, 0x43, 0x33, 0x21, 0x7f, 0x2e, 0x76, 0x28, 0x4f,
	0x82, 0x51, 0x81, 0x59, 0x83, 0xc7, 0xc9, 0xf4, 0xc4, 0x3d, 0x79, 0x86, 0x5f, 0xf7, 0xe4, 0x75,
	0xd3, 0x33, 0x4b, 0x32, 0x4a, 0x93, 0xf4, 0x92, 0xf3, 0x73, 0xf5, 0x93, 0xf3, 0x8b, 0x73, 0xf3,
	0x8b, 0xa1, 0x94, 0x6e, 0x71, 0x4a, 0xb6, 0x7e, 0x49, 0x65, 0x41, 0x6a, 0xb1, 0x9e, 0x63, 0x72,
	0xb2, 0x23, 0x44, 0x73, 0x10, 0xcc, 0x14, 0xa5, 0xdb, 0x8c, 0x5c, 0xbc, 0xfe, 0x50, 0xb7, 0x86,
	0x54, 0x80, 0xac, 0x10, 0xe1, 0x62, 0xcd, 0xcc, 0x4b, 0x49, 0xad, 0x90, 0x60, 0x54, 0x60, 0xd4,
	0xe0, 0x0c, 0x82, 0x70, 0x84, 0x02, 0xb9, 0x58, 0x33, 0x4b, 0x52, 0x73, 0x8b, 0x25, 0x98, 0x14,
	0x98, 0x35, 0xb8, 0x8d, 0x4c, 0xf5, 0xf0, 0xf8, 0x44, 0x0f, 0xc5, 0x40, 0x3d, 0x4f, 0x90, 0x3e,
	0xd7, 0xbc, 0x92, 0xa2, 0x4a, 0x27, 0x16, 0x90, 0x6b, 0x83, 0x20, 0x26, 0x49, 0x25, 0x72, 0x71,
	0x21, 0xa4, 0x84, 0x04, 0xb8, 0x98, 0xb3, 0x53, 0x2b, 0xa1, 0x96, 0x82, 0x98, 0x42, 0xb6, 0x5c,
	0xac, 0x65, 0x89, 0x39, 0xa5, 0xa9, 0x12, 0x4c, 0x0a, 0x8c, 0x1a, 0xdc, 0x46, 0xea, 0x78, 0xad,
	0x44, 0x84, 0x51, 0x10, 0x44, 0x97, 0x15, 0x93, 0x05, 0xa3, 0x93, 0xe7, 0x89, 0x47, 0x72, 0x8c,
	0x17, 0x1e, 0xc9, 0x31, 0x3e, 0x78, 0x24, 0xc7, 0x38, 0xe1, 0xb1, 0x1c, 0xc3, 0x85, 0xc7, 0x72,
	0x0c, 0x37, 0x1e, 0xcb, 0x31, 0x44, 0xe9, 0xa7, 0x67, 0x96, 0xe4, 0x24, 0x42, 0xc2, 0x0b, 0x64,
	0x96, 0x2e, 0xd4, 0x60, 0x7d, 0xb8, 0xc1, 0xfa, 0x15, 0xfa, 0x90, 0xa8, 0x04, 0x07, 0x5e, 0x12,
	0x1b, 0x38, 0x3a, 0x8c, 0x01, 0x01, 0x00, 0x00, 0xff, 0xff, 0x87, 0x1f, 0xcd, 0xed, 0xe0, 0x01,
	0x00, 0x00,
}

func (m *AddressV16) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *AddressV16) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *AddressV16) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Address) > 0 {
		for iNdEx := len(m.Address) - 1; iNdEx >= 0; iNdEx-- {
			i -= len(m.Address[iNdEx])
			copy(dAtA[i:], m.Address[iNdEx])
			i = encodeVarintOutboundTxV16(dAtA, i, uint64(len(m.Address[iNdEx])))
			i--
			dAtA[i] = 0xa
		}
	}
	return len(dAtA) - i, nil
}

func (m *OutboundTxV16) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *OutboundTxV16) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *OutboundTxV16) MarshalToSizedBuffer(dAtA []byte) (int, error) {
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
				i = encodeVarintOutboundTxV16(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x12
			i -= len(k)
			copy(dAtA[i:], k)
			i = encodeVarintOutboundTxV16(dAtA, i, uint64(len(k)))
			i--
			dAtA[i] = 0xa
			i = encodeVarintOutboundTxV16(dAtA, i, uint64(baseI-i))
			i--
			dAtA[i] = 0x12
		}
	}
	if len(m.Index) > 0 {
		i -= len(m.Index)
		copy(dAtA[i:], m.Index)
		i = encodeVarintOutboundTxV16(dAtA, i, uint64(len(m.Index)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func encodeVarintOutboundTxV16(dAtA []byte, offset int, v uint64) int {
	offset -= sovOutboundTxV16(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *AddressV16) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	if len(m.Address) > 0 {
		for _, b := range m.Address {
			l = len(b)
			n += 1 + l + sovOutboundTxV16(uint64(l))
		}
	}
	return n
}

func (m *OutboundTxV16) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Index)
	if l > 0 {
		n += 1 + l + sovOutboundTxV16(uint64(l))
	}
	if len(m.Items) > 0 {
		for k, v := range m.Items {
			_ = k
			_ = v
			l = v.Size()
			mapEntrySize := 1 + len(k) + sovOutboundTxV16(uint64(len(k))) + 1 + l + sovOutboundTxV16(uint64(l))
			n += mapEntrySize + 1 + sovOutboundTxV16(uint64(mapEntrySize))
		}
	}
	return n
}

func sovOutboundTxV16(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozOutboundTxV16(x uint64) (n int) {
	return sovOutboundTxV16(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *AddressV16) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowOutboundTxV16
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
			return fmt.Errorf("proto: addressV16: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: addressV16: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Address", wireType)
			}
			var byteLen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowOutboundTxV16
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
				return ErrInvalidLengthOutboundTxV16
			}
			postIndex := iNdEx + byteLen
			if postIndex < 0 {
				return ErrInvalidLengthOutboundTxV16
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Address = append(m.Address, make([]byte, postIndex-iNdEx))
			copy(m.Address[len(m.Address)-1], dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipOutboundTxV16(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthOutboundTxV16
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
func (m *OutboundTxV16) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowOutboundTxV16
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
			return fmt.Errorf("proto: OutboundTxV16: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: OutboundTxV16: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Index", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowOutboundTxV16
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
				return ErrInvalidLengthOutboundTxV16
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthOutboundTxV16
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Index = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Items", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowOutboundTxV16
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
				return ErrInvalidLengthOutboundTxV16
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthOutboundTxV16
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			if m.Items == nil {
				m.Items = make(map[string]AddressV16)
			}
			var mapkey string
			mapvalue := &AddressV16{}
			for iNdEx < postIndex {
				entryPreIndex := iNdEx
				var wire uint64
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return ErrIntOverflowOutboundTxV16
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
							return ErrIntOverflowOutboundTxV16
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
						return ErrInvalidLengthOutboundTxV16
					}
					postStringIndexmapkey := iNdEx + intStringLenmapkey
					if postStringIndexmapkey < 0 {
						return ErrInvalidLengthOutboundTxV16
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
							return ErrIntOverflowOutboundTxV16
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
						return ErrInvalidLengthOutboundTxV16
					}
					postmsgIndex := iNdEx + mapmsglen
					if postmsgIndex < 0 {
						return ErrInvalidLengthOutboundTxV16
					}
					if postmsgIndex > l {
						return io.ErrUnexpectedEOF
					}
					mapvalue = &AddressV16{}
					if err := mapvalue.Unmarshal(dAtA[iNdEx:postmsgIndex]); err != nil {
						return err
					}
					iNdEx = postmsgIndex
				} else {
					iNdEx = entryPreIndex
					skippy, err := skipOutboundTxV16(dAtA[iNdEx:])
					if err != nil {
						return err
					}
					if (skippy < 0) || (iNdEx+skippy) < 0 {
						return ErrInvalidLengthOutboundTxV16
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
			skippy, err := skipOutboundTxV16(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthOutboundTxV16
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
func skipOutboundTxV16(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowOutboundTxV16
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
					return 0, ErrIntOverflowOutboundTxV16
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
					return 0, ErrIntOverflowOutboundTxV16
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
				return 0, ErrInvalidLengthOutboundTxV16
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupOutboundTxV16
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthOutboundTxV16
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthOutboundTxV16        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowOutboundTxV16          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupOutboundTxV16 = fmt.Errorf("proto: unexpected end of group")
)
