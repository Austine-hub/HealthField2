import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import toast, { Toaster } from "react-hot-toast";
import "react-lazy-load-image-component/src/effects/blur.css";
import styles from "./BeautyProducts.module.css";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const carouselRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState(4);

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

  const handleNext = () => {
    if (currentIndex < products.length - visibleCards) setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      newFavorites.has(id)
        ? (newFavorites.delete(id), toast.success("Removed from favorites"))
        : (newFavorites.add(id), toast.success("Added to favorites"));
      return newFavorites;
    });
  };

  const handleAddToCart = (product: Product) => toast.success(`${product.name} added to cart!`);
  const handleShare = () => toast.success("Link copied to clipboard!");

  return (
    <section className={styles.beautySection}>
      <Toaster position="top-right" />
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Beauty Products</h2>
          <nav className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous products"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={styles.navButton}
              onClick={handleNext}
              disabled={currentIndex >= products.length - visibleCards}
              aria-label="Next products"
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        </header>

        <div className={styles.productsWrapper} ref={carouselRef}>
          {products.map((product) => (
            <motion.article
              key={product.id}
              className={styles.productCard}
              whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
            >
              {product.trending && (
                <span className={styles.trendingBadge}>
                  🔥 {product.trendingRank && `${product.trendingRank}.`} Trending
                </span>
              )}

              <div className={styles.imageContainer}>
                <LazyLoadImage
                  src={product.image}
                  alt={product.name}
                  effect="blur"
                  className={styles.productImage}
                />
                <button
                  className={`${styles.iconButton} ${styles.favoriteButton}`}
                  onClick={() => toggleFavorite(product.id)}
                  aria-label="Add to favorites"
                >
                  <Heart
                    size={16}
                    fill={favorites.has(product.id) ? "#ff4757" : "none"}
                    color={favorites.has(product.id) ? "#ff4757" : "#999"}
                  />
                </button>
                <button
                  className={`${styles.iconButton} ${styles.shareButton}`}
                  onClick={handleShare}
                  aria-label="Share product"
                >
                  <Share2 size={16} color="#999" />
                </button>
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDesc}>{product.description}</p>
                <p className={styles.brandName}>{product.brand}</p>
                <span className={styles.price}>Kes. {product.price.toFixed(2)}</span>

                <div className={styles.actionButtons}>
                  <motion.button
                    className={styles.addButton}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={16} /> Add
                  </motion.button>
                  <motion.button
                    className={styles.detailsButton}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className={styles.viewAllContainer}>
          <motion.a
            href="/beauty-products"
            className={styles.viewAllLink}
            whileHover={{ x: 4 }}
          >
            View All Beauty Products <ChevronRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default BeautyProducts;

