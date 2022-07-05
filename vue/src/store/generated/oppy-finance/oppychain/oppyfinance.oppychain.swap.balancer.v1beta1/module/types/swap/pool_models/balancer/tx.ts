/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import {
  PoolParams,
  PoolAsset,
} from "../../../swap/pool_models/balancer/balancerPool";

export const protobufPackage = "oppyfinance.oppychain.swap.balancer.v1beta1";

/** ===================== MsgCreatePool */
export interface MsgCreateBalancerPool {
  sender: string;
  poolParams: PoolParams | undefined;
  poolAssets: PoolAsset[];
  future_pool_governor: string;
}

export interface MsgCreateBalancerPoolResponse {
  pool_id: number;
}

const baseMsgCreateBalancerPool: object = {
  sender: "",
  future_pool_governor: "",
};

export const MsgCreateBalancerPool = {
  encode(
    message: MsgCreateBalancerPool,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolParams !== undefined) {
      PoolParams.encode(message.poolParams, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.poolAssets) {
      PoolAsset.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.future_pool_governor !== "") {
      writer.uint32(34).string(message.future_pool_governor);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgCreateBalancerPool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateBalancerPool } as MsgCreateBalancerPool;
    message.poolAssets = [];
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
          message.poolAssets.push(PoolAsset.decode(reader, reader.uint32()));
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

  fromJSON(object: any): MsgCreateBalancerPool {
    const message = { ...baseMsgCreateBalancerPool } as MsgCreateBalancerPool;
    message.poolAssets = [];
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
    if (object.poolAssets !== undefined && object.poolAssets !== null) {
      for (const e of object.poolAssets) {
        message.poolAssets.push(PoolAsset.fromJSON(e));
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

  toJSON(message: MsgCreateBalancerPool): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    message.poolParams !== undefined &&
      (obj.poolParams = message.poolParams
        ? PoolParams.toJSON(message.poolParams)
        : undefined);
    if (message.poolAssets) {
      obj.poolAssets = message.poolAssets.map((e) =>
        e ? PoolAsset.toJSON(e) : undefined
      );
    } else {
      obj.poolAssets = [];
    }
    message.future_pool_governor !== undefined &&
      (obj.future_pool_governor = message.future_pool_governor);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateBalancerPool>
  ): MsgCreateBalancerPool {
    const message = { ...baseMsgCreateBalancerPool } as MsgCreateBalancerPool;
    message.poolAssets = [];
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
    if (object.poolAssets !== undefined && object.poolAssets !== null) {
      for (const e of object.poolAssets) {
        message.poolAssets.push(PoolAsset.fromPartial(e));
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

const baseMsgCreateBalancerPoolResponse: object = { pool_id: 0 };

export const MsgCreateBalancerPoolResponse = {
  encode(
    message: MsgCreateBalancerPoolResponse,
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
  ): MsgCreateBalancerPoolResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgCreateBalancerPoolResponse,
    } as MsgCreateBalancerPoolResponse;
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

  fromJSON(object: any): MsgCreateBalancerPoolResponse {
    const message = {
      ...baseMsgCreateBalancerPoolResponse,
    } as MsgCreateBalancerPoolResponse;
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = Number(object.pool_id);
    } else {
      message.pool_id = 0;
    }
    return message;
  },

  toJSON(message: MsgCreateBalancerPoolResponse): unknown {
    const obj: any = {};
    message.pool_id !== undefined && (obj.pool_id = message.pool_id);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateBalancerPoolResponse>
  ): MsgCreateBalancerPoolResponse {
    const message = {
      ...baseMsgCreateBalancerPoolResponse,
    } as MsgCreateBalancerPoolResponse;
    if (object.pool_id !== undefined && object.pool_id !== null) {
      message.pool_id = object.pool_id;
    } else {
      message.pool_id = 0;
    }
    return message;
  },
};

export interface Msg {
  CreateBalancerPool(
    request: MsgCreateBalancerPool
  ): Promise<MsgCreateBalancerPoolResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CreateBalancerPool(
    request: MsgCreateBalancerPool
  ): Promise<MsgCreateBalancerPoolResponse> {
    const data = MsgCreateBalancerPool.encode(request).finish();
    const promise = this.rpc.request(
      "oppyfinance.oppychain.swap.balancer.v1beta1.Msg",
      "CreateBalancerPool",
      data
    );
    return promise.then((data) =>
      MsgCreateBalancerPoolResponse.decode(new Reader(data))
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
