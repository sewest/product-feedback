import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { AppProvider } from "./store/AppContext";
import "./App.css";

export default function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}
