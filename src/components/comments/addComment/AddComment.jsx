import { useState } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import BasicButton from "../../buttons/basicButton/BasicButton";
import Title from "../../title/Title";
import Text from "../../text/Text";
import styles from "./addComment.module.css";

/**
 * Renders a form for adding a comment.
 *
 * @return {JSX.Element} The rendered form component.
 */
export default function AddComment() {
  const [characters, setCharacters] = useState(0);
  const [value, setValue] = useState("");
  const windowWidth = useWindowWidth();

  return (
    <form className={styles.addCommentForm} onSubmit={handleSubmit}>
      <Title order={2} size="lg" color="dark">
        Add Comment
      </Title>
      <label htmlFor="comment" hidden>
        Add a comment
      </label>
      <textarea id="comment" name="comment" maxLength={250} value={value} onChange={(e) => handleChange(e, setCharacters, setValue)} placeholder="Type your comment here"></textarea>
      <div>
        <Text size={windowWidth < 768 ? "sm" : "md"}>{250 - characters} Characters left</Text>
        <BasicButton buttonType={"button1"} type="submit" classes={styles.outerButton}>
          Post Comment
        </BasicButton>
      </div>
    </form>
  );
}

/**
 * Updates the character count and value based on the input event.
 *
 * @param {Event} e - The input event.
 * @param {function} setCharacters - The function to update the character count.
 * @param {function} setValue - The function to update the input value.
 */
const handleChange = (e, setCharacters, setValue) => {
  setCharacters(e.target.value.length);
  setValue(e.target.value);
};

/**
 * Handles the form submission event and displays an alert message.
 *
 * @param {Event} e - The form submission event.
 */
const handleSubmit = (e) => {
  e.preventDefault();
  alert("Adding comment");
};
