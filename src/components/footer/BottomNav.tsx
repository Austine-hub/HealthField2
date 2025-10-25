import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  ShoppingCart,
  FileText,
  MapPin,
} from "lucide-react";
import styles from "./BottomNav.module.css";

const BottomNav: React.FC = () => {
  const navItems = [
    { to: "/", label: "Home", icon: <Home /> },
    { to: "/offers", label: "Offers", icon: <ShoppingBag />, badge: "New" },
    { to: "/cart", label: "Checkout", icon: <ShoppingCart /> },
    { to: "/prescription/upload", label: "Prescription", icon: <FileText /> },
    {
      to: "https://www.google.com/maps/dir/-1.1010048,37.011456/HEALTHFIELD+PHARMACY,+Jkuat,+Muramati+road,+Gate+C+Rd,+Juja/@-1.0998346,37.0091212,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x182f478f220d151b:0x2518c5efaf81c0!2m2!1d37.0110976!2d-1.0990329?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D",
      label: "Stores",
      icon: <MapPin />,
      external: true,
    },
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map(({ to, label, icon, badge, external }) =>
        external ? (
          <a
            key={label}
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label} in Google Maps`}
            className={`${styles.navItem} ${styles.externalLink}`}
          >
            <div className={styles.iconWrapper}>
              <span className={`${styles.icon} ${styles.externalIcon}`}>
                {icon}
              </span>
              {badge && <span className={styles.badge}>{badge}</span>}
            </div>
            <span className={styles.label}>{label}</span>
          </a>
        ) : (
          <NavLink
            key={label}
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
        )
      )}
    </nav>
  );
};

export default BottomNav;

