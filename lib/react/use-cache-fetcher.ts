import { useState, useEffect } from "react";
import * as cacheFetcher from "../cache-fetcher.js";
import { Options } from "redaxios";

/**
 * Custom hook to fetch data from the given URL using GET method
 * @param {string} url - The URL to fetch
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {{data: *, isLoading: boolean, error: unknown}} The fetched data or an error
 */
export function useCacheFetcher(url: string, options: Options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await cacheFetcher.get(url, options);

      setData(result.data);
      setIsLoading(false); // isLoading should be set to false after fetching
      setError(result.error);
    };

    fetchData();
  }, [url, options]); // Re-run the effect if URL or options change

  return { data, isLoading, error };
}

/**
 * Custom hook to fetch data using POST method
 * @return {{data: *, isSubmitting: boolean, error: unknown, post: function(string, *, string, Object): Promise<void>}} An object containing the POST response, submission state, and a function to initiate the POST request
 */
export function usePostFetcher() {
  const [data, setData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setError(null);

    try {
      const result = await cacheFetcher.post(url, body, contentType, options);
      setData(result.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { data, isSubmitting, error, post };
}

/**
 * Custom hook to update data on the server using the PUT method
 * @return {{data: *, isSubmitting: boolean, error: unknown, put: function(string, *, string, Object): Promise<void>}} An object containing the PUT response, submission state, and a function to initiate the PUT request
 */
export function usePutFetcher() {
  const [data, setData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setError(null);

    try {
      const result = await cacheFetcher.put(url, body, contentType, options);
      setData(result.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { data, isSubmitting, error, put };
}

/**
 * Custom hook to delete data from the server using the DELETE method
 * @return {{data: *, isSubmitting: boolean, error: unknown, del: function(string, Object): Promise<void>}} An object containing the DELETE submission state, and a function to initiate the DELETE request
 */
export function useDeleteFetcher() {
  const [data, setData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<unknown>(null);

  /**
   * Function to perform a DELETE request.
   * @param {string} url - The URL to send the DELETE request to.
   * @param {Object} [options={}] - Additional fetch options.
   * @return {Promise<void>} A promise that resolves once the deletion is complete.
   */
  const del = async (url: string, options = {}) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await cacheFetcher.del(url, {
        ...options,
      });
      setData(result.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { data, isSubmitting, error, del };
}

/**
 * Custom hook to update partial data to the given URL using PATCH method
 * @return {{data: *, isSubmitting: boolean, error: unknown, patch: function(string, *, string, Object): Promise<void>}} An object containing the PATCH response, submission state, and a function to initiate the PATCH request
 */
export function usePatchFetcher() {
  const [data, setData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const patch = async (
    url: string,
    body: any,
    contentType = "application/json",
    options = {}
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await cacheFetcher.patch(url, body, contentType, options);
      setData(result.data);
    } catch (e) {
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { data, isSubmitting, error, patch };
}

/**
 * Custom hook to fetch headers from the given URL using HEAD method
 * @param {string} url - The URL to fetch
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {{headers: Object, status: number, isLoading: boolean, error: unknown}} Headers and status code, or an error
 */
export function useHeadFetcher(url: string, options: Options = {}) {
  const [headers, setHeaders] = useState<Headers | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cacheFetcher.head(url, options);
        setHeaders(result.headers);
        setStatus(result.status); // Set the status code
        setIsLoading(false);
      } catch (e) {
        setError(e);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { headers, status, isLoading, error };
}

/**
 * Custom hook to retrieve the communication options from the target URL using the OPTIONS method
 * @param {string} url - The URL to fetch
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {{options: *, isLoading: boolean, error: unknown}} The communication options or an error
 */
export function useOptionsFetcher(url: string, options: Options = {}) {
  const [optionsResponse, setOptionsResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await cacheFetcher.options(url, options);

      setOptionsResponse(result.options);
      setIsLoading(false);
      setError(result.error);
    };

    fetchData();
  }, [url, options]);

  return { options: optionsResponse, isLoading, error };
}
