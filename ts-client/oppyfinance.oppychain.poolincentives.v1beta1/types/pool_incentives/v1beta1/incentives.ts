/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Duration } from "../../google/protobuf/duration";

export const protobufPackage = "oppyfinance.oppychain.poolincentives.v1beta1";

export interface Params {
  /**
   * minted_denom is the denomination of the coin expected to be minted by the
   * minting module. Pool-incentives module doesn’t actually mint the coin
   * itself, but rather manages the distribution of coins that matches the
   * defined minted_denom.
   */
  mintedDenom: string;
}

export interface LockableDurationsInfo {
  lockableDurations: Duration[];
}

export interface DistrInfo {
  totalWeight: string;
  records: DistrRecord[];
}

export interface DistrRecord {
  gaugeId: number;
  weight: string;
}

function createBaseParams(): Params {
  return { mintedDenom: "" };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mintedDenom !== "") {
      writer.uint32(10).string(message.mintedDenom);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mintedDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return { mintedDenom: isSet(object.mintedDenom) ? String(object.mintedDenom) : "" };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.mintedDenom !== undefined && (obj.mintedDenom = message.mintedDenom);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.mintedDenom = object.mintedDenom ?? "";
    return message;
  },
};

function createBaseLockableDurationsInfo(): LockableDurationsInfo {
  return { lockableDurations: [] };
}

export const LockableDurationsInfo = {
  encode(message: LockableDurationsInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.lockableDurations) {
      Duration.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LockableDurationsInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLockableDurationsInfo();
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

  fromJSON(object: any): LockableDurationsInfo {
    return {
      lockableDurations: Array.isArray(object?.lockableDurations)
        ? object.lockableDurations.map((e: any) => Duration.fromJSON(e))
        : [],
    };
  },

  toJSON(message: LockableDurationsInfo): unknown {
    const obj: any = {};
    if (message.lockableDurations) {
      obj.lockableDurations = message.lockableDurations.map((e) => e ? Duration.toJSON(e) : undefined);
    } else {
      obj.lockableDurations = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LockableDurationsInfo>, I>>(object: I): LockableDurationsInfo {
    const message = createBaseLockableDurationsInfo();
    message.lockableDurations = object.lockableDurations?.map((e) => Duration.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDistrInfo(): DistrInfo {
  return { totalWeight: "", records: [] };
}

export const DistrInfo = {
  encode(message: DistrInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.totalWeight !== "") {
      writer.uint32(10).string(message.totalWeight);
    }
    for (const v of message.records) {
      DistrRecord.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistrInfo {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistrInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalWeight = reader.string();
          break;
        case 2:
          message.records.push(DistrRecord.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DistrInfo {
    return {
      totalWeight: isSet(object.totalWeight) ? String(object.totalWeight) : "",
      records: Array.isArray(object?.records) ? object.records.map((e: any) => DistrRecord.fromJSON(e)) : [],
    };
  },

  toJSON(message: DistrInfo): unknown {
    const obj: any = {};
    message.totalWeight !== undefined && (obj.totalWeight = message.totalWeight);
    if (message.records) {
      obj.records = message.records.map((e) => e ? DistrRecord.toJSON(e) : undefined);
    } else {
      obj.records = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DistrInfo>, I>>(object: I): DistrInfo {
    const message = createBaseDistrInfo();
    message.totalWeight = object.totalWeight ?? "";
    message.records = object.records?.map((e) => DistrRecord.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDistrRecord(): DistrRecord {
  return { gaugeId: 0, weight: "" };
}

export const DistrRecord = {
  encode(message: DistrRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.gaugeId !== 0) {
      writer.uint32(8).uint64(message.gaugeId);
    }
    if (message.weight !== "") {
      writer.uint32(18).string(message.weight);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DistrRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDistrRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gaugeId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.weight = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DistrRecord {
    return {
      gaugeId: isSet(object.gaugeId) ? Number(object.gaugeId) : 0,
      weight: isSet(object.weight) ? String(object.weight) : "",
    };
  },

  toJSON(message: DistrRecord): unknown {
    const obj: any = {};
    message.gaugeId !== undefined && (obj.gaugeId = Math.round(message.gaugeId));
    message.weight !== undefined && (obj.weight = message.weight);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DistrRecord>, I>>(object: I): DistrRecord {
    const message = createBaseDistrRecord();
    message.gaugeId = object.gaugeId ?? 0;
    message.weight = object.weight ?? "";
    return message;
  },
};

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
