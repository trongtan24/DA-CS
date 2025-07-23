import React, { useContext } from "react";
import { ScrollToTop } from "./";
import { TbShoppingCartPlus } from "react-icons/tb";
import { ShopContext } from "../context/ShopContext";
import { categories } from "../assets/other/data";
import { useState } from "react";

const Item = ({
  book,
  showSales = false,
  showDescription = false,
  to = "/shop/",
  state = null,
}) => {
  const salesPrice = book.price - book.price * (book.discount / 100);
  const total = Math.round(salesPrice / 100) * 100;
  const { addToCart } = useContext(ShopContext);
  // const [rotation] = useState(() => (Math.random() > 0.5 ? "" : "-"));
  // const random = Math.round(Math.random());
  // const randomDeg = Math.round(Math.random() * 10 - 4);
  // const randomClass = `shadow-md shadow-slate-900/30 rounded-lg transition duration-300 translate-x-0 group-hover:rotate-[${randomDeg}deg] group-hover:-translate-y-2 w-full h-full object-cover aspect-[238.4/323.933]`;

  const getCategoryName = (categoryValue) => {
    const foundCategory = categories.find(
      (cate) => cate.category === categoryValue // nếu cái category lấy từ data == cái từ database(tên) thì lấy về
    );
    return foundCategory ? foundCategory.name : categoryValue;
  };

  const normalizeText = (name) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const getBookTypePath = (book) => {
    if (book.book_type?.isAudio) return "audioBook";
    if (book.book_type?.isEbook) return "ebook";
    if (book.book_type?.isFlipBook) return "flipBook";
    return book.category;
  };

  const bookUrl =
    getBookTypePath(book) === book.category
      ? to + book.category + "/" + book._id + "-" + normalizeText(book.name)
      : to +
        getBookTypePath(book) +
        "/" +
        book.category +
        "/" +
        book._id +
        "-" +
        normalizeText(book.name);
  return (
    <div className="group bg-white rounded-xl">
      <ScrollToTop
        to={bookUrl}
        className=" relative flex items-center justify-center bg-primary p-4 rounded-xl"
      >
        <img
          src={book.image}
          alt="img"
          className={`shadow-md shadow-slate-900/30 rounded-lg transition duration-300 translate-x-0 group-hover:-translate-y-2 w-full h-full object-cover aspect-[238.4/323.933]`}
        />

        {book.discount != 0 && (
          <span
            className="absolute top-0 left-2.5 bg-red-700 text-white px-0.5 py-2 text-xs font-bold z-10
                after:content-[''] after:absolute after:-bottom-[8px] after:right-0
                after:w-0 after:h-0 after:border-l-[16px] after:border-l-transparent
                after:border-t-[8px] after:border-t-red-700

                before:content-[''] before:absolute before:-bottom-[8px] before:left-0
                before:w-0 before:h-0 before:border-r-[16px] before:border-r-transparent
                before:border-t-[8px] before:border-t-red-700"
          >
            {book.discount}%
          </span>
        )}
      </ScrollToTop>

      <div className="p-3">
        <div className="flexBetween">
          <ScrollToTop className="line-clamp-2 " to={bookUrl}>
            <h4 className="hover:text-red-600 transition-all duration-300 h4 !my-0">
              {book.name}
            </h4>
          </ScrollToTop>
          {!book.book_type.isAudio ? (
            <span
              onClick={(e) => {
                addToCart(book._id, 1, book.name);
              }}
              className="flexCenter h-8 w-8 rounded cursor-pointer hover:bg-primary transition duration-300"
            >
              <TbShoppingCartPlus className="text-lg" />
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="flex flex-wrap pt-1 gap-x-2">
          {book.discount != 0 && (
            <h5 className="p5 text-gray-30 line-through line-clamp-1 ">
              {book.price.toLocaleString()}đ
            </h5>
          )}

          <h5 className="h5 text-red-600 pr-2 line-clamp-1">
            {total.toLocaleString()}đ
          </h5>
        </div>
        <p className="font-bold capitalize">{getCategoryName(book.category)}</p>

        {showDescription && <p className="line-clamp-2 py-1">{book.desc}</p>}

        {showSales && <p className="line-clamp-2 py-1">Đã bán: {book.sales}</p>}
      </div>
    </div>
  );
};

export default Item;
