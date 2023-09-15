import { useEffect, useState, useRef } from "react";
import { ReactComponent as Chevron } from "../../assets/icons/iconArrowLeft.svg";
import { ReactComponent as FeedbackPlus } from "../../assets/icons/iconFeedbackCircle.svg";
import { ReactComponent as EditFeedback } from "../../assets/icons/iconEditFeedback.svg";
import BasicButton from "../buttons/basicButton/BasicButton";
import IconButton from "../buttons/iconButton/IconButton";
import styles from "./feedbackModal.module.css";

export default function FeedbackModal({ style, children, buttonType, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [feedbackDetail, setFeedbackDetail] = useState("");
  const modalRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    bodyRef.current = document.getElementsByTagName("body")[0];
    if (data) {
      setFeedbackTitle(data.title);
      setFeedbackCategory(data.category);
      setFeedbackDetail(data.description);
    }
  }, [data]);

  const handleModal = () => {
    const modal = modalRef.current;
    const body = bodyRef.current;

    if (!isModalOpen) {
      setIsModalOpen(true);
      modal.showModal();
      body.style.overflow = "hidden";
    } else {
      setIsModalOpen(false);
      modal.close();
      body.style.overflow = "auto";
    }
  };

  const handleTitleChange = (e) => {
    setFeedbackTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setFeedbackCategory(e.target.value);
  };

  const handleDetailChange = (e) => {
    setFeedbackDetail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      {/* Feedback modal */}
      <dialog className={styles.feedbackModal} ref={modalRef}>
        <div className={styles.feedbackContainer}>
          <IconButton icon={<Chevron />} onClick={handleModal}>
            Go Back
          </IconButton>
          <form onSubmit={handleSubmit}>
            {data ? <EditFeedback className={styles.feedbackIcon} /> : <FeedbackPlus className={styles.feedbackIcon} />}
            <h2>{data ? `Editing '${data.title}'` : "Create New Feedback"}</h2>
            <label htmlFor="feedbackTitle">
              Feedback Title
              <p>Add a short, descriptive headline</p>
              <input type="text" id="feedbackTitle" className={styles.titleInput} required value={feedbackTitle} onChange={handleTitleChange} />
            </label>
            <label htmlFor="feedbackCategory">
              Category
              <p>Choose a category htmlFor your feedback</p>
              <select id="feedbackCategory" name="feedbackCategory" required className={styles.category} value={feedbackCategory} onChange={handleCategoryChange}>
                <option>Bug</option>
                <option>Feature</option>
              </select>
            </label>
            <label htmlFor="feedbackDetail">
              Feedback Detail
              <p>Include any specific comments on what should be improved, added, etc.</p>
              <textarea id="feedbackDetail" name="feedbackDetail" className={styles.feedbackDetailText} required value={feedbackDetail} onChange={handleDetailChange}></textarea>
            </label>
            <div className={styles.buttonContainer}>
              <BasicButton buttonType="button1" type="submit">
                {data ? "Save Changes" : "Add Feedback"}
              </BasicButton>
              <BasicButton buttonType="button3" onClick={handleModal}>
                Cancel
              </BasicButton>
              <BasicButton buttonType="button4" style={{ marginRight: "auto" }}>
                Delete
              </BasicButton>
            </div>
          </form>
        </div>
      </dialog>

      {/* Button to open modal */}
      <BasicButton style={style} buttonType={buttonType} onClick={handleModal}>
        {children}
      </BasicButton>
    </>
  );
}
