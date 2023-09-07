import iconClose from "../../../assets/images/logoBox/iconClose.svg";
import hamburger from "../../../assets/images/logoBox/iconHamburger.svg";
import styles from "./logoBox.module.css";

/**
 * Renders a logo box component.
 *
 * @param {boolean} isOpen - Determines if the drawer is open or closed.
 * @param {function} setIsOpen - Sets the state of the isOpen variable.
 * @return {JSX.Element} The rendered logo box component.
 */
export default function LogoBox({ isOpen, setIsOpen }) {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}
      <div className={styles.logoBox}>
        <div>
          <div className={styles.logo}>Frontend Mentor</div>
          <p>Feedback Board</p>
        </div>

        <img className={isOpen ? "" : styles.hidden} src={iconClose} alt="close" onClick={() => setIsOpen(false)} />
        <img className={!isOpen ? "" : styles.hidden} src={hamburger} alt="hamburger" onClick={() => setIsOpen(true)} />
      </div>
    </>
  );
}
