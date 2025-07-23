import React, { useContext, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { categories } from "../assets/other/data";
import { ScrollToTop, BreadCrumb, Item, Titles } from "../components";
import {
  FiChevronRight,
  FiShoppingCart,
  FiStar,
  FiClock,
  FiCalendar,
  FiTag,
} from "react-icons/fi";
import { FaPenFancy } from "react-icons/fa6";

const ProductDetail = () => {
  const { seo } = useParams();
  const { pageCategory } = useParams();
  const id = seo.split("-")[0];
  const { books, addToCart, token } = useContext(ShopContext);
  const [quantity, setQuantity] = useState(1);
  const book = books.find((book) => book._id === id);
  if (books.length === 0) {
    return (
      <section className="max-padd-container py-8 !pb-32 bg-white rounded-xl">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="mt-8 w-full max-w-md rounded-lg p-8 shadow-sm">
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <h1 className="h2 text-gray-800">Đang tải thông tin</h1>
              <p className="text-gray-500 text-center">Vui lòng chờ...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
        <ScrollToTop to="/shop" className="btn-secondaryToOne">
          Quay về sản phẩm
        </ScrollToTop>
      </section>
    );
  }

  const discountedPrice = book.price - book.price * (book.discount / 100);
  const roundedPrice = Math.round(discountedPrice / 100) * 100;

  const getCategoryName = (categoryValue) => {
    const foundCategory = categories.find(
      (cate) => cate.category === categoryValue
    );
    return foundCategory ? foundCategory.name : categoryValue;
  };

  const handleAddToCart = () => {
    addToCart(book._id, quantity, book.name);
  };

  return (
    <section className="max-padd-container py-8 rounded-xl bg-primary">
      <BreadCrumb pageCategory={pageCategory} book={book} />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flexCenter">
            <img
              src={book.image}
              alt={book.name}
              className="rounded-xl object-cover w-full max-w-md aspect-[3/4] shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                {book.author && (
                  <span className="mb-4 py-1 px-4 text-sm bg-secondary text-white font-medium rounded-full flex items-center">
                    <FaPenFancy className="mr-2" /> Tác giả: {book.author}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {book.name}
              </h1>
              <div className="flex flex-col items-start xs:flex-row xs:items-center gap-3">
                {book.popular && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 text-xs font-medium rounded-full flex items-center">
                    <FiStar className="mr-1" /> Nổi bật
                  </span>
                )}
                {book.discount > 0 && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 text-xs font-medium rounded-full flex items-center">
                    <FiTag className="mr-1" /> Giảm {book.discount}%
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              {book.discount > 0 ? (
                <div className="flex flex-col items-start xs:flex-row xs:items-center gap-4">
                  <span className="text-red-600 font-bold text-3xl">
                    {roundedPrice.toLocaleString()}đ
                  </span>
                  <span className="line-through text-gray-400 text-xl">
                    {book.price.toLocaleString()}đ
                  </span>
                </div>
              ) : (
                <span className="text-red-600 font-bold text-3xl">
                  {book.price.toLocaleString()}đ
                </span>
              )}
            </div>

            <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
              {/* <div className="flex items-center">
                <FiClock className="mr-1" />
                <span>Tồn kho: {book.stock || 0}</span>
              </div> */}
              <div className="flex items-center">
                <FiShoppingCart className="mr-1" />
                <span>Đã bán: {book.sales} sản phẩm</span>
              </div>
            </div>

            <div className="mb-8 flex flex-col items-center xs:flex-row gap-4">
              <label className="flex text-sm font-medium text-gray-700 mb-2">
                Số lượng:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setQuantity(Math.max(1, value));
                  }}
                  className="w-12 text-center border border-gray-300 rounded-md py-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setQuantity(Math.max(1, quantity + 1))}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full btn-secondaryToOne py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors duration-300 mb-8"
            >
              <FiShoppingCart /> Thêm vào giỏ hàng
            </button>

            {book.desc && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Mô tả sản phẩm
                </h3>
                <p className="text-gray-600 leading-relaxed">{book.desc}</p>
              </div>
            )}

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
            </div>
          </div>
        </div>
      </div>

      {books && books.length > 0 && (
        <div className="mt-8 bg-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Sản phẩm liên quan
          </h2>
          <div className="grid s:grid-cols-2 mdlg:grid-cols-4 gap-y-4 gap-x-12">
            {books
              .filter(
                (b) =>
                  b.category === book.category &&
                  b._id !== book._id &&
                  (!token
                    ? !(
                        b.book_type?.isAudio ||
                        b.book_type?.isEbook ||
                        b.book_type?.isFlipBook
                      )
                    : true)
              )
              .sort(() => Math.random() - 0.5)
              // lấy nguyên array rồi compare (math.random cho giá trị giá trị random từ 0 - 1)
              // nếu về âm thì swap, nếu dương thì giữ, nếu 0 thì giữ thứ tự ban đầu, ko random lắm nếu array lớn
              // vd array [a,b,c,d,e,f]:
              // compare (a - b) - giá trị cho ra là dương thì swap [b,a,c,d,e,f],
              // compare (c - d) - giá trị cho ra là âm thì giữ [b,a,c,d,e,f],
              .slice(0, 4)
              .map((relatedBook) => (
                <Item key={relatedBook._id} book={relatedBook} to="/shop/" />
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductDetail;
