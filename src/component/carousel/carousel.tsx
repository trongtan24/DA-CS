import { useState, useEffect } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function Carousel({
  autoSlide = true,
  autoSlideInterval = 3000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: { image: string ; link: string }[];
}) {
  const [curr, setCurr] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const transitionDuration = 500;

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, transitionDuration);
    return () => clearTimeout(timer);
  }, [curr]);

  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      if (!isAnimating) next();
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, isAnimating]);

  return (
    <div className="h-full overflow-hidden relative max-h-[600px] rounded-2xl z-10">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 h-full">
            <a href={slide.link} target="_blank" rel="noopener noreferrer">
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </a>
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        <button
          onClick={prev}
          disabled={isAnimating}
          className="pointer-events-auto p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white md:block hidden cursor-pointer"
        >
          <FaArrowAltCircleLeft size={40} />
        </button>

        <button
          onClick={next}
          disabled={isAnimating}
          className="pointer-events-auto p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white md:block hidden cursor-pointer"
        >
          <FaArrowAltCircleRight size={40} />
        </button>
      </div>

    </div>
  );
}
