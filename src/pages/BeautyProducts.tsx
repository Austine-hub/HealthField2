// BeautyProducts.tsx — Modernized, accessible, Cart-integrated
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from "react-hot-toast";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./BeautyProducts.module.css";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  trending?: boolean;
  trendingRank?: number;
}

const BeautyProducts: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setVisibleCards] = useState(4);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Cart context
  const { addToCart, updateQuantity, openCart, cartItems } = useCart();

  const products: Product[] = [
    {
      id: 1,
      name: "Carmex Lip Balm Tube Classic 10g",
      description: "A classic lip balm designed to moisturize and soothe dry lips.",
      price: 430.0,
      image: "https://images.unsplash.com/photo-1631214499319-6c1d5ce81eb9?w=400&h=400&fit=crop",
      brand: "Carmex",
      trending: true,
      trendingRank: 1,
    },
    {
      id: 2,
      name: "Studex Earrings Pr-R508w-Stxf For Piercing",
      description: "Premium crystal earrings suitable for everyday wear.",
      price: 650.0,
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop",
      brand: "Studex",
      trending: true,
    },
    {
      id: 3,
      name: "Vaseline Lip Therapy Aloe 20g",
      description: "Moisturizing lip balm infused with soothing aloe extract.",
      price: 525.0,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      brand: "Vaseline",
    },
    {
      id: 4,
      name: "Carmex Strawberry 10g Tube",
      description: "Nourishing strawberry lip balm for everyday hydration.",
      price: 740.0,
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
      brand: "Carmex",
      trending: true,
      trendingRank: 2,
    },
    {
      id: 5,
      name: "Vaseline Lip Therapy Cocoa Butter 20g",
      description: "Deep moisturizing formula with rich cocoa butter.",
      price: 525.0,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      brand: "Vaseline",
    },
    {
      id: 6,
      name: "Studex Earrings Daisy 4mm Set",
      description: "Elegant daisy-shaped stud earrings with hypoallergenic design.",
      price: 700.0,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
      brand: "Studex",
    },
  ];

  // Responsive visible card count (for future scaling)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCards(1);
      else if (width < 1024) setVisibleCards(2);
      else if (width < 1280) setVisibleCards(3);
      else setVisibleCards(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollBy = useCallback((offset: number) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  const handlePrev = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = el.clientWidth / 2;
    scrollBy(-amount);
  }, [scrollBy]);

  const handleNext = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = el.clientWidth / 2;
    scrollBy(amount);
  }, [scrollBy]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        toast.success("Removed from favorites");
      } else {
        next.add(id);
        toast.success("Added to favorites");
      }
      return next;
    });
  }, []);

  const handleShare = useCallback(async (product: Product) => {
    try {
      const url = `${window.location.origin}/product/${product.id}`;
      await navigator.clipboard.writeText(url);
      toast.success("Product link copied to clipboard");
    } catch {
      toast("Unable to copy link");
    }
  }, []);

  const handleAddToCart = useCallback(
    (product: Product) => {
      const stringId = product.id.toString();
      const inCart = cartItems.find((ci) => ci.id === stringId);

      if (inCart) {
        updateQuantity(stringId, inCart.quantity + 1);
      } else {
        addToCart({
          id: stringId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          category: product.brand,
          description: product.description,
          inStock: true,
        });
      }

      toast.success(`${product.name} added to cart`, { duration: 2000 });

      try {
        openCart();
      } catch {
        // ignore silently if unavailable
      }
    },
    [addToCart, cartItems, updateQuantity, openCart]
  );

  const onCardFocus = (index: number) => setFocusedIndex(index);
  const onCardBlur = () => setFocusedIndex(null);

  return (
    <section className={styles.beautySection} aria-labelledby="beauty-title">
      <Toaster position="top-right" />
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="beauty-title" className={styles.title}>
            Beauty Products
          </h2>

          <nav className={styles.navigation} aria-label="Carousel navigation">
            <button
              className={styles.navButton}
              onClick={handlePrev}
              aria-label="Previous products"
              title="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next products"
              title="Next"
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        </header>

        <div
          className={styles.productsWrapper}
          ref={carouselRef}
          role="list"
          aria-live="polite"
        >
          {products.map((product, idx) => {
            const isFavorited = favorites.has(product.id);
            const isFocused = focusedIndex === idx;

            return (
              <motion.article
                key={product.id}
                className={`${styles.productCard} ${isFocused ? styles.focusedCard : ""}`}
                role="listitem"
                tabIndex={0}
                onFocus={() => onCardFocus(idx)}
                onBlur={onCardBlur}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                aria-label={`${product.name} — ${product.brand} — KES ${product.price}`}
              >
                {product.trending && (
                  <span className={styles.trendingBadge}>
                    🔥 {product.trendingRank ? `${product.trendingRank}. ` : ""}Trending
                  </span>
                )}

                <div className={styles.imageContainer}>
                  <LazyLoadImage
                    src={product.image}
                    alt={product.name}
                    effect="blur"
                    className={styles.productImage}
                    width="100%"
                    height="100%"
                  />

                  <button
                    className={`${styles.iconButton} ${styles.favoriteButton}`}
                    onClick={() => toggleFavorite(product.id)}
                    aria-pressed={isFavorited}
                    aria-label={`${isFavorited ? "Remove from" : "Add to"} favorites`}
                    title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      size={16}
                      fill={isFavorited ? "#ff4757" : "none"}
                      color={isFavorited ? "#ff4757" : "#666"}
                      aria-hidden="true"
                    />
                  </button>

                  <button
                    className={`${styles.iconButton} ${styles.shareButton}`}
                    onClick={() => handleShare(product)}
                    aria-label="Share product"
                    title="Share product link"
                  >
                    <Share2 size={16} color="#666" aria-hidden="true" />
                  </button>
                </div>

                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <p className={styles.brandName}>{product.brand}</p>
                  <span className={styles.price}>KES {product.price.toFixed(2)}</span>

                  <div className={styles.actionButtons}>
                    <motion.button
                      className={styles.addButton}
                      onClick={() => handleAddToCart(product)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCart size={16} aria-hidden="true" /> Add
                    </motion.button>

                    <motion.a
                      className={styles.detailsButton}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={`/product/${product.id}`}
                      aria-label={`View details for ${product.name}`}
                    >
                      View details
                    </motion.a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className={styles.viewAllContainer}>
          <motion.a
            href="/beauty-products"
            className={styles.viewAllLink}
            whileHover={{ x: 4 }}
            aria-label="View all beauty products"
          >
            View All Beauty Products <ChevronRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default BeautyProducts;
