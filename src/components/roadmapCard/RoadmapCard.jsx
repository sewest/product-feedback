import Chip from "../chip/Chip";
import UpvoteButton from "../buttons/upvoteButton/UpvoteButton";
import { ReactComponent as CommentIcon } from "../../assets/icons/iconComments.svg";
import styles from "./roadmapCard.module.css";

export default function RoadmapList({ data }) {
  const { category, title, description, upvotes, comments, status } = data;

  const capitalizedStatus = capitalizeStatus(status);
  console.log(status);
  return (
    <article className={`${styles[status]} ${styles.roadmapCard}`}>
      <div className={styles.statusContainer}>
        <div className={styles.statusDot}></div> {capitalizedStatus}
      </div>
      <div className={styles.roadmapText}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Chip>{category}</Chip>
      </div>

      <div className={styles.roadmapButtons}>
        <UpvoteButton count={upvotes} />
        <div className={styles.commentCountContainer}>
          <CommentIcon /> {comments ? comments.length : 0}
        </div>
      </div>
    </article>
  );
}

function capitalizeStatus(status) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
}
