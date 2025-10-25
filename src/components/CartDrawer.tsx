// ============================================================================
// ✅ CartDrawer.tsx — Animated, Responsive, Context-Integrated (2025 Edition)
// ============================================================================
import React, { useState, useEffect } from "react";
import {
  Trash2,
  ShoppingCart,
  AlertCircle,
  Minus,
  Plus,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styles from "./CartDrawer.module.css";

const CartDrawer: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    getCartTotal,
    getTotalItems,
    updateQuantity,
  } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Auto-close drawer on route change
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const formatPrice = (price: number) =>
    `KES ${price.toLocaleString("en-KE", { minimumFractionDigits: 0 })}`;

  const handleCheckout = () => {
    toast.success("Proceeding to checkout...");
    setTimeout(() => navigate("/checkout"), 800);
  };

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast.info(`Removed "${name}" from cart`);
  };

  return (
    <>
      {/* 🛒 Cart Toggle Button (for Navbar or Anywhere) */}
      <button
        className={styles.cartToggleBtn}
        onClick={() => setIsOpen(true)}
        aria-label="Open cart drawer"
      >
        <ShoppingCart size={22} />
        <span className={styles.itemCount}>{getTotalItems()}</span>
      </button>

      {/* 🌑 Overlay + Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className={styles.overlay}
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className={styles.drawer}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* === Header === */}
              <header className={styles.cartHeader}>
                <h1 className={styles.cartTitle}>
                  <ShoppingCart size={20} /> Cart ({getTotalItems()})
                </h1>
                <button
                  className={styles.closeBtn}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close cart drawer"
                >
                  <X size={20} />
                </button>
              </header>

              {/* === Empty Cart State === */}
              {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                  <ShoppingCart className={styles.emptyIcon} aria-hidden="true" />
                  <h2>Your cart is empty</h2>
                  <p>Add some items to get started</p>
                </div>
              ) : (
                <>
                  {/* === Cart Items === */}
                  <div className={styles.cartContent}>
                    {cartItems.map((item) => (
                      <article key={item.id} className={styles.cartItem}>
                        <div className={styles.itemImage}>
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className={styles.productImage}
                          />
                        </div>

                        <div className={styles.itemDetails}>
                          <h3 className={styles.itemName}>{item.name}</h3>
                          {item.category && (
                            <span className={styles.itemCategory}>{item.category}</span>
                          )}
                          {item.variation && (
                            <p className={styles.itemVariation}>
                              Variation: {item.variation}
                            </p>
                          )}
                          {!item.inStock ? (
                            <div className={styles.stockWarning}>
                              <AlertCircle size={14} />
                              <span>Out of Stock</span>
                            </div>
                          ) : (
                            <p className={styles.stockStatus}>In Stock</p>
                          )}
                        </div>

                        {/* === Pricing + Actions === */}
                        <div className={styles.itemPricing}>
                          <p className={styles.currentPrice}>
                            {formatPrice(item.price)}
                          </p>

                          {/* Quantity Controls */}
                          <div className={styles.quantityControl}>
                            <button
                              className={styles.quantityBtn}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
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
                                if (!isNaN(val) && val > 0)
                                  updateQuantity(item.id, val);
                              }}
                              min="1"
                              aria-label="Quantity"
                            />

                            <button
                              className={styles.quantityBtn}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            className={styles.removeBtn}
                            onClick={() => handleRemove(item.id, item.name)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <Trash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* === Summary === */}
                  <div className={styles.cartSummary}>
                    <div className={styles.summaryRow}>
                      <span>Subtotal</span>
                      <strong>{formatPrice(getCartTotal())}</strong>
                    </div>

                    <button
                      className={styles.checkoutBtn}
                      onClick={handleCheckout}
                      aria-label="Proceed to checkout"
                    >
                      Checkout ({formatPrice(getCartTotal())})
                    </button>

                    <button
                      className={styles.clearBtn}
                      onClick={() => {
                        clearCart();
                        toast.info("Cart cleared");
                      }}
                      aria-label="Clear cart"
                    >
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;
