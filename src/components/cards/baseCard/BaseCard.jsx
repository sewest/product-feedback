import styles from "./baseCard.module.css";

export default function BaseCard({ children, classes }) {
  const combinedClasses = `${styles.card} ${classes}`;

  return <article className={combinedClasses}>{children}</article>;
}
