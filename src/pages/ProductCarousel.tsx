import React, { useRef, useState, useEffect } from 'react';
import styles from './ProductCarousel.module.css';

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

  const products: Product[] = [
    {
      id: 1,
      name: 'Swift Hiv Kit Cassette',
      description: 'It Is Used To Detect The Presence Of Hiv (Human...',
      brand: 'Pharmaplus',
      price: 300.00,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      trending: true
    },
    {
      id: 2,
      name: 'Swift Pregnancy Kit Cassette',
      description: 'It Is A Diagnostic Kit Used To Detect Human Chorionic...',
      brand: 'Pharmaplus',
      price: 300.00,
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop',
      trending: true
    },
    {
      id: 3,
      name: 'Swift Pregnancy Kit Midstream',
      description: 'It Is A Diagnostic Kit Used To Detect Human Chorionic...',
      brand: 'Pharmaplus',
      price: 350.00,
      image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop',
      trending: true
    },
    {
      id: 4,
      name: 'Digital Thermometer',
      description: 'Is A Device Used To Measure Temperature. It Is Commonly...',
      brand: 'Pharmaplus',
      price: 450.00,
      image: 'https://images.unsplash.com/photo-1584555684040-bad07f3a82c5?w=400&h=300&fit=crop',
      trending: false
    },
    {
      id: 5,
      name: 'Alcohol Swabs 100s',
      description: 'It Is A Small, Absorbent Items Commonly Used In Medical...',
      brand: 'Pharmaplus',
      price: 200.00,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
      trending: true
    },
    {
      id: 6,
      name: 'Elastoplast Sensitive Plasters 20\'S',
      description: '&Lt P&Gt &Lt Span Style=&Quot Color: Rgb(45...',
      brand: 'Elastoplast',
      price: 1155.00,
      image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop',
      trending: false
    }
  ];

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Home Healthcare</h2>
          <div className={styles.navigation}>
            <button 
              className={`${styles.navButton} ${!canScrollLeft ? styles.disabled : ''}`}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button 
              className={`${styles.navButton} ${!canScrollRight ? styles.disabled : ''}`}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.carouselWrapper}>
          <div className={styles.carousel} ref={scrollContainerRef}>
            {products.map((product) => (
              <article key={product.id} className={styles.productCard}>
                <div className={styles.cardHeader}>
                  {product.trending && (
                    <span className={styles.trendingBadge}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor"/>
                      </svg>
                      Trending
                    </span>
                  )}
                  <div className={styles.cardActions}>
                    <button className={styles.iconButton} aria-label="Add to wishlist">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className={styles.iconButton} aria-label="Share product">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                    <button className={styles.iconButton} aria-label="Compare product">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className={styles.imageWrapper}>
                  <img src={product.image} alt={product.name} className={styles.productImage} />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <p className={styles.productBrand}>{product.brand}</p>
                  <p className={styles.productPrice}>Kes. {product.price.toFixed(2)}</p>
                </div>

                <div className={styles.cardFooter}>
                  <button className={styles.addButton}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
                      <path d="M16 10a4 4 0 0 1-8 0" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Add
                  </button>
                  <button className={styles.detailsButton}>View Details</button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.viewAll}>
          <a href="#" className={styles.viewAllLink}>
            View All Home Healthcare Products
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;