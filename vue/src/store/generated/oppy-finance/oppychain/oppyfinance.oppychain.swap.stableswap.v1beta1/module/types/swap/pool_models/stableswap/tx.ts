/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { PoolParams } from "../../../swap/pool_models/stableswap/stableswap_pool";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "oppyfinance.oppychain.swap.stableswap.v1beta1";

export interface MsgCreateStableswapPool {
  sender: string;
  poolParams: PoolParams | undefined;
  initial_pool_liquidity: Coin[];
  future_pool_governor: string;
}

export interface MsgCreateStableswapPoolResponse {
  pool_id: number;
}

export interface MsgStableSwapAdjustScalingFactors {
  /**
   * Sender must be the pool's scaling_factor_governor in order for the tx to
   * succeed
   */
  sender: string;
  pool_id: number;
  scaling_factors: number[];
}

export interface MsgStableSwapAdjustScalingFactorsResponse {}

const baseMsgCreateStableswapPool: object = {
  sender: "",
  future_pool_governor: "",
};

export const MsgCreateStableswapPool = {
  encode(
    message: MsgCreateStableswapPool,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolParams !== undefined) {
      PoolParams.encode(message.poolParams, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.initial_pool_liquidity) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.future_pool_governor !== "") {
      writer.uint32(34).string(message.future_pool_governor);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateStableswapPool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateStableswapPool,
    } as MsgCreateStableswapPool;
    message.initial_pool_liquidity = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolParams = PoolParams.decode(reader, reader.uint32());
          break;
        case 3:
          message.initial_pool_liquidity.push(
            Coin.decode(reader, reader.uint32())
          );
          break;
        case 4:
          message.future_pool_governor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateStableswapPool {
    const message = {
      ...baseMsgCreateStableswapPool,
    } as MsgCreateStableswapPool;
    message.initial_pool_liquidity = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    if (object.poolParams !== undefined && object.poolParams !== null) {
      message.poolParams = PoolParams.fromJSON(object.poolParams);
    } else {
      message.poolParams = undefined;
    }
    if (
      object.initial_pool_liquidity !== undefined &&
      object.initial_pool_liquidity !== null
    ) {
      for (const e of object.initial_pool_liquidity) {
        message.initial_pool_liquidity.push(Coin.fromJSON(e));
      }
    }
    if (
      object.future_pool_governor !== undefined &&
      object.future_pool_governor !== null
    ) {
      message.future_pool_governor = String(object.future_pool_governor);
    } else {
      message.future_pool_governor = "";
    }
    return message;
  },

  toJSON(message: MsgCreateStableswapPool): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolParams !== undefined &&
      (obj.poolParams = message.poolParams
        ? PoolParams.toJSON(message.poolParams)
        : undefined);
    if (message.initial_pool_liquidity) {
      obj.initial_pool_liquidity = message.initial_pool_liquidity.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.initial_pool_liquidity = [];
    }
    message.future_pool_governor !== undefined &&
      (obj.future_pool_governor = message.future_pool_governor);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateStableswapPool>
  ): MsgCreateStableswapPool {
    const message = {
      ...baseMsgCreateStableswapPool,
    } as MsgCreateStableswapPool;
    message.initial_pool_liquidity = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    if (object.poolParams !== undefined && object.poolParams !== null) {
      message.poolParams = PoolParams.fromPartial(object.poolParams);
    } else {
      message.poolParams = undefined;
    }
    if (
      object.initial_pool_liquidity !== undefined &&
      object.initial_pool_liquidity !== null
    ) {
      for (const e of object.initial_pool_liquidity) {
        message.initial_pool_liquidity.push(Coin.fromPartial(e));
      }
    }
    if (
      object.future_pool_governor !== undefined &&
      object.future_pool_governor !== null
    ) {
      message.future_pool_governor = object.future_pool_governor;
    } else {
      message.future_pool_governor = "";
    }
    return message;
  },
};

const baseMsgCreateStableswapPoolResponse: object = { pool_id: 0 };

export const MsgCreateStableswapPoolResponse = {
  encode(
    message: MsgCreateStableswapPoolResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.pool_id !== 0) {
      writer.uint32(8).uint64(message.pool_id);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgCreateStableswapPoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateStableswapPoolResponse,
    } as MsgCreateStableswapPoolResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pool_id = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateStableswapPoolResponse {
    const message = {
      ...baseMsgCreateStableswapPoolResponse,
    } as MsgCreateStableswapPoolResponse;
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = Number(object.pool_id);
    } else {
      message.pool_id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateStableswapPoolResponse): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateStableswapPoolResponse>
  ): MsgCreateStableswapPoolResponse {
    const message = {
      ...baseMsgCreateStableswapPoolResponse,
    } as MsgCreateStableswapPoolResponse;
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = object.pool_id;
    } else {
      message.pool_id = 0;
    }
    return message;
  },
};

