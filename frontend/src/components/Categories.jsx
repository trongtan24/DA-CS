import React from "react";
import { ScrollToTop, Titles } from "./";
import { categories } from "../assets/other/data";
import { Link, NavLink } from "react-router-dom";

const Categories = ({ setScrollToTop = true }) => {
  const getTypeName = (categoryValue) => {
    const foundCategory = categories.find((cate) => cate.category);

    const foundType = categories.find((cate) => cate.type);

    let found = foundCategory || foundType;

    return found;
  };

  return (
    <div className="mt-8 mb-4">
      <Titles
        title1={"Danh mục sản phẩm"}
        title2={""}
        titleStyle1={"pb-4 text-center"}
        titleStyle2={""}
        paraStyle={"!block"}
      />
      <div className="flexCenter flex-wrap gap-x-12 gap-y-4">
        {setScrollToTop ? (
          <>
            {categories.map((cate) => (
              <ScrollToTop to={`/shop/${cate.category}`} key={cate.name}>
                <label>
                  <input type="checkbox" className="hidden" />
                  <div className="flex flex-col items-center gap-2 hover:text-primary hover:bg-red-700 p-2 rounded-xl transition duration-200 cursor-pointer">
                    <div className="bg-primary h-16 w-16 flexCenter rounded-full transition-all">
                      <img
                        src={cate.image}
                        alt={cate.name}
                        className="object-cover h-8 w-8"
                      />
                    </div>
                    <span>{cate.short || cate.name}</span>
                  </div>
                </label>
              </ScrollToTop>
            ))}
          </>
        ) : (
          <>
            {categories.map((cate) => (
              <NavLink
                to={`/shop/${cate.category}`}
                key={cate.name}
                className={({ isActive }) =>
                  `flex items-center gap-x-2 rounded-xl transition duration-200 ${
                    isActive ? "!text-primary bg-red-700" : ""
                  }`
                }
              >
                <label>
                  <input type="checkbox" className="hidden" />
                  <div className="flex flex-col items-center gap-2 hover:text-primary hover:bg-red-700 p-2 rounded-xl transition duration-200 cursor-pointer">
                    <div className="bg-primary h-16 w-16 flexCenter rounded-full transition-all">
                      <img
                        src={cate.image}
                        alt={cate.name}
                        className="object-cover h-8 w-8"
                      />
                    </div>
                    <span>{cate.short || cate.name}</span>
                  </div>
                </label>
              </NavLink>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;
