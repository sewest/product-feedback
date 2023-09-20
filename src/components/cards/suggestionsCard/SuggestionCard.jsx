import { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Comments } from "../../../assets/icons/iconComments.svg";
import useWindowWidth from "../../../hooks/useWindowWidth";
import BaseCard from "../baseCard/BaseCard";
import UpvoteButton from "../../buttons/upvoteButton/UpvoteButton";
import Chip from "../../chip/Chip";
import Title from "../../title/Title";
import Text from "../../text/Text";
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
export default function SuggestionCard({ sugTitle, sugDescription, sugCategory, sugVotes, sugComments, sugId, sugReplies }) {
  const [width, setWidth] = useState(window.innerWidth);
  const windowWidth = useWindowWidth();

  return (
    <Link to={`/feedback/${sugId}`} className={styles.suggestionCardLink}>
      <BaseCard classes={styles.suggestionCard}>
        <div className={styles.outerButtonContainer}>
          <UpvoteButton count={sugVotes} />
        </div>

        <div className={styles.cardHeader}>
          <Title order={2} color={"dark"} size={windowWidth < 768 ? "sm" : "lg"}>
            {sugTitle}
          </Title>
          <Text size={windowWidth < 768 ? "sm" : "lg"}>{sugDescription}</Text>
          <Chip>{sugCategory}</Chip>
        </div>
        <div className={styles.buttonContainer}>
          <UpvoteButton count={sugVotes} />
          <div>
            <Comments />
            {sugComments}
          </div>
        </div>
        <div className={`${sugReplies + sugComments || styles.zeroReplies} ${styles.outerCommentsContainer}`}>
          <Comments />
          {sugComments + sugReplies || 0}
        </div>
      </BaseCard>
    </Link>
  );
}
