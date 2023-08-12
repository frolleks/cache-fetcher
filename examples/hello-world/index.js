import cacheFetcher from "../../lib/cache-fetcher.js";

const { data, isLoading, error } = await cacheFetcher.get(
  "https://jsonplaceholder.typicode.com/todos/1"
);

if (data || !isLoading) {
  console.log(data);
} else {
  console.log(error);
}
