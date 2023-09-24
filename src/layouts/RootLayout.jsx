import { Outlet } from "react-router-dom";
import AppHeader from "../components/appHeader/AppHeader";
import styles from "./rootLayout.module.css";

// Root layout for router/app
export default function RootLayout() {
  return (
    <div className={styles.rootContainer}>
      <AppHeader /> {/* The logo, roadmap preview, and tag cloud  */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
