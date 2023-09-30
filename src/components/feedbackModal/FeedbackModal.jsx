import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../context/AppContext";
import { ReactComponent as Chevron } from "../../assets/icons/iconArrowLeft.svg";
import { ReactComponent as FeedbackPlus } from "../../assets/icons/iconFeedbackCircle.svg";
import { ReactComponent as EditFeedback } from "../../assets/icons/iconEditFeedback.svg";
import useWindowWidth from "../../hooks/useWindowWidth";
import BasicButton from "../buttons/basicButton/BasicButton";
import IconButton from "../buttons/iconButton/IconButton";
import Dropdown from "../dropdown/Dropdown";
import Title from "../title/Title";
import Text from "../text/Text";
import styles from "./feedbackModal.module.css";

// This component represents a feedback modal
export default function FeedbackModal({ children, buttonType, data, classes }) {
  const [value, setValue] = useState("Feature");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [feedbackDetail, setFeedbackDetail] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const windowWidth = useWindowWidth();
  const modalRef = useRef(null);
  const bodyRef = useRef(null);

  // Effect hook to update state variables when 'data' changes
  useEffect(() => {
    // Get references to the modal and body elements
    bodyRef.current = document.getElementsByTagName("body")[0];

    // Set the state variables based on the 'data' prop
    if (data) {
      setFeedbackTitle(data.title);
      setFeedbackCategory(data.category);
      setFeedbackDetail(data.description);
    }
  }, [data]);

  // Function to handle opening and closing the modal
  const handleModal = (e) => {
    e.preventDefault();
    const modal = modalRef.current;
    const body = bodyRef.current;

    // Toggle the 'isModalOpen' state variable
    setIsModalOpen(!isModalOpen);

    // Open or close the modal based on the 'isModalOpen' state variable
    if (!isModalOpen) {
      modal.showModal();
      body.style.overflow = "hidden";
    } else {
      modal.close();
      body.style.overflow = "auto";
    }
  };

  // Function to handle input change events
  const handleInputChange = (e) => {
    // Update the corresponding state variable based on the input's ID
    switch (e.target.id) {
      case "feedbackTitle":
        setFeedbackTitle(e.target.value);
        break;
      case "feedbackCategory":
        setFeedbackCategory(e.target.value);
        break;
      case "feedbackDetail":
        setFeedbackDetail(e.target.value);
        break;
      default:
        break;
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new feedback object
    const content = {
      title: feedbackTitle,
      category: value.toLowerCase(),
      upvotes: 0,
      status: "suggestion",
      description: feedbackDetail,
    };

    if (!data) {
      dispatch({
        type: "ADD_FEEDBACK",
        payload: content,
      });
      navigate(-1);
      handleModal(e);
      return;
    }

    dispatch({
      type: "EDIT_FEEDBACK",
      payload: {
        id: data.id,
        content,
      },
    });
    navigate(-1);
    handleModal(e);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch({
      type: "DELETE_FEEDBACK",
      payload: data.id,
    });
    navigate(-1);
    handleModal(e);
  };

  // JSX markup for the feedback modal
  return (
    <>
      <dialog className={styles.feedbackModal} ref={modalRef}>
        <div className={styles.feedbackContainer}>
          <IconButton icon={<Chevron />} onClick={handleModal}>
            Go Back
          </IconButton>
          <form onSubmit={handleSubmit}>
            {/* Conditionally render the appropriate feedback icon */}
            {data ? <EditFeedback className={styles.feedbackIcon} /> : <FeedbackPlus className={styles.feedbackIcon} />}
            <Title order={2} size={windowWidth < 768 ? "lg" : "xxl"} color="dark">
              {/* Conditionally render the title based on the presence of 'data' */}
              {data ? `Editing '${data.title}'` : "Create New Feedback"}
            </Title>
            <label htmlFor="feedbackTitle">
              Feedback Title
              <Text size={windowWidth < 768 ? "sm" : "md"}>Add a short, descriptive headline</Text>
              {/* Input field for the feedback title */}
              <input type="text" id="feedbackTitle" className={styles.titleInput} value={feedbackTitle} onChange={handleInputChange} />
            </label>
            <label htmlFor="feedbackCategory">
              Category
              <Text size={windowWidth < 768 ? "sm" : "md"}>Choose a category for your feedback</Text>
              {/* Select field for the feedback category */}
              <Dropdown data={dropDownData} classes={styles.category} type={"modalCategory"} value={value} setValue={setValue} />
            </label>
            <label htmlFor="feedbackDetail">
              Feedback Detail
              <Text size={windowWidth < 768 ? "sm" : "md"}>Include any specific comments on what should be improved, added, etc.</Text>
              {/* Textarea field for the feedback detail */}
              <textarea id="feedbackDetail" name="feedbackDetail" className={styles.feedbackDetailText} value={feedbackDetail} onChange={handleInputChange}></textarea>
            </label>
            <div className={styles.buttonContainer}>
              {/* Button to submit the form */}
              <BasicButton buttonType="button1" type="submit">
                {/* Conditionally render the button label based on the presence of 'data' */}
                {data ? "Save Changes" : "Add Feedback"}
              </BasicButton>
              {/* Button to cancel the modal */}
              <BasicButton buttonType="button3" onClick={handleModal}>
                Cancel
              </BasicButton>
              {/* Button to delete the feedback */}
              {data && (
                <BasicButton buttonType="button4" classes={styles.deleteButton} onClick={handleDelete}>
                  Delete
                </BasicButton>
              )}
            </div>
          </form>
        </div>
      </dialog>

      {/* Button to open the modal */}
      <BasicButton buttonType={buttonType} onClick={handleModal} classes={classes}>
        {children}
      </BasicButton>
    </>
  );
}

const dropDownData = {
  label: null,
  selected: "feature",
  items: [
    {
      id: "feature",
      text: "Feature",
      name: "category",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "ui",
      text: "UI",
      name: "category",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "ux",
      text: "UX",
      name: "category",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "enhancement",
      text: "Enhancement",
      name: "category",
      leftIcon: null,
      rightIcon: null,
    },
    {
      id: "bug",
      text: "Bug",
      name: "category",
      leftIcon: null,
      rightIcon: null,
    },
  ],
};
