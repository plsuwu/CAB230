# Volcanic Archive - CAB230, React Clientside

> nothing but hate for any and all react design patterns.

- Vite + React + Typescript
- React Router
- TailwindCSS

**caching**

the set of utils in `src/lib/store/` encapsulates a memoization function to cache API data into a neat `useStore` hook,
which functions a a little bit like a `useState` hook. i feel like there's a built-in way to do this...

its not perfect but it should be generalized and robust enough that it should (with a little more work) make
cache lookups and any subsequent fetch/post operations seamless (or maybe just slightly less painful).


