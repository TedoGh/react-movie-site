import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollUpTop = () => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default ScrollUpTop;
