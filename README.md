# cache-fetcher

A dead simple data fetcher for JavaScript and React.

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
