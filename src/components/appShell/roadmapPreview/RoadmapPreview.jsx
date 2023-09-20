import { Link } from "react-router-dom";
import Title from "../../title/Title";
import styles from "./roadmapPreview.module.css";

/**
 * Renders a preview table with data about the roadmap.
 *
 * @return {JSX.Element} The rendered roadmap preview.
 */
export default function RoadmapPreview() {
  return (
    <section className={styles.roadmapPreview}>
      <table>
        <thead>
          <tr>
            <th>
              <Title order={2} size="lg" color="dark">
                Roadmap
              </Title>
            </th>
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
