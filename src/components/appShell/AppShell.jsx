import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LogoBox from "./logoBox/LogoBox";
import RoadmapPreview from "./roadmapPreview/RoadmapPreview";
import TagCloud from "./tagCloud/TagCloud";
import styles from "./appShell.module.css";

/**
 * Renders the application shell that contains the logo box, tag cloud, and roadmap.
 *
 * @return {JSX.Element} The JSX element representing the application shell.
 */
export default function AppShell() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  const path = useLocation().pathname;

  //On smaller screens, we need the tag cloud and roadmap in a drawer.
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
    <header className={`${styles.appHeader} ${path.startsWith("/feedback") || path.startsWith("/roadmap") ? styles.hidden : ""}`}>
      <LogoBox isOpen={isOpen} setIsOpen={setIsOpen} />
      {windowWidth < 768 && (
        <div className={`${styles.drawer} ${isOpen && styles.drawerOpen}`}>
          <TagCloud />
          <RoadmapPreview />
        </div>
      )}
      {windowWidth >= 768 && (
        <>
          <TagCloud />
          <RoadmapPreview />
        </>
      )}
    </header>
  );
}
