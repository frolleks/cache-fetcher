import { useCacheFetcher } from "cache-fetcher/react";

function Todo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  const { data, isLoading, isError, error } = useCacheFetcher(url);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // Render your data!
  return (
    <div>
      <h1>Data Loaded!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Todo;
