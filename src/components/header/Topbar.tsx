import React from "react";
import {
  Phone,
  MessageCircle,
  Search,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  ShoppingCart,
} from "lucide-react";
import styles from "./Topbar.module.css";

const Topbar: React.FC = () => {
  return (
    <header className={styles.topbar}>
      <div className={styles.innerWrapper}>
        {/* ---------- Left: Brand ---------- */}
        <div className={styles.brandSection}>
          <div className={styles.logoWrapper}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={styles.brandName}>HEALTHFIELD PHARMACY JUJA</span>
        </div>

        {/* ---------- Center: Tagline ---------- */}
        <div className={styles.taglineSection}>
          <p className={styles.tagline}>
            Your Health, Our Mission — Reliable Care. Anytime.
          </p>
        </div>

        {/* ---------- Right: Actions + Social + Search ---------- */}
        <div className={styles.actionsSection}>
          <div className={styles.contactButtons}>
            <button className={styles.ctaButton}>
              <Phone size={16} aria-hidden="true" />
              <span>Call to Order</span>
            </button>
            <button className={`${styles.ctaButton} ${styles.whatsappButton}`}>
              <MessageCircle size={16} aria-hidden="true" />
              <span>WhatsApp Order</span>
            </button>
          </div>

          <div className={styles.socialGroup}>
            <a href="#" className={styles.socialIcon} aria-label="WhatsApp">
              <MessageCircle size={16} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Twitter">
              <Twitter size={16} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>

            {/* ---------- Wishlist + Cart ---------- */}
            <a href="/wishlist" className={styles.cartIcon} aria-label="Wishlist">
              <Heart size={16} />
              <span>Wishlist</span>
            </a>
            <a href="/cart" className={styles.cartIcon} aria-label="Cart">
              <ShoppingCart size={16} />
              <span>Cart</span>
            </a>

            <button className={styles.searchButton} aria-label="Search site">
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Bottom Contact Bar ---------- */}
      <div className={styles.bottomBar}>
        <div className={styles.contactWrapper}>
          <a
            href="mailto:hosp@nbihosp.org"
            className={styles.contactLink}
            aria-label="Email hospital"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7L13.03 12.7a2 2 0 01-2.06 0L2 7" />
            </svg>
            hosp@nbihosp.org
          </a>
          <a
            href="tel:+254703082000"
            className={styles.contactLink}
            aria-label="Call hospital"
          >
            <Phone size={14} />
            (+254) 792 766 779
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
