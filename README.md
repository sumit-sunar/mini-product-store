# Mini Product Store

A small product-browsing app built with React, React Router, and Redux Toolkit. Users can browse products, search/filter, view product details, and manage a cart.

## How to Run

```bash
npm install
npm start
```

The app will start using Vite.

## State Management Approach

This project uses **Redux Toolkit** (not Context API) for global state, including `createAsyncThunk` for async product fetching.

## Styling

Plain custom CSS only — no CSS frameworks (Bootstrap, Tailwind, Material UI, etc.).

## Feature Checklist (Where Each Feature Is Used)

- **Component-based architecture** — components/ (e.g. ProductCard, ProductGridSkeleton)
- **Props + one-way data flow, destructuring** — Products.jsx (ProductCard({ product, onAddToCart }))
- **useState (lazy init / object-array state)** — Products.jsx (lazy init for filter state), Cart.jsx (checkout state)
- **useEffect for side effects** — Products.jsx, Home.jsx (fetch products on mount), ProductDetail.jsx (fetch single product)
- **useRef** — Products.jsx (focuses the search input)
- **Memoization (React.memo / useMemo / useCallback)** — Products.jsx (memoized ProductCard, derived product list), Cart.jsx (memoized totals/handlers)
- **Lists with unique key** — Products.jsx, Home.jsx, Cart.jsx (keyed by product.id / item.id)
- **Event handling + controlled form** — App.jsx (header search), Products.jsx (search + category filter)
- **Conditional rendering (loading/empty/error)** — Products.jsx, Home.jsx, Cart.jsx
- **React Router v6 (routes, URL param, navigation)** — App.jsx (routes), ProductDetail.jsx (/products/:id, uses Link/useNavigate)
- **Global state management (Redux Toolkit)** — store.js, productSlice.js, cartSlice.js
- **HTTP requests to public API** — productSlice.js (fetches from Fake Store API, with local fallback data)