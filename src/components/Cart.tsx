// ===============================================================
// ✅ Cart.tsx — Optimized, Modernized, Context-Integrated (2025 Edition)
// ===============================================================

    // src/components/Cart.tsx
// ===============================================================
// ✅ Cart.tsx — Optimized, Modernized, Context-Integrated (2025 Edition)
// ===============================================================
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Trash2,
  ShoppingCart,
  AlertCircle,
  Minus,
  Plus,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";
import { toast } from "sonner"; // optional — remove if you don't use sonner

// Helper: format price consistently
const currencyFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  minimumFractionDigits: 0,
});

const formatPrice = (value: number) => currencyFormatter.format(value);

// Small component to manage quantity input UX (local state + commit on blur or Enter)
const QuantityInput: React.FC<{
  id: string;
  value: number;
  onChange?: (newQty: number) => void;
  disabled?: boolean;
}> = ({ id, value, onChange, disabled }) => {
  const [local, setLocal] = useState<string>(String(value));

  // if parent value changes (e.g., from other UI), sync local input
  useEffect(() => {
    setLocal(String(value));
  }, [value]);

  const commit = useCallback(
    (valStr?: string) => {
      const v = valStr ?? local;
      const n = Number.parseInt(String(v), 10);
      if (Number.isNaN(n) || n < 1) {
        // reset to prior value
        setLocal(String(value));
        return;
      }
      onChange?.(n);
    },
    [local, onChange, value]
  );

  return (
    <input
      aria-label={`Quantity for item ${id}`}
      className={styles.quantityInput}
      inputMode="numeric"
      pattern="[0-9]*"
      value={local}
      onChange={(e) => setLocal(e.target.value.replace(/[^0-9]/g, ""))}
      onBlur={() => commit()}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          commit();
          (e.target as HTMLInputElement).blur();
        }
      }}
      disabled={disabled}
      min={1}
    />
  );
};

const Cart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    getCartTotal,
    getTotalItems,
    updateQuantity, // optional — component will degrade gracefully if absent
  } = useCart();

  // Memoized totals to avoid recalculation on every render
  const subtotal = useMemo(() => getCartTotal(), [getCartTotal]);
  const totalItems = useMemo(() => getTotalItems(), [getTotalItems]);

  // Safety: if updateQuantity isn't provided, we disable the inline numerical edit
  const quantityControlsEnabled = Boolean(updateQuantity);

  // Decrease / Increase handlers use updateQuantity if available
  const handleAdjustQty = useCallback(
    (id: string, qty: number) => {
      if (!quantityControlsEnabled) {
        toast?.info?.("Quantity editing not available.");
        return;
      }
      // protect against invalid quantities
      const safeQty = Math.max(1, Math.trunc(qty));
      updateQuantity && updateQuantity(id, safeQty);
    },
    [updateQuantity, quantityControlsEnabled]
  );

  const handleRemove = useCallback(
    (id: string, name?: string) => {
      removeFromCart(id);
      toast?.info?.(`Removed ${name ?? "item"} from cart`);
    },
    [removeFromCart]
  );

  const handleClear = useCallback(() => {
    // confirm destructive action for better UX
    if (cartItems.length === 0) return;
    const ok = window.confirm("Clear your cart? This action cannot be undone.");
    if (ok) {
      clearCart();
      toast?.success?.("Cart cleared");
    }
  }, [clearCart, cartItems.length]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      toast?.info?.("Your cart is empty.");
      return;
    }
    // Hook here to route to checkout or open modal
    // e.g., navigate('/checkout') from react-router (not included here)
    toast?.success?.("Proceeding to checkout...");
    // TODO: call navigation logic in your app
  }, [cartItems.length]);

  // Empty state
  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart} role="status" aria-live="polite">
        <ShoppingCart className={styles.emptyIcon} aria-hidden="true" />
        <h2 className={styles.emptyTitle}>Your cart is empty</h2>
        <p className={styles.emptyMsg}>Add items to get started.</p>
      </div>
    );
  }

  return (
    <main className={styles.cartContainer}>
      <header className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>
          <ShoppingCart size={20} aria-hidden="true" /> Cart ({totalItems})
        </h1>
      </header>

      <div className={styles.cartContent}>
        {/* Items column */}
        <section className={styles.cartItems} aria-label="Cart items">
          {cartItems.map((item) => (
            <article key={item.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                {/* consider using next/image or <picture> for responsive images later */}
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className={styles.productImage}
                />
              </div>

              <div className={styles.itemDetails}>
                <h2 className={styles.itemName}>{item.name}</h2>

                {item.category && (
                  <p className={styles.itemCategory}>{item.category}</p>
                )}

                {item.description && (
                  <p className={styles.itemDescription}>{item.description}</p>
                )}

                {item.variation && (
                  <p className={styles.itemVariation}>
                    <strong>Variant:</strong> {item.variation}
                  </p>
                )}

                {!item.inStock ? (
                  <div className={styles.stockWarning} aria-live="polite">
                    <AlertCircle size={14} aria-hidden="true" />
                    <span>Out of stock</span>
                  </div>
                ) : (
                  <p className={styles.stockStatus}>In stock</p>
                )}
              </div>

              <div className={styles.itemPricing}>
                <div className={styles.priceSection}>
                  <p className={styles.currentPrice}>{formatPrice(item.price)}</p>
                  {item.originalPrice && (
                    <p className={styles.originalPrice}>
                      {formatPrice(item.originalPrice)}
                    </p>
                  )}
                  {item.discount && (
                    <span className={styles.discountBadge}>-{item.discount}%</span>
                  )}
                </div>

                <div className={styles.controlsRow}>
                  <div className={styles.quantityControl}>
                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => handleAdjustQty(item.id, Math.max(1, item.quantity - 1))}
                      disabled={!quantityControlsEnabled || item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <Minus size={14} />
                    </button>

                    <QuantityInput
                      id={item.id}
                      value={item.quantity}
                      onChange={(n) => handleAdjustQty(item.id, n)}
                      disabled={!quantityControlsEnabled}
                    />

                    <button
                      type="button"
                      className={styles.quantityBtn}
                      onClick={() => handleAdjustQty(item.id, item.quantity + 1)}
                      disabled={!quantityControlsEnabled}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    className={styles.removeBtn}
                    onClick={() => handleRemove(item.id, item.name)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                    <span className={styles.removeText}>Remove</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Summary column */}
        <aside className={styles.cartSummary} aria-label="Cart summary">
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Cart summary</h3>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <strong className={styles.summaryAmount}>{formatPrice(subtotal)}</strong>
            </div>

            <div className={styles.summaryActions}>
              <button
                type="button"
                className={styles.checkoutBtn}
                onClick={handleCheckout}
                aria-label={`Checkout ${formatPrice(subtotal)}`}
              >
                Checkout ({formatPrice(subtotal)})
              </button>

              <button
                type="button"
                className={styles.clearBtn}
                onClick={handleClear}
                aria-label="Clear cart"
              >
                Clear cart
              </button>
            </div>
          </div>
        </aside>
      </div>

      <footer className={styles.cartFooter} aria-hidden={false}>
        <small>Secure checkout · Local currency: KES</small>
      </footer>
    </main>
  );
};

export default Cart;

