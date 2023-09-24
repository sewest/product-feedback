import styles from "./title.module.css";

export default function Title({ order, size, color, children, classes }) {
  //Return the proper header based on the order.
  switch (order) {
    case 1:
      return <h1 className={`${styles.title} ${styles[size]} ${styles[color]} ${classes}`}>{children}</h1>;
    case 2:
      return <h2 className={`${styles.title} ${styles[size]} ${styles[color]} ${classes}`}>{children}</h2>;
    case 3:
      return <h3 className={`${styles.title} ${styles[size]} ${styles[color]} ${classes}`}>{children}</h3>;
    case 4:
      return <h4 className={`${styles.title} ${styles[size]} ${styles[color]} ${classes}`}>{children}</h4>;
    case 5:
      return <h5 className={`${styles.title} ${styles[size]} ${styles[color]} ${classes}`}>{children}</h5>;
    case 6:
      return <h6 className={`${styles.title} ${styles[size]} ${styles[color]} ${classes}`}>{children}</h6>;
    default:
      return null;
  }
}
