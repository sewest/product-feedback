import Toolbar from "../toolBar/ToolBar";
import SuggestionCard from "../suggestions/SuggestionCard";
import data from "../../assets/data/data.json";
import { ReactComponent as Empty } from "../../assets/icons/iconEmpty.svg";
import useWindowWidth from "../../hooks/useWindowWidth";
import BasicButton from "../buttons/basicButton/BasicButton";
import Title from "../title/Title";
import styles from "./suggestions.module.css";

/**
 * Renders the Suggestions component.
 *
 * @return {JSX.Element} The rendered Suggestions component.
 */
export default function Suggestions() {
  const windowWidth = useWindowWidth();
  // const reqs = data.productRequests;
  const reqs = [];

  return (
    <section className={styles.suggestions}>
      <Toolbar />
      {reqs.length > 0 && (
        <ul className={styles.suggestionsList}>
          {reqs.map(
            (req) =>
              req.status === "suggestion" && (
                <li key={req.id}>
                  <SuggestionCard
                    sugTitle={req.title}
                    sugDescription={req.description}
                    sugCategory={req.category}
                    sugVotes={req.upvotes}
                    sugComments={req.comments ? req.comments.length : 0}
                    sugId={req.id}
                    key={req.id}
                    sugReplies={req.comments && getTotalRepliesCount(req.comments)}
                  />
                </li>
              )
          )}
        </ul>
      )}
      {reqs.length === 0 && (
        <section className={styles.emptySection}>
          <Empty />
          <Title order={3} color="dark" size={windowWidth < 768 ? "lg" : "xxl"}>
            There is no feedback yet.
          </Title>
          <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
          <BasicButton buttonType={"button1"}>+ Add Feedback</BasicButton>
        </section>
      )}
    </section>
  );
}

/**
 * Calculates the total number of replies in the given comments array.
 *
 * @param {Array} comments - An array of comments.
 * @return {number} The total number of replies.
 */
const getTotalRepliesCount = (comments) => {
  return comments.reduce((count, comment) => count + (comment.replies ? comment.replies.length : 0), 0);
};
