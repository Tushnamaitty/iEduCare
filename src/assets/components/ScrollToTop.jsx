import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router keeps the browser's scroll position by default when
// navigating between routes. This resets it to the top every time
// the path changes, so each page always opens from the start.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}