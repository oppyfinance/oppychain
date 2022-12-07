/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../cosmos/base/query/v1beta1/pagination";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { Duration } from "../google/protobuf/duration";
import { Gauge } from "./gauge";

export const protobufPackage = "oppyfinance.oppychain.incentives";

export interface ModuleToDistributeCoinsRequest {
}

export interface ModuleToDistributeCoinsResponse {
  coins: Coin[];
}

export interface ModuleDistributedCoinsRequest {
}

export interface ModuleDistributedCoinsResponse {
  coins: Coin[];
}

export interface GaugeByIDRequest {
  id: number;
}

export interface GaugeByIDResponse {
  gauge: Gauge | undefined;
}

export interface GaugesRequest {
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

export interface GaugesResponse {
  data: Gauge[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

export interface ActiveGaugesRequest {
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

export interface ActiveGaugesResponse {
  data: Gauge[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

export interface ActiveGaugesPerDenomRequest {
  denom: string;
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

export interface ActiveGaugesPerDenomResponse {
  data: Gauge[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

export interface UpcomingGaugesRequest {
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

export interface UpcomingGaugesResponse {
  data: Gauge[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

export interface UpcomingGaugesPerDenomRequest {
  denom: string;
  pagination: PageRequest | undefined;
}

export interface UpcomingGaugesPerDenomResponse {
  upcomingGauges: Gauge[];
  pagination: PageResponse | undefined;
}

export interface RewardsEstRequest {
  owner: string;
  lockIds: number[];
  endEpoch: number;
}

export interface RewardsEstResponse {
  coins: Coin[];
}

export interface QueryLockableDurationsRequest {
}

export interface QueryLockableDurationsResponse {
  lockableDurations: Duration[];
}

function createBaseModuleToDistributeCoinsRequest(): ModuleToDistributeCoinsRequest {
  return {};
}

export const ModuleToDistributeCoinsRequest = {
  encode(_: ModuleToDistributeCoinsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleToDistributeCoinsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleToDistributeCoinsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ModuleToDistributeCoinsRequest {
    return {};
  },

  toJSON(_: ModuleToDistributeCoinsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModuleToDistributeCoinsRequest>, I>>(_: I): ModuleToDistributeCoinsRequest {
    const message = createBaseModuleToDistributeCoinsRequest();
    return message;
  },
};

function createBaseModuleToDistributeCoinsResponse(): ModuleToDistributeCoinsResponse {
  return { coins: [] };
}

export const ModuleToDistributeCoinsResponse = {
  encode(message: ModuleToDistributeCoinsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleToDistributeCoinsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleToDistributeCoinsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModuleToDistributeCoinsResponse {
    return { coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: ModuleToDistributeCoinsResponse): unknown {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModuleToDistributeCoinsResponse>, I>>(
    object: I,
  ): ModuleToDistributeCoinsResponse {
    const message = createBaseModuleToDistributeCoinsResponse();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseModuleDistributedCoinsRequest(): ModuleDistributedCoinsRequest {
  return {};
}

export const ModuleDistributedCoinsRequest = {
  encode(_: ModuleDistributedCoinsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleDistributedCoinsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleDistributedCoinsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ModuleDistributedCoinsRequest {
    return {};
  },

  toJSON(_: ModuleDistributedCoinsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModuleDistributedCoinsRequest>, I>>(_: I): ModuleDistributedCoinsRequest {
    const message = createBaseModuleDistributedCoinsRequest();
    return message;
  },
};

function createBaseModuleDistributedCoinsResponse(): ModuleDistributedCoinsResponse {
  return { coins: [] };
}

export const ModuleDistributedCoinsResponse = {
  encode(message: ModuleDistributedCoinsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ModuleDistributedCoinsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseModuleDistributedCoinsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ModuleDistributedCoinsResponse {
    return { coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: ModuleDistributedCoinsResponse): unknown {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ModuleDistributedCoinsResponse>, I>>(
    object: I,
  ): ModuleDistributedCoinsResponse {
    const message = createBaseModuleDistributedCoinsResponse();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGaugeByIDRequest(): GaugeByIDRequest {
  return { id: 0 };
}

export const GaugeByIDRequest = {
  encode(message: GaugeByIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GaugeByIDRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugeByIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GaugeByIDRequest {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: GaugeByIDRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GaugeByIDRequest>, I>>(object: I): GaugeByIDRequest {
    const message = createBaseGaugeByIDRequest();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseGaugeByIDResponse(): GaugeByIDResponse {
  return { gauge: undefined };
}

export const GaugeByIDResponse = {
  encode(message: GaugeByIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gauge !== undefined) {
      Gauge.encode(message.gauge, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GaugeByIDResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugeByIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gauge = Gauge.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GaugeByIDResponse {
    return { gauge: isSet(object.gauge) ? Gauge.fromJSON(object.gauge) : undefined };
  },

  toJSON(message: GaugeByIDResponse): unknown {
    const obj: any = {};
    message.gauge !== undefined && (obj.gauge = message.gauge ? Gauge.toJSON(message.gauge) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GaugeByIDResponse>, I>>(object: I): GaugeByIDResponse {
    const message = createBaseGaugeByIDResponse();
    message.gauge = (object.gauge !== undefined && object.gauge !== null) ? Gauge.fromPartial(object.gauge) : undefined;
    return message;
  },
};

function createBaseGaugesRequest(): GaugesRequest {
  return { pagination: undefined };
}

export const GaugesRequest = {
  encode(message: GaugesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GaugesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GaugesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: GaugesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GaugesRequest>, I>>(object: I): GaugesRequest {
    const message = createBaseGaugesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseGaugesResponse(): GaugesResponse {
  return { data: [], pagination: undefined };
}

export const GaugesResponse = {
  encode(message: GaugesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GaugesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GaugesResponse {
    return {
      data: Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: GaugesResponse): unknown {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map((e) => e ? Gauge.toJSON(e) : undefined);
    } else {
      obj.data = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GaugesResponse>, I>>(object: I): GaugesResponse {
    const message = createBaseGaugesResponse();
    message.data = object.data?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveGaugesRequest(): ActiveGaugesRequest {
  return { pagination: undefined };
}

export const ActiveGaugesRequest = {
  encode(message: ActiveGaugesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveGaugesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActiveGaugesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: ActiveGaugesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActiveGaugesRequest>, I>>(object: I): ActiveGaugesRequest {
    const message = createBaseActiveGaugesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveGaugesResponse(): ActiveGaugesResponse {
  return { data: [], pagination: undefined };
}

export const ActiveGaugesResponse = {
  encode(message: ActiveGaugesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveGaugesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActiveGaugesResponse {
    return {
      data: Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: ActiveGaugesResponse): unknown {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map((e) => e ? Gauge.toJSON(e) : undefined);
    } else {
      obj.data = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActiveGaugesResponse>, I>>(object: I): ActiveGaugesResponse {
    const message = createBaseActiveGaugesResponse();
    message.data = object.data?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveGaugesPerDenomRequest(): ActiveGaugesPerDenomRequest {
  return { denom: "", pagination: undefined };
}

export const ActiveGaugesPerDenomRequest = {
  encode(message: ActiveGaugesPerDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveGaugesPerDenomRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesPerDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActiveGaugesPerDenomRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: ActiveGaugesPerDenomRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActiveGaugesPerDenomRequest>, I>>(object: I): ActiveGaugesPerDenomRequest {
    const message = createBaseActiveGaugesPerDenomRequest();
    message.denom = object.denom ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseActiveGaugesPerDenomResponse(): ActiveGaugesPerDenomResponse {
  return { data: [], pagination: undefined };
}

export const ActiveGaugesPerDenomResponse = {
  encode(message: ActiveGaugesPerDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ActiveGaugesPerDenomResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveGaugesPerDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActiveGaugesPerDenomResponse {
    return {
      data: Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: ActiveGaugesPerDenomResponse): unknown {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map((e) => e ? Gauge.toJSON(e) : undefined);
    } else {
      obj.data = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ActiveGaugesPerDenomResponse>, I>>(object: I): ActiveGaugesPerDenomResponse {
    const message = createBaseActiveGaugesPerDenomResponse();
    message.data = object.data?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingGaugesRequest(): UpcomingGaugesRequest {
  return { pagination: undefined };
}

export const UpcomingGaugesRequest = {
  encode(message: UpcomingGaugesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingGaugesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpcomingGaugesRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: UpcomingGaugesRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpcomingGaugesRequest>, I>>(object: I): UpcomingGaugesRequest {
    const message = createBaseUpcomingGaugesRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingGaugesResponse(): UpcomingGaugesResponse {
  return { data: [], pagination: undefined };
}

export const UpcomingGaugesResponse = {
  encode(message: UpcomingGaugesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.data) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingGaugesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data.push(Gauge.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpcomingGaugesResponse {
    return {
      data: Array.isArray(object?.data) ? object.data.map((e: any) => Gauge.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: UpcomingGaugesResponse): unknown {
    const obj: any = {};
    if (message.data) {
      obj.data = message.data.map((e) => e ? Gauge.toJSON(e) : undefined);
    } else {
      obj.data = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpcomingGaugesResponse>, I>>(object: I): UpcomingGaugesResponse {
    const message = createBaseUpcomingGaugesResponse();
    message.data = object.data?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingGaugesPerDenomRequest(): UpcomingGaugesPerDenomRequest {
  return { denom: "", pagination: undefined };
}

export const UpcomingGaugesPerDenomRequest = {
  encode(message: UpcomingGaugesPerDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingGaugesPerDenomRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesPerDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpcomingGaugesPerDenomRequest {
    return {
      denom: isSet(object.denom) ? String(object.denom) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: UpcomingGaugesPerDenomRequest): unknown {
    const obj: any = {};
    message.denom !== undefined && (obj.denom = message.denom);
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpcomingGaugesPerDenomRequest>, I>>(
    object: I,
  ): UpcomingGaugesPerDenomRequest {
    const message = createBaseUpcomingGaugesPerDenomRequest();
    message.denom = object.denom ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseUpcomingGaugesPerDenomResponse(): UpcomingGaugesPerDenomResponse {
  return { upcomingGauges: [], pagination: undefined };
}

export const UpcomingGaugesPerDenomResponse = {
  encode(message: UpcomingGaugesPerDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.upcomingGauges) {
      Gauge.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpcomingGaugesPerDenomResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpcomingGaugesPerDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upcomingGauges.push(Gauge.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpcomingGaugesPerDenomResponse {
    return {
      upcomingGauges: Array.isArray(object?.upcomingGauges)
        ? object.upcomingGauges.map((e: any) => Gauge.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: UpcomingGaugesPerDenomResponse): unknown {
    const obj: any = {};
    if (message.upcomingGauges) {
      obj.upcomingGauges = message.upcomingGauges.map((e) => e ? Gauge.toJSON(e) : undefined);
    } else {
      obj.upcomingGauges = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UpcomingGaugesPerDenomResponse>, I>>(
    object: I,
  ): UpcomingGaugesPerDenomResponse {
    const message = createBaseUpcomingGaugesPerDenomResponse();
    message.upcomingGauges = object.upcomingGauges?.map((e) => Gauge.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseRewardsEstRequest(): RewardsEstRequest {
  return { owner: "", lockIds: [], endEpoch: 0 };
}

export const RewardsEstRequest = {
  encode(message: RewardsEstRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    writer.uint32(18).fork();
    for (const v of message.lockIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.endEpoch !== 0) {
      writer.uint32(24).int64(message.endEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardsEstRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardsEstRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.lockIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.lockIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 3:
          message.endEpoch = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RewardsEstRequest {
    return {
      owner: isSet(object.owner) ? String(object.owner) : "",
      lockIds: Array.isArray(object?.lockIds) ? object.lockIds.map((e: any) => Number(e)) : [],
      endEpoch: isSet(object.endEpoch) ? Number(object.endEpoch) : 0,
    };
  },

  toJSON(message: RewardsEstRequest): unknown {
    const obj: any = {};
    message.owner !== undefined && (obj.owner = message.owner);
    if (message.lockIds) {
      obj.lockIds = message.lockIds.map((e) => Math.round(e));
    } else {
      obj.lockIds = [];
    }
    message.endEpoch !== undefined && (obj.endEpoch = Math.round(message.endEpoch));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RewardsEstRequest>, I>>(object: I): RewardsEstRequest {
    const message = createBaseRewardsEstRequest();
    message.owner = object.owner ?? "";
    message.lockIds = object.lockIds?.map((e) => e) || [];
    message.endEpoch = object.endEpoch ?? 0;
    return message;
  },
};

function createBaseRewardsEstResponse(): RewardsEstResponse {
  return { coins: [] };
}

export const RewardsEstResponse = {
  encode(message: RewardsEstResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RewardsEstResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRewardsEstResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RewardsEstResponse {
    return { coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [] };
  },

  toJSON(message: RewardsEstResponse): unknown {
    const obj: any = {};
    if (message.coins) {
      obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RewardsEstResponse>, I>>(object: I): RewardsEstResponse {
    const message = createBaseRewardsEstResponse();
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryLockableDurationsRequest(): QueryLockableDurationsRequest {
  return {};
}

export const QueryLockableDurationsRequest = {
  encode(_: QueryLockableDurationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLockableDurationsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLockableDurationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryLockableDurationsRequest {
    return {};
  },

  toJSON(_: QueryLockableDurationsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryLockableDurationsRequest>, I>>(_: I): QueryLockableDurationsRequest {
    const message = createBaseQueryLockableDurationsRequest();
    return message;
  },
};

function createBaseQueryLockableDurationsResponse(): QueryLockableDurationsResponse {
  return { lockableDurations: [] };
}

export const QueryLockableDurationsResponse = {
  encode(message: QueryLockableDurationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.lockableDurations) {
      Duration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryLockableDurationsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryLockableDurationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lockableDurations.push(Duration.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryLockableDurationsResponse {
    return {
      lockableDurations: Array.isArray(object?.lockableDurations)
        ? object.lockableDurations.map((e: any) => Duration.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryLockableDurationsResponse): unknown {
    const obj: any = {};
    if (message.lockableDurations) {
      obj.lockableDurations = message.lockableDurations.map((e) => e ? Duration.toJSON(e) : undefined);
    } else {
      obj.lockableDurations = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryLockableDurationsResponse>, I>>(
    object: I,
  ): QueryLockableDurationsResponse {
    const message = createBaseQueryLockableDurationsResponse();
    message.lockableDurations = object.lockableDurations?.map((e) => Duration.fromPartial(e)) || [];
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** returns coins that is going to be distributed */
  ModuleToDistributeCoins(request: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse>;
  /** returns coins that are distributed by module so far */
  ModuleDistributedCoins(request: ModuleDistributedCoinsRequest): Promise<ModuleDistributedCoinsResponse>;
  /** returns Gauge by id */
  GaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse>;
  /** returns gauges both upcoming and active */
  Gauges(request: GaugesRequest): Promise<GaugesResponse>;
  /** returns active gauges */
  ActiveGauges(request: ActiveGaugesRequest): Promise<ActiveGaugesResponse>;
  /** returns active gauges per denom */
  ActiveGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse>;
  /** returns scheduled gauges */
  UpcomingGauges(request: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse>;
  /** returns scheduled gauges per denom */
  UpcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse>;
  /**
   * RewardsEst returns an estimate of the rewards at a future specific time.
   * The querier either provides an address or a set of locks
   * for which they want to find the associated rewards.
   */
  RewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse>;
  /** returns lockable durations that are valid to give incentives */
  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.ModuleToDistributeCoins = this.ModuleToDistributeCoins.bind(this);
    this.ModuleDistributedCoins = this.ModuleDistributedCoins.bind(this);
    this.GaugeByID = this.GaugeByID.bind(this);
    this.Gauges = this.Gauges.bind(this);
    this.ActiveGauges = this.ActiveGauges.bind(this);
    this.ActiveGaugesPerDenom = this.ActiveGaugesPerDenom.bind(this);
    this.UpcomingGauges = this.UpcomingGauges.bind(this);
    this.UpcomingGaugesPerDenom = this.UpcomingGaugesPerDenom.bind(this);
    this.RewardsEst = this.RewardsEst.bind(this);
    this.LockableDurations = this.LockableDurations.bind(this);
  }
  ModuleToDistributeCoins(request: ModuleToDistributeCoinsRequest): Promise<ModuleToDistributeCoinsResponse> {
    const data = ModuleToDistributeCoinsRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "ModuleToDistributeCoins", data);
    return promise.then((data) => ModuleToDistributeCoinsResponse.decode(new _m0.Reader(data)));
  }

  ModuleDistributedCoins(request: ModuleDistributedCoinsRequest): Promise<ModuleDistributedCoinsResponse> {
    const data = ModuleDistributedCoinsRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "ModuleDistributedCoins", data);
    return promise.then((data) => ModuleDistributedCoinsResponse.decode(new _m0.Reader(data)));
  }

  GaugeByID(request: GaugeByIDRequest): Promise<GaugeByIDResponse> {
    const data = GaugeByIDRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "GaugeByID", data);
    return promise.then((data) => GaugeByIDResponse.decode(new _m0.Reader(data)));
  }

  Gauges(request: GaugesRequest): Promise<GaugesResponse> {
    const data = GaugesRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "Gauges", data);
    return promise.then((data) => GaugesResponse.decode(new _m0.Reader(data)));
  }

  ActiveGauges(request: ActiveGaugesRequest): Promise<ActiveGaugesResponse> {
    const data = ActiveGaugesRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "ActiveGauges", data);
    return promise.then((data) => ActiveGaugesResponse.decode(new _m0.Reader(data)));
  }

  ActiveGaugesPerDenom(request: ActiveGaugesPerDenomRequest): Promise<ActiveGaugesPerDenomResponse> {
    const data = ActiveGaugesPerDenomRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "ActiveGaugesPerDenom", data);
    return promise.then((data) => ActiveGaugesPerDenomResponse.decode(new _m0.Reader(data)));
  }

  UpcomingGauges(request: UpcomingGaugesRequest): Promise<UpcomingGaugesResponse> {
    const data = UpcomingGaugesRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "UpcomingGauges", data);
    return promise.then((data) => UpcomingGaugesResponse.decode(new _m0.Reader(data)));
  }

  UpcomingGaugesPerDenom(request: UpcomingGaugesPerDenomRequest): Promise<UpcomingGaugesPerDenomResponse> {
    const data = UpcomingGaugesPerDenomRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "UpcomingGaugesPerDenom", data);
    return promise.then((data) => UpcomingGaugesPerDenomResponse.decode(new _m0.Reader(data)));
  }

  RewardsEst(request: RewardsEstRequest): Promise<RewardsEstResponse> {
    const data = RewardsEstRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "RewardsEst", data);
    return promise.then((data) => RewardsEstResponse.decode(new _m0.Reader(data)));
  }

  LockableDurations(request: QueryLockableDurationsRequest): Promise<QueryLockableDurationsResponse> {
    const data = QueryLockableDurationsRequest.encode(request).finish();
    const promise = this.rpc.request("oppyfinance.oppychain.incentives.Query", "LockableDurations", data);
    return promise.then((data) => QueryLockableDurationsResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
