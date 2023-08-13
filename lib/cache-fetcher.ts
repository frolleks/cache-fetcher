import axios from "redaxios";
import { Options } from "redaxios";

/** Cache for storing fetched data */
const cache = new Map();

/**
 * @typedef {Object} CacheFetcher
 * @property {function(string): Promise<{data: *, isLoading: boolean, isError: boolean, error: unknown}>} get
 * @property {function(string, *, string, Options): Promise<{data: *, isError: boolean, error: unknown}>} post
 * @property {function(string, *, string, Options): Promise<{data: *, isError: boolean, error: unknown}>} put
 * @property {function(string, Options): Promise<{isError: boolean, error: unknown}>} delete
 */
export const cacheFetcher = {
  /**
   * Fetch data from the given URL using GET method
   * @param {string} url - The URL to fetch
   * @param {Options} [options={}] - Options for the request
   * @return {Promise<{data: *, isLoading: boolean, isError: boolean, error: unknown}>} The fetched data or an error
   */
  get: async (url: string, options: Options = {}) => {
    if (cache.has(url)) {
      return {
        data: cache.get(url),
        isLoading: false,
        isError: false,
        error: null,
      };
    }

    let data;
    let isLoading = true;
    let isError = false;
    let error;

    try {
      const response = await axios.get(url, options);
      data = response.data;
      isLoading = false;
      cache.set(url, data);
    } catch (e) {
      isError = true;
      error = e;
      isLoading = false;
    }

    return { data, isLoading, isError, error };
  },

  /**
   * Fetch data from the given URL using POST method
   * @param {string} url - The URL to fetch
   * @param {*} body - The body to include in the POST request
   * @param {string} [contentType="application/json"] - The content type of the body
   * @param {Options} [options={}] - Additional options for the fetch request
   * @return {Promise<{data: *, isLoading: boolean, isError: boolean, error: unknown}>} The server response or an error
   */
  post: async (
    url: string,
    body: any,
    contentType: string = "application/json",
    options: Options = {}
  ) => {
    let data;
    let isLoading = true;
    let isError = false;
    let error;

    try {
      const headers = {
        ...(options.headers || {}),
        "Content-Type": contentType,
      };
      const response = await axios.post(url, body, { headers, ...options });
      data = response.data;
      isLoading = false;
    } catch (e) {
      isError = true;
      error = e;
      isLoading = false;
    }

    return { data, isLoading, isError, error };
  },

  /**
   * Update data to the given URL using PUT method
   * @param {string} url - The URL to fetch
   * @param {*} body - The body to include in the PUT request
   * @param {string} [contentType="application/json"] - The content type of the body
   * @param {Options} [options={}] - Additional options for the fetch request
   * @return {Promise<{data: *, isLoading: boolean, isError: boolean, error: unknown}>} The server response or an error
   */
  put: async (
    url: string,
    body: any,
    contentType: string = "application/json",
    options: Options = {}
  ) => {
    let data;
    let isLoading = true;
    let isError = false;
    let error;

    try {
      const headers = {
        ...(options.headers || {}),
        "Content-Type": contentType,
      };
      const response = await axios.put(url, body, { headers, ...options });
      data = response.data;
      isLoading = false;
    } catch (e) {
      isError = true;
      error = e;
      isLoading = false;
    }

    return { data, isLoading, isError, error };
  },

  /**
   * Delete data from the given URL using DELETE method
   * @param {string} url - The URL to fetch
   * @param {Options} [options={}] - Additional options for the fetch request
   * @return {Promise<{data: *, isLoading: boolean, isError: boolean, error: unknown}>} Status of deletion, data (if any), or an error
   */
  delete: async (url: string, options: Options = {}) => {
    let data;
    let isLoading = true;
    let isError = false;
    let error;

    try {
      const response = await axios.delete(url, options);
      data = response.data;
      isLoading = false;
    } catch (e) {
      isError = true;
      error = e;
      isLoading = false;
    }

    return { data, isLoading, isError, error };
  },

  /**
   * Update data to the given URL using PATCH method
   * @param {string} url - The URL to fetch
   * @param {*} body - The body to include in the PATCH request
   * @param {string} [contentType="application/json"] - The content type of the body
   * @param {Options} [options={}] - Additional options for the fetch request
   * @return {Promise<{data: *, isError: boolean, error: unknown}>} The server response or an error
   */
  patch: async (
    url: string,
    body: any,
    contentType: string = "application/json",
    options: Options = {}
  ) => {
    let data;
    let isError = false;
    let error;

    try {
      const headers = {
        ...(options.headers || {}),
        "Content-Type": contentType,
      };
      const response = await axios.patch(url, body, { headers, ...options });
      data = response.data;
    } catch (e) {
      isError = true;
      error = e;
    }

    return { data, isError, error };
  },

  /**
   * Retrieve the headers and status code from the given URL using HEAD method
   * @param {string} url - The URL to fetch
   * @param {Options} [options={}] - Additional options for the fetch request
   * @return {Promise<{headers: *, status: number, isError: boolean, error: unknown}>} The headers, status code, or an error
   */
  head: async (url: string, options: Options = {}) => {
    let headers;
    let status;
    let isError = false;
    let error;

    try {
      const response = await axios.head(url, options);
      headers = response.headers;
      status = response.status; // Retrieve the status code
    } catch (e) {
      isError = true;
      error = e;
    }

    return { headers, status, isError, error };
  },

  /**
   * Retrieve the communication options from the given URL using OPTIONS method
   * @param {string} url - The URL to fetch
   * @param {Options} [options={}] - Additional options for the fetch request
   * @return {Promise<{options: *, isError: boolean, error: unknown}>} The communication options or an error
   */
  options: async (url: string, options: Options = {}) => {
    let optionsResponse;
    let isError = false;
    let error;

    try {
      const response = await axios.options(url, options);
      optionsResponse = response.data;
    } catch (e) {
      isError = true;
      error = e;
    }

    return { options: optionsResponse, isError, error };
  },
};
