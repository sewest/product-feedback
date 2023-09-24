// Importing the necessary dependencies from React and other components
import { useState } from "react";
import BaseCard from "../baseCard/BaseCard";
import BasicButton from "../../buttons/basicButton/BasicButton";
import Title from "../../title/Title";
import Text from "../../text/Text";
import useWindowWidth from "../../../hooks/useWindowWidth";
import styles from "./commentCard.module.css";

// Defining a functional component called CommentCard with props: imageSrc, alt, username, handle, comment, classes, and replyingTo
export default function CommentCard({ imageSrc, alt, username, handle, comment, classes, replyingTo }) {
  // Setting up state variables using useState hook
  const [value, setValue] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  // Custom hook to get the window width
  const windowWidth = useWindowWidth();

  // Event handler for input change
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };

  // Event handler for reply button click
  const handleReply = () => {
    if (!isHidden) {
      setValue("");
    }
    setIsHidden(!isHidden);
  };

  // Function to get the image source
  const getImgSrc = (name) => {
    const path = new URL(`../../../assets/images/user-images/${name}`, import.meta.url).href;
    return path;
  };

  // Rendering the CommentCard component
  return (
    <BaseCard classes={`${styles.commentCard} ${classes}`}>
      <div className={styles.commentContainer}>
        <div className={styles.commentHeader}>
          {/* Rendering the user image */}
          <img src={getImgSrc(imageSrc)} alt={alt} />
          <div className={styles.commentText}>
            <Title order={3} color="dark" size={windowWidth < 768 ? "sm" : "md"}>
              {/* Rendering the username */}
              {username}
            </Title>
            <Text size="sm" classes={styles.handle}>
              {/* Rendering the user handle */}@{handle}
            </Text>
          </div>
        </div>

        {/* Rendering the reply button */}
        <BasicButton classes={styles.innerButton} buttonType={"textButton"} onClick={handleReply}>
          {/* Showing "Reply" or "Cancel" based on the isHidden state */}
          {isHidden ? "Reply" : "Cancel"}
        </BasicButton>
      </div>

      {/* Rendering the comment text */}
      <Text size={windowWidth < 768 ? "sm" : "md"} classes={`${replyingTo && styles.replyText} ${styles.comment}`}>
        {/* Rendering the replyingTo text (if exists) and the comment */}
        <span className={`${replyingTo || styles.hidden} ${styles.replyingTo}`}>@{replyingTo}</span> {comment}
      </Text>

      {/* Rendering the reply form */}
      <form className={`${styles.reply} ${isHidden && styles.hidden}`} onSubmit={handleSubmit}>
        <textarea id="comment" name="comment" maxLength={250} value={value} onChange={handleChange} placeholder="Type your comment here"></textarea>
        {/* Rendering the "Post Reply" button */}
        <BasicButton classes={styles.outerButton} buttonType={"button1"}>
          Post Reply
        </BasicButton>
      </form>
    </BaseCard>
  );
}
