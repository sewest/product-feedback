// Importing the CSS module for the drawer overlay styles
import styles from "./drawerOverlay.module.css";

export default function DrawerOverlay({ isOpen, setIsOpen }) {
  // If the drawer is open
  if (isOpen) {
    // Return the drawer overlay component with the specified styles
    // and an event listener to close the drawer when clicked
    return <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>;
  }
  // If the drawer is not open, return null
  return null;
}
