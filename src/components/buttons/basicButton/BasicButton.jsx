import styles from "./basicButton.module.css";

export default function BasicButton({ children, onClick, buttonType, style, classes }) {
  /**
   * Renders a basic button component.
   *
   * @param {Object} props - The props object.
   * @param {ReactNode} props.children - The content of the button.
   * @param {Function} props.onClick - The onClick event handler.
   * @param {string} props.buttonType - The type of button.
   * @param {Object} props.style - Inline styling for the button.
   * @param {string} props.classes - Additional CSS classes for the button.
   * @return {ReactElement} The rendered button component.
   */
  return (
    <button className={`${styles.buttonBase} ${styles[buttonType]} ${classes}`} onClick={onClick} style={style}>
      {children}
    </button>
  );
}
