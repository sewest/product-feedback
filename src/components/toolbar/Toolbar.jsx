import { useLocation } from "react-router-dom";
import { useAppState } from "../../context/AppContext";
import { ReactComponent as Bulb } from "../../assets/icons/iconBulb.svg";
import { ReactComponent as Chevron } from "../../assets/icons/iconArrowLeft.svg";
import FeedbackModal from "../feedbackModal/FeedbackModal";
import IconButton from "../buttons/iconButton/IconButton";
import Title from "../title/Title";
import Dropdown from "../dropdown/Dropdown";
import styles from "./toolbar.module.css";

/**
 * Renders a toolbar component.
 *
 * @return {ReactElement} The rendered toolbar.
 */
export default function Toolbar() {
  const { getSuggestionCount } = useAppState();
  const count = getSuggestionCount();
  const path = useLocation().pathname;

  return (
    <menu className={`${path === "/" ? styles.mainToolbar : styles.roadmapToolbar}`}>
      <div className={`${path !== "/" ? styles.hidden : ""} ${styles.headerContainer}`}>
        <Bulb />
        <Title order={2} size="lg" color="light">
          {count} Suggestions
        </Title>
      </div>
      <div className={`${path !== "/roadmap" ? styles.hidden : ""} ${styles.roadmapHeader}`}>
        <IconButton icon={<Chevron />} to={"/"} isLink classes={styles.backButton}>
          Go Back
        </IconButton>
        <Title order={2} size="lg" color="light">
          Roadmap
        </Title>
      </div>
      <Dropdown classes={path === "/roadmap" ? styles.hidden : ""} />
      <FeedbackModal buttonType={"button1"} style={{ marginLeft: "auto", justifySelf: "end" }}>
        + Add Feedback
      </FeedbackModal>
    </menu>
  );
}
