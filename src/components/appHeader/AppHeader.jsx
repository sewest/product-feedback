import { useState } from "react";
import { useLocation } from "react-router";
import useWindowWidth from "../../hooks/useWindowWidth";
import LogoBox from "../logoBox/LogoBox";
import RoadmapPreview from "../cards/roadmapPreview/RoadmapPreview";
import TagCloud from "../cards/tagCloud/TagCloud";
import styles from "./appHeader.module.css";

// Exporting the component as the default export
export default function AppShell() {
  // Using the useState hook to create a state variable isOpen and its updater function setIsOpen
  const [isOpen, setIsOpen] = useState(false);

  // Using the useLocation hook from the react-router library to get the current location
  const currentPath = useLocation().pathname;

  // Using the useWindowWidth custom hook to get the current window width
  const windowWidth = useWindowWidth();

  // Returning the JSX element representing the header of the app
  return (
    <header className={`${styles.appHeader} ${currentPath !== "/" ? styles.hidden : ""}`}>
      {/* Rendering the LogoBox component and passing the state variables isOpen and setIsOpen as props */}
      <LogoBox isOpen={isOpen} setIsOpen={setIsOpen} />
      {/*  If windowWidth is less than 768 pixels, render them inside a drawer element */}
      {windowWidth < 768 && (
        <div className={`${styles.drawer} ${isOpen && styles.drawerOpen}`}>
          <TagCloud setIsOpen={setIsOpen} />
          <RoadmapPreview setIsOpen={setIsOpen} />
        </div>
      )}
      {/* If windowWidth is greater than or equal to 768 pixels, render them directly */}
      {windowWidth >= 768 && (
        <>
          <TagCloud setIsOpen={setIsOpen} />
          <RoadmapPreview setIsOpen={setIsOpen} />
        </>
      )}
    </header>
  );
}
