import React, { useRef, useState, useEffect } from 'react';
import styles from './Offers1.module.css';

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

  const offers: Offer[] = [
    {
      id: 1,
      category: 'Makeup',
      title: 'Anashe Make Up Setting Spray Hydrating',
      image: '/api/placeholder/200/200',
      originalPrice: 1795,
      discountedPrice: 1346,
      discount: 25
    },
    {
      id: 2,
      category: 'Makeup',
      title: 'Anashe Nail Polish D Purple 09 9ML',
      image: '/api/placeholder/200/200',
      originalPrice: 599,
      discountedPrice: 449,
      discount: 25
    },
    {
      id: 3,
      category: 'Makeup',
      title: 'Anashe Perfect Lip 108',
      image: '/api/placeholder/200/200',
      originalPrice: 1395,
      discountedPrice: 1046,
      discount: 25
    },
    {
      id: 4,
      category: 'Makeup',
      title: 'Anashe Perfect Lip 110',
      image: '/api/placeholder/200/200',
      originalPrice: 1395,
      discountedPrice: 1046,
      discount: 25
    },
    {
      id: 5,
      category: 'Makeup',
      title: 'Anashe Perfect Lip 111',
      image: '/api/placeholder/200/200',
      originalPrice: 1395,
      discountedPrice: 1046,
      discount: 25
    }
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const addToCart = (offerId: number) => {
    console.log(`Added offer ${offerId} to cart`);
  };

  return (
    <section className={styles.offersSection}>
      <h2 className={styles.title}>New Offers</h2>
      
      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.navButton} ${styles.navButtonLeft}`}
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.offersContainer} ref={scrollContainerRef}>
          {offers.map((offer) => (
            <article key={offer.id} className={styles.offerCard}>
              <div className={styles.discountBadge}>
                save<br />{offer.discount}%
              </div>
              
              <div className={styles.imageContainer}>
                <img src={offer.image} alt={offer.title} className={styles.productImage} />
              </div>
              
              <div className={styles.cardContent}>
                <span className={styles.category}>{offer.category}</span>
                <h3 className={styles.productTitle}>{offer.title}</h3>
                
                <div className={styles.priceContainer}>
                  <div className={styles.priceWrapper}>
                    <span className={styles.currency}>KES</span>
                    <span className={styles.price}>{offer.discountedPrice.toLocaleString()}</span>
                    <span className={styles.originalPrice}>
                      <span className={styles.currency}>KES</span>
                      {offer.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  
                  <button
                    className={styles.cartButton}
                    onClick={() => addToCart(offer.id)}
                    aria-label={`Add ${offer.title} to cart`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 2L7.17 4H2v2h1.5l1.94 12.5c.14.88.9 1.5 1.78 1.5h9.56c.88 0 1.64-.62 1.78-1.5L20.5 6H22V4h-5.17L15 2H9zm0 2h6l1 1H8l1-1zm-1.5 4h9l-1.5 11h-6L7.5 8z" fill="currentColor"/>
                      <circle cx="9" cy="20" r="1.5" fill="currentColor"/>
                      <circle cx="15" cy="20" r="1.5" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          className={`${styles.navButton} ${styles.navButtonRight}`}
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <button className={styles.seeMoreButton}>See more</button>
    </section>
  );
};

export default Offers1;