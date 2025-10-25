import React, { useRef, useState, useEffect } from "react";
import { ShoppingCart, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import styles from "./Offers1.module.css";

interface Offer {
  id: number;
  category: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
}

const Offers1: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const { cartItems, addToCart } = useCart();

  const offers: Offer[] = [
    {
      id: 1,
      category: "Makeup",
      title: "Anashe Make Up Setting Spray Hydrating",
      image: "/api/placeholder/200/200",
      originalPrice: 1795,
      discountedPrice: 1346,
      discount: 25,
    },
    {
      id: 2,
      category: "Makeup",
      title: "Anashe Nail Polish D Purple 09 9ML",
      image: "/api/placeholder/200/200",
      originalPrice: 599,
      discountedPrice: 449,
      discount: 25,
    },
    {
      id: 3,
      category: "Makeup",
      title: "Anashe Perfect Lip 108",
      image: "/api/placeholder/200/200",
      originalPrice: 1395,
      discountedPrice: 1046,
      discount: 25,
    },
    {
      id: 4,
      category: "Makeup",
      title: "Anashe Perfect Lip 110",
      image: "/api/placeholder/200/200",
      originalPrice: 1395,
      discountedPrice: 1046,
      discount: 25,
    },
    {
      id: 5,
      category: "Makeup",
      title: "Anashe Perfect Lip 111",
      image: "/api/placeholder/200/200",
      originalPrice: 1395,
      discountedPrice: 1046,
      discount: 25,
    },
  ];

  // --- Scroll Handling ---
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollButtons();
    container.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);

    return () => {
      container.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -320 : 320;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };


  

  // --- Add to Cart ---
  const handleAddToCart = (offer: Offer) => {
    addToCart({
      id: offer.id.toString(),
      name: offer.title,
      price: offer.discountedPrice,
      image: offer.image,
      quantity: 1,
    });

    toast.success(`${offer.title} added to cart!`);
  };

  return (
    <section className={styles.offersSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>New Offers</h2>

        {/* Cart summary */}
        <button
          className={styles.cartSummary}
          aria-label="View your cart checklist"
        >
          <ShoppingCart size={22} aria-hidden="true" />
          {cartItems.length > 0 && (
            <span
              className={styles.cartBadge}
              aria-label={`${cartItems.length} items in cart`}
            >
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Carousel */}
      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.offersContainer} ref={scrollContainerRef}>
          {offers.map((offer) => (
            <article key={offer.id} className={styles.offerCard}>
              <div className={styles.discountBadge}>
                Save <br />
                {offer.discount}%
              </div>

              <div className={styles.imageContainer}>
                <img
                  src={offer.image}
                  alt={offer.title}
                  className={styles.productImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.cardContent}>
                <span className={styles.category}>{offer.category}</span>
                <h3 className={styles.productTitle}>{offer.title}</h3>

                <div className={styles.priceContainer}>
                  <div className={styles.priceWrapper}>
                    <span className={styles.currency}>KES</span>
                    <span className={styles.price}>
                      {offer.discountedPrice.toLocaleString()}
                    </span>
                    <span className={styles.originalPrice}>
                      <span className={styles.currency}>KES</span>
                      {offer.originalPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    className={styles.cartButton}
                    onClick={() => handleAddToCart(offer)}
                    aria-label={`Add ${offer.title} to cart`}
                  >
                    <Plus size={18} className={styles.addIcon} />
                    <ShoppingCart size={20} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.navButtonRight}`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <button className={styles.seeMoreButton}>See more</button>
    </section>
  );
};

export default Offers1;
