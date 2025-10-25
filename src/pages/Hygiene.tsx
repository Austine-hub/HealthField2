// src/components/offers/Offers2.tsx
import React, { useRef, useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import styles from "./Hygiene.module.css";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  isTrending: boolean;
}

const Offers2: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addToCart } = useCart();

  const products: Product[] = [
    {
      id: "1",
      name: "Durex Fetherlite 3s",
      description: "It Is A Barrier Method Of Contraception Designed To...",
      price: 650.0,
      image: "/api/placeholder/200/200",
      brand: "Durex",
      isTrending: true,
    },
    {
      id: "2",
      name: "Durex Feel Condoms 3'S",
      description: "It Is A Barrier Method Of Contraception Designed To...",
      price: 550.0,
      image: "/api/placeholder/200/200",
      brand: "Durex",
      isTrending: true,
    },
    {
      id: "3",
      name: "Durex Extra Safe 3'S",
      description: "It Is A Barrier Method Of Contraception Designed To...",
      price: 578.0,
      image: "/api/placeholder/200/200",
      brand: "Durex",
      isTrending: true,
    },
    {
      id: "4",
      name: "Durex Thin Feel 3'S",
      description: "It Is A Barrier Method Of Contraception Designed To...",
      price: 400.0,
      image: "/api/placeholder/200/200",
      brand: "Durex",
      isTrending: true,
    },
    {
      id: "5",
      name: "Durex Pleasuremax 3'S",
      description: "It Is A Barrier Method Of Contraception Designed To...",
      price: 500.0,
      image: "/api/placeholder/200/200",
      brand: "Durex",
      isTrending: true,
    },
    {
      id: "6",
      name: "Oral-B Unwaxed Dental Floss",
      description: "It Is A Thin, Flexible Piece Of String Used To Remove Food...",
      price: 578.0,
      image: "/api/placeholder/200/200",
      brand: "Oral B",
      isTrending: false,
    },
  ];

  // ===== Scroll Logic =====
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ===== Add to Cart Integration =====
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart 🛒`, { duration: 1800 });
  };

  return (
    <section className={styles.offersSection}>
      <div className={styles.container}>
        {/* ===== Section Header ===== */}
        <div className={styles.header}>
          <h2 className={styles.title}>General Hygiene</h2>
          <div className={styles.navButtons}>
            <button
              className={`${styles.navBtn} ${!canScrollLeft ? styles.disabled : ""}`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className={`${styles.navBtn} ${!canScrollRight ? styles.disabled : ""}`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18l6-6-6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ===== Products Scroll Section ===== */}
        <div className={styles.productsWrapper} ref={scrollRef} onScroll={checkScroll}>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <article key={product.id} className={styles.productCard}>
                {/* Trending Badge */}
                {product.isTrending && (
                  <span className={styles.trendingBadge}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                        fill="currentColor"
                      />
                    </svg>
                    Trending
                  </span>
                )}

                {/* Product Image */}
                <div className={styles.imageWrapper}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                    loading="lazy"
                  />
                </div>

                {/* Product Info */}
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <p className={styles.brandName}>{product.brand}</p>
                  <p className={styles.price}>KES {product.price.toFixed(2)}</p>
                </div>

                {/* Card Footer */}
                <div className={styles.cardFooter}>
                  <button
                    className={styles.addBtn}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={18} strokeWidth={1.8} />
                    <span>Add</span>
                  </button>
                  <button className={styles.detailsBtn}>View Details</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <a href="#" className={styles.viewAll}>
          View All Hygiene Products
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Offers2;
