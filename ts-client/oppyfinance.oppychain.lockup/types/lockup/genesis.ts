/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PeriodLock, SyntheticLock } from "./lock";

export const protobufPackage = "oppyfinance.oppychain.lockup";

/** GenesisState defines the lockup module's genesis state. */
export interface GenesisState {
  lastLockId: number;
  locks: PeriodLock[];
  syntheticLocks: SyntheticLock[];
}

function createBaseGenesisState(): GenesisState {
  return { lastLockId: 0, locks: [], syntheticLocks: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.lastLockId !== 0) {
      writer.uint32(8).uint64(message.lastLockId);
    }
    for (const v of message.locks) {
      PeriodLock.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.syntheticLocks) {
      SyntheticLock.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastLockId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.locks.push(PeriodLock.decode(reader, reader.uint32()));
          break;
        case 3:
          message.syntheticLocks.push(SyntheticLock.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      lastLockId: isSet(object.lastLockId) ? Number(object.lastLockId) : 0,
      locks: Array.isArray(object?.locks) ? object.locks.map((e: any) => PeriodLock.fromJSON(e)) : [],
      syntheticLocks: Array.isArray(object?.syntheticLocks)
        ? object.syntheticLocks.map((e: any) => SyntheticLock.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.lastLockId !== undefined && (obj.lastLockId = Math.round(message.lastLockId));
    if (message.locks) {
      obj.locks = message.locks.map((e) => e ? PeriodLock.toJSON(e) : undefined);
    } else {
      obj.locks = [];
    }
    if (message.syntheticLocks) {
      obj.syntheticLocks = message.syntheticLocks.map((e) => e ? SyntheticLock.toJSON(e) : undefined);
    } else {
      obj.syntheticLocks = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.lastLockId = object.lastLockId ?? 0;
    message.locks = object.locks?.map((e) => PeriodLock.fromPartial(e)) || [];
    message.syntheticLocks = object.syntheticLocks?.map((e) => SyntheticLock.fromPartial(e)) || [];
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
