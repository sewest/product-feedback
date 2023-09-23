import { ReactComponent as CommentIcon } from "../../../assets/icons/iconComments.svg";
import useWindowWidth from "../../../hooks/useWindowWidth";
import BaseCard from "../baseCard/BaseCard";
import UpvoteButton from "../../buttons/upvoteButton/UpvoteButton";
import Chip from "../../chip/Chip";
import Title from "../../title/Title";
import Text from "../../text/Text";
import styles from "./roadmapCard.module.css";

export default function RoadmapList({ data }) {
  const { category, title, description, upvotes, comments, status } = data;
  const windowWidth = useWindowWidth();

  const capitalizedStatus = capitalizeStatus(status);
  return (
    <BaseCard classes={`${styles[status]} ${styles.roadmapCard}`}>
      <div className={styles.statusContainer}>
        <div className={styles.statusDot}></div> {capitalizedStatus}
      </div>
      <div className={styles.roadmapText}>
        <Title order={4} size={windowWidth < 1300 ? "sm" : "lg"} color="dark">
          {title}
        </Title>
        <Text size={windowWidth < 1300 ? "sm" : "lg"}>{description}</Text>
        <Chip>{category}</Chip>
      </div>

      <div className={styles.roadmapButtons}>
        <UpvoteButton count={upvotes} />
        <div className={styles.commentCountContainer}>
          <CommentIcon /> {comments ? comments.length : 0}
        </div>
      </div>
    </BaseCard>
  );
}

function capitalizeStatus(status) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
}
