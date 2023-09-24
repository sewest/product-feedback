import { Link } from "react-router-dom";
import { useAppState } from "../../../context/AppContext";
import BaseCard from "../baseCard/BaseCard";
import Title from "../../title/Title";
import styles from "./roadmapPreview.module.css";

// Generate the roadmap preview card that is part of the appheader
export default function RoadmapPreview({ setIsOpen }) {
  const { getDataByStatus } = useAppState();

  return (
    <BaseCard classes={styles.roadmapPreview}>
      <table>
        <thead>
          <tr>
            <th>
              <Title order={2} size="lg" color="dark">
                Roadmap
              </Title>
            </th>
            <th>
              <Link to="/roadmap" onClick={() => setIsOpen(false)}>
                View
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className={styles.coralSpan}></span>Planned
            </td>
            <td>{getDataByStatus("planned").length}</td>
          </tr>
          <tr>
            <td>
              <span className={styles.purpleSpan}></span>In-Progress
            </td>
            <td>{getDataByStatus("in-progress").length}</td>
          </tr>
          <tr>
            <td>
              <span className={styles.blueSpan}></span>Live
            </td>
            <td>{getDataByStatus("live").length}</td>
          </tr>
        </tbody>
      </table>
    </BaseCard>
  );
}
