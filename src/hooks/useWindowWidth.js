import { useEffect, useState } from "react";

// Listen for window resize and return the window width
export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const setWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", setWidth);

    return () => {
      window.removeEventListener("resize", setWidth);
    };
  }, []);

  return windowWidth;
}
