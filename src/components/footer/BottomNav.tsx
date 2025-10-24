import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, ShoppingCart, FileText, MapPin, User } from "lucide-react";
import styles from "./BottomNav.module.css";

const BottomNav: React.FC = () => {
  const navItems = [
    { to: "/", label: "Home", icon: <Home /> },
    { to: "/offers", label: "Offers", icon: <ShoppingBag />, badge: "New" },
    { to: "/cart", label: "Checkout", icon: <ShoppingCart /> },
    { to: "/prescription/upload", label: "Prescription", icon: <FileText /> },
    { to: "/stores", label: "Stores", icon: <MapPin /> },
    { to: "/account", label: "Account", icon: <User /> },
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map(({ to, label, icon, badge }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <div className={styles.iconWrapper}>
            <span className={styles.icon}>{icon}</span>
            {badge && <span className={styles.badge}>{badge}</span>}
          </div>
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
