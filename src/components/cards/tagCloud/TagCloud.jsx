import { useAppState } from "../../../context/AppContext";
import useCapitalizeFirstLetter from "../../../hooks/useCapitalizeFirstLetter";
import BaseCard from "../baseCard/BaseCard";
import Chip from "../../chip/Chip";
import styles from "./tagCloud.module.css";

export default function TagCloud({ setIsOpen }) {
  const { state } = useAppState();
  const capitalizeFirstLetter = useCapitalizeFirstLetter();

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
      {state.productRequests.map((item) => {
        if (!uniqueCategories.has(item.category)) {
          uniqueCategories.add(item.category);
          return (
            <Chip key={item.id} onClick={() => setIsOpen(false)}>
              {capitalizeFirstLetter(item.category)}
            </Chip>
          );
        }
        return null;
      })}
    </BaseCard>
  );
}
