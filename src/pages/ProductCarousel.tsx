import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import styles from "./ProductCarousel.module.css";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  image: string;
  trending: boolean;
}

const ProductCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // ✅ Access the global cart context
  const { addToCart, openCart } = useCart();

  // 🛒 Add to Cart handler (global + toast feedback)
  const handleAddToCart = useCallback((product: Product) => {
    const cartItem = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      category: product.brand,
      description: product.description,
      inStock: true,
    };
    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`, { duration: 2000 });
    openCart(); // Optional: open the cart drawer automatically
  }, [addToCart, openCart]);

  // 💨 Scroll logic (unchanged)
  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  }, []);

  const checkScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  // 🧾 Product data (mock)
  const products: Product[] = [
    {
      id: 1,
      name: "Swift Hiv Kit Cassette",
      description: "Used to detect the presence of HIV (Human Immunodeficiency Virus).",
      brand: "Pharmaplus",
      price: 300.0,
      image:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
      trending: true,
    },
    {
      id: 2,
      name: "Swift Pregnancy Kit Cassette",
      description: "Diagnostic kit used to detect human chorionic gonadotropin (hCG).",
      brand: "Pharmaplus",
      price: 300.0,
      image:
        "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
      trending: true,
    },
    {
      id: 3,
      name: "Digital Thermometer",
      description: "Measures body temperature quickly and accurately.",
      brand: "Pharmaplus",
      price: 450.0,
      image:
        "https://images.unsplash.com/photo-1584555684040-bad07f3a82c5?w=400&h=300&fit=crop",
      trending: false,
    },
    {
      id: 4,
      name: "Alcohol Swabs 100s",
      description: "Used in medical settings to disinfect skin before injections.",
      brand: "Pharmaplus",
      price: 200.0,
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop",
      trending: true,
    },
    {
      id: 5,
      name: "Elastoplast Sensitive Plasters 20'S",
      description: "Gentle and hypoallergenic plasters for sensitive skin.",
      brand: "Elastoplast",
      price: 1155.0,
      image:
        "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
      trending: false,
    },
  ];

  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        {/* ===== HEADER ===== */}
        <div className={styles.header}>
          <h2 className={styles.title}>Home Healthcare</h2>
          <div className={styles.navigation}>
            <button
              className={`${styles.navButton} ${!canScrollLeft ? styles.disabled : ""}`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              className={`${styles.navButton} ${!canScrollRight ? styles.disabled : ""}`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>

        {/* ===== PRODUCT CAROUSEL ===== */}
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel} ref={scrollContainerRef}>
            {products.map((product) => (
              <motion.article
                key={product.id}
                className={styles.productCard}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className={styles.cardHeader}>
                  {product.trending && (
                    <span className={styles.trendingBadge}>🔥 Trending</span>
                  )}
                </div>

                <div className={styles.imageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className={styles.productImage}
                  />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <p className={styles.productBrand}>{product.brand}</p>
                  <p className={styles.productPrice}>KES {product.price.toFixed(2)}</p>
                </div>

                <div className={styles.cardFooter}>
                  <button
                    className={styles.addButton}
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    🛒 Add
                  </button>
                  <button
                    className={styles.detailsButton}
                    onClick={() => toast("Feature coming soon!")}
                  >
                    View Details
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ===== VIEW ALL LINK ===== */}
        <div className={styles.viewAll}>
          <a href="#" className={styles.viewAllLink}>
            View All Home Healthcare Products →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
