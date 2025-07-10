import React, { useContext, useEffect, useState } from "react";
import { Titles, Item, Categories, BreadCrumb } from "../components";
import { categories } from "../assets/other/data";
import { ShopContext } from "../context/ShopContext";
import { ScrollToTop } from "../components";
import { FiChevronRight } from "react-icons/fi";
import { useParams } from "react-router-dom";

const Shop = () => {
  const { books, toggleLogin, token } = useContext(ShopContext);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [sortSubCat, setSortSubCat] = useState("all");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { pageCategory } = useParams();

  const getCategoryName = (categoryValue) => {
    const foundCategory = categories.find(
      (cate) => cate.category === categoryValue
    );
    if (categoryValue === "audioBook") {
      return "nói";
    }
    return foundCategory ? foundCategory.name.toLowerCase() : categoryValue;
  };

  const itemsPerPage = 20;

  const toggleFilter = (value, setState) => {
    setState((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilters = () => {
    let filtered = [...books];

    // filtered = filtered.filter((book) => book.stock > 0); // bỏ sách có stock == 0

    if (!token) {
      filtered = filtered.filter(
        (book) =>
          !(
            book.book_type?.isAudio ||
            book.book_type?.isEbook ||
            book.book_type?.isFlipBook
          )
      );
    }

    if (pageCategory === "audioBook") {
      filtered = books.filter((book) => book.book_type?.isAudio);
    } else if (pageCategory === "news") {
      filtered = filtered.filter((book) => {
        const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;
        return (
          Date.now() - new Date(book.date || book.created_date) <= ONE_MONTH_MS
        );
      });
    } else if (pageCategory === "popular") {
      filtered = filtered.filter((book) => book.popular);
    } else if (pageCategory === "discount") {
      filtered = filtered.filter((book) => book.discount > 0);
    } else if (pageCategory) {
      filtered = filtered.filter((book) => book.category === pageCategory);
    }

    return filtered;
  };

  const applySorting = (booksList) => {
    const sorted = [...booksList];

    switch (sortType) {
      case "low":
        return sorted.sort((a, b) => a.price - b.price);
      case "high":
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const applySubSorting = (booksList) => {
    if (sortSubCat === "all") return booksList;
    return booksList.filter((book) => book.category === sortSubCat);
  };

  useEffect(() => {
    let filtered = applyFilters();
    let sorted = applySorting(filtered);
    // let subSorted = applySubSorting(sorted);
    // setFilteredBooks(subSorted || sorted);
    setFilteredBooks(sorted);
    setCurrentPage(1);
  }, [category, sortType, books, pageCategory, token]);

  if (pageCategory === "audioBook" && !token) {
    return (
      <section className="max-padd-container py-8 bg-white rounded-xl">
        <BreadCrumb pageCategory={pageCategory} />
        {/* Categories */}
        <Categories setScrollToTop={false} />
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

  const getPaginatedBooks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBooks.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  return (
    <section className="max-padd-container bg-white py-8 rounded-xl ">
      <BreadCrumb pageCategory={pageCategory} />

      {/* Categories */}
      <Categories setScrollToTop={false} />

      {/* Filters */}
      <div className="mb-12">
        <div className="flexBetween flex-wrap gap-4">
          <Titles
            title1={`${
              pageCategory
                ? `Sách ${getCategoryName(pageCategory)}`
                : "Sản phẩm"
            }`}
            title2={""}
            titleStyle1={""}
            titleStyle2={""}
            paraStyle={"!block"}
          />
          {/* filters subCategories */}
          {pageCategory === "audioBook" && token && (
            <div className="flex items-center gap-4">
              <span className="medium-16 hidden sm:block">Sắp xếp theo:</span>
              <select
                onChange={(e) => setSortSubCat(e.target.value)}
                className="p-2 outline-none bg-primary rounded medium-14"
                value={sortSubCat}
              >
                <option value="all">Tất cả</option>;
                {categories.map((cate) => {
                  return (
                    <option key={cate.category} value={cate.category}>
                      {cate.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          <div className="flex items-center gap-4">
            <span className="medium-16 hidden sm:block">Sắp xếp theo:</span>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="p-2 outline-none bg-primary rounded medium-14"
              value={sortType}
            >
              <option value="relevant">Liên quan</option>
              <option value="low">Thấp đến cao</option>
              <option value="high">Cao đến thấp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flexCenter gap-4 mt-8 mb-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn-secondaryToOne disabled:bg-secondary disabled:ring-secondary disabled:text-white disabled:opacity-50"
          >
            Trước
          </button>
          <span className="medium-16">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn-secondaryToOne disabled:bg-secondary disabled:ring-secondary disabled:text-white disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}

      {/* Book */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {getPaginatedBooks().length > 0 ? (
          getPaginatedBooks().map((books) => (
            <Item key={books._id} book={books} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="medium-16 text-gray-500">
              Không tìm thấy sách phù hợp
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flexCenter gap-4 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn-secondaryToOne disabled:bg-secondary disabled:ring-secondary disabled:text-white disabled:opacity-50"
          >
            Trước
          </button>
          <span className="medium-16">
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn-secondaryToOne disabled:bg-secondary disabled:ring-secondary disabled:text-white disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
    </section>
  );
};

export default Shop;
