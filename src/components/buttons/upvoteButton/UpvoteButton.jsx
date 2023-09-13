import { ReactComponent as Chevron } from "../../../assets/images/buttons/iconArrowUp.svg";
import styles from "./upvoteButton.module.css";

/**
 * Render an upvote button component.
 *
 * @param {Object} props - The properties of the component.
 * @param {number} props.count - The number of upvotes.
 * @return {JSX.Element} The rendered upvote button component.
 */
export default function UpvoteButton({ count }) {
  return (
    <button className={styles.upvoteButton}>
      <Chevron />
      {count}
    </button>
  );
}
