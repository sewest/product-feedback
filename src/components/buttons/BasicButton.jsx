import styles from "./basicButton.module.css";

/**
 * Renders a basic button component.
 *
 * @param {Object} props - The props passed to the component.
 * @param {ReactNode} props.children - The children of the button.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * @param {string} props.type - The type of button.
 * @param {Object} props.style - Additional styles to be applied.
 * @returns {JSX.Element} The rendered button element.
 */
export default function BasicButton({ children, onClick, type, style }) {
  return (
    <button className={`${styles.buttonBase} ${styles[type]}`} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
