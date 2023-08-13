import { fetch } from "../utils/universal-fetch.js";

/** Cache for storing fetched data */
const cache = new Map();

/**
 * Object that includes methods to fetch data using GET and POST
 * @typedef {Object} CacheFetcher
 * @property {function(string): Promise<{data: *, isLoading: boolean, isError: boolean, error: unknown}>} get
 * @property {function(string, *, string, RequestInit): Promise<{data: *, isError: boolean, error: unknown}>} post
 */
export const cacheFetcher = {
  /**
   * Fetch data from the given URL using GET method
   * @param {string} url - The URL to fetch
   * @return {Promise<{data: *, isLoading: boolean, isError: boolean, error: unknown}>} The fetched data or an error
   */
  get: async (url: string) => {
    // If the data is already cached, return it
    if (cache.has(url)) {
      return {
        data: cache.get(url),
        isLoading: false,
        isError: false,
        error: null,
      };
    }

    // Otherwise, fetch the data as before
    let data;
    let isLoading = true;
    let isError = false;
    let error;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
      data =
        response.headers.get("Content-Type") === "application/json"
          ? await response.json()
          : await response.text();
      isLoading = false;
      cache.set(url, data); // Save the data to the cache
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
   * @param {RequestInit & { headers?: Record<string, string> }} [options={}] - Additional options for the fetch request
   * @return {Promise<{data: *, isError: boolean, error: unknown}>} The server response or an error
   */
  post: async (
    url: string,
    body: any,
    contentType: string = "application/json",
    options: RequestInit & { headers?: Record<string, string> } = {}
  ) => {
    let data;
    let isError = false;
    let error;

    // Set the appropriate header and body format based on the content type
    let headers: Record<string, string> = { ...(options.headers || {}) };
    let formattedBody;

    switch (contentType) {
      case "application/json":
        headers["Content-Type"] = "application/json";
        formattedBody = JSON.stringify(body);
        break;
      case "multipart/form-data":
        // Don't set the Content-Type header for FormData; it needs to be set automatically
        formattedBody = body; // Assume body is FormData
        break;
      case "application/x-www-form-urlencoded":
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        formattedBody = new URLSearchParams(body).toString();
        break;
      default:
        headers["Content-Type"] = contentType;
        formattedBody = body;
        break;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...headers,
          ...options.headers, // Merge any additional headers
        },
        body: formattedBody,
        ...options, // Merge any other additional options
      });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      data =
        response.headers.get("Content-Type") === "application/json"
          ? await response.json()
          : await response.text();
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
   * @param {RequestInit & { headers?: Record<string, string> }} [options={}] - Additional options for the fetch request
   * @return {Promise<{data: *, isError: boolean, error: unknown}>} The server response or an error
   */
  put: async (
    url: string,
    body: any,
    contentType: string = "application/json",
    options: RequestInit & { headers?: Record<string, string> } = {}
  ) => {
    let data;
    let isError = false;
    let error;

    // Set the appropriate header and body format based on the content type
    let headers: Record<string, string> = { ...(options.headers || {}) };
    let formattedBody;

    switch (contentType) {
      case "application/json":
        headers["Content-Type"] = "application/json";
        formattedBody = JSON.stringify(body);
        break;
      case "multipart/form-data":
        // Don't set the Content-Type header for FormData; it needs to be set automatically
        formattedBody = body; // Assume body is FormData
        break;
      case "application/x-www-form-urlencoded":
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        formattedBody = new URLSearchParams(body).toString();
        break;
      default:
        headers["Content-Type"] = contentType;
        formattedBody = body;
        break;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          ...headers, // Use the headers set up above
          ...options.headers,
        },
        body: formattedBody, // Use the formatted body instead of JSON.stringify(body)
        ...options,
      });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }

      data =
        response.headers.get("Content-Type") === "application/json"
          ? await response.json()
          : await response.text();
    } catch (e) {
      isError = true;
      error = e;
    }

    return { data, isError, error };
  },

  /**
   * Delete data from the given URL using DELETE method
   * @param {string} url - The URL to fetch
   * @param {RequestInit & { headers?: Record<string, string> }} [options={}] - Additional options for the fetch request
   * @return {Promise<{isError: boolean, error: unknown}>} Status of deletion or an error
   */
  delete: async (
    url: string,
    options: RequestInit & { headers?: Record<string, string> } = {}
  ) => {
    let isError = false;
    let error;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: options.headers,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
    } catch (e) {
      isError = true;
      error = e;
    }

    return { isError, error };
  },
};
