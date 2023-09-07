import { Link } from "react-router-dom";
import styles from "./roadmapPreview.module.css";

export default function RoadmapPreview() {
  return (
    <section className={styles.roadmapPreview}>
      <table>
        <thead>
          <tr>
            <th>Roadmap</th>
            <th>
              <Link to="/roadmap">View</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className={styles.coralSpan}></span>Planned
            </td>
            <td>2</td>
          </tr>
          <tr>
            <td>
              <span className={styles.purpleSpan}></span>In-Progress
            </td>
            <td>3</td>
          </tr>
          <tr>
            <td>
              <span className={styles.blueSpan}></span>Live
            </td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
