import { Outlet } from "react-router-dom";
import AppShell from "../components/appShell/AppShell";
import styles from "./rootLayout.module.css";

export default function RootLayout() {
  return (
    <div className={styles.rootContainer}>
      <AppShell />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
