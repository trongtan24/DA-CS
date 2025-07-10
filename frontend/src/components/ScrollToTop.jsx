import { Link } from "react-router-dom";
import { useRef } from "react";

function ScrollToTop({ children, ...props }) {
  const scrollTimeout = useRef(null);

  const handleClick = () => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 75);
  };

  return (
    <Link
      {...props}
      onClick={(e) => {
        handleClick();
        props.onClick?.(e);
      }}
    >
      {children}
    </Link>
  );
}

export default ScrollToTop;
