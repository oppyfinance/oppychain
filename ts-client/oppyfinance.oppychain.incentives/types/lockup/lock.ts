/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";
import { Duration } from "../google/protobuf/duration";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "oppyfinance.oppychain.lockup";

export enum LockQueryType {
  /** ByDuration - Queries for locks that are longer than a certain duration */
  ByDuration = 0,
  /** ByTime - Queries for lockups that started before a specific time */
  ByTime = 1,
  UNRECOGNIZED = -1,
}

export function lockQueryTypeFromJSON(object: any): LockQueryType {
  switch (object) {
    case 0:
    case "ByDuration":
      return LockQueryType.ByDuration;
    case 1:
    case "ByTime":
      return LockQueryType.ByTime;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LockQueryType.UNRECOGNIZED;
  }
}

export function lockQueryTypeToJSON(object: LockQueryType): string {
  switch (object) {
    case LockQueryType.ByDuration:
      return "ByDuration";
    case LockQueryType.ByTime:
      return "ByTime";
    case LockQueryType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * PeriodLock is a single unit of lock by period. It's a record of locked coin
 * at a specific time. It stores owner, duration, unlock time and the amount of
 * coins locked.
 */
export interface PeriodLock {
  ID: number;
  owner: string;
  duration: Duration | undefined;
  endTime: Date | undefined;
  coins: Coin[];
}

export interface QueryCondition {
  /** type of lock query, ByLockDuration | ByLockTime */
  lockQueryType: LockQueryType;
  /** What token denomination are we looking for lockups of */
  denom: string;
  /** valid when query condition is ByDuration */
  duration:
    | Duration
    | undefined;
  /** valid when query condition is ByTime */
  timestamp: Date | undefined;
}

/**
 * SyntheticLock is a single unit of synthetic lockup
 * TODO: Change this to have
 * * underlying_lock_id
 * * synthetic_coin
 * * end_time
 * * duration
 * * owner
 * We then index synthetic locks by the denom, just like we do with normal
 * locks. Ideally we even get an interface, so we can re-use that same logic.
 * I currently have no idea how reward distribution is supposed to be working...
 * EVENTUALLY
 * we make a "constrained_coin" field, which is what the current "coins" field
 * is. Constrained coin field can be a #post-v7 feature, since we aren't
 * allowing partial unlocks of synthetic lockups.
 */
export interface SyntheticLock {
  /** underlying native lockup id for this synthetic lockup */
  underlyingLockId: number;
  synthDenom: string;
  /**
   * used for unbonding synthetic lockups, for active synthetic lockups, this
   * value is set to uninitialized value
   */
  endTime: Date | undefined;
  duration: Duration | undefined;
}

function createBasePeriodLock(): PeriodLock {
  return { ID: 0, owner: "", duration: undefined, endTime: undefined, coins: [] };
}

export const PeriodLock = {
  encode(message: PeriodLock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ID !== 0) {
      writer.uint32(8).uint64(message.ID);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.coins) {
      Coin.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PeriodLock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeriodLock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ID = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.owner = reader.string();
          break;
        case 3:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.coins.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PeriodLock {
    return {
      ID: isSet(object.ID) ? Number(object.ID) : 0,
      owner: isSet(object.owner) ? String(object.owner) : "",
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Coin.fromJSON(e)) : [],
    };
  },

  toJSON(message: PeriodLock): unknown {
    const obj: any = {};
    message.ID !== undefined && (obj.ID = Math.round(message.ID));
    message.owner !== undefined && (obj.owner = message.owner);
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined);
    message.endTime !== undefined && (obj.endTime = message.endTime.toISOString());
    if (message.coins) {
      obj.coins = message.coins.map((e) => e ? Coin.toJSON(e) : undefined);
    } else {
      obj.coins = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PeriodLock>, I>>(object: I): PeriodLock {
    const message = createBasePeriodLock();
    message.ID = object.ID ?? 0;
    message.owner = object.owner ?? "";
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    message.endTime = object.endTime ?? undefined;
    message.coins = object.coins?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryCondition(): QueryCondition {
  return { lockQueryType: 0, denom: "", duration: undefined, timestamp: undefined };
}

export const QueryCondition = {
  encode(message: QueryCondition, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lockQueryType !== 0) {
      writer.uint32(8).int32(message.lockQueryType);
    }
    if (message.denom !== "") {
      writer.uint32(18).string(message.denom);
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(26).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryCondition {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCondition();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lockQueryType = reader.int32() as any;
          break;
        case 2:
          message.denom = reader.string();
          break;
        case 3:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCondition {
    return {
      lockQueryType: isSet(object.lockQueryType) ? lockQueryTypeFromJSON(object.lockQueryType) : 0,
      denom: isSet(object.denom) ? String(object.denom) : "",
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: QueryCondition): unknown {
    const obj: any = {};
    message.lockQueryType !== undefined && (obj.lockQueryType = lockQueryTypeToJSON(message.lockQueryType));
    message.denom !== undefined && (obj.denom = message.denom);
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined);
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryCondition>, I>>(object: I): QueryCondition {
    const message = createBaseQueryCondition();
    message.lockQueryType = object.lockQueryType ?? 0;
    message.denom = object.denom ?? "";
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseSyntheticLock(): SyntheticLock {
  return { underlyingLockId: 0, synthDenom: "", endTime: undefined, duration: undefined };
}

export const SyntheticLock = {
  encode(message: SyntheticLock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.underlyingLockId !== 0) {
      writer.uint32(8).uint64(message.underlyingLockId);
    }
    if (message.synthDenom !== "") {
      writer.uint32(18).string(message.synthDenom);
    }
    if (message.endTime !== undefined) {
      Timestamp.encode(toTimestamp(message.endTime), writer.uint32(26).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SyntheticLock {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSyntheticLock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.underlyingLockId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.synthDenom = reader.string();
          break;
        case 3:
          message.endTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.duration = Duration.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SyntheticLock {
    return {
      underlyingLockId: isSet(object.underlyingLockId) ? Number(object.underlyingLockId) : 0,
      synthDenom: isSet(object.synthDenom) ? String(object.synthDenom) : "",
      endTime: isSet(object.endTime) ? fromJsonTimestamp(object.endTime) : undefined,
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
    };
  },

  toJSON(message: SyntheticLock): unknown {
    const obj: any = {};
    message.underlyingLockId !== undefined && (obj.underlyingLockId = Math.round(message.underlyingLockId));
    message.synthDenom !== undefined && (obj.synthDenom = message.synthDenom);
    message.endTime !== undefined && (obj.endTime = message.endTime.toISOString());
    message.duration !== undefined && (obj.duration = message.duration ? Duration.toJSON(message.duration) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SyntheticLock>, I>>(object: I): SyntheticLock {
    const message = createBaseSyntheticLock();
    message.underlyingLockId = object.underlyingLockId ?? 0;
    message.synthDenom = object.synthDenom ?? "";
    message.endTime = object.endTime ?? undefined;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
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
