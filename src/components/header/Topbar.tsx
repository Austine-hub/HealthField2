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
    <header className={styles.topbar} role="banner">
      <div className={styles.innerWrapper}>
        {/* Left: Brand */}
        <div className={styles.brandSection}>
          <a href="/" className={styles.brandLink} aria-label="Healthfield Pharmacy Juja home">
            <span className={styles.logoWrapper} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" focusable="false">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" opacity="0.8" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className={styles.brandName}>HEALTHFIELD PHARMACY JUJA</span>
          </a>
        </div>

        {/* Center: Tagline */}
        <div className={styles.taglineSection}>
          <p className={styles.tagline}>Your Health, Our Mission — Reliable Care. Anytime.</p>
        </div>

        {/* Right: Actions + Social + Search */}
        <div className={styles.actionsSection}>
          <div className={styles.contactButtons} role="group" aria-label="Contact options">
            <a href="tel:+254796787207" className={styles.ctaButton} aria-label="Call to order">
              <Phone size={16} aria-hidden="true" />
              <span className={styles.ctaText}>Call to Order</span>
            </a>
            <a href="https://wa.me/254796787207" className={`${styles.ctaButton} ${styles.whatsappButton}`} aria-label="WhatsApp order">
              <MessageCircle size={16} aria-hidden="true" />
              <span className={styles.ctaText}>WhatsApp Order</span>
            </a>
          </div>

          <div className={styles.socialGroup} aria-hidden={false}>
            <a href="https://wa.me/254796787207" className={styles.iconButton} aria-label="WhatsApp">
              <MessageCircle size={16} />
            </a>
            <a href="https://www.facebook.com/theggodofwolves/" className={styles.iconButton} aria-label="Facebook">
              <Facebook size={16} />
            </a>
            <a href="https://x.com/home" className={styles.iconButton} aria-label="X / Twitter">
              <Twitter size={16} />
            </a>
            <a href="https://www.instagram.com/" className={styles.iconButton} aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="https://www.linkedin.com/" className={styles.iconButton} aria-label="LinkedIn">
              <Linkedin size={16} />
            </a>

            <a href="/wishlist" className={styles.cartIcon} aria-label="Wishlist">
              <Heart size={16} aria-hidden="true" />
              <span className={styles.cartText}>Wishlist</span>
            </a>
            <a href="/cart" className={styles.cartIcon} aria-label="Cart">
              <ShoppingCart size={16} aria-hidden="true" />
              <span className={styles.cartText}>Cart</span>
            </a>

            <button className={styles.searchButton} aria-label="Search site">
              <Search size={16} aria-hidden="true" />
              <span className={styles.searchText}>Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Contact Bar */}
      <div className={styles.bottomBar} role="contentinfo" aria-label="Contact information">
        <div className={styles.contactWrapper}>
          <a href="mailto:hosp@nbihosp.org" className={styles.contactLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" focusable="false" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7L13.03 12.7a2 2 0 01-2.06 0L2 7" />
            </svg>
            <span className={styles.contactText}>hosp@nbihosp.org</span>
          </a>

          <a href="tel:+254792766779" className={styles.contactLink}>
            <Phone size={14} aria-hidden="true" />
            <span className={styles.contactText}>(+254) 792 766 779</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
