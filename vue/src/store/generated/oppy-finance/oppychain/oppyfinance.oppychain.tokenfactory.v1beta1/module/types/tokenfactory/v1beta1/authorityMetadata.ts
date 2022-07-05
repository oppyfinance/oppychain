/* eslint-disable */
import { Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "oppyfinance.oppychain.tokenfactory.v1beta1";

/**
 * DenomAuthorityMetadata specifies metadata for addresses that have specific
 * capabilities over a token factory denom. Right now there is only one Admin
 * permission, but is planned to be extended to the future.
 */
export interface DenomAuthorityMetadata {
  /** Can be empty for no admin, or a valid osmosis address */
  Admin: string;
}

const baseDenomAuthorityMetadata: object = { Admin: "" };

export const DenomAuthorityMetadata = {
  encode(
    message: DenomAuthorityMetadata,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.Admin !== "") {
      writer.uint32(10).string(message.Admin);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DenomAuthorityMetadata {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDenomAuthorityMetadata } as DenomAuthorityMetadata;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Admin = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DenomAuthorityMetadata {
    const message = { ...baseDenomAuthorityMetadata } as DenomAuthorityMetadata;
    if (object.Admin !== undefined && object.Admin !== null) {
      message.Admin = String(object.Admin);
    } else {
      message.Admin = "";
    }
    return message;
  },

  toJSON(message: DenomAuthorityMetadata): unknown {
    const obj: any = {};
    message.Admin !== undefined && (obj.Admin = message.Admin);
    return obj;
  },

  fromPartial(
    object: DeepPartial<DenomAuthorityMetadata>
  ): DenomAuthorityMetadata {
    const message = { ...baseDenomAuthorityMetadata } as DenomAuthorityMetadata;
    if (object.Admin !== undefined && object.Admin !== null) {
      message.Admin = object.Admin;
    } else {
      message.Admin = "";
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
