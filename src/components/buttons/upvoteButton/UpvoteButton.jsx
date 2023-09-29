import { useAppDispatch } from "../../../context/AppContext";
import { ReactComponent as Chevron } from "../../../assets/images/buttons/iconArrowUp.svg";

// Importing the "styles" object from the "./upvoteButton.module.css" file
import styles from "./upvoteButton.module.css";

// Exporting a default function named "UpvoteButton" that takes a "count" parameter
export default function UpvoteButton({ count, pid }) {
  const dispatch = useAppDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "UPVOTE", payload: pid });
  };

  // Returning JSX code for a button element with the "upvoteButton" class
  return (
    <button className={styles.upvoteButton} onClick={(e) => handleClick(e)}>
      {/* Rendering the "Chevron" component */}
      <Chevron />

      {/* Rendering the "count" variable */}
      {count}
    </button>
  );
}
