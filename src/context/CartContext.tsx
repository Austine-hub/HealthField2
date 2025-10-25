// ===============================================================
// ✅ CartContext.tsx — Optimized, Persistent, Drawer-Integrated (2025 Edition)
// ===============================================================
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import type { ReactNode } from "react";

// ----------------------------
// 🧩 Cart Item Type Definition
// ----------------------------
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  category?: string;
  description?: string;
  variation?: string;
  inStock?: boolean;
  originalPrice?: number;
  discount?: number;
}

// ----------------------------
// 🧭 Cart Context Type
// ----------------------------
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getTotalItems: () => number;
  // 🆕 Drawer State Handlers
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// ----------------------------
// 🔐 Context Setup
// ----------------------------
const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "cart_items";

// ----------------------------
// 🏗️ Provider Component
// ----------------------------
export const CartProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Persistent Cart Items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.warn("⚠️ Failed to parse cart from localStorage:", err);
      return [];
    }
  });

  // ✅ Drawer (Cart Modal) State
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error("❌ Failed to save cart to localStorage:", err);
    }
  }, [cartItems]);

  // -------------------------------------------------
  // 🛒 Cart Operations
  // -------------------------------------------------
  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const getCartTotal = useCallback(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const getTotalItems = useCallback(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // -------------------------------------------------
  // 🧭 Drawer Toggle Logic
  // -------------------------------------------------
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(
    () => setIsCartOpen((prev) => !prev),
    []
  );

  // -------------------------------------------------
  // 🧠 Memoized Context Value
  // -------------------------------------------------
  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getTotalItems,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getTotalItems,
      isCartOpen,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// ----------------------------
// 🧩 Custom Hook for Safe Access
// ----------------------------
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

