/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ProtobufAny {
  "@type"?: string;
}

export interface RpcStatus {
  /** @format int32 */
  code?: number;
  message?: string;
  details?: ProtobufAny[];
}

/**
* Coin defines a token with a denomination and an amount.

NOTE: The amount field is an Int which implements the custom method
signatures required by gogoproto.
*/
export interface V1Beta1Coin {
  denom?: string;
  amount?: string;
}

/**
* message SomeRequest {
         Foo some_parameter = 1;
         PageRequest pagination = 2;
 }
*/
export interface V1Beta1PageRequest {
  /**
   * key is a value returned in PageResponse.next_key to begin
   * querying the next page most efficiently. Only one of offset or key
   * should be set.
   * @format byte
   */
  key?: string;

  /**
   * offset is a numeric offset that can be used when key is unavailable.
   * It is less efficient than using key. Only one of offset or key should
   * be set.
   * @format uint64
   */
  offset?: string;

  /**
   * limit is the total number of results to be returned in the result page.
   * If left empty it will default to a value to be set by each app.
   * @format uint64
   */
  limit?: string;

  /**
   * count_total is set to true  to indicate that the result set should include
   * a count of the total number of items available for pagination in UIs.
   * count_total is only respected when offset is used. It is ignored when key
   * is set.
   */
  count_total?: boolean;

  /**
   * reverse is set to true if results are to be returned in the descending order.
   *
   * Since: cosmos-sdk 0.43
   */
  reverse?: boolean;
}

/**
* PageResponse is to be embedded in gRPC response messages where the
corresponding request message has used PageRequest.

 message SomeResponse {
         repeated Bar results = 1;
         PageResponse page = 2;
 }
*/
export interface V1Beta1PageResponse {
  /** @format byte */
  next_key?: string;

  /** @format uint64 */
  total?: string;
}

export interface VaultIssueToken {
  /** @format byte */
  creator?: string;
  index?: string;

  /** @format byte */
  coin?: string;

  /** @format byte */
  receiver?: string;
}

export interface VaultMsgCreateCreatePoolResponse {
  successful?: boolean;
}

export interface VaultMsgCreateIssueTokenResponse {
  successful?: boolean;
}

export interface VaultMsgCreateOutboundTxResponse {
  successful?: boolean;
}

export interface VaultOutboundTx {
  index?: string;
  processed?: boolean;
  items?: Record<string, Vaultproposals>;
}

export interface VaultPoolProposal {
  poolPubKey?: string;

  /** @format byte */
  poolAddr?: string;
  nodes?: string[];
}

