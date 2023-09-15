import Dropdown from "../dropdown/Dropdown";
import styles from "./toolbar.module.css";
import { ReactComponent as Bulb } from "../../assets/icons/iconBulb.svg";
import FeedbackModal from "../feedbackModal/FeedbackModal";

/**
 * Renders a toolbar component.
 *
 * @return {ReactElement} The rendered toolbar.
 */
export default function Toolbar() {
  return (
    <menu className={styles.toolbar}>
      <div className={styles.headerContainer}>
        <Bulb />
        <h2 className={styles.toolbarTitle}>6 Suggestions</h2>
      </div>
      <Dropdown />

      <FeedbackModal buttonType={"button1"} style={{ marginLeft: "auto", justifySelf: "end" }}>
        + Add Feedback
      </FeedbackModal>
    </menu>
  );
}
