import axios from "redaxios";
import { Options } from "redaxios";

/** Cache for storing fetched data */
const cache = new Map();

/**
 * Fetch data from the given URL using GET method
 * @param {string} url - The URL to fetch
 * @param {Options} [options={}] - Options for the request
 * @return {Promise<{data: *, isLoading: boolean, error: unknown}>} The fetched data or an error
 */
async function get(url: string, options: Options = {}) {
  if (cache.has(url)) {
    return {
      data: cache.get(url),
      isLoading: false,
      error: null,
    };
  }

  let data;
  let isLoading = true;
  let error;

  try {
    const response = await axios.get(url, options);
    data = response.data;
    isLoading = false;
    cache.set(url, data);
  } catch (e) {
    error = e;
    isLoading = false;
  }

  return { data, isLoading, error };
}

/**
 * Fetch data from the given URL using POST method
 * @param {string} url - The URL to fetch
 * @param {*} body - The body to include in the POST request
 * @param {string} [contentType="application/json"] - The content type of the body
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {Promise<{data: *, isLoading: boolean, error: unknown}>} The server response or an error
 */
async function post(
  url: string,
  body: any,
  contentType: string = "application/json",
  options: Options = {}
) {
  let data;
  let isLoading = true;
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
    error = e;
    isLoading = false;
  } finally {
    cache.delete(url);
  }

  return { data, isLoading, error };
}

/**
 * Update data to the given URL using PUT method
 * @param {string} url - The URL to fetch
 * @param {*} body - The body to include in the PUT request
 * @param {string} [contentType="application/json"] - The content type of the body
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {Promise<{data: *, isLoading: boolean, error: unknown}>} The server response or an error
 */
async function put(
  url: string,
  body: any,
  contentType: string = "application/json",
  options: Options = {}
) {
  let data;
  let isLoading = true;
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
    error = e;
    isLoading = false;
  } finally {
    cache.delete(url);
  }

  return { data, isLoading, error };
}

/**
 * Delete data from the given URL using DELETE method
 * @param {string} url - The URL to fetch
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {Promise<{data: *, isLoading: boolean, error: unknown}>} Status of deletion, data (if any), or an error
 */
async function deleteData(url: string, options: Options = {}) {
  let data;
  let isLoading = true;
  let error;

  try {
    const response = await axios.delete(url, options);
    data = response.data;
    isLoading = false;
  } catch (e) {
    error = e;
    isLoading = false;
  } finally {
    cache.delete(url);
  }

  return { data, isLoading, error };
}

/**
 * Update data to the given URL using PATCH method
 * @param {string} url - The URL to fetch
 * @param {*} body - The body to include in the PATCH request
 * @param {string} [contentType="application/json"] - The content type of the body
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {Promise<{data: *, error: unknown}>} The server response or an error
 */
async function patch(
  url: string,
  body: any,
  contentType: string = "application/json",
  options: Options = {}
) {
  let data;
  let error;

  try {
    const headers = {
      ...(options.headers || {}),
      "Content-Type": contentType,
    };
    const response = await axios.patch(url, body, {
      headers,
      ...options,
    });
    data = response.data;
  } catch (e) {
    error = e;
  }

  return { data, error };
}

/**
 * Retrieve the headers and status code from the given URL using HEAD method
 * @param {string} url - The URL to fetch
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {Promise<{headers: *, status: number, error: unknown}>} The headers, status code, or an error
 */
async function head(url: string, options: Options = {}) {
  let headers;
  let status;
  let error;

  try {
    const response = await axios.head(url, options);
    headers = response.headers;
    status = response.status; // Retrieve the status code
  } catch (e) {
    error = e;
  }

  return { headers, status, error };
}

/**
 * Retrieve the communication options from the given URL using OPTIONS method
 * @param {string} url - The URL to fetch
 * @param {Options} [options={}] - Additional options for the fetch request
 * @return {Promise<{options: *, error: unknown}>} The communication options or an error
 */
async function options(url: string, options: Options = {}) {
  let optionsResponse;
  let error;

  try {
    const response = await axios.options(url, options);
    optionsResponse = response.data;
  } catch (e) {
    error = e;
  }

  return { options: optionsResponse, error };
}

export { get, post, put, deleteData as delete, patch, head, options };
