/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "oppyfinance.oppychain.swap.stableswap.v1beta1";

/**
 * PoolParams defined the parameters that will be managed by the pool
 * governance in the future. This params are not managed by the chain
 * governance. Instead they will be managed by the token holders of the pool.
 * The pool's token holders are specified in future_pool_governor.
 */
export interface PoolParams {
  swapFee: string;
  exitFee: string;
}

/** Pool is the stableswap Pool struct */
export interface Pool {
  address: string;
  id: number;
  poolParams: PoolParams | undefined;
  /**
   * This string specifies who will govern the pool in the future.
   * Valid forms of this are:
   * {token name},{duration}
   * {duration}
   * where {token name} if specified is the token which determines the
   * governor, and if not specified is the LP token for this pool.duration is
   * a time specified as 0w,1w,2w, etc. which specifies how long the token
   * would need to be locked up to count in governance. 0w means no lockup.
   */
  future_pool_governor: string;
  /** sum of all LP shares */
  totalShares: Coin | undefined;
  /** assets in the pool */
  poolLiquidity: Coin[];
  /** for calculation amognst assets with different precisions */
  scaling_factor: number[];
  /** scaling_factor_governor is the address can adjust pool scaling factors */
  scaling_factor_governor: string;
}

const basePoolParams: object = { swapFee: "", exitFee: "" };

