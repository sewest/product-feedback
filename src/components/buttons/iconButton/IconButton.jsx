import { Link } from "react-router-dom";
import styles from "./iconButton.module.css";

/**
 * Renders an icon button with optional text or children as content.
 *
 * @param {Object} props - The properties of the icon button.
 * @param {ReactElement} props.icon - The icon element to be rendered.
 * @param {ReactNode} [props.children] - The optional text or children to be rendered.
 * @param {string} [props.classes] - The additional classes to be applied to the icon button.
 * @param {string} [props.to] - The URL to navigate to when the button is clicked.
 * @return {ReactElement} The rendered icon button.
 */
export default function IconButton({ icon, children, classes, to }) {
  return (
    <Link to={to} className={`${styles.iconButton} ${classes}`}>
      {icon}
      {children}
    </Link>
  );
}
