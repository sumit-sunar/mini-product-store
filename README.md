 # Mini Product Store

 A small React product-browsing app built for the Week 1-14 project assessment.

 The app uses functional React components, React Router v6, Redux Toolkit, and the Fake Store API. Users can browse products, search and filter results, view product details, manage a cart, and complete a simple checkout flow.

 ## Getting Started

 Install the dependencies and start the development server:

 ```bash
 npm install
 npm start
 ```

 Vite will display the local development URL in the terminal.

 ## Assessment Features

 ### React Fundamentals

 - **Component-based architecture:** Reusable components are organized in `src/components/`. Examples include `Home`, `Products`, `ProductCard`, `ProductDetail`, `Cart`, and `NotFound`.
 - **Props and one-way data flow:** `ProductCard` receives `product` and `onAddToCart` props from `Home` and `Products`.
 - **State with `useState`:** `App.jsx` manages the header search, `Products.jsx` manages the category filter, and `Cart.jsx` manages checkout modal state.
 - **Lazy state initialization:** `Products.jsx` initializes the category state with `useState(() => "all")`.
 - **Side effects with `useEffect`:** `Home.jsx`, `Products.jsx`, and `ProductDetail.jsx` load product data when they mount or when the product ID changes.
 - **Event handling and controlled forms:** The header search input and category selector are controlled inputs with working event handlers.
 - **Conditional rendering:** The app displays loading skeletons, API errors, empty states, no-match results, fallback notices, and checkout confirmation messages.
 - **Lists and keys:** Product cards, categories, skeleton cards, and cart items are rendered with `.map()` and stable keys.

 ### Routing and Navigation

 - **React Router v6:** Routes are defined in `App.jsx` and navigation uses `Link` and `useNavigate`.
 - **Dynamic route:** `ProductDetail.jsx` reads the `/products/:id` URL parameter to display a complete product.
 - **Search parameters:** `Products.jsx` uses `useSearchParams` to keep product searches in the URL.

 ### State Management and Data

 - **Redux Toolkit:** Redux is the only global state-management approach used in the project. The store is configured in `src/redux/store.js`.
 - **Product data:** `src/redux/productSlice.js` uses `createAsyncThunk` and `fetch` to request products from `https://fakestoreapi.com/products`.
 - **API fallback:** `src/data/fallbackProducts.js` provides local product data when the public API is unavailable.
 - **Cart workflow:** `src/redux/cartSlice.js` and `Cart.jsx` support adding products, removing products, changing quantities, calculating totals, and confirming checkout.

 ### Performance

 - **Memoization:** `Products.jsx` uses `React.memo`, `useMemo`, and `useCallback`. `Cart.jsx` uses `useMemo` for cart calculations.

 ## Routes

 - `/` - Home page with featured products
 - `/products` - Product list with search and category filtering
 - `/products/:id` - Product detail page
 - `/cart` - Cart and checkout page
 - Any other path - Not found page

 ## Project Structure

 ```text
 src/
   components/       Reusable pages and product/cart components
   data/              Local fallback product data
   redux/             Redux store, cart slice, and async product slice
   App.jsx            Shared layout and application routes
   main.jsx           React, Redux, and Router entry point
 ```

 ## Assessment Note

 The project currently covers the assessment requirements except `useRef`; no ref is used in the existing implementation. The app uses functional components only and does not use a CSS framework.