const baseMsgStableSwapAdjustScalingFactors: object = {
  sender: "",
  pool_id: 0,
  scaling_factors: 0,
};

export const MsgStableSwapAdjustScalingFactors = {
  encode(
    message: MsgStableSwapAdjustScalingFactors,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.pool_id !== 0) {
      writer.uint32(16).uint64(message.pool_id);
    }
    writer.uint32(26).fork();
    for (const v of message.scaling_factors) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgStableSwapAdjustScalingFactors {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgStableSwapAdjustScalingFactors,
    } as MsgStableSwapAdjustScalingFactors;
    message.scaling_factors = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.pool_id = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.scaling_factors.push(
                longToNumber(reader.uint64() as Long)
              );
            }
          } else {
            message.scaling_factors.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgStableSwapAdjustScalingFactors {
    const message = {
      ...baseMsgStableSwapAdjustScalingFactors,
    } as MsgStableSwapAdjustScalingFactors;
    message.scaling_factors = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = Number(object.pool_id);
    } else {
      message.pool_id = 0;
    }
    if (
      object.scaling_factors !== undefined &&
      object.scaling_factors !== null
    ) {
      for (const e of object.scaling_factors) {
        message.scaling_factors.push(Number(e));
      }
    }
    return message;
  },

  toJSON(message: MsgStableSwapAdjustScalingFactors): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    if (message.scaling_factors) {
      obj.scaling_factors = message.scaling_factors.map((e) => e);
    } else {
      obj.scaling_factors = [];
    }
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgStableSwapAdjustScalingFactors>
  ): MsgStableSwapAdjustScalingFactors {
    const message = {
      ...baseMsgStableSwapAdjustScalingFactors,
    } as MsgStableSwapAdjustScalingFactors;
    message.scaling_factors = [];
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = object.pool_id;
    } else {
      message.pool_id = 0;
    }
    if (
      object.scaling_factors !== undefined &&
      object.scaling_factors !== null
    ) {
      for (const e of object.scaling_factors) {
        message.scaling_factors.push(e);
      }
    }
    return message;
  },
};

const baseMsgStableSwapAdjustScalingFactorsResponse: object = {};

export const MsgStableSwapAdjustScalingFactorsResponse = {
  encode(
    _: MsgStableSwapAdjustScalingFactorsResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgStableSwapAdjustScalingFactorsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgStableSwapAdjustScalingFactorsResponse,
    } as MsgStableSwapAdjustScalingFactorsResponse;
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

  fromJSON(_: any): MsgStableSwapAdjustScalingFactorsResponse {
    const message = {
      ...baseMsgStableSwapAdjustScalingFactorsResponse,
    } as MsgStableSwapAdjustScalingFactorsResponse;
    return message;
  },

  toJSON(_: MsgStableSwapAdjustScalingFactorsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgStableSwapAdjustScalingFactorsResponse>
  ): MsgStableSwapAdjustScalingFactorsResponse {
    const message = {
      ...baseMsgStableSwapAdjustScalingFactorsResponse,
    } as MsgStableSwapAdjustScalingFactorsResponse;
    return message;
  },
};

export interface Msg {
  CreateStableswapPool(
    request: MsgCreateStableswapPool
  ): Promise<MsgCreateStableswapPoolResponse>;
  StableSwapAdjustScalingFactors(
    request: MsgStableSwapAdjustScalingFactors
  ): Promise<MsgStableSwapAdjustScalingFactorsResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateStableswapPool(
    request: MsgCreateStableswapPool
  ): Promise<MsgCreateStableswapPoolResponse> {
    const data = MsgCreateStableswapPool.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.stableswap.v1beta1.Msg",
      "CreateStableswapPool",
      data
    );
    return promise.then((data) =>
      MsgCreateStableswapPoolResponse.decode(new Reader(data))
    );
  }

  StableSwapAdjustScalingFactors(
    request: MsgStableSwapAdjustScalingFactors
  ): Promise<MsgStableSwapAdjustScalingFactorsResponse> {
    const data = MsgStableSwapAdjustScalingFactors.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.stableswap.v1beta1.Msg",
      "StableSwapAdjustScalingFactors",
      data
    );
    return promise.then((data) =>
      MsgStableSwapAdjustScalingFactorsResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
