import { Options } from "redaxios";
import { createEffect, createSignal } from "solid-js";
import * as cacheFetcher from "../cache-fetcher.js";

function createCacheFetcher(url: string, options: Options = {}) {
  const [data, setData] = createSignal(null);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<unknown>(null);

  createEffect(async () => {
    setIsLoading(true);
    const result = await cacheFetcher.get(url, options);
    setData(result.data);
    setIsLoading(result.isLoading);
    setError(result.error);
  });

  return { data, isLoading, error };
}

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

function createDeleteFetcher() {
  const [data, setData] = createSignal(null);
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [error, setError] = createSignal<unknown>(null);

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

function createHeadFetcher(url: string, options: Options = {}) {
  const [headers, setHeaders] = createSignal<Headers | undefined>(undefined);
  const [status, setStatus] = createSignal<number | undefined>(undefined);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<unknown>(null);

  createEffect(async () => {
    try {
      const result = await cacheFetcher.head(url, options);
      setHeaders(result.headers);
      setStatus(result.status); // Set the status code
      setIsLoading(false);
    } catch (e) {
      setError(e);
      setIsLoading(false);
    }
  });

  return { headers, status, isLoading, error };
}

function createOptionsFetcher(url: string, options: Options = {}) {
  const [optionsResponse, setOptionsResponse] = createSignal(null);
  const [isLoading, setIsLoading] = createSignal(true);
  const [error, setError] = createSignal<unknown>(null);

  createEffect(async () => {
    const result = await cacheFetcher.options(url, options);

    setOptionsResponse(result.options);
    setIsLoading(false);
    setError(result.error);
  });

  return { options: optionsResponse, isLoading, error };
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
