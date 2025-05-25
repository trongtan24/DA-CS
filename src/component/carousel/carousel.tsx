import { useState, useEffect, useRef } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

export default function Carousel({
  autoSlide = true,
  autoSlideInterval = 3000,
  slides,
}: {
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slides: { image: string; link: string; isVideo: boolean }[];
}) {
  const [curr, setCurr] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const transitionDuration = 500;
  const [startX, setStartX] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  

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

  // auto slide effect
  useEffect(() => {
    if (!autoSlide || isPaused) return;
    const interval = setInterval(() => {
      if (!isAnimating) next();
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, isAnimating, isPaused]);

  // pause videos when change slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === curr) {
          // video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [curr]);

  useEffect(() => {
  const imgs = document.querySelectorAll("img");
  imgs.forEach(img => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });

  return () => {
    imgs.forEach(img => {
      img.removeEventListener("dragstart", (e) => e.preventDefault());
    });
  };
}, []);


  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
      setStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || startX === null) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
      setDragging(false);
      setStartX(null);
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setStartX(null);
  };



  const navButtons = (
  <>
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
  </>
  )

  return (
    <div className="h-full w-full lg:w-1/2 overflow-hidden relative rounded-2xl z-10 select-none">
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full shrink-0 h-full">
            {slide.isVideo ? (
            <video
              ref={el => {
                videoRefs.current[index] = el;
              }}
              className="w-full h-50 sm:h-80 object-fill"
              controls
              onPlay={() => {setIsPaused(true); }}
              onPause={() => {setIsPaused(false); }}>
              <source src={slide.image} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>

            ) : (
              <a
                href={slide.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsPaused(false)}
              >
                <img
                  src={slide.image}
                  alt={`Slide ${index}`}
                  className="w-full h-50 sm:h-80 object-fill"
                  draggable={false}
                />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
        {isPaused ? <></> : (
          navButtons
        )}
      </div>
    </div>
  );
}
