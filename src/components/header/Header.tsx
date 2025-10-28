// src/components/header/Header.tsx
import React, { useState, useRef, useCallback, useMemo } from "react";
import { useClickAway } from "react-use";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import styles from "./Header.module.css";
import { useCart } from "../../context/CartContext";
import { ShoppingCart, MapPin } from "lucide-react";

import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

interface NavLinkItem {
  label: string;
  path: string;
}

interface NavSection {
  label: string;
  key: string;
  links?: NavLinkItem[];
  path?: string;
}

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
  badge?: string;
}

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  useClickAway(headerRef, () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  });

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    setActiveDropdown(null);
  }, []);

  const toggleDropdown = useCallback((key: string) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  }, []);

  const handleMouseEnter = useCallback((key: string) => {
    if (window.innerWidth >= 769) setActiveDropdown(key);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth >= 769) setActiveDropdown(null);
  }, []);

  const navigationSections: NavSection[] = useMemo(
    () => [
      { label: "Home", key: "home", path: "/" },
      { label: "Our Services", key: "services", path: "/about-us/" },
      {
        label: "Shop By Category",
        key: "category",
        links: [
          { label: "Skin Care", path: "/categories/skin-care" },
          { label: "Beauty & Cosmetics", path: "/categories/beauty-care-cosmetics" },
          { label: "Vitamins & Supplements", path: "/categories/vitamins-supplements" },
          { label: "Medicine", path: "/categories/medicine" },
          { label: "Hygiene", path: "/categories/general-hygiene" },
          { label: "Home Healthcare", path: "/categories/home-healthcare" },
        ],
      },
      {
        label: "Shop By Body System",
        key: "system",
        links: [
          { label: "Breathing", path: "/system/respiratory" },
          { label: "Digestion and Eating", path: "/system/git" },
          { label: "Nervous", path: "/system/nervous" },
          { label: "Sexual and Reproductive", path: "/system/reproductive" },
          { label: "Skin Treatment", path: "/system/skin-treatment" },
          { label: "Kidneys and Renal", path: "/system/renal" },
          { label: "Diabetes", path: "/system/diabetes" },
          { label: "Ear & Eye Care", path: "/system/ear-eye-care" },
          { label: "Oral Hygiene", path: "/system/oral-hygiene" },
          { label: "Muscles and Bones", path: "/system/msk" },
        ],
      },
      {
        label: "Shop By Condition",
        key: "condition",
        links: [
          { label: "Hypertension", path: "/conditions/htn" },
          { label: "Diabetes", path: "/conditions/diabetes" },
          { label: "Cough, Cold & Flu", path: "/conditions/flu" },
          { label: "UTI Infections", path: "/conditions/uti-infections" },
          { label: "Skin Treatment", path: "/conditions/skin-treatment" },
          { label: "Ear & Eye Care", path: "/conditions/ear-eye-care" },
          { label: "Oral Hygiene", path: "/conditions/oral-hygiene" },
          { label: "Malaria", path: "/conditions/malaria" },
          { label: "Fungal Infection", path: "/conditions/fungal-infection" },
         

        ],
      },
      {
        label: "Prescription Assistance",
        key: "prescription",
        links: [
          { label: "Upload Prescription", path: "/prescription/upload" },
          { label: "Request Prescription", path: "/prescription/refill" },
          { label: "Talk to a Pharmacist", path: "/prescription/support" },
        ],
      },
      { label: "Contact Us", key: "contact", path: "/contact-us" },
    ],
    []
  );

  const navItems: NavItem[] = useMemo(
    () => [
      {
        to: "/cart",
        label: "Cart",
        icon: (
          <div className={styles.iconWithBadge}>
            <ShoppingCart strokeWidth={1.8} className={styles.cartIcon} />
            {totalItems > 0 && (
              <span className={styles.cartCount}>{totalItems}</span>
            )}
          </div>
        ),
        onClick: () => {
          toast.success("Opening your cart...", { duration: 1800 });
          setTimeout(() => navigate("/cart"), 500);
        },
      },
      {
        to: "https://www.google.com/maps/dir/-1.1010048,37.011456/HEALTHFIELD+PHARMACY,+Jkuat,+Muramati+road,+Gate+C+Rd,+Juja",
        label: "Stores",
        icon: <MapPin strokeWidth={1.8} className={styles.mapIcon} />,
        external: true,
      },
    ],
    [totalItems, navigate]
  );

  return (
    <header className={styles.header} ref={headerRef}>
      {/* === Top Bar === */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarContent}>
            {/* === Logo === */}
            <div className={styles.logoContainer}>
              <Link to="/" className={styles.logoLink} aria-label="Healthfield Pharmacy - Home">
                <div className={styles.logo}>
                  <div className={styles.logoIcon}>
                    <img
                      src="/logo.png"
                      alt="Healthfield Pharmacy"
                      className={styles.logoImage}
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.logoText}>
                    <span className={styles.brandName}>HEALTHFIELD</span>
                    <span className={styles.brandType}>PHARMACY</span>
                    <span className={styles.tagline}>
                      Your Health, Our Mission — Reliable Care. Anytime.
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* === Top Section === */}
            <div className={styles.topSection}>
              <nav className={styles.topNav}>
                <Link to="/new-arrivals" className={styles.topNavLink}>
                  <span className={styles.badge}>New Arrivals</span>
                </Link>
                <Link to="/trending" className={styles.topNavLink}>
                  Trending
                </Link>
                <Link to="/best-sellers" className={styles.topNavLink}>
                  Best Sellers
                </Link>
                <div className={styles.dropdown}>
                  <button className={styles.dropdownButton}>Other Services</button>
                  <div className={styles.dropdownMenu}>
                    <Link to="/services/radiology">Radiology Services</Link>
                    <Link to="/services/lab">Laboratory Services</Link>
                    <Link to="/services/vct">VCT Services</Link>
                    <Link to="/services/mch">MCH Clinic</Link>
                  </div>
                </div>
              </nav>

              {/* === Social Icons === */}
              <div className={styles.socialIcons}>
                <a href="https://wa.me/254703082000" aria-label="WhatsApp" className={styles.socialIcon}><FaWhatsapp /></a>
                <a href="https://facebook.com" aria-label="Facebook" className={styles.socialIcon}><FaFacebookF /></a>
                <a href="https://twitter.com" aria-label="Twitter" className={styles.socialIcon}><FaTwitter /></a>
                <a href="https://youtube.com" aria-label="YouTube" className={styles.socialIcon}><FaYoutube /></a>
                <a href="https://instagram.com" aria-label="Instagram" className={styles.socialIcon}><FaInstagram /></a>
                <a href="https://linkedin.com" aria-label="LinkedIn" className={styles.socialIcon}><FaLinkedinIn /></a>
              </div>
            </div>

            {/* === Contact Button === */}
            <div className={styles.topActions}>
              <Link to="/contact-us" className={styles.shopButton}>
                <span className={styles.shopIcon}>▶</span>
                <span>Contact Us</span>
              </Link>
            </div>

            {/* === Desktop Bottom Nav === */}
            <div className={styles.desktopOnly}>
              <motion.nav
                className={styles.bottomNav}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
              >
                {navItems.map(({ to, label, icon, badge, external, onClick }) =>
                  external ? (
                    <a
                      key={label}
                      href={to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.navItem} ${styles.externalLink}`}
                    >
                      <motion.div
                        className={styles.iconWrapper}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ y: -3 }}
                      >
                        <span className={styles.icon}>{icon}</span>
                        {badge && <span className={styles.badge}>{badge}</span>}
                      </motion.div>
                      <span className={styles.label}>{label}</span>
                    </a>
                  ) : (
                    <NavLink
                      key={label}
                      to={to}
                      className={({ isActive }) =>
                        `${styles.navItem} ${isActive ? styles.active : ""}`
                      }
                      onClick={(e) => {
                        if (onClick) {
                          e.preventDefault();
                          onClick();
                        }
                      }}
                    >
                      <motion.div
                        className={styles.iconWrapper}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ y: -3 }}
                      >
                        <span className={styles.icon}>{icon}</span>
                        {badge && <span className={styles.badge}>{badge}</span>}
                      </motion.div>
                      <span className={styles.label}>{label}</span>
                    </NavLink>
                  )
                )}
              </motion.nav>
            </div>
          </div>
        </div>
      </div>

      {/* === Bottom Navigation === */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <button
            className={`${styles.mobileToggle} ${mobileMenuOpen ? styles.mobileToggleOpen : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

          <nav
            className={`${styles.mainNav} ${mobileMenuOpen ? styles.mainNavOpen : ""}`}
            aria-label="Primary Navigation"
          >
            <ul className={styles.navList}>
              {navigationSections.map((section) => (
                <li
                  key={section.key}
                  className={styles.navItem}
                  onMouseEnter={() => handleMouseEnter(section.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  {section.path ? (
                        <Link
                          to={section.path}
                          className={styles.navButton}
                          onClick={() => {
                            setActiveDropdown(null);
                            setMobileMenuOpen(false);
                          }}
                        >
                          {section.label}
                        </Link>

                  ) : (
                    <>
                      <button
                        onClick={() => toggleDropdown(section.key)}
                        className={`${styles.navButton} ${
                          activeDropdown === section.key ? styles.navButtonActive : ""
                        }`}
                      >
                        {section.label}
                        <svg
                          className={styles.chevron}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {activeDropdown === section.key && section.links && (
                        <div className={styles.navDropdown}>
                          <ul className={styles.navDropdownList}>
                            {section.links.map((link) => (
                              <li key={link.path} className={styles.navDropdownItem}>
                                <Link
                                  to={link.path}
                                  className={styles.navDropdownLink}
                                  onClick={() => {
                                    setActiveDropdown(null);
                                    setMobileMenuOpen(false);
                                  }}
                                >
                                  {link.label}
                                </Link>

                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
