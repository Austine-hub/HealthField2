import React, { useState } from "react";
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
  MapPin,
} from "lucide-react";
import styles from "./Topbar.module.css";

const MAP_URL =
  "https://www.google.com/maps/dir/-1.1010048,37.011456/HEALTHFIELD+PHARMACY,+Jkuat,+Muramati+road,+Gate+C+Rd,+Juja/@-1.0998346,37.0091212,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x182f478f220d151b:0x2518c5efaf81c0!2m2!1d37.0110976!2d-1.0990329?entry=ttu";

const Topbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearchToggle = () => setIsSearchOpen((s) => !s);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // simple client-side redirect to a search results page
    // adapt if you have a router (e.g., useNavigate) or a search API
    const q = query.trim();
    if (!q) {
      setIsSearchOpen(false);
      return;
    }
    window.location.href = `/search?q=${encodeURIComponent(q)}`;
  };

  return (
    <header className={styles.topbar} role="banner" aria-label="Topbar">
      <div className={styles.innerWrapper}>
        {/* Left: Brand */}
        <div className={styles.brandSection}>
          <a
            href="/"
            className={styles.brandLink}
            aria-label="Healthfield Pharmacy Juja home"
          >
            <span className={styles.logoWrapper} aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                focusable="false"
                role="img"
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
            </span>

            <span className={styles.brandName}>HEALTHFIELD PHARMACY JUJA</span>
          </a>
        </div>

        {/* Center: Tagline */}
        <div className={styles.taglineSection}>
          <p className={styles.tagline}>
            Your Health, Our Mission — Reliable Care. Anytime.
          </p>
        </div>

        {/* Right: Actions + Social + Search */}
        <div className={styles.actionsSection}>
          <div
            className={styles.contactButtons}
            role="group"
            aria-label="Contact options"
          >
            <a
              href="tel:+254796787207"
              className={styles.ctaButton}
              aria-label="Call to order"
            >
              <Phone size={16} aria-hidden="true" />
              <span className={styles.ctaText}>Call to Order</span>
            </a>

            <a
              href="https://wa.me/254796787207"
              className={`${styles.ctaButton} ${styles.whatsappButton}`}
              aria-label="WhatsApp order"
            >
              <MessageCircle size={16} aria-hidden="true" />
              <span className={styles.ctaText}>WhatsApp Order</span>
            </a>
          </div>

          <div className={styles.socialGroup} aria-hidden={false}>
            <a
              href="https://wa.me/254796787207"
              className={styles.iconButton}
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="https://www.facebook.com/theggodofwolves/"
              className={styles.iconButton}
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a href="https://x.com/home" className={styles.iconButton} aria-label="X">
              <Twitter size={16} />
            </a>
            <a
              href="https://www.instagram.com/"
              className={styles.iconButton}
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.linkedin.com/"
              className={styles.iconButton}
              aria-label="LinkedIn"
            >
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

            {/* Search: toggles a small inline search form */}
            <div className={styles.searchWrap}>
              <button
                className={styles.searchButton}
                aria-expanded={isSearchOpen}
                aria-controls="topbar-search"
                aria-label={isSearchOpen ? "Close search" : "Open search"}
                onClick={handleSearchToggle}
                type="button"
              >
                <Search size={16} aria-hidden="true" />
                <span className={styles.searchText}>Search</span>
              </button>

              {isSearchOpen && (
                <form
                  id="topbar-search"
                  className={styles.searchForm}
                  onSubmit={handleSearchSubmit}
                  role="search"
                >
                  <label htmlFor="topbar-query" className="sr-only">
                    Search the site
                  </label>
                  <input
                    id="topbar-query"
                    name="q"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={styles.searchInput}
                    placeholder="Search products, health info..."
                    aria-label="Search products or information"
                    autoComplete="off"
                  />
                  <button className={styles.searchSubmit} type="submit" aria-label="Submit search">
                    Go
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Contact Bar */}
      <div className={styles.bottomBar} role="contentinfo" aria-label="Contact information">
        <div className={styles.contactWrapper}>
          <a href="mailto:hosp@nbihosp.org" className={styles.contactLink}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              focusable="false"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7L13.03 12.7a2 2 0 01-2.06 0L2 7" />
            </svg>
            <span className={styles.contactText}>hosp@nbihosp.org</span>
          </a>

          <a href="tel:+254792766779" className={styles.contactLink}>
            <Phone size={14} aria-hidden="true" />
            <span className={styles.contactText}>(+254) 792 766 779</span>
          </a>

          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Healthfield Pharmacy on Google Maps"
            className={`${styles.contactLink} ${styles.externalLink}`}
          >
            <MapPin size={14} aria-hidden="true" />
            <span className={styles.contactText}>Visit Us</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
