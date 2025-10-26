import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import styles from "./ProductCarousel.module.css";
import { useCart } from "../context/CartContext";


// === Import images ===
import pic1 from "../assets/products/Allergy.png";
import pic2 from "../assets/products/Anthelios.png";
import pic3 from "../assets/products/Contraception.png";
import pic4 from "../assets/products/Cough.png";
import pic5 from "../assets/products/Headache.png";
import pic6 from "../assets/products/Eno.png";
import pic7 from "../assets/products/Diclofenac.png";
import pic8 from "../assets/products/UTI.png";
import pic9 from "../assets/products/Allergy.png";
import pic10 from "../assets/products/Anthelios.png";
import pic11 from "../assets/products/Contraception.png";
import pic12 from "../assets/products/Cough.png";
import pic13 from "../assets/products/Headache.png";
import pic14 from "../assets/products/Eno.png";
import pic15 from "../assets/products/Diclofenac.png";
import pic16 from "../assets/products/UTI.png";

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

  // ✅ Global Cart Context
  const { addToCart, openCart } = useCart();

  const handleAddToCart = useCallback(
    (product: Product) => {
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
      openCart();
    },
    [addToCart, openCart]
  );

  // 💨 Scroll logic
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

  // 🧾 Expanded Product Data (Top 15 Home Healthcare Items in USA)
  const products: Product[] = [
    {
      id: 1,
      name: "OneTouch Select Plus Glucometer Kit",
      description: "Accurate blood glucose monitoring kit with test strips and lancets.",
      brand: "OneTouch",
      price: 3500.0,
      image: pic1,
      trending: true,
    },
    {
      id: 2,
      name: "iProven Digital Thermometer",
      description: "Fast and reliable thermometer for adults and children.",
      brand: "iProven",
      price: 850.0,
      image: pic2,
      trending: false,
    },
    {
      id: 3,
      name: "First Aid Kit Essentials 110pc",
      description: "Comprehensive home first aid kit with bandages, scissors, and antiseptics.",
      brand: "Johnson & Johnson",
      price: 2800.0,
      image: pic3,
      trending: true,
    },
    {
      id: 4,
      name: "Swift Pregnancy Test Kit Cassette",
      description: "Accurate detection of hCG levels for early pregnancy testing.",
      brand: "Pharmaplus",
      price: 300.0,
      image: pic4,
      trending: true,
    },
    {
      id: 5,
      name: "Omron Bronze Blood Pressure Monitor",
      description: "Clinically validated digital BP monitor with easy one-touch operation.",
      brand: "Omron",
      price: 7800.0,
      image: pic5,
      trending: true,
    },
    {
      id: 6,
      name: "Accu-Chek Softclix Lancets 100s",
      description: "Gentle and precise lancets for blood glucose testing.",
      brand: "Accu-Chek",
      price: 1600.0,
      image: pic6,
      trending: false,
    },
    {
      id: 7,
      name: "Elastoplast Sensitive Plasters 20's",
      description: "Hypoallergenic plasters ideal for sensitive or delicate skin.",
      brand: "Elastoplast",
      price: 1155.0,
      image: pic7,
      trending: false,
    },
    {
      id: 8,
      name: "Vicks Warm Mist Humidifier",
      description: "Adds moisture to air and relieves dry throat and nasal passages.",
      brand: "Vicks",
      price: 8900.0,
      image: pic8,
      trending: true,
    },
    {
      id: 9,
      name: "Omron Peak Flow Meter",
      description: "Measures lung capacity for asthma and respiratory conditions.",
      brand: "Omron",
      price: 4200.0,
      image: pic9,
      trending: false,
    },
    {
      id: 10,
      name: "Purell Advanced Hand Sanitizer 500ml",
      description: "Kills 99.9% of germs instantly with moisturizing formula.",
      brand: "Purell",
      price: 950.0,
      image: pic10,
      trending: false,
    },
    {
      id: 11,
      name: "Covid-19 Rapid Antigen Test Kit",
      description: "FDA-approved test for quick and accurate COVID-19 detection.",
      brand: "Abbott",
      price: 1500.0,
      image: pic11,
      trending: true,
    },
    {
      id: 12,
      name: "Heating Pad for Back Pain Relief",
      description: "Electric heating pad with adjustable temperature settings.",
      brand: "Sunbeam",
      price: 4500.0,
      image: pic12,
      trending: false,
    },
    {
      id: 13,
      name: "Pulse Oximeter Fingertip",
      description: "Measures oxygen saturation and pulse rate in seconds.",
      brand: "Contec",
      price: 2500.0,
      image: pic13,
      trending: true,
    },
    {
      id: 14,
      name: "Reusable Ice Gel Pack (Hot/Cold)",
      description: "Flexible and reusable pack for pain, swelling, and injuries.",
      brand: "TheraPearl",
      price: 1200.0,
      image: pic14,
      trending: false,
    },
    {
      id: 15,
      name: "Medline Adjustable Walking Cane",
      description: "Lightweight aluminum cane for balance and support.",
      brand: "Medline",
      price: 5200.0,
      image: pic15,
      trending: false,
    },
  ];

  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
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
                  {product.trending && <span className={styles.trendingBadge}>🔥 Trending</span>}
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
