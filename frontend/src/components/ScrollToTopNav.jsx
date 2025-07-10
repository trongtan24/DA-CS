import { NavLink } from "react-router-dom";
import { useRef } from "react";

function ScrollToTopNav({ children, onClick, ...props }) {
  const scrollTimeout = useRef(null);

  const handleClick = (e) => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    onClick?.(e);

    scrollTimeout.current = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 75);
  };

  return (
    <NavLink {...props} onClick={handleClick}>
      {children}
    </NavLink>
  );
}

export default ScrollToTopNav;