export interface VaultQueryAllCreatePoolResponse {
  CreatePool?: VaultPoolProposal[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface VaultQueryAllIssueTokenResponse {
  IssueToken?: VaultIssueToken[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface VaultQueryAllOutboundTxResponse {
  outboundTx?: VaultOutboundTx[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface VaultQueryAllValidatorsResponse {
  all_validators?: VaultValidators[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface VaultQueryGetCreatePoolResponse {
  CreatePool?: VaultPoolProposal;
}

export interface VaultQueryGetIssueTokenResponse {
  IssueToken?: VaultIssueToken;
}

export interface VaultQueryGetOutboundTxResponse {
  outboundTx?: VaultOutboundTx;
}

export interface VaultQueryGetQuotaResponse {
  coinQuotaResponse?: VaultcoinsQuota;
}

export interface VaultQueryGetValidatorsResponse {
  validators?: VaultValidators;
}

export interface VaultQueryLastPoolResponse {
  pools?: VaultpoolInfo[];
}

export interface VaultQueryPendingFeeResponse {
  feecoin?: V1Beta1Coin[];

  /**
   * PageResponse is to be embedded in gRPC response messages where the
   * corresponding request message has used PageRequest.
   *
   *  message SomeResponse {
   *          repeated Bar results = 1;
   *          PageResponse page = 2;
   *  }
   */
  pagination?: V1Beta1PageResponse;
}

export interface VaultValidator {
  /** @format byte */
  pubkey?: string;

  /** @format int64 */
  power?: string;
}

export interface VaultValidators {
  all_validators?: VaultValidator[];

  /** @format int64 */
  height?: string;
}

export interface VaultcoinsQuota {
  history?: VaulthistoricalAmount[];
  CoinsSum?: V1Beta1Coin[];
}

export interface Vaultentity {
  /** @format byte */
  address?: string;
  feecoin?: V1Beta1Coin[];
}

export interface VaulthistoricalAmount {
  /** @format int64 */
  blockHeight?: string;
  amount?: V1Beta1Coin[];
}

export interface VaultpoolInfo {
  BlockHeight?: string;
  CreatePool?: VaultPoolProposal;
}

export interface Vaultproposals {
  entry?: Vaultentity[];
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: keyof Omit<Body, "body" | "bodyUsed">;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType) => RequestParams | void;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType = null as any;
  private securityWorker: null | ApiConfig<SecurityDataType>["securityWorker"] = null;
  private abortControllers = new Map<CancelToken, AbortController>();

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data;
  };

  private addQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];

    return (
      encodeURIComponent(key) +
      "=" +
      encodeURIComponent(Array.isArray(value) ? value.join(",") : typeof value === "number" ? value : `${value}`)
    );
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) =>
        typeof query[key] === "object" && !Array.isArray(query[key])
          ? this.toQueryString(query[key] as QueryParamsType)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((data, key) => {
        data.append(key, input[key]);
        return data;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format = "json",
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams = (secure && this.securityWorker && this.securityWorker(this.securityData)) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];

    return fetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = await response[format]()
        .then((data) => {
          if (r.ok) {
            r.data = data;
          } else {
            r.error = data;
          }
          return r;
        })
        .catch((e) => {
          r.error = e;
          return r;
        });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title vault/create_pool.proto
 * @version version not set
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Query
   * @name QueryGetQuota
   * @summary Queries a list of GetQuota items.
   * @request GET:/oppy-finance/oppychain/vault/get_quota/{query_length}
   */
  queryGetQuota = (
    query_length: number,
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<VaultQueryGetQuotaResponse, RpcStatus>({
      path: `/oppy-finance/oppychain/vault/get_quota/${query_length}`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryCreatePoolAll
   * @summary Queries a list of createPool items.
   * @request GET:/oppy/oppychain/vault/createPool
   */
  queryCreatePoolAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<VaultQueryAllCreatePoolResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/createPool`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryCreatePool
   * @summary Queries a createPool by index.
   * @request GET:/oppy/oppychain/vault/createPool/{index}
   */
  queryCreatePool = (index: string, params: RequestParams = {}) =>
    this.request<VaultQueryGetCreatePoolResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/createPool/${index}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGetLastPool
   * @summary Queries a createPool by index.
   * @request GET:/oppy/oppychain/vault/getLastPool
   */
  queryGetLastPool = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<VaultQueryLastPoolResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/getLastPool`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGetPendingFee
   * @summary Queries the pending fee
   * @request GET:/oppy/oppychain/vault/get_pending_fee
   */
  queryGetPendingFee = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<VaultQueryPendingFeeResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/get_pending_fee`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGetValidators
   * @summary Queries a list of GetValidators items.
   * @request GET:/oppy/oppychain/vault/get_validators/{height}
   */
  queryGetValidators = (height: string, params: RequestParams = {}) =>
    this.request<VaultQueryGetValidatorsResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/get_validators/${height}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryIssueTokenAll
   * @summary Queries a list of issueToken items.
   * @request GET:/oppy/oppychain/vault/issueToken
   */
  queryIssueTokenAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<VaultQueryAllIssueTokenResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/issueToken`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryIssueToken
   * @summary Queries a issueToken by index.
   * @request GET:/oppy/oppychain/vault/issueToken/{index}
   */
  queryIssueToken = (index: string, params: RequestParams = {}) =>
    this.request<VaultQueryGetIssueTokenResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/issueToken/${index}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryOutboundTxAll
   * @summary Queries a list of OutboundTx items.
   * @request GET:/oppy/oppychain/vault/outbound_tx
   */
  queryOutboundTxAll = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<VaultQueryAllOutboundTxResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/outbound_tx`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryOutboundTx
   * @summary Queries a OutboundTx by index.
   * @request GET:/oppy/oppychain/vault/outbound_tx/{requestID}
   */
  queryOutboundTx = (requestID: string, params: RequestParams = {}) =>
    this.request<VaultQueryGetOutboundTxResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/outbound_tx/${requestID}`,
      method: "GET",
      format: "json",
      ...params,
    });

  /**
   * No description
   *
   * @tags Query
   * @name QueryGetAllValidators
   * @summary Queries a list of GetValidators items.
   * @request GET:/oppy/oppychain/vault/validators
   */
  queryGetAllValidators = (
    query?: {
      "pagination.key"?: string;
      "pagination.offset"?: string;
      "pagination.limit"?: string;
      "pagination.count_total"?: boolean;
      "pagination.reverse"?: boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<VaultQueryAllValidatorsResponse, RpcStatus>({
      path: `/oppy/oppychain/vault/validators`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
}
