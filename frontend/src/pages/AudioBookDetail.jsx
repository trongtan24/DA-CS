import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "../assets/other/data";
import { ScrollToTop, BreadCrumb } from "../components";
import {
  FiChevronRight,
  FiStar,
  FiClock,
  FiCalendar,
  FiTag,
  FiPlay,
  FiPause,
} from "react-icons/fi";

const AudioBookDetail = () => {
  const { seo } = useParams();
  const { pageCategory } = useParams();
  const { type } = useParams();
  const id = seo.split("-")[0];
  const { books, token, toggleLogin } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const book = books.find((book) => book._id === id);

  if (!book) {
    return (
      <section className="flexCenter flex-col text-center max-padd-container py-16 md:py-28 xl:py-40 bg-white rounded-xl">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-600 mb-6">
          Không tìm thấy sản phẩm
        </h2>
        <p className="text-gray-500 mb-8">
          Sản phẩm bạn muốn tìm hiện không tồn tại hoặc đã bị di chuyển.
        </p>
        <ScrollToTop to="/" className="btn-secondaryToOne">
          Quay về trang chủ
        </ScrollToTop>
      </section>
    );
  }

  const getCategoryName = (categoryValue) => {
    const foundCategory = categories.find(
      (cate) => cate.category === categoryValue
    );
    return foundCategory ? foundCategory.name : categoryValue;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (!token) {
    return (
      <section className="max-padd-container py-8 bg-white rounded-xl">
        <BreadCrumb pageCategory={pageCategory} type={type} book={book} />
        {/* Categories */}
        <div className="">
          <div className="mt-8">
            <div className="flexCenter flex-col gap-6 py-32">
              <h3 className="bold-24">Bạn chưa đăng nhập</h3>
              <p className="text-gray-500">
                Hãy đăng nhập để trải nghiệm tính năng này!
              </p>
              <button
                onClick={() => {
                  toggleLogin();
                }}
                className="btn-secondaryToOne !px-4 !py-2 text-sm"
                style={{ width: "fit-content" }}
              >
                Đăng nhập ngay!
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-padd-container py-8 bg-primary rounded-xl">
      {/* Breadcrumbs */}
      <BreadCrumb pageCategory={pageCategory} type={type} book={book} />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flexCenter">
            <img
              src={book.image}
              alt={book.name}
              className="rounded-xl object-cover w-full max-w-md aspect-[3/4] shadow-lg"
            />
          </div>
        </div>

        {/* Audio Book Info */}
        <div className="lg:w-1/2">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            {/* Title and Badges */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {book.name}
              </h1>
              <div className="flex items-center gap-3">
                {book.popular && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 text-xs font-medium rounded-full flex items-center">
                    <FiStar className="mr-1" /> Nổi bật
                  </span>
                )}
              </div>
            </div>

            {/* Author */}
            {book.author && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tác giả: <span className="font-normal">{book.author}</span>
                </h3>
              </div>
            )}

            {/* Description */}
            {book.desc && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Giới thiệu
                </h3>
                <p className="text-gray-600 leading-relaxed">{book.desc}</p>
              </div>
            )}

            {/* Additional Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <FiTag className="text-gray-400 mr-2" />
                <span className="text-gray-700">Danh mục: </span>
                <span className="ml-1 font-medium">
                  {getCategoryName(book.category)}
                </span>
              </div>
              <div className="flex items-center">
                <FiCalendar className="text-gray-400 mr-2" />
                <span className="text-gray-700">Ngày đăng: </span>
                <span className="ml-1 font-medium">
                  {book?.date
                    ? new Date(book.date).toLocaleDateString("vi-VN")
                    : new Date(book.created_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <FiClock className="text-gray-400 mr-2" />
                <span className="text-gray-700">Thời lượng: </span>
                <span className="ml-1 font-medium">
                  {book.duration || "Không xác định"}
                </span>
              </div>
            </div>

            {/* Audio Player */}
            <div className="bg-gray-50 p-4 rounded-lg mt-8">
              <div className="flex items-center justify-center mb-4">
                <button className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors">
                  {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                </button>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-500"></span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-500"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioBookDetail;
