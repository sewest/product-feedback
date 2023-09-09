import UpvoteButton from "../buttons/UpvoteButton";
import Chip from "../../components/chip/Chip";
import { ReactComponent as Comments } from "../../assets/icons/iconComments.svg";
import styles from "./suggestionCard.module.css";

/**
 * Renders a suggestion card component.
 *
 * @param {string} sugTitle - The title of the suggestion.
 * @param {string} sugDescription - The description of the suggestion.
 * @param {string} sugCategory - The category of the suggestion.
 * @param {number} sugVotes - The number of votes the suggestion has received.
 * @param {number} sugComments - The number of comments on the suggestion.
 * @return {ReactElement} The rendered suggestion card component.
 */
export default function SuggestionCard({ sugTitle, sugDescription, sugCategory, sugVotes, sugComments }) {
  return (
    <article className={styles.suggestionCard}>
      <div className={styles.outerButtonContainer}>
        <UpvoteButton count={sugVotes} />
      </div>

      <div className={styles.cardHeader}>
        <h2>{sugTitle}</h2>
        <p>{sugDescription}</p>
        <Chip>{sugCategory}</Chip>
      </div>
      <div className={styles.buttonContainer}>
        <UpvoteButton count={sugVotes} />
        <div>
          <Comments />
          {sugComments}
        </div>
      </div>
      <div className={styles.outerCommentsContainer}>
        <Comments />
        {sugComments}
      </div>
    </article>
  );
}
