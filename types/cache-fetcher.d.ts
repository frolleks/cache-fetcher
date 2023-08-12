export namespace cacheFetcher {
    export function get(url: string): Promise<{
        data: any;
        isLoading: boolean;
        isError: boolean;
        error: unknown;
    }>;
    export function post(url: string, body: any, contentType?: string | undefined, options?: (RequestInit & {
        headers?: Record<string, string> | undefined;
    }) | undefined): Promise<{
        data: any;
        isError: boolean;
        error: unknown;
    }>;
    export function put(url: string, body: any, contentType?: string | undefined, options?: (RequestInit & {
        headers?: Record<string, string> | undefined;
    }) | undefined): Promise<{
        data: any;
        isError: boolean;
        error: unknown;
    }>;
    export function _delete(url: string, options?: (RequestInit & {
        headers?: Record<string, string> | undefined;
    }) | undefined): Promise<{
        isError: boolean;
        error: unknown;
    }>;
    export { _delete as delete };
}
/**
 * Object that includes methods to fetch data using GET and POST
 */
export type CacheFetcher = {
    get: (arg0: string) => Promise<{
        data: any;
        isLoading: boolean;
        isError: boolean;
        error: unknown;
    }>;
    post: (arg0: string, arg1: any, arg2: string, arg3: RequestInit) => Promise<{
        data: any;
        isError: boolean;
        error: unknown;
    }>;
};
