import Dropdown from "../dropdown/Dropdown";
import styles from "./toolbar.module.css";
import { ReactComponent as Bulb } from "../../assets/icons/iconBulb.svg";
import BasicButton from "../buttons/BasicButton";

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
        <h2>6 Suggestions</h2>
      </div>
      <Dropdown />
      <BasicButton type={"button1"} style={{ marginLeft: "auto" }}>
        + Add Feedback
      </BasicButton>
    </menu>
  );
}
