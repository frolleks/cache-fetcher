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
