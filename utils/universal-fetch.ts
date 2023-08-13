import nodeFetch, {
  RequestInfo as NodeRequestInfo,
  Response as NodeResponse,
  RequestInit as NodeRequestInit,
} from "node-fetch";

function isNodeEnvironment(): boolean {
  return typeof window === "undefined";
}

type BrowserRequestInit = RequestInit;

/**
 * Universal fetch function that determines the running environment (Node.js or browser) and uses the appropriate fetch implementation accordingly.
 * In a Node.js environment, it uses 'node-fetch'. In a browser environment, it uses the global 'fetch'.
 *
 * @param {NodeRequestInfo | RequestInfo} url - The URL of the resource to fetch, or a Request object.
 * @param {NodeRequestInit | BrowserRequestInit} [options] - An options object containing any custom settings that you want to apply to the request.
 * @returns {Promise<NodeResponse | Response>} A Promise that resolves to the Response object representing the response to the request.
 */
function universalFetch(
  url: NodeRequestInfo | RequestInfo,
  options?: NodeRequestInit | BrowserRequestInit
): Promise<NodeResponse | Response> {
  if (isNodeEnvironment()) {
    return nodeFetch(url as NodeRequestInfo, options as NodeRequestInit); // Using 'node-fetch' in Node.js environment
  } else {
    return window.fetch(url as RequestInfo, options as RequestInit); // Using global 'fetch' in browser environment
  }
}

export const fetch = universalFetch;
