import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaCapsules,
} from "react-icons/fa";
import styles from "./Footer.module.css";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const year = new Date().getFullYear();

  return (
    <footer
      className={clsx(styles.footer, className)}
      role="contentinfo"
      aria-label="Website footer"
    >
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* ===== Brand / Logo Section ===== */}
        <div className={styles.brand}>
          <div className={styles.logoContainer}>
            <FaCapsules className={styles.logoIcon} aria-hidden="true" />
            <span className={styles.logoText}>HealthField Pharmacy</span>
          </div>
          <p className={styles.tagline}>
            Trusted Healthcare, Beauty & Wellness — Delivered with Care
          </p>
        </div>

        {/* ===== Footer Links ===== */}
        <div className={styles.linksGrid}>
          <nav className={styles.linkSection} aria-label="Quick Links">
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/delivery">Delivery & Returns</a></li>
              <li><a href="/contact-us">Contact Us</a></li>
            </ul>
          </nav>

          <section className={styles.linkSection}>
            <h3 className={styles.sectionTitle}>About Us</h3>
            <p>
              Your go-to online pharmacy in Kenya for medicines, skincare,
              beauty, and wellness essentials from trusted brands.
            </p>
          </section>

          <section className={styles.linkSection}>
            <h3 className={styles.sectionTitle}>Connect</h3>
            <div className={styles.socials}>
              <a
                href="https://www.facebook.com/theggodofwolves/"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
            </div>
          </section>


             <section className={`${styles.linkSection} ${styles.phoneSection}`}>
            <h3 className={styles.sectionTitle}>Order by Phone</h3>
            <p className={styles.phoneText}>
              Need help placing an order? Our support team is here for you.
            </p>
            <a href="tel:0796787207" className={styles.phoneLink}>
              <FaPhoneAlt aria-hidden="true" /> 0796 787 207
            </a>
            <p className={styles.phoneHours}>(10am – 6pm)</p>
          </section>
        </div>
      </motion.div>

      {/* ===== Footer Bottom ===== */}
      <div className={styles.bottomBar}>
        <p>© {year} HealthField Pharmacy — All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
