import { forwardRef } from "react";
import { IoHomeOutline, IoClose } from "react-icons/io5";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopNav from "./ScrollToTopNav";
import logo from "../assets/b8k_logo_no_bg_black.png";
import { TbBooks } from "react-icons/tb";
import { IoMdContacts } from "react-icons/io";
import { IoIosHelpCircleOutline } from "react-icons/io";

const Navbar = forwardRef(function Navbar(
  { containerStyle, toggleMenu, menuOpened },
  ref
) {
  const navItems = [
    { to: "/", label: "Trang chủ", icon: <IoHomeOutline />, styles: "" },
    { to: "/shop", label: "Sản phẩm", icon: <TbBooks />, styles: "" },
    { to: "/contact", label: "Liên hệ", icon: <IoMdContacts />, styles: "" },
    {
      to: "/help",
      label: "Trợ giúp",
      icon: <IoIosHelpCircleOutline />,
      styles: "lg:hidden",
    },
    // {
    //   to: "/category",
    //   label: "Danh mục",
    //   icon: <IoHomeOutline />,
    //   styles: "lg:hidden",
    // },
  ];

  return (
    <nav
      ref={ref}
      className={`${containerStyle} ${menuOpened ? "" : "gap-x-8 lg:gap-x-14"}`}
    >
      {menuOpened ? (
        <>
          <div className="text-xl w-full flex justify-center items-center relative mb-8">
            <ScrollToTop
              to={"/"}
              className="hover:bg-gray-200 transition-all duration-200 rounded-xl"
            >
              <img src={logo} alt="logo" height={96} width={48} />
            </ScrollToTop>
            <IoClose
              className="absolute -top-4 -right-6 opacity-50 hover:opacity-100 transition-all duration-200 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>
          <div className="flex flex-col gap-y-6">
            {navItems.map((item) => (
              <ScrollToTopNav
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-x-2 ${
                    isActive ? "active-link" : "opacity-50 active-link-half"
                  } ${item.styles}`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="medium-16">{item.label}</span>
              </ScrollToTopNav>
            ))}
          </div>
        </>
      ) : (
        <>
          {navItems.map((item) => (
            <ScrollToTopNav
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-x-1 ${
                  isActive ? "active-link" : "opacity-50 active-link-half"
                } ${item.styles}`
              }
            >
              <span
                className={`text-xl ${
                  item.styles.includes("lg:hidden") ? "lg:hidden" : ""
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`medium-16 ${
                  item.styles.includes("lg:hidden") ? "lg:hidden" : ""
                }`}
              >
                {item.label}
              </span>
            </ScrollToTopNav>
          ))}
        </>
      )}
    </nav>
  );
});

export default Navbar;
