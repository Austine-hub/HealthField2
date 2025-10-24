import React, { useRef, useState, useEffect } from 'react';
import styles from './Hygiene.module.css';

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

  const products: Product[] = [
    {
      id: '1',
      name: 'Durex Fetherlite 3s',
      description: 'It Is A Barrier Method Of Contraception Designed To...',
      price: 650.00,
      image: '/api/placeholder/200/200',
      brand: 'Durex',
      isTrending: true
    },
    {
      id: '2',
      name: 'Durex Feel Condoms 3\'S',
      description: 'It Is A Barrier Method Of Contraception Designed To...',
      price: 550.00,
      image: '/api/placeholder/200/200',
      brand: 'Durex',
      isTrending: true
    },
    {
      id: '3',
      name: 'Durex Extra Safe 3\'S',
      description: 'It Is A Barrier Method Of Contraception Designed To...',
      price: 578.00,
      image: '/api/placeholder/200/200',
      brand: 'Durex',
      isTrending: true
    },
    {
      id: '4',
      name: 'Durex Thin Feel 3\'S',
      description: 'It Is A Barrier Method Of Contraception Designed To...',
      price: 400.00,
      image: '/api/placeholder/200/200',
      brand: 'Durex',
      isTrending: true
    },
    {
      id: '5',
      name: 'Durex Pleasuremax 3\'S',
      description: 'It Is A Barrier Method Of Contraception Designed To...',
      price: 500.00,
      image: '/api/placeholder/200/200',
      brand: 'Durex',
      isTrending: true
    },
    {
      id: '6',
      name: 'Oral-B Unwaxed Dental Floss',
      description: 'It Is A Thin, Flexible Piece Of String Used To Remove Food...',
      price: 578.00,
      image: '/api/placeholder/200/200',
      brand: 'Oral B',
      isTrending: false
    }
  ];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const addToCart = (productId: string) => {
    console.log('Added to cart:', productId);
  };

  const toggleWishlist = (productId: string) => {
    console.log('Toggled wishlist:', productId);
  };

  const shareProduct = (productId: string) => {
    console.log('Shared product:', productId);
  };

  return (
    <section className={styles.offersSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>General Hygiene</h2>
          <div className={styles.navButtons}>
            <button
              className={`${styles.navBtn} ${!canScrollLeft ? styles.disabled : ''}`}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className={`${styles.navBtn} ${!canScrollRight ? styles.disabled : ''}`}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        <div 
          className={styles.productsWrapper}
          ref={scrollRef}
          onScroll={checkScroll}
        >
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <article key={product.id} className={styles.productCard}>
                {product.isTrending && (
                  <span className={styles.trendingBadge}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor"/>
                    </svg>
                    Trending
                  </span>
                )}

                <div className={styles.actions}>
                  <button 
                    className={styles.actionBtn}
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Add to wishlist"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className={styles.actionBtn}
                    onClick={() => shareProduct(product.id)}
                    aria-label="Share product"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className={styles.actionBtn}
                    aria-label="More options"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="5" r="1" fill="currentColor"/>
                      <circle cx="12" cy="12" r="1" fill="currentColor"/>
                      <circle cx="12" cy="19" r="1" fill="currentColor"/>
                    </svg>
                  </button>
                </div>

                <div className={styles.imageWrapper}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className={styles.productImage}
                    loading="lazy"
                  />
                </div>

                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <p className={styles.brandName}>{product.brand}</p>
                  <p className={styles.price}>Kes.{product.price.toFixed(2)}</p>
                </div>

                <div className={styles.cardFooter}>
                  <button 
                    className={styles.addBtn}
                    onClick={() => addToCart(product.id)}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 2L7.17 4M15 2l1.83 2M3.5 9.09h17M3.73 9l1.85 10.18A2 2 0 0 0 7.54 21h8.92a2 2 0 0 0 1.96-1.82L20.27 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add
                  </button>
                  <button className={styles.detailsBtn}>
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <a href="#" className={styles.viewAll}>
          View All Hygiene Products
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Offers2;