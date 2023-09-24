// Import the necessary modules and styles
import { Link } from "react-router-dom";
import styles from "./iconButton.module.css";

// Define and export the IconButton component
export default function IconButton({ icon, children, classes, to, isLink, onClick }) {
  // Combine the default styles with the additional classes passed as props
  const combinedClasses = `${styles.iconButton} ${classes}`;

  // If the component is a link, render a Link component
  if (isLink) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick}>
        {icon}
        {children}
      </Link>
    );
  }

  // If the component is a button, render a button element
  return (
    <button className={`${styles.iconButton} ${classes}`} onClick={onClick}>
      {icon} {children}
    </button>
  );
}
