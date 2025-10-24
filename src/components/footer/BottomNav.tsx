import React from "react";
import { Home, ShoppingBag, ShoppingCart, FileText, MapPin, User } from "lucide-react";
import styles from "./BottomNav.module.css";

const BottomNav: React.FC = () => {
  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navItem}>
        <Home className={`${styles.icon} ${styles.activeIcon}`} />
        <span className={styles.activeLabel}>Home</span>
      </div>

      <div className={styles.navItem}>
        <div className={styles.iconWrapper}>
          <ShoppingBag className={styles.icon} />
          <span className={styles.badge}>New</span>
        </div>
        <span className={styles.label}>Offers</span>
      </div>

      <div className={styles.navItem}>
        <ShoppingCart className={styles.icon} />
        <span className={styles.label}>Checkout</span>
      </div>

      <div className={styles.navItem}>
        <FileText className={styles.icon} />
        <span className={styles.label}>Prescription</span>
      </div>

      <div className={styles.navItem}>
        <MapPin className={styles.icon} />
        <span className={styles.label}>Stores</span>
      </div>

      <div className={styles.navItem}>
        <User className={styles.icon} />
        <span className={styles.label}>Account</span>
      </div>
    </nav>
  );
};

export default BottomNav;
