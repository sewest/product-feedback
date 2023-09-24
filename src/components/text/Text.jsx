// Import the CSS module
import styles from "./text.module.css";

// Define and export a function component named Text
export default function Text({ size, children, classes }) {
  // Combine the CSS classes using template literals
  const combinedClasses = `${styles.text} ${styles[size]} ${classes}`;

  // Return a paragraph element with the combined classes and the children
  return <p className={combinedClasses}>{children}</p>;
}
