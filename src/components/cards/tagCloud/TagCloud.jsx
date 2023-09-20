import data from "../../../assets/data/data.json";
import BaseCard from "../baseCard/BaseCard";
import Chip from "../../chip/Chip";
import styles from "./tagCloud.module.css";

/**
 * Renders a box with a list of category tags.
 *
 * @return {JSX.Element} The rendered tag cloud component.
 */
export default function TagCloud({ setIsOpen }) {
  //We only want to show each category once
  const uniqueCategories = new Set();

  return (
    <BaseCard classes={styles.tagCloud}>
      {/* These chips should display regardless of the other categories in the JSON data */}
      <Chip key="All" onClick={() => setIsOpen(false)}>
        All
      </Chip>
      <Chip key="UI" onClick={() => setIsOpen(false)}>
        UI
      </Chip>
      <Chip key="UX" onClick={() => setIsOpen(false)}>
        UX
      </Chip>

      {/* Generate the chip categores from the JSON data  */}
      {data.productRequests.map((item) => {
        if (!uniqueCategories.has(item.category)) {
          uniqueCategories.add(item.category);
          return (
            <Chip key={item.id} onClick={() => setIsOpen(false)}>
              {/* Capitalize the first letter  */}
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </Chip>
          );
        }
        return null;
      })}
    </BaseCard>
  );
}
