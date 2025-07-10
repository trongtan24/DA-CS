import React from "react";
import { About, Hero, BookSlides } from "../components";

const Home = () => {
  return (
    <section className="py-8 bg-white max-padd-container rounded-xl">
      <Hero />

      <BookSlides
        SlideStart={0}
        SlideEnd={10}
        to="it"
        title={"Sách lập trình"}
        isShownSale={false}
        isShownDescription={true}
        type="it"
      />
      <BookSlides
        SlideStart={0}
        SlideEnd={10}
        to="discount"
        title={"Sản phẩm giảm giá"}
        type="discount"
      />
      <BookSlides
        SlideStart={0}
        SlideEnd={10}
        to="news"
        title={"Sách mới"}
        isShownSale={true}
        isShownDescription={true}
        type="news"
      />
      <BookSlides
        SlideStart={0}
        SlideEnd={10}
        to="popular"
        title={"Sách nổi bật"}
        isShownSale={true}
        isShownDescription={false}
        type="popular"
      />
      
    </section>
  );
};

export default Home;
