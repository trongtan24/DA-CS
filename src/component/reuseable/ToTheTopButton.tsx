import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

interface ToTheTopButtonProps {
  window_scrollY?: number;
  top?: number;
}

function ToTheTopButton({ window_scrollY = 200, top = 32 }: ToTheTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > window_scrollY);
    };
    
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [window_scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <div className={`bottom-${top} z-25 text-nowrap`}>
        <button
          onClick={scrollToTop}
          className="flex flex-col text-ssm justify-center items-center bg-white text-black p-1 rounded-lg pt-2 pb-2 border border-gray-500 shadow-lg hover:opacity-100 hover:border-gray-700 transition duration-300 md:opacity-60 cursor-pointer"
        >
          <FaArrowUp /> 
          <div>Lên đầu</div>
        </button>
      </div>
    )
  );
}

export default ToTheTopButton;