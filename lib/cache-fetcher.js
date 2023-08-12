const cache = new Map();

export const cacheFetcher = {
  get: async (url) => {
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
  post: async (url, body, contentType = "application/json", options = {}) => {
    let data;
    let isError = false;
    let error;

    // Set the appropriate header and body format based on the content type
    let headers = {};
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
};
