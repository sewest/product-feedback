import { useState } from "react";
import { useAppState, useAppDispatch } from "../../../context/AppContext";
import useCapitalizeFirstLetter from "../../../hooks/useCapitalizeFirstLetter";
import BaseCard from "../baseCard/BaseCard";
import Chip from "../../chip/Chip";
import styles from "./tagCloud.module.css";

export default function TagCloud({ setIsOpen }) {
  const { state } = useAppState();
  const dispatch = useAppDispatch();
  const [active, setActive] = useState("All");
  const capitalizeFirstLetter = useCapitalizeFirstLetter();

  //We only want to show each category once
  const uniqueCategories = new Set();

  const handleClick = (e) => {
    dispatch({ type: "SET_CATEGORY", payload: e.target.innerText });
    setActive(e.target.innerText);
    setIsOpen(false);
  };

  return (
    <BaseCard classes={styles.tagCloud}>
      {/* These chips should display regardless of the other categories in the JSON data */}
      <Chip isActive={active === "All" ? true : false} key="All" onClick={(e) => handleClick(e)}>
        All
      </Chip>
      <Chip isActive={active === "UI" ? true : false} key="UI" onClick={(e) => handleClick(e)}>
        UI
      </Chip>
      <Chip isActive={active === "UX" ? true : false} key="UX" onClick={(e) => handleClick(e)}>
        UX
      </Chip>

      {/* Generate the chip categores from the JSON data  */}
      {state.productRequests.map((item) => {
        if (!uniqueCategories.has(item.category)) {
          uniqueCategories.add(item.category);
          return (
            <Chip isActive={active === capitalizeFirstLetter(item.category) ? true : false} key={item.id} onClick={(e) => handleClick(e)}>
              {capitalizeFirstLetter(item.category)}
            </Chip>
          );
        }
        return null;
      })}
    </BaseCard>
  );
}
