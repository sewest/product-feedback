import data from "../../../assets/data/data.json";
import Chip from "../../chip/Chip";
import styles from "./tagCloud.module.css";

/**
 * Renders a box with a list of category tags.
 *
 * @return {JSX.Element} The rendered tag cloud component.
 */
export default function TagCloud() {
  const uniqueCategories = new Set();

  return (
    <div className={styles.tagCloud}>
      <Chip key="All">All</Chip>
      <Chip key="UI">UI</Chip>
      <Chip key="UX">UX</Chip>
      {data.productRequests.map((item) => {
        if (!uniqueCategories.has(item.category)) {
          uniqueCategories.add(item.category);
          return <Chip key={item.id}>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</Chip>;
        }
        return null;
      })}
    </div>
  );
}
