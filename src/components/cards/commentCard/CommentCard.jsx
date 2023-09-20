import { useState } from "react";
import BaseCard from "../baseCard/BaseCard";
import BasicButton from "../../buttons/basicButton/BasicButton";
import Title from "../../title/Title";
import Text from "../../text/Text";
import useWindowWidth from "../../../hooks/useWindowWidth";
import styles from "./commentCard.module.css";

/**
 * Renders a comment card component.
 *
 * @param {object} props - The props object containing the following properties:
 *   - imageSrc: The source URL of the image.
 *   - alt: The alternate text for the image.
 *   - username: The username of the commenter.
 *   - handle: The handle of the commenter.
 *   - comment: The comment text.
 *   - classes: Additional CSS classes.
 *   - replyingTo: The username of the user being replied to, if this is a reply.
 * @return {JSX.Element} The rendered comment card component.
 */
export default function CommentCard({ imageSrc, alt, username, handle, comment, classes, replyingTo }) {
  const [value, setValue] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const windowWidth = useWindowWidth();

  return (
    <BaseCard classes={`${styles.commentCard} ${classes}`}>
      <div className={styles.commentContainer}>
        <div className={styles.commentHeader}>
          <img src={getImgSrc(imageSrc)} alt={alt} />
          <div className={styles.commentText}>
            <Title order={3} color="dark" size={windowWidth < 768 ? "sm" : "md"}>
              {username}
            </Title>
            <Text size="sm" classes={styles.handle}>
              @{handle}
            </Text>
          </div>
        </div>

        <BasicButton classes={styles.innerButton} buttonType={"textButton"} onClick={() => handleReply(setValue, setIsHidden, isHidden)}>
          {isHidden ? "Reply" : "Cancel"}
        </BasicButton>
      </div>
      <Text size={windowWidth < 768 ? "sm" : "md"} classes={`${replyingTo && styles.replyText} ${styles.comment}`}>
        <span className={`${replyingTo || styles.hidden} ${styles.replyingTo}`}>@{replyingTo}</span> {comment}
      </Text>
      <form className={`${styles.reply} ${isHidden && styles.hidden}`} onSubmit={(e) => handleSubmit(e, value)}>
        <textarea id="comment" name="comment" maxLength={250} value={value} onChange={(e) => handleChange(e, setValue)} placeholder="Type your comment here"></textarea>
        <BasicButton classes={styles.outerButton} buttonType={"button1"}>
          Post Reply
        </BasicButton>
      </form>
    </BaseCard>
  );
}

/**
 * Handles the change event for an input element.
 *
 * @param {Event} e - The change event object.
 * @param {Function} setValue - The function to set the value.
 */
const handleChange = (e, setValue) => {
  setValue(e.target.value);
};

/**
 * Handles the form submission event.
 *
 * @param {Event} e - The form submission event.
 * @param {string} value - The value to be logged.
 */
const handleSubmit = (e, value) => {
  e.preventDefault();
  console.log(value);
};

/**
 * Handles the reply by setting the value and toggling the hidden state.
 *
 * @param {function} setValue - The function to set the value.
 * @param {function} setIsHidden - The function to toggle the hidden state.
 * @param {boolean} isHidden - The current hidden state.
 */
const handleReply = (setValue, setIsHidden, isHidden) => {
  if (!isHidden) {
    setValue("");
  }
  setIsHidden(!isHidden);
};

const getImgSrc = (name) => {
  const path = new URL(`../../../assets/images/user-images/${name}`, import.meta.url).href;
  return path;
};
