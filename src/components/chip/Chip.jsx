import styles from "./chip.module.css";

/**
 * Renders a Chip component.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The content to be rendered inside the chip.
 *
 * @return {ReactElement} The rendered Chip component.
 */
export default function Chip({ children, onClick }) {
  return (
    <div className={styles.chip} onClick={onClick}>
      {children}
    </div>
  );
}
