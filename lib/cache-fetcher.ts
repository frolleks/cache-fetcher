import axios, { AxiosRequestConfig } from "axios";

/** Cache for storing fetched data */
const cache = new Map();

/**
 * @typedef {Object} CacheFetcher
 * @property {function(string): Promise<{data: *, isLoading: boolean, isError: boolean, error: unknown}>} get
 * @property {function(string, *, string, AxiosRequestConfig): Promise<{data: *, isError: boolean, error: unknown}>} post
 * @property {function(string, *, string, AxiosRequestConfig): Promise<{data: *, isError: boolean, error: unknown}>} put
 * @property {function(string, AxiosRequestConfig): Promise<{isError: boolean, error: unknown}>} delete
 */
export const cacheFetcher = {
  /**
   * Fetch data from the given URL using GET method
   * @param {string} url - The URL to fetch
   * @return {Promise<{data: *, isLoading: boolean, isError: boolean, error: unknown}>} The fetched data or an error
   */
  get: async (url: string) => {
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
      const response = await axios.get(url);
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
   * @param {AxiosRequestConfig} [options={}] - Additional options for the fetch request
   * @return {Promise<{data: *, isError: boolean, error: unknown}>} The server response or an error
   */
  post: async (
    url: string,
    body: any,
    contentType: string = "application/json",
    options: AxiosRequestConfig = {}
  ) => {
    let data;
    let isError = false;
    let error;

    try {
      const headers = {
        ...(options.headers || {}),
        "Content-Type": contentType,
      };
      const response = await axios.post(url, body, { headers, ...options });
      data = response.data;
    } catch (e) {
      isError = true;
      error = e;
    }

    return { data, isError, error };
  },

  /**
   * Update data to the given URL using PUT method
   * @param {string} url - The URL to fetch
   * @param {*} body - The body to include in the PUT request
   * @param {string} [contentType="application/json"] - The content type of the body
   * @param {AxiosRequestConfig} [options={}] - Additional options for the fetch request
   * @return {Promise<{data: *, isError: boolean, error: unknown}>} The server response or an error
   */
  put: async (
    url: string,
    body: any,
    contentType: string = "application/json",
    options: AxiosRequestConfig = {}
  ) => {
    let data;
    let isError = false;
    let error;

    try {
      const headers = {
        ...(options.headers || {}),
        "Content-Type": contentType,
      };
      const response = await axios.put(url, body, { headers, ...options });
      data = response.data;
    } catch (e) {
      isError = true;
      error = e;
    }

    return { data, isError, error };
  },

  /**
   * Delete data from the given URL using DELETE method
   * @param {string} url - The URL to fetch
   * @param {AxiosRequestConfig} [options={}] - Additional options for the fetch request
   * @return {Promise<{isError: boolean, error: unknown}>} Status of deletion or an error
   */
  delete: async (url: string, options: AxiosRequestConfig = {}) => {
    let isError = false;
    let error;

    try {
      await axios.delete(url, options);
    } catch (e) {
      isError = true;
      error = e;
    }

    return { isError, error };
  },
};
