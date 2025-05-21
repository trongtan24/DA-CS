import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ToTheTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <div className="fixed top-32 z-25">
        <button
          onClick={scrollToTop}
          className="flex flex-col justify-center items-center bg-white text-ssm text-black p-1 rounded-lg pt-2 pb-2 border-2 border-black shadow-lg hover:opacity-100 transition duration-300 opacity-75 cursor-pointer"
        >
          <FaArrowUp/> <div className="">Lên đầu</div>
        </button>
      </div>
    )
  );
}

export default ToTheTopButton;
