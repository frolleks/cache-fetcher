import { useState, useEffect } from "react";
import { cacheFetcher } from "../cache-fetcher";
import { Options } from "redaxios";

/**
 * Custom hook to fetch data from the given URL using GET method
 * @param {string} url - The URL to fetch
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {{data: *, isLoading: boolean, isError: boolean, error: unknown}} The fetched data or an error
 */
export function useCacheFetcher(url: string, options: Options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await cacheFetcher.get(url, options);

      setData(result.data);
      setIsLoading(false); // isLoading should be set to false after fetching
      setIsError(result.isError);
      setError(result.error);
    };

    fetchData();
  }, [url, options]); // Re-run the effect if URL or options change

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
  const [error, setError] = useState<unknown>(null);

  /**
   * Function to perform a POST request.
   * @param {string} url - The URL to post to.
   * @param {*} body - The body of the request, can be any type.
   * @param {string} [contentType="application/json"] - The content type of the request.
   * @param {Object} [options={}] - Additional fetch options.
   */
  const post = async (
    url: string,
    body: any,
    contentType = "application/json",
    options = {}
  ) => {
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

/**
 * Custom hook to update data on the server using the PUT method
 * @return {{data: *, isSubmitting: boolean, isError: boolean, error: unknown, put: function(string, *, string, Object): Promise<void>}} An object containing the PUT response, submission state, and a function to initiate the PUT request
 */
export function usePutFetcher() {
  const [data, setData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  /**
   * Function to perform a PUT request.
   * @param {string} url - The URL to send the PUT request to.
   * @param {*} body - The body of the request, can be any type.
   * @param {string} [contentType="application/json"] - The content type of the request.
   * @param {Object} [options={}] - Additional fetch options.
   */
  const put = async (
    url: string,
    body: any,
    contentType = "application/json",
    options = {}
  ) => {
    setIsSubmitting(true);
    setIsError(false);
    setError(null);

    try {
      const result = await cacheFetcher.put(url, body, contentType, options);
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

  return { data, isSubmitting, isError, error, put };
}

/**
 * Custom hook to delete data from the server using the DELETE method
 * @return {{data: *, isSubmitting: boolean, isError: boolean, error: unknown, del: function(string, Object): Promise<void>}} An object containing the DELETE submission state, and a function to initiate the DELETE request
 */
export function useDeleteFetcher() {
  const [data, setData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  /**
   * Function to perform a DELETE request.
   * @param {string} url - The URL to send the DELETE request to.
   * @param {Object} [options={}] - Additional fetch options.
   * @return {Promise<void>} A promise that resolves once the deletion is complete.
   */
  const del = async (url: string, options = {}) => {
    setIsSubmitting(true);
    setIsError(false);
    setError(null);

    try {
      const result = await cacheFetcher.delete(url, {
        ...options,
      });
      setData(result.data);
    } catch (e) {
      setIsError(true);
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { data, isSubmitting, isError, error, del };
}
