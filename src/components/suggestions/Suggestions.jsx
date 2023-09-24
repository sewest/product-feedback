import { useAppState } from "../../context/AppContext";
import Toolbar from "../toolBar/ToolBar";
import SuggestionCard from "../cards/suggestionsCard/SuggestionCard";
import { ReactComponent as Empty } from "../../assets/icons/iconEmpty.svg";
import useWindowWidth from "../../hooks/useWindowWidth";
import BasicButton from "../buttons/basicButton/BasicButton";
import Title from "../title/Title";
import Text from "../text/Text";
import styles from "./suggestions.module.css";

export default function Suggestions() {
  const { getSortedSuggestions } = useAppState();

  const reqs = getSortedSuggestions();
  const windowWidth = useWindowWidth();

  return (
    // If we have suggestions, render a list of them in suggestion cards
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
      {/* If there are no suggestions, render an empty section stating so */}
      {reqs.length === 0 && (
        <section className={styles.emptySection}>
          <Empty />
          <Title order={3} color="dark" size={windowWidth < 768 ? "lg" : "xxl"}>
            There is no feedback yet.
          </Title>
          <Text size={windowWidth < 768 ? "sm" : "lg"}>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</Text>
          <BasicButton buttonType={"button1"}>+ Add Feedback</BasicButton>
        </section>
      )}
    </section>
  );
}

//Need the getter here instead of in context because it's used while we map over the data
const getTotalRepliesCount = (comments) => {
  return comments.reduce((count, comment) => count + (comment.replies ? comment.replies.length : 0), 0);
};
