import React from "react";
import iconClose from "../../assets/images/logoBox/iconClose.svg";
import hamburger from "../../assets/images/logoBox/iconHamburger.svg";
import useWindowWidth from "../../hooks/useWindowWidth";
import DrawerOverlay from "../drawerOverlay/DrawerOverlay";
import Title from "../title/Title";
import Text from "../text/Text";
import styles from "./logoBox.module.css";

/**
 * Renders the LogoBox component.
 *
 * @param {boolean} isOpen - Indicates whether the LogoBox is open or not.
 * @param {function} setIsOpen - A function to set the value of isOpen.
 * @return {JSX.Element} The rendered LogoBox component.
 */
export default function LogoBox({ isOpen, setIsOpen }) {
  // Get the current window width using a custom hook
  const windowWidth = useWindowWidth();

  // Function to handle opening the LogoBox
  const handleOpen = () => {
    setIsOpen(true);
  };

  // Function to handle closing the LogoBox
  const handleClose = () => {
    setIsOpen(false);
  };

  // Render the LogoBox component
  return (
    <>
      {/* Overlay for the drawer */}
      <DrawerOverlay isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main container for the LogoBox */}
      <div className={styles.logoBox}>
        <div>
          {/* Title */}
          <Title order={1} classes={styles.logo}>
            Frontend Mentor
          </Title>

          {/* Subtitle */}
          <Text size={windowWidth < 768 ? "sm" : "md"} classes={styles.logoSub}>
            Feedback Board
          </Text>
        </div>

        {/* Close button */}
        <img className={isOpen ? "" : styles.hidden} src={iconClose} alt="close" onClick={handleClose} />

        {/* Hamburger button */}
        <img className={!isOpen ? "" : styles.hidden} src={hamburger} alt="hamburger" onClick={handleOpen} />
      </div>
    </>
  );
}
