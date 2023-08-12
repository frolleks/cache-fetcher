import { useState, useEffect } from "react";
import { cacheFetcher } from "../cache-fetcher";

/**
 * Custom hook to fetch data from the given URL using GET method
 * @param {string} url - The URL to fetch
 * @return {{data: *, isLoading: boolean, isError: boolean, error: unknown}} The fetched data or an error
 */
export function useCacheFetcher(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(/** @type {any} */ (null));

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await cacheFetcher.get(url);

      setData(result.data);
      setIsLoading(result.isLoading);
      setIsError(result.isError);
      setError(result.error);
    };

    fetchData();
  }, [url]); // The effect will re-run whenever the URL changes

  return { data, isLoading, isError, error };
}

/**
 * Custom hook to fetch data using POST method
 * @return {{data: *, isSubmitting: boolean, isError: boolean, error: unknown, post: function(string, *, string, Object): Promise<void>}} An object containing the POST response, submission state, and a function to initiate the POST request
 */
export function usePostFetcher() {
  const [data, setData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(/** @type {any} */ (null));

  /**
   * Function to perform a POST request.
   * @param {string} url - The URL to post to.
   * @param {*} body - The body of the request, can be any type.
   * @param {string} [contentType="application/json"] - The content type of the request.
   * @param {Object} [options={}] - Additional fetch options.
   */
  const post = async (url, body, contentType, options) => {
    setIsSubmitting(true);
    setIsError(false);
    setError(null);

    try {
      const result = await cacheFetcher.post(url, body, contentType, options);
      setData(result.data);

      if (result.isError) {
        setIsError(true);
        setError(result.error);
      }
    } catch (e) {
      setIsError(true);
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { data, isSubmitting, isError, error, post };
}
