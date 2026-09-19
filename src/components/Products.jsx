
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsIsFallback,
  selectProductsStatus,
} from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import "./css/Products.css";

export const ProductCard = React.memo(function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <img className="product-card-image" src={product.image} alt={product.title} />
        <h3 className="product-card-title">{product.title}</h3>
      </Link>

      <p className="product-card-category">{product.category}</p>
      <div className="product-card-rating">★★★★★ <span>({product.rating?.count || 0})</span></div>
      <p className="product-card-price">${product.price.toFixed(2)}</p>

      <button type="button" className="btn btn-primary" onClick={() => onAddToCart(product)}>
        Add to Cart
      </button>
    </article>
  );
});

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="products-grid" aria-label="Loading products" aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <article className="product-card product-card-skeleton" key={index}>
          <div className="skeleton-block skeleton-image" />
          <div className="skeleton-block skeleton-title" />
          <div className="skeleton-block skeleton-category" />
          <div className="skeleton-block skeleton-price" />
          <div className="skeleton-block skeleton-button" />
        </article>
      ))}
    </div>
  );
}

function Products() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const isFallback = useSelector(selectProductsIsFallback);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [category, setCategory] = useState(() => "all");

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const categoryOptions = useMemo(() => {
    const uniqueCategories = products.map((product) => product.category);
    return ["all", ...new Set(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        term === "" ||
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);
      const matchesCategory = category === "all" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const searchChangeHandler = useCallback(
    (e) => {
      const { value } = e.target;
      setSearchParams(value ? { search: value } : {}, { replace: true });
    },
    [setSearchParams]
  );

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const clearFiltersHandler = () => {
    setSearchParams({}, { replace: true });
    setCategory("all");
  };

  const retryHandler = () => {
    dispatch(fetchProducts());
  };

  const addToCartHandler = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const renderContent = () => {
    if (status === "loading") {
      return <ProductGridSkeleton count={8} />;
    }

    if (status === "failed") {
      return (
        <div className="status status-error">
          <p>Could not load products: {error}</p>
          <button type="button" className="btn" onClick={retryHandler}>
            Try Again
          </button>
        </div>
      );
    }

    if (status === "succeeded" && products.length === 0) {
      return <p className="status">No products available right now.</p>;
    }

    if (filteredProducts.length === 0) {
      return (
        <div className="status">
          <p>No products match your search.</p>
          <button type="button" className="btn" onClick={clearFiltersHandler}>
            Clear Filters
          </button>
        </div>
      );
    }

    return (
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCartHandler} />
        ))}
      </div>
    );
  };

  return (
    <section className="products">
      <div className="products-header">
        <h2>Products</h2>

        <div className="products-controls">
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={searchChangeHandler}
            placeholder="Search by name or category…"
            aria-label="Search products"
          />

          <select value={category} onChange={categoryChangeHandler} aria-label="Filter by category">
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "All categories" : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "succeeded" && products.length > 0 && (
        <>
          {isFallback && (
            <p className="products-fallback-notice" role="status">
              Showing offline product data while the store API is unavailable.
            </p>
          )}
          <p className="products-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </>
      )}

      {renderContent()}
    </section>
  );
}

export default Products;