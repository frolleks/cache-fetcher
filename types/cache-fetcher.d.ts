export namespace cacheFetcher {
    function get(url: string): Promise<{
        data: any;
        isLoading: boolean;
        isError: boolean;
        error: unknown;
    }>;
    function post(url: string, body: any, contentType?: string | undefined, options?: (RequestInit & {
        headers?: Record<string, string> | undefined;
    }) | undefined): Promise<{
        data: any;
        isError: boolean;
        error: unknown;
    }>;
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
