import { useState, useEffect } from "react";
import { cacheFetcher } from "../cache-fetcher";

export function useCacheFetcher(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const result = await cacheFetcher.get(url);

      setData(result.data);
      setIsLoading(result.isLoading);
      setIsError(result.isError);
      setError(result.error);
    };

    fetchData();
  }, [url]); // The effect will re-run whenever the URL changes

  return { data, isLoading, isError, error };
}

export function usePostFetcher() {
  const [data, setData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  // The post function to be called within the component
  const post = async (url, body, contentType, options) => {
    setIsSubmitting(true);
    setIsError(false);
    setError(null);

    try {
      const result = await cacheFetcher.post(url, body, contentType, options);
      setData(result.data);

      if (result.isError) {
        setIsError(true);
        setError(result.error);
      }
    } catch (e) {
      setIsError(true);
      setError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { data, isSubmitting, isError, error, post };
}
