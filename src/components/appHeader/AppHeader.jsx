import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LogoBox from "./logoBox/LogoBox";
import RoadmapPreview from "../cards/roadmapPreview/RoadmapPreview";
import TagCloud from "../cards/tagCloud/TagCloud";
import styles from "./appHeader.module.css";

/**
 * Renders the application shell that contains the logo box, tag cloud, and roadmap.
 *
 * @return {JSX.Element} The JSX element representing the application shell.
 */
export default function AppShell() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const path = useLocation().pathname;

  //On smaller screens, we need the tag cloud and roadmap in a drawer, so track the window width
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={`${styles.appHeader} ${path !== "/" ? styles.hidden : ""}`}>
      <LogoBox isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* The drawer for smaller screens */}
      {windowWidth < 768 && (
        <div className={`${styles.drawer} ${isOpen && styles.drawerOpen}`}>
          <TagCloud setIsOpen={setIsOpen} />
          <RoadmapPreview setIsOpen={setIsOpen} />
        </div>
      )}

      {/* On larger screens, just display them as is */}
      {windowWidth >= 768 && (
        <>
          <TagCloud setIsOpen={setIsOpen} />
          <RoadmapPreview setIsOpen={setIsOpen} />
        </>
      )}
    </header>
  );
}
