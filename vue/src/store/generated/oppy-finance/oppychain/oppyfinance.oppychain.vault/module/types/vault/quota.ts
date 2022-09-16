/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";
import { Coin } from "../cosmos/base/v1beta1/coin";

export const protobufPackage = "oppyfinance.oppychain.vault";

export interface historicalAmount {
  blockHeight: number;
  amount: Coin[];
}

export interface coinsQuota {
  history: historicalAmount[];
  CoinsSum: Coin[];
}

const basehistoricalAmount: object = { blockHeight: 0 };

export const historicalAmount = {
  encode(message: historicalAmount, writer: Writer = Writer.create()): Writer {
    if (message.blockHeight !== 0) {
      writer.uint32(8).int64(message.blockHeight);
    }
    for (const v of message.amount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): historicalAmount {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basehistoricalAmount } as historicalAmount;
    message.amount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.blockHeight = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.amount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): historicalAmount {
    const message = { ...basehistoricalAmount } as historicalAmount;
    message.amount = [];
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = Number(object.blockHeight);
    } else {
      message.blockHeight = 0;
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: historicalAmount): unknown {
    const obj: any = {};
    message.blockHeight !== undefined &&
      (obj.blockHeight = message.blockHeight);
    if (message.amount) {
      obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
    } else {
      obj.amount = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<historicalAmount>): historicalAmount {
    const message = { ...basehistoricalAmount } as historicalAmount;
    message.amount = [];
    if (object.blockHeight !== undefined && object.blockHeight !== null) {
      message.blockHeight = object.blockHeight;
    } else {
      message.blockHeight = 0;
    }
    if (object.amount !== undefined && object.amount !== null) {
      for (const e of object.amount) {
        message.amount.push(Coin.fromPartial(e));
      }
    }
    return message;
  },
};

const basecoinsQuota: object = {};

export const coinsQuota = {
  encode(message: coinsQuota, writer: Writer = Writer.create()): Writer {
    for (const v of message.history) {
      historicalAmount.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.CoinsSum) {
      Coin.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): coinsQuota {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basecoinsQuota } as coinsQuota;
    message.history = [];
    message.CoinsSum = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.history.push(
            historicalAmount.decode(reader, reader.uint32())
          );
          break;
        case 3:
          message.CoinsSum.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): coinsQuota {
    const message = { ...basecoinsQuota } as coinsQuota;
    message.history = [];
    message.CoinsSum = [];
    if (object.history !== undefined && object.history !== null) {
      for (const e of object.history) {
        message.history.push(historicalAmount.fromJSON(e));
      }
    }
    if (object.CoinsSum !== undefined && object.CoinsSum !== null) {
      for (const e of object.CoinsSum) {
        message.CoinsSum.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: coinsQuota): unknown {
    const obj: any = {};
    if (message.history) {
      obj.history = message.history.map((e) =>
        e ? historicalAmount.toJSON(e) : undefined
      );
    } else {
      obj.history = [];
    }
    if (message.CoinsSum) {
      obj.CoinsSum = message.CoinsSum.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.CoinsSum = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<coinsQuota>): coinsQuota {
    const message = { ...basecoinsQuota } as coinsQuota;
    message.history = [];
    message.CoinsSum = [];
    if (object.history !== undefined && object.history !== null) {
      for (const e of object.history) {
        message.history.push(historicalAmount.fromPartial(e));
      }
    }
    if (object.CoinsSum !== undefined && object.CoinsSum !== null) {
      for (const e of object.CoinsSum) {
        message.CoinsSum.push(Coin.fromPartial(e));
      }
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
