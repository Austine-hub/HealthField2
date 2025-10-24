// ===============================================================
// ✅ BestSellers.tsx — Modern, Responsive, Type-Safe (2025 Optimized)
// ===============================================================

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./BestSellers.module.css";

// ===============================================================
// 🧩 Interfaces
// ===============================================================
interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  isTopSeller: boolean;
  isPharma?: boolean;
  isNonPharma?: boolean;
}

// ===============================================================
// 🧠 Component
// ===============================================================
const BestSellers: React.FC = () => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // ===============================================================
  // 🛒 Product List (Demo Data)
  // ===============================================================
  const products: Product[] = [
    {
      id: "1",
      name: "Swift Hiv Kit Cassette",
      category: "Non-Pharma",
      description: "Used to detect the presence of HIV antibodies...",
      price: 300,
      image: "/api/placeholder/200/200",
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "2",
      name: "Fludex-C Tablets 10s",
      category: "Pharma",
      description: "Cold and flu relief medication for symptom management.",
      price: 300,
      image: "/api/placeholder/200/200",
      isTopSeller: true,
      isPharma: true,
    },
    {
      id: "3",
      name: "Swift Pregnancy Kit Cassette",
      category: "Non-Pharma",
      description: "Diagnostic kit for detecting human chorionic gonadotropin.",
      price: 300,
      image: "/api/placeholder/200/200",
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "4",
      name: "Dulcolax Tablets 5mg 100's",
      category: "Pharma",
      description: "Medication used to relieve constipation effectively.",
      price: 300,
      image: "/api/placeholder/200/200",
      isTopSeller: true,
      isPharma: true,
    },
    {
      id: "5",
      name: "Swift Pregnancy Kit Midstream",
      category: "Non-Pharma",
      description: "Quick and easy test for early pregnancy detection.",
      price: 350,
      image: "/api/placeholder/200/200",
      isTopSeller: true,
      isNonPharma: true,
    },
    {
      id: "6",
      name: "Durex Fetherlite 3s",
      category: "Non-Pharma",
      description: "Ultra-thin condoms designed for enhanced sensitivity.",
      price: 650,
      image: "/api/placeholder/200/200",
      isTopSeller: true,
      isNonPharma: true,
    },
  ];

  // ===============================================================
  // ❤️ Favorite Toggle
  // ===============================================================
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(productId)) {
        updated.delete(productId);
        toast.success("Removed from favorites");
      } else {
        updated.add(productId);
        toast.success("Added to favorites");
      }
      return updated;
    });
  };

  // ===============================================================
  // 🛒 Add to Cart
  // ===============================================================
  const addToCart = (productName: string) => {
    toast.success(`${productName} added to cart!`);
  };

  // ===============================================================
  // 🔗 Share Product
  // ===============================================================
  const shareProduct = (productName: string) => {
    if (navigator.share) {
      navigator
        .share({
          title: productName,
          text: `Check out ${productName} at Healthfield Pharmacy`,
          url: window.location.href,
        })
        .catch(() => toast.error("Failed to share"));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  // ===============================================================
  // ↔️ Scroll Controls
  // ===============================================================
  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    container.scrollTo({
      left:
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  // ===============================================================
  // ✨ Animation Variants (Type-Safe)
  // ===============================================================
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  // ===============================================================
  // 🧩 JSX Layout
  // ===============================================================
  return (
    <section className={styles.bestSellers} aria-labelledby="bestsellers-heading">
      <div className={styles.container}>
        {/* ===== Header ===== */}
        <div className={styles.header}>
          <h2 id="bestsellers-heading" className={styles.title}>
            Best Sellers
          </h2>

          <div className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className={styles.navButton}
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* ===== Product Cards ===== */}
        <motion.div
          className={styles.productsWrapper}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          ref={scrollContainerRef}
        >
          {products.map((product) => (
            <motion.article
              key={product.id}
              className={styles.productCard}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* ⭐ Top Seller Badge */}
              {product.isTopSeller && (
                <motion.div
                  className={styles.topSellerBadge}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.15 }}
                >
                  ⭐ Top Seller
                </motion.div>
              )}

              {/* 🖼️ Product Image */}
              <div className={styles.imageContainer}>
                <LazyLoadImage
                  src={product.image}
                  alt={product.name}
                  effect="blur"
                  className={styles.productImage}
                  wrapperClassName={styles.imageWrapper}
                />

                <motion.button
                  className={`${styles.iconButton} ${styles.favoriteButton}`}
                  onClick={() => toggleFavorite(product.id)}
                  whileTap={{ scale: 0.9 }}
                  aria-label={
                    favorites.has(product.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    size={20}
                    fill={favorites.has(product.id) ? "#e53e3e" : "none"}
                    color={favorites.has(product.id) ? "#e53e3e" : "#718096"}
                  />
                </motion.button>

                <motion.button
                  className={`${styles.iconButton} ${styles.shareButton}`}
                  onClick={() => shareProduct(product.name)}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Share product"
                >
                  <Share2 size={20} />
                </motion.button>
              </div>

              {/* 📄 Product Info */}
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>

                <div className={styles.categoryBadge}>
                  {product.isPharma && (
                    <span className={`${styles.badge} ${styles.pharmaBadge}`}>
                      Pharma
                    </span>
                  )}
                  {product.isNonPharma && (
                    <span className={`${styles.badge} ${styles.nonPharmaBadge}`}>
                      Non-Pharma
                    </span>
                  )}
                </div>

                <p className={styles.productDescription}>
                  {product.description}
                </p>

                <div className={styles.priceContainer}>
                  <span className={styles.price}>
                    Kes. {product.price.toFixed(2)}
                  </span>
                </div>

                <div className={styles.actionButtons}>
                  <motion.button
                    className={styles.addButton}
                    onClick={() => addToCart(product.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart size={18} />
                    Add
                  </motion.button>

                  <motion.button
                    className={styles.detailsButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* ===== View All Link ===== */}
        <motion.div
          className={styles.viewAllContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="#all-bestsellers"
            className={styles.viewAllLink}
            whileHover={{ x: 5 }}
          >
            View All Best Sellers →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellers;
