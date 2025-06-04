import type { WcpContextObject } from "@webiny/api-wcp/types";

export interface IGetWcpGateway {
    execute: () => WcpContextObject;
}
