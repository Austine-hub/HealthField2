// ===============================================================
// ✅ Cart.tsx — Optimized, Modernized, Context-Integrated (2025 Edition)
// ===============================================================
import React from "react";
import {
  Trash2,
  ShoppingCart,
  AlertCircle,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";

const Cart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    getCartTotal,
    getTotalItems,
    updateQuantity, // ✅ added helper from context
  } = useCart();

  const formatPrice = (price: number) =>
    `KES ${price.toLocaleString("en-KE", { minimumFractionDigits: 0 })}`;

  // ✅ Empty cart UI
  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <ShoppingCart className={styles.emptyIcon} aria-hidden="true" />
        <h2>Your cart is empty</h2>
        <p>Add some items to get started</p>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      {/* === Header === */}
      <header className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>
          <ShoppingCart size={22} /> Cart ({getTotalItems()})
        </h1>
      </header>

      {/* === Cart Content === */}
      <div className={styles.cartContent}>
        {/* === Cart Items === */}
        <section className={styles.cartItems}>
          {cartItems.map((item) => (
            <article key={item.id} className={styles.cartItem}>
              {/* Product Image */}
              <div className={styles.itemImage}>
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className={styles.productImage}
                />
              </div>

              {/* Product Info */}
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.name}</h3>

                {item.category && (
                  <span className={styles.itemCategory}>{item.category}</span>
                )}
                {item.description && (
                  <p className={styles.itemDescription}>{item.description}</p>
                )}
                {item.variation && (
                  <p className={styles.itemVariation}>
                    Variation: {item.variation}
                  </p>
                )}

                {!item.inStock ? (
                  <div className={styles.stockWarning}>
                    <AlertCircle size={16} aria-hidden="true" />
                    <span>Out of Stock</span>
                  </div>
                ) : (
                  <p className={styles.stockStatus}>In Stock</p>
                )}
              </div>

              {/* Pricing + Actions */}
              <div className={styles.itemPricing}>
                {/* Price display */}
                <div className={styles.priceSection}>
                  <p className={styles.currentPrice}>
                    {formatPrice(item.price)}
                  </p>
                  {item.originalPrice && (
                    <p className={styles.originalPrice}>
                      {formatPrice(item.originalPrice)}
                    </p>
                  )}
                  {item.discount && (
                    <span className={styles.discountBadge}>
                      -{item.discount}%
                    </span>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>

                  <input
                    type="number"
                    className={styles.quantityInput}
                    value={item.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) updateQuantity(item.id, val);
                    }}
                    min="1"
                    aria-label="Quantity"
                  />

                  <button
                    className={styles.quantityBtn}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 size={18} />
                  <span>Remove</span>
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* === Cart Summary === */}
        <aside className={styles.cartSummary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>CART SUMMARY</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span className={styles.summaryAmount}>
                {formatPrice(getCartTotal())}
              </span>
            </div>

            <button
              className={styles.checkoutBtn}
              onClick={() => alert("Proceeding to checkout...")}
              aria-label={`Checkout ${formatPrice(getCartTotal())}`}
            >
              Checkout ({formatPrice(getCartTotal())})
            </button>

            <button
              className={styles.clearBtn}
              onClick={clearCart}
              aria-label="Clear cart"
            >
              Clear Cart
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
