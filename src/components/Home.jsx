
import { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsIsFallback,
  selectProductsStatus,
} from "../redux/productSlice";
import { ProductCard, ProductGridSkeleton } from "./Products";
import "./css/Home.css";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const isFallback = useSelector(selectProductsIsFallback);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [dispatch, status]);

  const addToCartHandler = useCallback((product) => {
    dispatch(addToCart(product));
  }, [dispatch]);

  if (status === "failed") {
    return <p className="status status-error">Couldn't load products: {error}</p>;
  }

  return (
    <div className="home">
      <section className="home-hero">
        <p className="home-kicker">TODAY'S PICKS</p>
        <h2>Flash Sale &amp; Featured Products</h2>
        <p>Discover popular products at simple, honest prices.</p>

        <div className="home-actions">
          <Link to="/products" className="btn btn-primary">
            View All Products
          </Link>
        </div>
      </section>

      <section className="home-products">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <Link to="/products">View all products</Link>
        </div>
        {isFallback && (
          <p className="home-fallback-notice" role="status">
            Showing offline product data while the store API is unavailable.
          </p>
        )}
        {status === "loading" && <ProductGridSkeleton count={6} />}
        {status === "succeeded" && (
          <div className="products-grid home-products-grid">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCartHandler} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;