import { useCacheFetcher } from "cache-fetcher/react";

function Todo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  const { data, isLoading, error } = useCacheFetcher(url);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error as string}</div>;
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
