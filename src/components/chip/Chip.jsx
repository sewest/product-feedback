// Import the styles module from the chip.module.css file
import styles from "./chip.module.css";

// Define and export the Chip component
export default function Chip({ children, onClick, isActive }) {
  // Return a div element with the class name from the styles object and an onClick event handler
  return (
    <div className={`${styles.chip} ${isActive ? styles.activeChip : ""}`} onClick={onClick}>
      {children}
    </div>
  );
}
