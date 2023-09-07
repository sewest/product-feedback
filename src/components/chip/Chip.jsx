import styles from "./chip.module.css";

export default function Chip({ children }) {
  return <div className={styles.chip}>{children}</div>;
}
