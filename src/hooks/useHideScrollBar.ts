import { useEffect } from "react";

const useHideScrollBar = (value: boolean) => {
  useEffect(() => {
    if (value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [value]);
};

export default useHideScrollBar;
