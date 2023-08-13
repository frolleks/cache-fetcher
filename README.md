# cache-fetcher

[![npm](https://img.shields.io/npm/v/cache-fetcher)](https://npmjs.org/package/cache-fetcher)
![npm](https://img.shields.io/npm/dm/cache-fetcher)

A dead simple and opinionated data fetcher for JavaScript and React.

## Installation

**npm:** `npm i cache-fetcher`

**yarn:** `yarn add cache-fetcher`

**pnpm:** `pnpm add cache-fetcher`

## Usage

### JavaScript

Simply import it,

```js
import { cacheFetcher } from "cache-fetcher";
```

and make a request.

```js
const res = await cacheFetcher.get(
  "https://jsonplaceholder.typicode.com/todos/1"
);

if (res.isLoading) console.log("Loading...");
else console.log(res.data);

if (res.isError) console.log(res.error);

// or like this:

const { data, isLoading, isError, error } = await cacheFetcher.get(
  "https://jsonplaceholder.typicode.com/todos/1"
);

if (isLoading) console.log("Loading...");
else console.log(data);

if (isError) console.log(error);
```

### React

Import the `useCacheFetcher` hook,

```js
import { useCacheFetcher } from "cache-fetcher/react";
```

and make a request.

```jsx
function MyComponent() {
  // Let's say you want to fetch some data from this URL
  const url = "https://api.example.com/data";

  // Just call the useCacheFetcher hook with that URL
  const { data, isLoading, isError, error } = useCacheFetcher(url);

  // Now you can handle the various states your data might be in:
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

export default MyComponent;
```
