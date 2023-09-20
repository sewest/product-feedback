import { Outlet } from "react-router-dom";
import AppHeader from "../components/appHeader/AppHeader";
import styles from "./rootLayout.module.css";

/**
 * Renders the root layout of the application inside the root element.
 *
 * @return {ReactElement} The root layout component.
 */
export default function RootLayout() {
  return (
    <div className={styles.rootContainer}>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
