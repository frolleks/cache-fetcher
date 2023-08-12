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
