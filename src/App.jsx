
import { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import { selectCartCount } from "./redux/cartSlice";
import "./App.css";

function App() {
  const cartCount = useSelector(selectCartCount);
  const navigate = useNavigate();
  const [headerSearch, setHeaderSearch] = useState("");

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    const query = headerSearch.trim();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="app-logo">Mini Store</Link>

        <form className="header-search" onSubmit={searchSubmitHandler}>
          <input
            type="search"
            value={headerSearch}
            onChange={(event) => setHeaderSearch(event.target.value)}
            placeholder="Search products in Mini Store..."
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search">
            <i aria-hidden="true" className="fa-solid fa-magnifying-glass" />
          </button>
        </form>

        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">
                <i aria-hidden="true" className="fa-solid fa-cart-shopping" /> Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">© 2026 Mini Store. All Rights Reserved.</footer>
    </div>
  );
}

export default App;