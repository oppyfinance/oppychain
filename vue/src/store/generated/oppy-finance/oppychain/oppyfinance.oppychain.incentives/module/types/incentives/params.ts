/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "oppyfinance.oppychain.incentives";

/** Params holds parameters for the incentives module */
export interface Params {
  /** distribution epoch identifier */
  distr_epoch_identifier: string;
}

const baseParams: object = { distr_epoch_identifier: "" };

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.distr_epoch_identifier !== "") {
      writer.uint32(10).string(message.distr_epoch_identifier);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.distr_epoch_identifier = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    if (
      object.distr_epoch_identifier !== undefined &&
      object.distr_epoch_identifier !== null
    ) {
      message.distr_epoch_identifier = String(object.distr_epoch_identifier);
    } else {
      message.distr_epoch_identifier = "";
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.distr_epoch_identifier !== undefined &&
      (obj.distr_epoch_identifier = message.distr_epoch_identifier);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    if (
      object.distr_epoch_identifier !== undefined &&
      object.distr_epoch_identifier !== null
    ) {
      message.distr_epoch_identifier = object.distr_epoch_identifier;
    } else {
      message.distr_epoch_identifier = "";
    }
    return message;
  },
};

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
