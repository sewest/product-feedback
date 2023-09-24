// Importing the CSS module for the baseCard component
import styles from "./baseCard.module.css";

// Defining the BaseCard component as the default export
// It takes two props: children and classes
export default function BaseCard({ children, classes }) {
  // Combining the CSS class names from the CSS module and the classes prop
  const combinedClasses = `${styles.card} ${classes}`;

  // Returning an <article> element with the combined CSS class names and the children
  return <article className={combinedClasses}>{children}</article>;
}
