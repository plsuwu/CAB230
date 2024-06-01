# CAB230 | React Client + Express Server

> nothing but hate for any and all react design patterns.

these two projects are only thematically interlinked and arent supposed to actually work together.

## Client:

- Vite + React + Typescript
- React Router
- TailwindCSS

**caching/memoization**

the set of utils in `src/lib/store/` encapsulates a half-baked memoization function to cache API data into a shallow cache.
called through a neat `useStore` hook, which functions a a little bit like a `useState` hook mixed with Svelte's `$lib/store`.

its not perfect but it should be generalized and robust enough that it can gracefully handle this application's use case
and make my mess of fetch/post operations less gross to look at.

## Server:

- Express + Typescript also
- MariaDB/Knex
- Zod (largely unnecessary but I think the Zod schema are cleaner than manually implementing checks one-by-one)
