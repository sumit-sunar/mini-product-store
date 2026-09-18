# Mini Product Store — Week 1–14 Project Assessment

You have now covered React fundamentals through Async Redux/RTK and HTTP requests (Weeks 1–14). This is a hands-on project to prove you can combine everything you've learned into one working app.

This is a **solo task** — build and submit your own project individually.

## Rules

- **Functional components only.** No class components, no class lifecycle methods. Use hooks (`useState`, `useEffect`, `useRef`, etc.) everywhere you'd normally reach for lifecycle methods.
- **Pick ONE state management approach: Context API OR Redux (core + Async Redux/RTK).** You do not need both — choose whichever you're more comfortable with.
- **CSS must stay minimal and basic.** No CSS frameworks (Bootstrap, Tailwind, Material UI, etc.). You may use either external stylesheets or internal/inline styling — your choice.
- **The app must be fully functional.** Every feature you build has to actually work end-to-end — no broken buttons, no dead routes, no placeholder-only screens.

## Project Idea: "Mini Product Store"

Build a small product-browsing app (a scaled-down version of an online store). You may reskin the theme (e.g. books, movies, recipes) as long as you keep the same feature set below.

Suggested pages/flow:
- **Products page** — list of products fetched from a public API (e.g. `https://fakestoreapi.com/products`) using `fetch`/`axios` inside `useEffect`. If that API is ever down, use a backup such as `https://jsonplaceholder.typicode.com/` or a local mock JSON file/array in your project instead.
- **Product Detail page** — a route with a URL parameter showing one product's full details.
- **Search / Filter** — a controlled form input to filter the product list by name or category.
- **Cart / Wishlist** — add and remove products using your chosen global state (Context API or Redux).
- **Cart page** — a separate route that reads the global state and shows selected items and a total.

## Required Features Checklist

Use this list to self-check your project before submitting. Every item should be demonstrated somewhere in your app.

- [ ] Component-based architecture with multiple reusable components
- [ ] Props and one-way data flow, props destructuring
- [ ] `useState` (including at least one case of lazy initial state or object/array state)
- [ ] `useEffect` for side effects (e.g. fetching data on mount)
- [ ] `useRef` for at least one practical use (e.g. focusing an input)
- [ ] Memoization: `React.memo`, `useMemo`, or `useCallback` used at least once with a reason
- [ ] Rendering lists with proper `key` usage (e.g. mapping over the fetched products on the Products page)
- [ ] Event handling and a controlled form (input tied to state)
- [ ] Conditional rendering (e.g. loading state, empty state, error state)
- [ ] React Router v6: at least two routes, one route with a URL parameter, and working navigation (`Link`/`useNavigate`)
- [ ] Global state management — **Context API OR Redux (with Async Redux/RTK for any async actions)** — not both
- [ ] HTTP requests to a public API (`fetch` or `axios`)

## Optional Bonus: Search Params in the URL

We haven't covered this in class yet, but it's a useful React Router v6 hook: `useSearchParams`. It lets you read and update query string values (e.g. `?search=shoes`) directly in the URL, so a search stays in sync with the address bar and is shareable/bookmarkable.

If you want to go further, research it and try wiring it into your Search/Filter feature. Example:

```jsx
import { useSearchParams } from "react-router-dom";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleChange = (e) => {
    setSearchParams({ search: e.target.value });
  };

  return <input value={search} onChange={handleChange} placeholder="Search products" />;
}
```

This is **optional** — using plain `useState` for your search/filter input is enough to meet the required checklist.

## Styling

- Minimal, basic CSS only.
- Internal (inline styles / `<style>` in component) or external (`.css` file) — your choice.
- No CSS frameworks or component libraries.

## Submission Requirements

1. A GitHub repo link or zipped project folder.
2. A short `README.md` in your project that lists which feature from the checklist is used, and where (component/file name).
3. Make sure `npm install && npm start` runs the project without errors.

## Evaluation Checklist (what will be graded)

- [ ] App runs without errors and is fully functional (no broken features)
- [ ] Only functional components and hooks are used
- [ ] All items in the "Required Features Checklist" are present and working
- [ ] State management uses exactly one approach (Context API or Redux), implemented correctly
- [ ] CSS is minimal/basic, no frameworks used
- [ ] README clearly maps features to where they were implemented