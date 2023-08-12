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
      data = await response.json();
      isLoading = false;
      cache.set(url, data); // Save the data to the cache
    } catch (e) {
      isError = true;
      error = e;
      isLoading = false;
    }

    return { data, isLoading, isError, error };
  },
};
