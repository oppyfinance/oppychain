/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { Duration } from "../google/protobuf/duration";
import { Timestamp } from "../google/protobuf/timestamp";
import { QueryCondition } from "../lockup/lock";

export const protobufPackage = "oppyfinance.oppychain.incentives";

export interface Gauge {
  /** unique ID of a Gauge */
  id: number;
  /**
   * flag to show if it's perpetual or multi-epoch
   * distribution incentives by third party
   */
  isPerpetual: boolean;
  /**
   * Rewards are distributed to lockups that are are returned by at least one of
   * these queries
   */
  distributeTo:
    | QueryCondition
    | undefined;
  /**
   * total amount of Coins that has been in the gauge.
   * can distribute multiple coins
   */
  coins: Coin[];
  /** distribution start time */
  startTime:
    | Date
    | undefined;
  /** number of epochs distribution will be done */
  numEpochsPaidOver: number;
  /** number of epochs distributed already */
  filledEpochs: number;
  /** already distributed coins */
  distributedCoins: Coin[];
}

export interface LockableDurationsInfo {
  lockableDurations: Duration[];
}

function createBaseGauge(): Gauge {
  return {
    id: 0,
    isPerpetual: false,
    distributeTo: undefined,
    coins: [],
    startTime: undefined,
    numEpochsPaidOver: 0,
    filledEpochs: 0,
    distributedCoins: [],
  };
}

export const Gauge = {
  encode(message: Gauge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.isPerpetual === true) {
      writer.uint32(16).bool(message.isPerpetual);
    }
    if (message.distributeTo !== undefined) {
      QueryCondition.encode(message.distributeTo, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(toTimestamp(message.startTime), writer.uint32(42).fork()).ldelim();
    }
    if (message.numEpochsPaidOver !== 0) {
      writer.uint32(48).uint64(message.numEpochsPaidOver);
    }
    if (message.filledEpochs !== 0) {
      writer.uint32(56).uint64(message.filledEpochs);
    }
    for (const v of message.distributedCoins) {
      Coin.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Gauge {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGauge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.isPerpetual = reader.bool();
          break;
        case 3:
          message.distributeTo = QueryCondition.decode(reader, reader.uint32());
          break;
        case 4:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        case 5:
          message.startTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.numEpochsPaidOver = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.filledEpochs = longToNumber(reader.uint64() as Long);
          break;
        case 8:
          message.distributedCoins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Gauge {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      isPerpetual: isSet(object.isPerpetual) ? Boolean(object.isPerpetual) : false,
      distributeTo: isSet(object.distributeTo) ? QueryCondition.fromJSON(object.distributeTo) : undefined,
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
      startTime: isSet(object.startTime) ? fromJsonTimestamp(object.startTime) : undefined,
      numEpochsPaidOver: isSet(object.numEpochsPaidOver) ? Number(object.numEpochsPaidOver) : 0,
      filledEpochs: isSet(object.filledEpochs) ? Number(object.filledEpochs) : 0,
      distributedCoins: Array.isArray(object?.distributedCoins)
        ? object.distributedCoins.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Gauge): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.isPerpetual !== undefined && (obj.isPerpetual = message.isPerpetual);
    message.distributeTo !== undefined
      && (obj.distributeTo = message.distributeTo ? QueryCondition.toJSON(message.distributeTo) : undefined);
    if (message.coins) {
      obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.coins = [];
    }
    message.startTime !== undefined && (obj.startTime = message.startTime.toISOString());
    message.numEpochsPaidOver !== undefined && (obj.numEpochsPaidOver = Math.round(message.numEpochsPaidOver));
    message.filledEpochs !== undefined && (obj.filledEpochs = Math.round(message.filledEpochs));
    if (message.distributedCoins) {
      obj.distributedCoins = message.distributedCoins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.distributedCoins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Gauge>, I>>(object: I): Gauge {
    const message = createBaseGauge();
    message.id = object.id ?? 0;
    message.isPerpetual = object.isPerpetual ?? false;
    message.distributeTo = (object.distributeTo !== undefined && object.distributeTo !== null)
      ? QueryCondition.fromPartial(object.distributeTo)
      : undefined;
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    message.startTime = object.startTime ?? undefined;
    message.numEpochsPaidOver = object.numEpochsPaidOver ?? 0;
    message.filledEpochs = object.filledEpochs ?? 0;
    message.distributedCoins = object.distributedCoins?.map((e) => Coin.fromPartial(e)) || [];
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
