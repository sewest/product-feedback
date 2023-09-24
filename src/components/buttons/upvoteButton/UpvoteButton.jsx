// Importing the "ReactComponent" component from the "iconArrowUp.svg" file
import { ReactComponent as Chevron } from "../../../assets/images/buttons/iconArrowUp.svg";

// Importing the "styles" object from the "./upvoteButton.module.css" file
import styles from "./upvoteButton.module.css";

// Exporting a default function named "UpvoteButton" that takes a "count" parameter
export default function UpvoteButton({ count }) {
  // Returning JSX code for a button element with the "upvoteButton" class
  return (
    <button className={styles.upvoteButton}>
      {/* Rendering the "Chevron" component */}
      <Chevron />

      {/* Rendering the "count" variable */}
      {count}
    </button>
  );
}
