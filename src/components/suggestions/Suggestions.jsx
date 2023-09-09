import Toolbar from "../toolBar/ToolBar";
import SuggestionCard from "../suggestions/SuggestionCard";
import data from "../../assets/data/data.json";
import { ReactComponent as Empty } from "../../assets/icons/iconEmpty.svg";
import BasicButton from "../buttons/BasicButton";
import styles from "./suggestions.module.css";

export default function Suggestions() {
  const reqs = data.productRequests;
  // const reqs = [];

  return (
    <section className={styles.suggestions}>
      <Toolbar />
      {reqs.length > 0 && (
        <ul className={styles.suggestionsList}>
          {reqs.map((req) => (
            <li key={req.id}>
              <SuggestionCard sugTitle={req.title} sugDescription={req.description} sugCategory={req.category} sugVotes={req.upvotes} sugComments={req.comments ? req.comments.length : 0} />
            </li>
          ))}
        </ul>
      )}
      {reqs.length === 0 && (
        <section className={styles.emptySection}>
          <Empty />
          <h2>There is no feedback yet.</h2>
          <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
          <BasicButton type={"button1"}>+ Add Feedback</BasicButton>
        </section>
      )}
    </section>
  );
}
