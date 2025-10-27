import { useState, useRef, useCallback, useMemo } from "react";
import { useClickAway } from "react-use";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

interface NavSection {
  label: string;
  key: string;
  links?: [string, string][];
  path?: string;
}

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  const menus: NavSection[] = useMemo(
    () => [
      {
        label: "Home",
        key: "home",
        path: "/",
      },
      {
        label: "Shop By Category",
        key: "category",
        links: [
          ["Skin Care", "/categories/skin-care"],
          ["Beauty & Cosmetics", "/categories/beauty-care-cosmetics"],
          ["Vitamins & Supplements", "/categories/vitamins-supplements"],
          ["Medicine", "/categories/medicine"],
          ["Hygiene", "/categories/general-hygiene"],
          ["Home Healthcare", "/categories/home-healthcare"],
        ],
      },
      {
        label: "Shop By Body System",
        key: "system",
        links: [
          ["Breathing", "/system/respiratory"],
          ["Digestion and Eating", "/system/git"],
          ["Nervous", "/system/nervous"],
          ["Sexual and Reproductive", "/system/reproductive"],
          ["Skin Treatment", "/system/skin-treatment"],
          ["Kidneys and Renal", "/system/renal"],
          ["Diabetes", "/system/diabetes"],
          ["Ear & Eye Care", "/system/ear-eye-care"],
          ["Oral Hygiene", "/system/oral-hygiene"],
          ["Muscles and Bones", "/system/msk"],
        ],
      },
      {
        label: "Shop By Condition",
        key: "condition",
        links: [
          ["Hypertension", "/conditions/hypertension"],
          ["Diabetes", "/conditions/diabetes"],
          ["Malaria", "/conditions/malaria"],
          ["Fungal Infection", "/conditions/fungal-infection"],
          ["Skin Treatment", "/conditions/skin-treatment"],
          ["UTI Infections", "/conditions/uti-infections"],
          ["Cough, Cold & Flu", "/conditions/cough-cold-flu"],
          ["Ear & Eye Care", "/conditions/ear-eye-care"],
          ["Oral Hygiene", "/conditions/oral-hygiene"],
        ],
      },
      {
        label: "Prescription Assistance",
        key: "prescription",
        links: [
          ["Upload Prescription", "/prescription/upload"],
          ["Request Prescription", "/prescription/refill"],
          ["Talk to a Pharmacist", "/prescription/support"],
        ],
      },
    ],
    []
  );

  return (
    <header className={styles.header} ref={headerRef}>
      {/* === Top Bar === */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarContent}>
            {/* === Logo Section === */}
            <div className={styles.logoContainer}>
              <Link to="/" className={styles.logoLink} aria-label="Healthfield Pharmacy — Home">
                <div className={styles.logo}>
                  <div className={styles.logoIcon}>
                    <img
                      src="/logo.png"
                      alt="Healthfield Pharmacy circular logo"
                      className={styles.logoImage}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.logoText}>
                    <span className={styles.maplewood}>HEALTHFIELD</span>
                    <span className={styles.pharmacy}>PHARMACY</span>
                    <span className={styles.tagline}>
                      Your Health, Our Mission — Reliable Care. Anytime.
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* === Top Nav Links === */}
            <nav className={styles.topNav} aria-label="Top Navigation">
              <Link to="/about-us">About Us</Link>
              <Link to="/newsroom">Newsroom</Link>
              <Link to="/investor-relations">Investor Relations</Link>
              <Link to="/careers">Careers</Link>
            </nav>

            {/* === Shop Now Button === */}
            <div className={styles.topActions}>
              <div id="navbar-menu" className={styles.navMenu} role="menu">
                <Link
                  to="/shop"
                  className={styles.enrollButton}
                  role="menuitem"
                  aria-label="Shop Now at Healthfield Pharmacy"
                >
                  <span className={styles.enrollIcon} aria-hidden="true">▶</span>
                  <span>Shop Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Bottom Navigation Bar === */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          {/* Mobile Menu Toggle */}
          <button
            className={`${styles.mobileToggle} ${mobileMenuOpen ? styles.open : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
          </button>

          {/* === Main Navigation === */}
          <nav
            className={`${styles.mainNav} ${mobileMenuOpen ? styles.mobileOpen : ""}`}
            aria-label="Main Navigation"
          >
            <ul className={styles.navList}>
              {menus.map((menu) => (
                <li
                  key={menu.key}
                  className={styles.navItem}
                  onMouseEnter={() => handleMouseEnter(menu.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  {menu.path ? (
                    <Link to={menu.path} className={styles.navButton}>
                      {menu.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleDropdown(menu.key)}
                        className={`${styles.navButton} ${
                          activeDropdown === menu.key ? styles.active : ""
                        }`}
                        aria-expanded={activeDropdown === menu.key}
                        type="button"
                      >
                        {menu.label}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.chevron}
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

                      {activeDropdown === menu.key && menu.links && (
                        <div className={styles.dropdown}>
                          <ul>
                            {menu.links.map(([label, href]) => (
                              <li key={href}>
                                <Link to={href}>{label}</Link>
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
