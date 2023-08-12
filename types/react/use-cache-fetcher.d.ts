/**
 * Custom hook to fetch data from the given URL using GET method
 * @param {string} url - The URL to fetch
 * @return {{data: *, isLoading: boolean, isError: boolean, error: unknown}} The fetched data or an error
 */
export function useCacheFetcher(url: string): {
    data: any;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
};
/**
 * Custom hook to fetch data using POST method
 * @return {{data: *, isSubmitting: boolean, isError: boolean, error: unknown, post: function(string, *, string, Object): Promise<void>}} An object containing the POST response, submission state, and a function to initiate the POST request
 */
export function usePostFetcher(): {
    data: any;
    isSubmitting: boolean;
    isError: boolean;
    error: unknown;
    post: (arg0: string, arg1: any, arg2: string, arg3: Object) => Promise<void>;
};
/**
 * Custom hook to update data on the server using the PUT method
 * @return {{data: *, isSubmitting: boolean, isError: boolean, error: unknown, put: function(string, *, string, Object): Promise<void>}} An object containing the PUT response, submission state, and a function to initiate the PUT request
 */
export function usePutFetcher(): {
    data: any;
    isSubmitting: boolean;
    isError: boolean;
    error: unknown;
    put: (arg0: string, arg1: any, arg2: string, arg3: Object) => Promise<void>;
};
/**
 * Custom hook to delete data from the server using the DELETE method
 * @return {{isSubmitting: boolean, isError: boolean, error: unknown, del: function(string, Object): Promise<void>}} An object containing the DELETE submission state, and a function to initiate the DELETE request
 */
export function useDeleteFetcher(): {
    isSubmitting: boolean;
    isError: boolean;
    error: unknown;
    del: (arg0: string, arg1: Object) => Promise<void>;
};
