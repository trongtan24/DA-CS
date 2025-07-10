import React, { useContext, useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { ShopContext } from "../context/ShopContext";
import { Categories, Titles } from "./";
import { ScrollToTop } from "./";

const Hero = () => {
  const { sliders } = useContext(ShopContext);
  const [Slider, setSlider] = useState([]);
  const swiperRef = useRef(null);

  // const pagination = {
  //   clickable: true,
  //   renderBullet: function (index, className) {
  //     return `<span class="custom-bullet ${className}">${index + 1}</span>`;
  //   },
  // };

  useEffect(() => {
    const data = sliders.slice();
    setSlider(data);
  }, [sliders]);

  const handleVideoPlay = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleVideoPause = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <section className=" bg-white">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          type: "progressbar",
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="custom-swiper mb-8 lg:mb-0 h-[400px] md:h-[450px] lg:h-[500px] xl:h-[600px] transition-all duration-300"
        allowTouchMove={true}
        noSwiping={false}
        ref={swiperRef}
      >
        {Slider.map((slider) => (
          <SwiperSlide key={slider._id} className="swiper-slide">
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              {slider.image && (
                <ScrollToTop to={`/shop/${slider.to}`} className="">
                  <img
                    src={slider.image}
                    alt={`Slider ${slider._id}`}
                    className="w-full h-full object-cover"
                  />
                </ScrollToTop>
              )}
              {slider.video && (
                <div className="relative w-full h-full group">
                  <video
                    controls
                    muted
                    loop
                    className="w-full h-full object-cover"
                    onPlay={handleVideoPlay}
                    onPause={handleVideoPause}
                  >
                    <source src={slider.video} type="video/mp4" />
                  </video>

                  <ScrollToTop
                    to={`/shop/${slider.to}`}
                    className="absolute top-4 right-4 z-10 bg-black/70 text-white hover:bg-white hover:text-black px-4 py-2 rounded-full transition-all duration-300 hidden group-hover:flex items-center gap-2"
                  >
                    Mua ngay
                  </ScrollToTop>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8">
        <Categories />
      </div>
    </section>
  );
};

export default Hero;
