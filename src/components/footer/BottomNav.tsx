import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ShoppingBag, ShoppingCart, FileText, MapPin } from "lucide-react";
import toast from "react-hot-toast";
import styles from "./BottomNav.module.css";

interface BottomNavProps {
  onCartToggle?: () => void; // 👈 optional cart drawer toggle
}

const BottomNav: React.FC<BottomNavProps> = ({ onCartToggle }) => {
  const navigate = useNavigate();

  const navItems = [
    { to: "/", label: "Home", icon: <Home strokeWidth={1.8} /> },
    {
      to: "/offers",
      label: "Offers",
      icon: <ShoppingBag strokeWidth={1.8} />,
      badge: "New",
    },
    {
      to: "/prescription/upload",
      label: "Prescription",
      icon: <FileText strokeWidth={1.8} />,
    },
    {
      to: "/cart",
      label: "Checkout",
      icon: <ShoppingCart strokeWidth={1.8} />,
      onClick: () => {
        toast.success("Opening your cart...", { duration: 1800 });
        onCartToggle?.();

        // ✅ Allow the toast to show, then navigate
        setTimeout(() => navigate("/cart"), 500);
      },
    },
    {
      to: "https://www.google.com/maps/dir/-1.1010048,37.011456/HEALTHFIELD+PHARMACY,+Jkuat,+Muramati+road,+Gate+C+Rd,+Juja",
      label: "Stores",
      icon: <MapPin strokeWidth={1.8} />,
      external: true,
    },
  ];

  return (
    <motion.nav
      className={styles.bottomNav}
      role="navigation"
      aria-label="Primary navigation"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      {navItems.map(({ to, label, icon, badge, external, onClick }) =>
        external ? (
          // 🌍 External Link (Google Maps)
          <a
            key={label}
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${label} in Google Maps`}
            className={`${styles.navItem} ${styles.externalLink}`}
          >
            <motion.div
              className={styles.iconWrapper}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.icon}>{icon}</span>
              {badge && <span className={styles.badge}>{badge}</span>}
            </motion.div>
            <span className={styles.label}>{label}</span>
          </a>
        ) : (
          // 🧭 Internal Links
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
            onClick={(e) => {
              if (onClick) {
                e.preventDefault(); // prevent default navigation
                onClick(); // call custom logic (toast + drawer + delayed nav)
              }
            }}
            aria-label={label}
          >
            <motion.div
              className={styles.iconWrapper}
              whileTap={{ scale: 0.9 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.icon}>{icon}</span>
              {badge && <span className={styles.badge}>{badge}</span>}
            </motion.div>
            <span className={styles.label}>{label}</span>
          </NavLink>
        )
      )}
    </motion.nav>
  );
};

export default BottomNav;
