import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ===== Scroll & Click Outside Handling =====
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===== Toggle Logic =====
  const toggleDropdown = (menu: string) =>
    setOpenDropdown(openDropdown === menu ? null : menu);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.navContainer}>
        {/* === LOGO === */}
        <a href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <div className={styles.logoGrid}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </a>

        {/* === DESKTOP NAVIGATION === */}
        <div className={styles.desktopNav} ref={dropdownRef}>
          {[
            {
              label: "Shop By Category",
              key: "category",
              links: [
                ["Skin Care", "/categories/skin-care"],
                ["Beauty & Cosmetics", "/categories/beauty-care-cosmetics"],
                ["Vitamins & Supplements", "/categories/vitamins-supplements"],
                ["Medicine", "/categories/medicine"],
                ["Body Building", "/categories/body-building"],
                ["Hygiene", "/categories/general-hygiene"],
                ["Home Healthcare", "/categories/home-healthcare"],
                ["Bundle Offers", "/categories/bundle-offers"],
                ["Veterinary Products", "/categories/veterinary-products"],
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
              label: "Brands",
              key: "brands",
              links: [
                ["Pfizer", "/brands/pfizer"],
                ["GSK", "/brands/gsk"],
                ["Johnson & Johnson", "/brands/johnson-johnson"],
                ["Bayer", "/brands/bayer"],
                ["Novartis", "/brands/novartis"],
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
          ].map((menu) => (
            <div key={menu.key} className={styles.menuDropdown}>
              <button
                className={styles.menuItem}
                onClick={() => toggleDropdown(menu.key)}
                aria-expanded={openDropdown === menu.key}
              >
                {menu.label}
                <ChevronDown
                  size={16}
                  className={`${styles.chevron} ${
                    openDropdown === menu.key ? styles.open : ""
                  }`}
                />
              </button>
              {openDropdown === menu.key && (
                <ul className={styles.dropdownMenu}>
                  {menu.links.map(([text, href]) => (
                    <li key={href}>
                      <a href={href}>{text}</a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* === STATIC LINKS === */}
          <a href="/new-arrivals" className={styles.navLink}>
            <span className={styles.badge}>New</span> New Arrivals
          </a>
          <a href="/trending" className={styles.navLink}>Trending</a>
          <a href="/offers" className={styles.navLink}>
            <span className={styles.badge}>New</span> Offers
          </a>
          <a href="/best-sellers" className={styles.navLink}>Best Sellers</a>
        </div>

        {/* === MOBILE TOGGLE BUTTON (Always Glued to Navbar) === */}
        <button
          className={styles.mobileMenuBtn}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* === MOBILE MENU === */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {[
              {
                label: "Shop By Category",
                key: "category-mobile",
                links: [
                  ["Skin Care", "/categories/skin-care"],
                  ["Beauty & Cosmetics", "/categories/beauty-care-cosmetics"],
                  ["Vitamins & Supplements", "/categories/vitamins-supplements"],
                  ["Medicine", "/categories/medicine"],
                  ["Body Building", "/categories/body-building"],
                  ["Hygiene", "/categories/general-hygiene"],
                  ["Home Healthcare", "/categories/home-healthcare"],
                  ["Bundle Offers", "/categories/bundle-offers"],
                  ["Veterinary Products", "/categories/veterinary-products"],
                ],
              },
              {
                label: "Shop By Condition",
                key: "condition-mobile",
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
                label: "Brands",
                key: "brands-mobile",
                links: [
                  ["Pfizer", "/brands/pfizer"],
                  ["GSK", "/brands/gsk"],
                  ["Johnson & Johnson", "/brands/johnson-johnson"],
                  ["Bayer", "/brands/bayer"],
                  ["Novartis", "/brands/novartis"],
                ],
              },
              {
                label: "Prescription Assistance",
                key: "prescription-mobile",
                links: [
                  ["Upload Prescription", "/prescription/upload"],
                  ["Request Prescription", "/prescription/refill"],
                  ["Talk to a Pharmacist", "/prescription/support"],
                ],
              },
            ].map((menu) => (
              <div key={menu.key} className={styles.mobileDropdown}>
                <button
                  className={styles.mobileMenuItem}
                  onClick={() => toggleDropdown(menu.key)}
                >
                  {menu.label}
                  <ChevronDown
                    size={16}
                    className={`${styles.chevron} ${
                      openDropdown === menu.key ? styles.open : ""
                    }`}
                  />
                </button>
                {openDropdown === menu.key && (
                  <ul className={styles.mobileSubmenu}>
                    {menu.links.map(([text, href]) => (
                      <li key={href}>
                        <a href={href} onClick={closeMobileMenu}>
                          {text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* === Static Mobile Links === */}
            <a href="/new-arrivals" onClick={closeMobileMenu} className={styles.mobileNavLink}>
              <span className={styles.badge}>New</span> New Arrivals
            </a>
            <a href="/trending" onClick={closeMobileMenu} className={styles.mobileNavLink}>Trending</a>
            <a href="/offers" onClick={closeMobileMenu} className={styles.mobileNavLink}>
              <span className={styles.badge}>New</span> Offers
            </a>
            <a href="/best-sellers" onClick={closeMobileMenu} className={styles.mobileNavLink}>Best Sellers</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


