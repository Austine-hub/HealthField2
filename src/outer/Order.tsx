import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Package, CreditCard } from "lucide-react";
import styles from "./Order.module.css";

interface ShipmentInfo {
  number?: number;
  station?: string;
  fulfilledBy?: string;
  deliveryStart?: string;
  deliveryEnd?: string;
}

interface OrderProps {
  orderNumber?: string;
  shipments?: ShipmentInfo[];
  hasGlobalItems?: boolean;
  onSeeDetails?: () => void;
}

const Order: React.FC<OrderProps> = ({
  orderNumber = "Pending...",
  shipments = [],
  hasGlobalItems = false,
  onSeeDetails,
}) => {
  return (
    <motion.div
      className={styles.orderContainer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* ✅ Header */}
      <section className={styles.confirmationSection}>
        <div className={styles.confirmationContent}>
          <CheckCircle className={styles.checkmarkIcon} aria-hidden="true" />
          <div className={styles.confirmationText}>
            <p className={styles.thankYouText}>🎉 Thank you for shopping with us!</p>
            <p className={styles.orderNumber}>Order No. {orderNumber}</p>
          </div>
        </div>

        {onSeeDetails && (
          <button
            onClick={onSeeDetails}
            className={styles.detailsButton}
            aria-label="View order details"
          >
            See Order Details
          </button>
        )}
      </section>

      {/* ✅ Main Content */}
      <div className={styles.contentGrid}>
        {/* === Pickup Info === */}
        <section className={styles.pickupSection}>
          <div className={styles.sectionHeader}>
            <Package className={styles.sectionIcon} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>Pick-up Station</h2>
          </div>

          <p className={styles.notificationText}>
            You’ll receive an SMS, email, and push notification when your package is ready for pickup.
          </p>

          <div className={styles.shipmentsContainer}>
            {Array.isArray(shipments) && shipments.length > 0 ? (
              shipments.map((shipment, idx) => (
                <motion.div
                  key={shipment.number ?? idx}
                  className={styles.shipmentItem}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className={styles.shipmentTitle}>
                    Shipment {shipment.number ?? idx + 1}
                  </h3>
                  <p className={styles.shipmentDetail}>
                    {shipment.station ?? "Unknown Station"} • Fulfilled by{" "}
                    {shipment.fulfilledBy ?? "Pending"}
                  </p>
                  <p className={styles.deliverySchedule}>
                    Delivery{" "}
                    {shipment.deliveryEnd ? "between" : "scheduled on"}{" "}
                    <span className={styles.deliveryDate}>
                      {shipment.deliveryStart ?? "TBD"}
                    </span>
                    {shipment.deliveryEnd && (
                      <>
                        {" and "}
                        <span className={styles.deliveryDate}>
                          {shipment.deliveryEnd}
                        </span>
                      </>
                    )}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className={styles.emptyStateText}>
                No shipment information available yet.
              </p>
            )}
          </div>

          {hasGlobalItems && (
            <p className={styles.globalItemsNote}>
              🌍 This order includes global items which may take longer to arrive.
            </p>
          )}
        </section>

        {/* === Payment Info === */}
        <section className={styles.paymentSection}>
          <div className={styles.sectionHeader}>
            <CreditCard className={styles.sectionIcon} aria-hidden="true" />
            <h2 className={styles.sectionTitle}>
              Pay on Delivery via Mobile Money or Bank Cards
            </h2>
          </div>
          <p className={styles.paymentDescription}>
            Enjoy fast and secure payments — available for M-Pesa, Airtel Money, and major bank cards.
          </p>
        </section>
      </div>
    </motion.div>
  );
};

export default Order;
