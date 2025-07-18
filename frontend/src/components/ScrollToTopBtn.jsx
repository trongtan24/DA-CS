import { useRef, useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return isVisible ? (
    <button
      onClick={handleClick}
      className="fixed bottom-[70px] right-6 w-10 h-10 flexCenter bg-white text-secondary ring-1 ring-slate-900/10 rounded-full hover:bg-[#dadadd] transition duration-200 z-50"
    >
      <FaChevronUp />
    </button>
  ) : null;
}

export default ScrollToTopBtn;
