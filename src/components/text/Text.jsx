import styles from "./text.module.css";

export default function Text({ size, children, classes }) {
  return <p className={`${styles.text} ${styles[size]} ${classes}`}>{children}</p>;
}
