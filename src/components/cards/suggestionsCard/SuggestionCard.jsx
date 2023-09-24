import { Link } from "react-router-dom";
import { ReactComponent as Comments } from "../../../assets/icons/iconComments.svg";
import useWindowWidth from "../../../hooks/useWindowWidth";
import BaseCard from "../baseCard/BaseCard";
import UpvoteButton from "../../buttons/upvoteButton/UpvoteButton";
import Chip from "../../chip/Chip";
import Title from "../../title/Title";
import Text from "../../text/Text";
import styles from "./suggestionCard.module.css";

// Define and export the SuggestionCard component
export default function SuggestionCard({ sugTitle, sugDescription, sugCategory, sugVotes, sugComments, sugId, sugReplies }) {
  // Get the window width using the useWindowWidth hook
  const windowWidth = useWindowWidth();

  return (
    <Link to={`/feedback/${sugId}`} className={styles.suggestionCardLink}>
      {/* Render a BaseCard component */}
      <BaseCard classes={styles.suggestionCard}>
        <div className={styles.outerButtonContainer}>
          {/* Render an UpvoteButton component with the number of votes */}
          <UpvoteButton count={sugVotes} />
        </div>

        <div className={styles.cardHeader}>
          {/* Render a Title component with the suggestion title */}
          <Title order={2} color={"dark"} size={windowWidth < 768 ? "sm" : "lg"}>
            {sugTitle}
          </Title>
          {/* Render a Text component with the suggestion description */}
          <Text size={windowWidth < 768 ? "sm" : "lg"}>{sugDescription}</Text>
          {/* Render a Chip component with the suggestion category */}
          <Chip>{sugCategory}</Chip>
        </div>
        <div className={styles.buttonContainer}>
          {/* Render an UpvoteButton component with the number of votes */}
          <UpvoteButton count={sugVotes} />
          <div>
            {/* Render the Comments icon */}
            <Comments />
            {/* Render the number of comments */}
            {sugComments}
          </div>
        </div>
        <div className={`${sugReplies + sugComments || styles.zeroReplies} ${styles.outerCommentsContainer}`}>
          {/* Render the Comments icon */}
          <Comments />
          {/* Render the total number of comments and replies */}
          {sugComments + sugReplies || 0}
        </div>
      </BaseCard>
    </Link>
  );
}
