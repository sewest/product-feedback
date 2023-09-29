import { useNavigate } from "react-router-dom";
import { useAppState } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import CommentCard from "../cards/commentCard/CommentCard";
import SuggestionCard from "../cards/suggestionsCard/SuggestionCard";
import AddComment from "./addComment/AddComment";
import IconButton from "../buttons/iconButton/IconButton";
import Title from "../title/Title";
import { ReactComponent as Chevron } from "../../assets/icons/iconArrowLeft.svg";
import FeedbackModal from "../feedbackModal/FeedbackModal";
import styles from "./commentsMain.module.css";

// Exporting the main component
export default function CommentsMain() {
  // Getting the feedbackId from the URL parameters
  const { feedbackId } = useParams();

  // Accessing the getAppState function from the AppContext
  const { getRequestById } = useAppState();

  const navigate = useNavigate();

  // Fetching the request data based on the feedbackId
  const req = getRequestById(+feedbackId);

  // Getting the comments array from the request data, or an empty array if it doesn't exist
  const comments = req.comments || [];

  const handleClick = () => {
    navigate(-1);
  };
  // Rendering the main component
  return (
    <div className={styles.commentsMainContainer}>
      <section className={styles.commentsHeader}>
        <div className={styles.topButtons}>
          {/* Render a button with an icon that navigates back to the home page */}
          <IconButton icon={<Chevron />} onClick={handleClick} isLink>
            Go Back
          </IconButton>
          {/* Render a feedback modal for editing the feedback */}
          <FeedbackModal buttonType={"button2"} data={req}>
            Edit Feedback
          </FeedbackModal>
        </div>
        {/* Render a suggestion card with the details of the feedback */}
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
        {/* Render the title with the total number of comments */}
        <Title order={2} size="lg" color="dark">
          {getCommentLength(comments)}
        </Title>
        <ul>
          {/* Iterate over the comments array and render each comment */}
          {comments &&
            comments.length > 0 &&
            comments.map((comment, index, array) => (
              <div key={`fragment-${comment.id}`}>
                <li key={`comment-${comment.id}`}>
                  {/* Render the comment card with the details of the comment */}
                  <CommentCard comment={comment.content} imageSrc={comment.user.image} alt={`A small image of ${comment.user.name}`} username={comment.user.name} handle={comment.user.username} />
                  {/* Render a horizontal line if the comment is not the last one */}
                  {index < array.length - 1 && <hr className={styles.horizontalRule} />}
                </li>
                <ul>
                  {/* Iterate over the replies array of each comment and render each reply */}
                  {comment.replies &&
                    comment.replies.length > 0 &&
                    comment.replies.map((reply) => (
                      <li key={`reply-${reply.id}`}>
                        <div className={styles.replyContainer}>
                          <div className={styles.verticalRule}></div>
                          {/* Render the reply card with the details of the reply */}
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
        {/* Render the component for adding a new comment */}
        <AddComment />
      </section>
    </div>
  );
}

// Function to calculate the total number of replies for all comments
const getTotalRepliesCount = (comments) => {
  return comments.reduce((count, comment) => count + (comment.replies ? comment.replies.length : 0), 0);
};

// Function to determine the length of the comments array
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