export const PoolParams = {
  encode(message: PoolParams, writer: Writer = Writer.create()): Writer {
    if (message.swapFee !== "") {
      writer.uint32(10).string(message.swapFee);
    }
    if (message.exitFee !== "") {
      writer.uint32(18).string(message.exitFee);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PoolParams {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePoolParams } as PoolParams;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swapFee = reader.string();
          break;
        case 2:
          message.exitFee = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PoolParams {
    const message = { ...basePoolParams } as PoolParams;
    if (object.swapFee !== undefined && object.swapFee !== null) {
      message.swapFee = String(object.swapFee);
    } else {
      message.swapFee = "";
    }
    if (object.exitFee !== undefined && object.exitFee !== null) {
      message.exitFee = String(object.exitFee);
    } else {
      message.exitFee = "";
    }
    return message;
  },

  toJSON(message: PoolParams): unknown {
    const obj: any = {};
    message.swapFee !== undefined && (obj.swapFee = message.swapFee);
    message.exitFee !== undefined && (obj.exitFee = message.exitFee);
    return obj;
  },

  fromPartial(object: DeepPartial<PoolParams>): PoolParams {
    const message = { ...basePoolParams } as PoolParams;
    if (object.swapFee !== undefined && object.swapFee !== null) {
      message.swapFee = object.swapFee;
    } else {
      message.swapFee = "";
    }
    if (object.exitFee !== undefined && object.exitFee !== null) {
      message.exitFee = object.exitFee;
    } else {
      message.exitFee = "";
    }
    return message;
  },
};

const basePool: object = {
  address: "",
  id: 0,
  future_pool_governor: "",
  scaling_factor: 0,
  scaling_factor_governor: "",
};

export const Pool = {
  encode(message: Pool, writer: Writer = Writer.create()): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.id !== 0) {
      writer.uint32(16).uint64(message.id);
    }
    if (message.poolParams !== undefined) {
      PoolParams.encode(message.poolParams, writer.uint32(26).fork()).ldelim();
    }
    if (message.future_pool_governor !== "") {
      writer.uint32(34).string(message.future_pool_governor);
    }
    if (message.totalShares !== undefined) {
      Coin.encode(message.totalShares, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.poolLiquidity) {
      Coin.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    writer.uint32(58).fork();
    for (const v of message.scaling_factor) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.scaling_factor_governor !== "") {
      writer.uint32(66).string(message.scaling_factor_governor);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Pool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePool } as Pool;
    message.poolLiquidity = [];
    message.scaling_factor = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.poolParams = PoolParams.decode(reader, reader.uint32());
          break;
        case 4:
          message.future_pool_governor = reader.string();
          break;
        case 5:
          message.totalShares = Coin.decode(reader, reader.uint32());
          break;
        case 6:
          message.poolLiquidity.push(Coin.decode(reader, reader.uint32()));
          break;
        case 7:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.scaling_factor.push(
                longToNumber(reader.uint64() as Long)
              );
            }
          } else {
            message.scaling_factor.push(longToNumber(reader.uint64() as Long));
          }
          break;
        case 8:
          message.scaling_factor_governor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Pool {
    const message = { ...basePool } as Pool;
    message.poolLiquidity = [];
    message.scaling_factor = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.poolParams !== undefined && object.poolParams !== null) {
      message.poolParams = PoolParams.fromJSON(object.poolParams);
    } else {
      message.poolParams = undefined;
    }
    if (
      object.future_pool_governor !== undefined &&
      object.future_pool_governor !== null
    ) {
      message.future_pool_governor = String(object.future_pool_governor);
    } else {
      message.future_pool_governor = "";
    }
    if (object.totalShares !== undefined && object.totalShares !== null) {
      message.totalShares = Coin.fromJSON(object.totalShares);
    } else {
      message.totalShares = undefined;
    }
    if (object.poolLiquidity !== undefined && object.poolLiquidity !== null) {
      for (const e of object.poolLiquidity) {
        message.poolLiquidity.push(Coin.fromJSON(e));
      }
    }
    if (object.scaling_factor !== undefined && object.scaling_factor !== null) {
      for (const e of object.scaling_factor) {
        message.scaling_factor.push(Number(e));
      }
    }
    if (
      object.scaling_factor_governor !== undefined &&
      object.scaling_factor_governor !== null
    ) {
      message.scaling_factor_governor = String(object.scaling_factor_governor);
    } else {
      message.scaling_factor_governor = "";
    }
    return message;
  },

  toJSON(message: Pool): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.id !== undefined && (obj.id = message.id);
    message.poolParams !== undefined &&
      (obj.poolParams = message.poolParams
        ? PoolParams.toJSON(message.poolParams)
        : undefined);
    message.future_pool_governor !== undefined &&
      (obj.future_pool_governor = message.future_pool_governor);
    message.totalShares !== undefined &&
      (obj.totalShares = message.totalShares
        ? Coin.toJSON(message.totalShares)
        : undefined);
    if (message.poolLiquidity) {
      obj.poolLiquidity = message.poolLiquidity.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.poolLiquidity = [];
    }
    if (message.scaling_factor) {
      obj.scaling_factor = message.scaling_factor.map((e) => e);
    } else {
      obj.scaling_factor = [];
    }
    message.scaling_factor_governor !== undefined &&
      (obj.scaling_factor_governor = message.scaling_factor_governor);
    return obj;
  },

  fromPartial(object: DeepPartial<Pool>): Pool {
    const message = { ...basePool } as Pool;
    message.poolLiquidity = [];
    message.scaling_factor = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.poolParams !== undefined && object.poolParams !== null) {
      message.poolParams = PoolParams.fromPartial(object.poolParams);
    } else {
      message.poolParams = undefined;
    }
    if (
      object.future_pool_governor !== undefined &&
      object.future_pool_governor !== null
    ) {
      message.future_pool_governor = object.future_pool_governor;
    } else {
      message.future_pool_governor = "";
    }
    if (object.totalShares !== undefined && object.totalShares !== null) {
      message.totalShares = Coin.fromPartial(object.totalShares);
    } else {
      message.totalShares = undefined;
    }
    if (object.poolLiquidity !== undefined && object.poolLiquidity !== null) {
      for (const e of object.poolLiquidity) {
        message.poolLiquidity.push(Coin.fromPartial(e));
      }
    }
    if (object.scaling_factor !== undefined && object.scaling_factor !== null) {
      for (const e of object.scaling_factor) {
        message.scaling_factor.push(e);
      }
    }
    if (
      object.scaling_factor_governor !== undefined &&
      object.scaling_factor_governor !== null
    ) {
      message.scaling_factor_governor = object.scaling_factor_governor;
    } else {
      message.scaling_factor_governor = "";
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
