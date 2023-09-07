import iconClose from "../../../assets/images/logoBox/iconClose.svg";
import hamburger from "../../../assets/images/logoBox/iconHamburger.svg";
import styles from "./logoBox.module.css";

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
