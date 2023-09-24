import { useState } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";
import BasicButton from "../../buttons/basicButton/BasicButton";
import Title from "../../title/Title";
import Text from "../../text/Text";
import styles from "./addComment.module.css";

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

const handleChange = (e, setCharacters, setValue) => {
  setCharacters(e.target.value.length);
  setValue(e.target.value);
};

const handleSubmit = (e) => {
  e.preventDefault();
  alert("Adding comment");
};
