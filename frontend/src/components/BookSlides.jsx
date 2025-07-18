import React, { useContext, useEffect, useState } from "react";
import { Titles, Item } from ".";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { ShopContext } from "../context/ShopContext";
import { ScrollToTop } from "./";

const BookSlides = ({
  SlideStart,
  SlideEnd,
  title,
  to = "",
  isShownSale = false,
  isShownDescription = false,
  type = "it",
}) => {
  const { books, token } = useContext(ShopContext);
  const [BookSlide, setBookSlide] = useState([]);

  const applyFilters = () => {
    let filtered = [...books];

    if (!token) {
      filtered = filtered.filter(
        (book) =>
          !book.book_type?.isAudio &&
          !book.book_type?.isEbook &&
          !book.book_type?.isFlipBook
      );
    }

    if (type === "audioBook") {
      filtered = books.filter((book) => book.book_type?.isAudio);
    } else if (type === "news") {
      filtered = filtered.filter((book) => {
        const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
        return (
          Date.now() - new Date(book.date || book.created_date) <= ONE_MONTH_MS
        );
      });
    } else if (type === "popular") {
      filtered = filtered.filter((book) => book.popular);
    } else if (type === "discount") {
      filtered = filtered.filter((book) => book.discount > 0);
    } else if (type) {
      filtered = filtered.filter((book) => book.category === type);
    }

    return filtered;
  };

  const classes = () => {
    if (isShownDescription && isShownSale)
      return "2xs:h-[690px] xs:h-[490px] s:h-[535px] smmd:h-[580px] sm:h-[670px] md:h-[550px] mdlg:h-[630px] lg:h-[595px] xl:h-[530px]";

    if (isShownDescription)
      return "2xs:h-[665px] xs:h-[470px] s:h-[505px] smmd:h-[565px] sm:h-[645px] md:h-[535px] mdlg:h-[605px] lg:h-[575px] xl:h-[525px]";

    if (isShownSale)
      return "2xs:h-[645px] xs:h-[455px] s:h-[490px] smmd:h-[535px] sm:h-[620px] md:h-[495px] mdlg:h-[590px] lg:h-[555px] xl:h-[495px]";

    return "2xs:h-[630px] xs:h-[435px] s:h-[475px] smmd:h-[530px] sm:h-[615px] md:h-[495px] mdlg:h-[575px] lg:h-[535px] xl:h-[480px]";
  };

  useEffect(() => {
    const data = applyFilters().slice(SlideStart, SlideEnd);
    setBookSlide(data);
  }, [books]);

  return (
    <section className="py-4 pt-8 bg-white rounded-xl">
      <div className="mt-2 my-8 s:flexBetween flex-wrap gap-4">
        <Titles
          title1={title}
          title2={""}
          titleStyle1={""}
          titleStyle2={""}
          paraStyle={"!block"}
        />
        <ScrollToTop
          to={"/shop/" + to}
          className="text-lg rounded-lg text-center text-gray-400 hover:text-black transition-all duration-300 p-2"
        >
          Xem thêm {">"}
        </ScrollToTop>
      </div>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        //   dynamicBullets: true,
        // }}
        breakpoints={{
          400: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Autoplay]}
        className={classes()}
      >
        {BookSlide.map((books) => (
          <SwiperSlide key={books._id}>
            <Item
              book={books}
              showSales={isShownSale}
              showDescription={isShownDescription}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BookSlides;
