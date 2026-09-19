import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
} from "../redux/cartSlice";
import "./css/Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const items = useSelector(selectCartItems);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subTotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const originalSubtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * 1.15 * item.quantity, 0),
    [items]
  );

  const discountSavings = useMemo(
    () => originalSubtotal - subTotal,
    [originalSubtotal, subTotal]
  );

  const shipping = 0;
  const grandTotal = subTotal;

  const increaseHandler = (id) => {
    dispatch(increaseQuantity(id));
  };

  const decreaseHandler = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const continueShoppingHandler = () => {
    navigate("/products");
  };

  const checkoutHandler = () => {
    setCheckoutComplete(false);
    setIsCheckoutOpen(true);
  };

  const confirmCheckoutHandler = () => {
    dispatch(clearCart());
    setCheckoutComplete(true);
  };

  if (items.length === 0 && !isCheckoutOpen) {
    return (
      <section className="cart-empty">
        <div className="cart-empty-icon" aria-hidden="true">
          <i className="fa-solid fa-cart-shopping" />
        </div>
        <h2>Your cart is empty</h2>
        <p>Your selected products will appear here.</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2 className="cart-heading">Your Cart ({totalItems})</h2>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <div className="cart-item-image-wrap">
                <img className="cart-item-image" src={item.image} alt={item.title} />
              </div>

              <div>
                <h3 className="cart-item-title">{item.title}</h3>
                <div className="cart-item-prices">
                  <strong>${item.price.toFixed(2)}</strong>
                  <del>${(item.price * 1.15).toFixed(2)}</del>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button type="button" onClick={() => decreaseHandler(item.id)} aria-label="Decrease quantity">
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => increaseHandler(item.id)} aria-label="Increase quantity">
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => removeHandler(item.id)}
                  >
                    <i className="fa-regular fa-trash-can" aria-hidden="true" />
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h3>Order Summary</h3>

          <div className="cart-summary-row">
            <span>Items ({totalItems})</span>
            <span>${originalSubtotal.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span className="discount-label">Discount savings</span>
            <span className="discount-value">-${discountSavings.toFixed(2)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <div className="cart-summary-total">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

          <button type="button" className="btn btn-primary" onClick={checkoutHandler}>
            Proceed to Checkout
          </button>
          <button type="button" className="btn btn-continue" onClick={continueShoppingHandler}>
            ← Continue shopping
          </button>
        </aside>
      </div>

      {isCheckoutOpen && (
        <div className="checkout-overlay" role="presentation">
          <div className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
            {checkoutComplete ? (
              <>
                <div className="checkout-icon" aria-hidden="true">OK</div>
                <h3 id="checkout-title">Order confirmed</h3>
                <p>Your order has been placed successfully.</p>
                <button type="button" className="btn btn-primary" onClick={() => setIsCheckoutOpen(false)}>
                  Close
                </button>
              </>
            ) : (
              <>
                <div className="checkout-icon" aria-hidden="true">
                  <i className="fa-solid fa-cart-shopping" />
                </div>
                <h3 id="checkout-title">Confirm Your Order</h3>
                <p>Please check your order details before continuing.</p>
                <div className="checkout-total">
                  <span>Final Amount</span>
                  <strong>${grandTotal.toFixed(2)}</strong>
                </div>
                <div className="checkout-actions">
                  <button type="button" className="btn" onClick={() => setIsCheckoutOpen(false)}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary" onClick={confirmCheckoutHandler}>
                    Continue
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Cart;