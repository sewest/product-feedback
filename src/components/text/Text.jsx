import styles from "./text.module.css";

export default function Text({ size, children, classes }) {
  const combinedClasses = `${styles.text} ${styles[size]} ${classes}`;

  return <p className={combinedClasses}>{children}</p>;
}
