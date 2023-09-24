// Import the CSS module for the button styles
import styles from "./basicButton.module.css";

// Define the default export of the module as a function called BasicButton
export default function BasicButton({ children, onClick, buttonType, classes }) {
  // Combine the CSS classes for the button based on the buttonType and additional classes
  const combinedClasses = `${styles.buttonBase} ${styles[buttonType]} ${classes}`;

  // Return a button element with the combined classes and an onClick event handler
  return (
    <button className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
}
