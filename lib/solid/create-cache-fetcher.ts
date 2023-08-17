import { Options } from "redaxios";
import { createEffect, createSignal } from "solid-js";
import * as cacheFetcher from "../cache-fetcher.js";

/**
 * Create a GET fetcher with caching.
 * @param url - The URL to fetch data from.
 * @param options - Optional configuration for the request.
 * @returns An object containing the data, loading state, and any error.
 */
function createCacheFetcher(url: string, options: Options = {}) {
  const [data, setData] = createSignal(null);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<unknown>(null);

  createEffect(() => {
    const fetchData = async () => {
      const result = await cacheFetcher.get(url, options);
      setData(result.data);
      setIsLoading(result.isLoading);
      setError(result.error);
    };

    fetchData();
  });

  return { data: data(), isLoading: isLoading(), error: error() };
}

/**
 * Create a POST fetcher.
 * @returns An object containing the data, submitting state, any error, and a function to execute the post.
 */
function createPostFetcher() {
  const [data, setData] = createSignal(null);
  const [isSubmitting, setIsSubmitting] = createSignal(true);
  const [error, setError] = createSignal<unknown>(null);

  const post = async (
    url: string,
    body: any,
    contentType = "application/json",
    options = {}
  ) => {
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

  return { data: data(), isSubmitting: isSubmitting(), error: error(), post };
}

/**
 * Create a PUT fetcher.
 * @returns An object containing the data, submitting state, any error, and a function to execute the put.
 */
function createPutFetcher() {
  const [data, setData] = createSignal(null);
  const [isSubmitting, setIsSubmitting] = createSignal(true);
  const [error, setError] = createSignal<unknown>(null);

  const put = async (
    url: string,
    body: any,
    contentType = "application/json",
    options = {}
  ) => {
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

  return { data: data(), isSubmitting: isSubmitting(), error: error(), put };
}

/**
 * Create a DELETE fetcher.
 * @returns An object containing the data, submitting state, any error, and a function to execute the delete.
 */
function createDeleteFetcher() {
  const [data, setData] = createSignal(null);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal<unknown>(null);

  const del = async (url: string, options = {}) => {
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

  return { data: data(), isSubmitting: isSubmitting(), error: error(), del };
}

/**
 * Create a PATCH fetcher.
 * @returns An object containing the data, submitting state, any error, and a function to execute the patch.
 */
function createPatchFetcher() {
  const [data, setData] = createSignal(null);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal<unknown>(null);

  const patch = async (
    url: string,
    body: any,
    contentType = "application/json",
    options = {}
  ) => {
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

  return { data: data(), isSubmitting: isSubmitting(), error: error(), patch };
}

/**
 * Create a HEAD fetcher to retrieve headers and status.
 * @param url - The URL to send the HEAD request to.
 * @param options - Optional configuration for the request.
 * @returns An object containing the headers, status code, loading state, and any error.
 */
function createHeadFetcher(url: string, options: Options = {}) {
  const [headers, setHeaders] = createSignal<Headers | undefined>(undefined);
  const [status, setStatus] = createSignal<number | undefined>(undefined);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<unknown>(null);

  createEffect(() => {
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
  });

  return {
    headers: headers(),
    status: status(),
    isLoading: isLoading(),
    error: error(),
  };
}

/**
 * Create an OPTIONS fetcher to retrieve the supported methods.
 * @param url - The URL to send the OPTIONS request to.
 * @param options - Optional configuration for the request.
 * @returns An object containing the supported options, loading state, and any error.
 */
function createOptionsFetcher(url: string, options: Options = {}) {
  const [optionsResponse, setOptionsResponse] = createSignal(null);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<unknown>(null);

  createEffect(() => {
    const fetchData = async () => {
      const result = await cacheFetcher.options(url, options);

      setOptionsResponse(result.options);
      setIsLoading(false);
      setError(result.error);
    };

    fetchData();
  });

  return { options: optionsResponse(), isLoading: isLoading(), error: error() };
}

export {
  createCacheFetcher,
  createPostFetcher,
  createPutFetcher,
  createDeleteFetcher,
  createPatchFetcher,
  createHeadFetcher,
  createOptionsFetcher,
};
