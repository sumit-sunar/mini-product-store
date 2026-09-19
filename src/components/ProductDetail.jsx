
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductById,
  selectSelectedError,
  selectSelectedProduct,
  selectSelectedStatus,
} from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import "./css/ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectSelectedStatus);
  const error = useSelector(selectSelectedError);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const backToProductsHandler = () => {
    navigate("/products");
  };

  if (status === "loading") {
    return <p className="status">Loading product details…</p>;
  }

  if (status === "failed") {
    return (
      <div className="status status-error">
        <p>Could not load this product: {error}</p>
        <button type="button" className="btn" onClick={backToProductsHandler}>
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return <p className="status">Product not found.</p>;
  }

  return (
    <section className="product-detail">
      <img className="product-detail-image" src={product.image} alt={product.title} />

      <div>
        <p className="product-detail-category">{product.category}</p>
        <h2 className="product-detail-title">{product.title}</h2>
        <p className="product-detail-price">${product.price.toFixed(2)}</p>
        <p className="product-detail-rating">
          Rating: {product.rating?.rate} / 5 ({product.rating?.count} reviews)
        </p>
        <p className="product-detail-description">{product.description}</p>

        <div className="product-detail-actions">
          <button type="button" className="btn btn-primary" onClick={addToCartHandler}>
            Add to Cart
          </button>
          <button type="button" className="btn" onClick={backToProductsHandler}>
            Back to Products
          </button>
        </div>

      </div>
    </section>
  );
}

export default ProductDetail;