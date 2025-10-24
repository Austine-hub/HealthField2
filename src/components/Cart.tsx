import React, { useState } from 'react';
import { Trash2, ShoppingCart, AlertCircle } from 'lucide-react';
import styles from './Cart.module.css';

interface CartItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  quantity: number;
  image: string;
  inStock: boolean;
  variation?: string;
}

interface CartProps {
  items?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
  currency?: string;
}

const Cart: React.FC<CartProps> = ({
  items = [],
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency = 'KSh'
}) => {
  const [localItems, setLocalItems] = useState<CartItem[]>(items);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    if (onUpdateQuantity) {
      onUpdateQuantity(id, newQuantity);
    } else {
      setLocalItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemove = (id: string) => {
    if (onRemoveItem) {
      onRemoveItem(id);
    } else {
      setLocalItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const displayItems = items.length > 0 ? items : localItems;

  const subtotal = displayItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return `${currency} ${price.toLocaleString()}`;
  };

  if (displayItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <ShoppingCart className={styles.emptyIcon} />
        <h2>Your cart is empty</h2>
        <p>Add items to get started</p>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>
          Cart ({displayItems.length})
        </h1>
      </div>

      <div className={styles.cartContent}>
        <div className={styles.cartItems}>
          {displayItems.map(item => (
            <article key={item.id} className={styles.cartItem}>
              <div className={styles.itemImage}>
                <img src={item.image} alt={item.name} loading="lazy" />
              </div>

              <div className={styles.itemDetails}>
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  {item.description && (
                    <p className={styles.itemDescription}>{item.description}</p>
                  )}
                  {item.variation && (
                    <p className={styles.itemVariation}>
                      Variation: {item.variation}
                    </p>
                  )}
                  {!item.inStock && (
                    <div className={styles.stockWarning}>
                      <AlertCircle size={16} />
                      <span>Out of Stock</span>
                    </div>
                  )}
                  {item.inStock && (
                    <p className={styles.stockStatus}>In Stock</p>
                  )}
                </div>

                <div className={styles.itemActions}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemove(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 size={18} />
                    <span>Remove</span>
                  </button>
                </div>
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

                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className={styles.quantityInput}
                    value={item.quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) {
                        handleQuantityChange(item.id, val);
                      }
                    }}
                    min="1"
                    aria-label="Quantity"
                  />
                  <button
                    className={styles.quantityBtn}
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className={styles.cartSummary}>
          <div className={styles.summaryCard}>
            <h2 className={styles.summaryTitle}>CART SUMMARY</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span className={styles.summaryAmount}>{formatPrice(subtotal)}</span>
            </div>

            <button
              className={styles.checkoutBtn}
              onClick={onCheckout}
              aria-label={`Checkout ${formatPrice(subtotal)}`}
            >
              Checkout ({formatPrice(subtotal)})
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;