// BeautyProducts.tsx — Modern, Minimal, Responsive, Accessible
import React, { useState, useRef, useCallback } from "react";
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
}

const BeautyProducts: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const { addToCart, updateQuantity, openCart, cartItems } = useCart();

  // ✅ Updated real global beauty products
  const products: Product[] = [
    {
      id: 1,
      name: "Revitalizing Supreme+ Youth Power Crème",
      description: "Prestige anti-aging cream that firms, smooths, and rejuvenates skin.",
      price: 18900,
      image: "https://images.unsplash.com/photo-1621440318363-8f7c0b31b9f7?w=400&h=400&fit=crop",
      brand: "Estée Lauder",
    },
    {
      id: 2,
      name: "True Match Super-Blendable Foundation",
      description: "Lightweight, seamless foundation for natural, flawless coverage.",
      price: 2400,
      image: "https://images.unsplash.com/photo-1588081689948-1e8e1d1fae7f?w=400&h=400&fit=crop",
      brand: "L’Oréal Paris",
    },
    {
      id: 3,
      name: "Rouge Volupté Shine Lipstick",
      description: "Luxurious lipstick delivering intense color and moisture.",
      price: 5200,
      image: "https://images.unsplash.com/photo-1620331311528-8b8e5b26b2c4?w=400&h=400&fit=crop",
      brand: "Yves Saint Laurent (YSL)",
    },
    {
      id: 4,
      name: "Better Than Sex Mascara",
      description: "Iconic volumizing mascara for dramatic, curled lashes.",
      price: 4200,
      image: "https://images.unsplash.com/photo-1617042375876-d22b709e60b7?w=400&h=400&fit=crop",
      brand: "Too Faced",
    },
    {
      id: 5,
      name: "Born This Way Foundation",
      description: "Medium-to-full coverage foundation with natural finish.",
      price: 5600,
      image: "https://images.unsplash.com/photo-1612815154858-60aa4c0deefa?w=400&h=400&fit=crop",
      brand: "Too Faced",
    },
    {
      id: 6,
      name: "Soft Matte Complete Lipstick",
      description: "Velvety matte finish lipstick with long-lasting comfort.",
      price: 4100,
      image: "https://images.unsplash.com/photo-1600423115367-3e78e0d8dcad?w=400&h=400&fit=crop",
      brand: "NARS",
    },
    {
      id: 7,
      name: "Soft Radiance Pressed Powder",
      description: "Finishing powder for luminous, flawless skin.",
      price: 5300,
      image: "https://images.unsplash.com/photo-1585238341988-5d81a9b0eae2?w=400&h=400&fit=crop",
      brand: "Laura Mercier",
    },
    {
      id: 8,
      name: "Airbrush Flawless Foundation",
      description: "Full-coverage foundation with a natural matte finish.",
      price: 5900,
      image: "https://images.unsplash.com/photo-1600181952422-bc7de8b3a404?w=400&h=400&fit=crop",
      brand: "Charlotte Tilbury",
    },
    {
      id: 9,
      name: "Hydra Beauty Micro Crème",
      description: "Luxurious moisturizer for deep hydration and radiance.",
      price: 12500,
      image: "https://images.unsplash.com/photo-1605792657660-c372a10f7294?w=400&h=400&fit=crop",
      brand: "Chanel",
    },
    {
      id: 10,
      name: "Infallible Pro-Glow Foundation",
      description: "24-hour glowing foundation for a radiant complexion.",
      price: 2500,
      image: "https://images.unsplash.com/photo-1598206063564-b2e8c7ccdc52?w=400&h=400&fit=crop",
      brand: "L’Oréal Paris",
    },
    {
      id: 11,
      name: "Rénergie Lift Multi-Action Cream",
      description: "Firming and lifting neck and face cream for mature skin.",
      price: 13800,
      image: "https://images.unsplash.com/photo-1598511726563-d48f91e3ad87?w=400&h=400&fit=crop",
      brand: "Lancôme",
    },
    {
      id: 12,
      name: "Anthelios Hydrating Mineral Sunscreen Fluid SPF 50",
      description: "Dermatologist-recommended daily sunscreen with high protection.",
      price: 3700,
      image: "https://images.unsplash.com/photo-1618510969123-c0f5b2f2f8e9?w=400&h=400&fit=crop",
      brand: "La Roche-Posay",
    },
    {
      id: 13,
      name: "Poreless Putty Primer",
      description: "Smooths skin and minimizes pores for a perfect makeup base.",
      price: 1900,
      image: "https://images.unsplash.com/photo-1589983846997-2dfc8c3d68e9?w=400&h=400&fit=crop",
      brand: "e.l.f. Cosmetics",
    },
    {
      id: 14,
      name: "Pro Filt’r Soft Matte Foundation",
      description: "Inclusive foundation line with over 50 shades.",
      price: 5800,
      image: "https://images.unsplash.com/photo-1598908319483-9c0a94400b65?w=400&h=400&fit=crop",
      brand: "Fenty Beauty",
    },
    {
      id: 15,
      name: "Soft Pinch Liquid Blush",
      description: "Lightweight, pigmented liquid blush for a radiant glow.",
      price: 4200,
      image: "https://images.unsplash.com/photo-1612810806266-9b49e8cc6b4a?w=400&h=400&fit=crop",
      brand: "Rare Beauty",
    },
  ];

  const handlePrev = useCallback(() => {
    carouselRef.current?.scrollBy({ left: -carouselRef.current.clientWidth / 2, behavior: "smooth" });
  }, []);

  const handleNext = useCallback(() => {
    carouselRef.current?.scrollBy({ left: carouselRef.current.clientWidth / 2, behavior: "smooth" });
  }, []);

  const toggleFavorite = (id: number) => {
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
  };

  const handleShare = async (product: Product) => {
    try {
      const url = `${window.location.origin}/product/${product.id}`;
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Unable to copy link");
    }
  };

  const handleAddToCart = (product: Product) => {
    const stringId = product.id.toString();
    const inCart = cartItems.find((ci) => ci.id === stringId);
    if (inCart) updateQuantity(stringId, inCart.quantity + 1);
    else
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
    toast.success(`${product.name} added to cart`);
    openCart?.();
  };

  return (
    <section className={styles.beautySection} aria-labelledby="beauty-title">
      <Toaster position="top-right" />
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="beauty-title" className={styles.title}>
            Beauty Products
          </h2>
          <div className={styles.navigation}>
            <button onClick={handlePrev} aria-label="Previous products">
              <ChevronLeft size={22} />
            </button>
            <button onClick={handleNext} aria-label="Next products">
              <ChevronRight size={22} />
            </button>
          </div>
        </header>

        <div className={styles.productsWrapper} ref={carouselRef}>
          {products.map((product) => {
            const isFavorited = favorites.has(product.id);
            return (
              <motion.article
                key={product.id}
                className={styles.productCard}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className={styles.imageContainer}>
                  <LazyLoadImage
                    src={product.image}
                    alt={product.name}
                    effect="blur"
                    className={styles.productImage}
                  />
                  <div className={styles.cardActions}>
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      aria-label={`${isFavorited ? "Remove from" : "Add to"} favorites`}
                    >
                      <Heart
                        size={18}
                        fill={isFavorited ? "#ff4757" : "none"}
                        color={isFavorited ? "#ff4757" : "#666"}
                      />
                    </button>
                    <button onClick={() => handleShare(product)} aria-label="Share product">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <span className={styles.brandName}>{product.brand}</span>
                  <p className={styles.price}>KES {product.price.toFixed(2)}</p>

                  <motion.button
                    className={styles.addButton}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className={styles.viewAllContainer}>
          <motion.a href="/beauty-products" whileHover={{ x: 5 }} className={styles.viewAllLink}>
            View All Products <ChevronRight size={18} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default BeautyProducts;
