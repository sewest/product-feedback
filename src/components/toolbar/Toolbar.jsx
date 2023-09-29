import { useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../context/AppContext";
import { ReactComponent as Bulb } from "../../assets/icons/iconBulb.svg";
import { ReactComponent as Chevron } from "../../assets/icons/iconArrowLeft.svg";
import FeedbackModal from "../feedbackModal/FeedbackModal";
import IconButton from "../buttons/iconButton/IconButton";
import Title from "../title/Title";
import Dropdown from "../dropdown/Dropdown";
import styles from "./toolbar.module.css";

export default function Toolbar() {
  // Get the count of suggestions from the app state
  const { getSuggestionCount } = useAppState();
  const navigate = useNavigate();
  const count = getSuggestionCount();

  // Get the current path from the location
  const path = useLocation().pathname;

  const handleClick = () => {
    navigate(-1);
  };

  return (
    // Render a menu element with different styles based on the current path
    <menu className={`${path === "/" ? styles.mainToolbar : styles.roadmapToolbar}`}>
      {/* Render a container div for the header */}
      <div className={`${path !== "/" ? styles.hidden : ""} ${styles.headerContainer}`}>
        {/* Render the Bulb icon */}
        <Bulb />
        {/* Render the title with the count of suggestions */}
        <Title order={2} size="lg" color="light">
          {count} Suggestions
        </Title>
      </div>
      {/* Render a container div for the roadmap header */}
      <div className={`${path !== "/roadmap" ? styles.hidden : ""} ${styles.roadmapHeader}`}>
        {/* Render an IconButton with the Chevron icon, linking to the homepage */}
        <IconButton icon={<Chevron />} onClick={handleClick} isLink classes={styles.backButton}>
          Go Back
        </IconButton>
        {/* Render the title "Roadmap" */}
        <Title order={2} size="lg" color="light">
          Roadmap
        </Title>
      </div>
      {/* Render the Dropdown component with different styles based on the current path */}
      <Dropdown classes={path === "/roadmap" ? styles.hidden : ""} />
      {/* Render the FeedbackModal component with a buttonType prop and inline styles */}
      <FeedbackModal buttonType={"button1"} style={{ marginLeft: "auto", justifySelf: "end" }}>
        + Add Feedback
      </FeedbackModal>
    </menu>
  );
}
