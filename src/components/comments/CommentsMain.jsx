import CommentCard from "./commentCard/CommentCard";
import SuggestionCard from "../suggestions/SuggestionCard";
import AddComment from "./addComment/AddComment";
import IconButton from "../buttons/iconButton/IconButton";
import Title from "../title/Title";
import { ReactComponent as Chevron } from "../../assets/icons/iconArrowLeft.svg";
import FeedbackModal from "../feedbackModal/FeedbackModal";
import styles from "./commentsMain.module.css";

/**
 * Renders the main comments section of the page.
 *
 * @param {Object} data - The data object containing the request and comments.
 * @param {Object} data.req - The request object.
 * @param {string} data.req.title - The title of the request.
 * @param {string} data.req.description - The description of the request.
 * @param {string} data.req.category - The category of the request.
 * @param {number} data.req.upvotes - The number of upvotes on the request.
 * @param {Array} data.comments - The array of comments.
 * @return {JSX.Element} - The JSX element representing the main comments section.
 */
export default function CommentsMain({ data }) {
  const { req, comments } = data;

  return (
    <div className={styles.commentsMainContainer}>
      <section className={styles.commentsHeader}>
        <div className={styles.topButtons}>
          <IconButton icon={<Chevron />} to={"/"} isLink>
            Go Back
          </IconButton>
          <FeedbackModal buttonType={"button2"} data={req}>
            Edit Feedback
          </FeedbackModal>
        </div>
        <SuggestionCard
          sugTitle={req.title}
          sugDescription={req.description}
          sugCategory={req.category}
          sugVotes={req.upvotes}
          sugComments={req.comments ? req.comments.length : 0}
          sugReplies={req.comments && getTotalRepliesCount(req.comments)}
          sugId={req.id}
        />
      </section>

      <section className={styles.commentsSection}>
        <Title order={2} size="lg" color="dark">
          {getCommentLength(comments)}
        </Title>
        <ul>
          {comments &&
            comments.length > 0 &&
            comments.map((comment, index, array) => (
              <div key={`fragment-${comment.id}`}>
                <li key={`comment-${comment.id}`}>
                  <CommentCard comment={comment.content} imageSrc={comment.user.image} alt={`A small image of ${comment.user.name}`} username={comment.user.name} handle={comment.user.username} />
                  {index < array.length - 1 && <hr className={styles.horizontalRule} />}
                </li>
                <ul>
                  {comment.replies &&
                    comment.replies.length > 0 &&
                    comment.replies.map((reply) => (
                      <li key={`reply-${reply.id}`}>
                        <div className={styles.replyContainer}>
                          <div className={styles.verticalRule}></div>
                          <CommentCard comment={reply.content} imageSrc={reply.user.image} alt={`A small image of ${reply.user.name}`} username={reply.user.name} handle={reply.user.username} classes={styles.replyCard} replyingTo={reply.replyingTo} />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </ul>
      </section>
      <section className={styles.addCommentSection}>
        <AddComment />
      </section>
    </div>
  );
}

/**
 * Calculates the total number of replies in the given array of comments.
 *
 * @param {Array} comments - An array of comments.
 * @return {Number} The total number of replies.
 */
const getTotalRepliesCount = (comments) => {
  return comments.reduce((count, comment) => count + (comment.replies ? comment.replies.length : 0), 0);
};

/**
 * Calculates the length of comments and replies in a given array of comments.
 *
 * @param {Array} comments - The array of comments to calculate the length of.
 * @return {string} - The length of comments in the format "{total} Comments".
 */
const getCommentLength = (comments) => {
  const total = comments.length + getTotalRepliesCount(comments) || 0;

  if (total === 0) {
    return "0 Comments";
  } else if (total === 1) {
    return "1 Comment";
  } else {
    return `${total} Comments`;
  }
};
