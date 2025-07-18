import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "../assets/other/data";
import { ScrollToTop } from "../components";
import {
  FiChevronRight,
  FiStar,
  FiClock,
  FiCalendar,
  FiTag,
  FiPlay,
  FiPause,
} from "react-icons/fi";

const BreadCrumb = ({ book, pageCategory, type }) => {
  const getCategoryName = (categoryValue) => {
    const foundCategory = categories.find(
      (cate) => cate.category === categoryValue
    );
    return foundCategory ? foundCategory.name : categoryValue;
  };

  return (
    <>
      <div className="hidden s:flex s:flex-row s:items-center text-sm text-gray-500 w-fit p-1 px-4 mb-6 bg-white ring-1 ring-slate-900/10 rounded-full">
        <ScrollToTop to="/" className="hover:text-secondary">
          Trang chủ
        </ScrollToTop>

        {/* Nếu có page cate thì /shop bấm dc, ko thì bth  */}
        {pageCategory ? (
          <>
            <FiChevronRight className="mx-2" />
            <ScrollToTop to="/shop" className="hover:text-secondary">
              Sản phẩm
            </ScrollToTop>
          </>
        ) : (
          <>
            <FiChevronRight className="mx-2" />
            <span className="text-secondary">Sản phẩm</span>
          </>
        )}

        {/* Nếu ko có detail của sách thì page cate ko bấm dc */}
        {pageCategory && !book && (
          <>
            <FiChevronRight className="mx-2" />
            <span className="text-secondary">
              {getCategoryName(pageCategory)}
            </span>
          </>
        )}

        {/* Nếu là audioBook */}
        {type === "audioBook" && book && (
          <>
            <FiChevronRight className="mx-2" />
            <ScrollToTop to={`/shop/${type}`} className="hover:text-secondary">
              {getCategoryName(type)}
            </ScrollToTop>
          </>
        )}

        {pageCategory && book && (
          <>
            <FiChevronRight className="mx-2" />
            <ScrollToTop
              to={`/shop/${pageCategory}`}
              className="hover:text-secondary"
            >
              {getCategoryName(pageCategory)}
            </ScrollToTop>
            <FiChevronRight className="mx-2" />
            <span className="text-secondary">{book.name}</span>
          </>
        )}
      </div>
    </>
  );
};

export default BreadCrumb;
