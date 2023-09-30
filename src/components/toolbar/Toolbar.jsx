import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppState, useAppDispatch } from "../../context/AppContext";
import { ReactComponent as Bulb } from "../../assets/icons/iconBulb.svg";
import { ReactComponent as Chevron } from "../../assets/icons/iconArrowLeft.svg";
import FeedbackModal from "../feedbackModal/FeedbackModal";
import IconButton from "../buttons/iconButton/IconButton";
import Title from "../title/Title";
import Dropdown from "../dropdown/Dropdown";
import styles from "./toolbar.module.css";

export default function Toolbar() {
  const { label, selected, items } = dropDownData;
  const startingIndex = 0;
  const [value, setValue] = useState("Most Upvotes");
  const { getSuggestionCount } = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const count = getSuggestionCount();

  // Get the current path from the location
  const path = useLocation().pathname;

  const handleClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch({
      type: "SET_SORT_ORDER",
      payload: value,
    });
  }, [value]);

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
      <Dropdown classes={path === "/roadmap" ? styles.hidden : ""} data={dropDownData} type={"sortBy"} value={value} setValue={setValue} />
      {/* Render the FeedbackModal component with a buttonType prop and inline styles */}
      <FeedbackModal buttonType={"button1"} classes={styles.modalButton}>
        + Add Feedback
      </FeedbackModal>
    </menu>
  );
}

const dropDownData = {
  label: "Sort by : ",
  selected: "mostUpvotes",
  items: [
    {
      id: "mostUpvotes",
      text: "Most Upvotes",
      name: "suggestionFilter",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "leastUpvotes",
      text: "Least Upvotes",
      name: "suggestionFilter",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "mostComments",
      text: "Most Comments",
      name: "suggestionFilter",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "leastComments",
      text: "Least Comments",
      name: "suggestionFilter",
      leftIcon: null,
      rightIcon: null,
    },
  ],
};
