import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

interface ToTheTopButtonProps {
  window_scrollY?: number;
  top?: number;
}

function ToTheTopButton({window_scrollY = 200, top = 32}: ToTheTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > window_scrollY);
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <div className={`${top} z-25`}>
        <button
          onClick={scrollToTop}
          className="flex flex-col justify-center items-center bg-white text-ssm text-black p-1 rounded-lg pt-2 pb-2 border border-black shadow-lg hover:opacity-100 transition duration-300 md:opacity-75 cursor-pointer"
        >
          <FaArrowUp/> <div className="">Lên đầu</div>
        </button>
      </div>
    )
  );
}

export default ToTheTopButton;
