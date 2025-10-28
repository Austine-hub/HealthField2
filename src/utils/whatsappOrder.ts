// src/utils/whatsappOrder.ts

import type { CartItem } from "../context/CartContext";

/**
 * Configuration for WhatsApp Business
 */
const WHATSAPP_CONFIG = {
  // Replace with your business WhatsApp number (include country code, no + or spaces)
  // Example: "254712345678" for Kenya
  phoneNumber: "254796787207",
  
  // Message template customization
  greeting: "Hello! 👋",
  storeName: "Healthfield Pharmacy",
} as const;

/**
 * Currency formatter for consistent price display
 */
const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Generates a formatted WhatsApp message from cart items
 */
export const generateWhatsAppMessage = (
  cartItems: CartItem[],
  subtotal: number
): string => {
  if (!cartItems.length) {
    return `${WHATSAPP_CONFIG.greeting}\n\nI'm interested in your products.`;
  }

  // Build the message parts
  const parts: string[] = [
    WHATSAPP_CONFIG.greeting,
    `I'd like to place an order from *${WHATSAPP_CONFIG.storeName}*:\n`,
  ];

  // Add separator
  parts.push("━━━━━━━━━━━━━━━━━━━━");
  parts.push("*ORDER DETAILS*\n");

  // Add each item with formatting
  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    
    parts.push(`*${index + 1}. ${item.name}*`);
    
    // Add variation if exists
    if (item.variation) {
      parts.push(`   Variant: ${item.variation}`);
    }
    
    // Quantity and pricing
    parts.push(`   Qty: ${item.quantity} × ${formatPrice(item.price)}`);
    parts.push(`   Subtotal: ${formatPrice(itemTotal)}\n`);
  });

  // Add totals section
  parts.push("━━━━━━━━━━━━━━━━━━━━");
  parts.push("*SUMMARY*");
  parts.push(`Total Items: ${cartItems.reduce((sum, item) => sum + item.quantity, 0)}`);
  parts.push(`*Grand Total: ${formatPrice(subtotal)}*`);
  parts.push("━━━━━━━━━━━━━━━━━━━━\n");
  
  // Add closing
  parts.push("Please confirm my order and let me know the next steps. Thank you! 🙏");

  return parts.join("\n");
};

/**
 * Opens WhatsApp with pre-filled message
 */
export const openWhatsAppOrder = (message: string): void => {
  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Construct WhatsApp URL
  // Use api.whatsapp.com for better cross-platform compatibility
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIG.phoneNumber}&text=${encodedMessage}`;
  
  // Open in new window/tab
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
};

/**
 * Validates phone number format
 */
export const isValidWhatsAppNumber = (phone: string): boolean => {
  // Basic validation: should be digits only, 10-15 characters
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(phone);
};

/**
 * Main handler: generates message and opens WhatsApp
 */
export const handleWhatsAppOrder = (
  cartItems: CartItem[],
  subtotal: number
): boolean => {
  // Validate configuration
  if (!isValidWhatsAppNumber(WHATSAPP_CONFIG.phoneNumber)) {
    console.error("Invalid WhatsApp number in configuration");
    return false;
  }

  // Generate message
  const message = generateWhatsAppMessage(cartItems, subtotal);
  
  // Open WhatsApp
  try {
    openWhatsAppOrder(message);
    return true;
  } catch (error) {
    console.error("Failed to open WhatsApp:", error);
    return false;
  }
};