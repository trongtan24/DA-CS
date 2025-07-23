import React, { useEffect, useState, useRef, useContext } from "react";
import { ScrollToTop, Login } from "./";
import logo from "../assets/b8k_logo_w_bg.png";
import {
  IoCartOutline,
  IoLogInOutline,
  IoSearch,
  IoClose,
  IoMailSharp,
} from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { Navbar } from "./index";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  // nhận input
  const [input, setInput] = useState("");
  const handleChange = (e) => {
    // set giá trị
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
    <form className="group transition-all duration-300 flex-1 flex items-center border-2 border-gray-300 rounded-full focus-within:border-blue-500 pr-5 relative">
      <button type="button" className="flex items-center">
        <IoSearch className="font-bold text-[33px] p-1.5 border-r-2 transition-all duration-300 border-gray-300 text-gray-300 group-focus-within:text-blue-500 group-focus-within:border-blue-500" />
      </button>

      <input
        type="text"
        className="w-full p-1.5 outline-none"
        value={input}
        onChange={() => handleChange(event)}
        placeholder="Tìm kiếm sản phẩm..."
      />

      {input && (
        <button
          type="button"
          onClick={() => {
            setInput("");
            onSearch("");
          }}
          className="absolute right-2"
        >
          <IoClose />
        </button>
      )}
    </form>
  );
};

const Header = () => {
  const {
    navigate,
    token,
    setToken,
    setCartItems,
    getCartCount,
    getUniqueCartCount,
    books,
    userInfo,
    setUserInfo,
    loginRef,
    loginOpened,
    setLoginOpened,
    toggleLogin,
  } = useContext(ShopContext);
  const [active, setActive] = useState(false);
  const [menuOpened, setMenuOpened] = useState(false);

  const normalizeText = (name) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  const to = "/shop/";

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev); // tắt mở mỗi lần toggle
  };

  const sideBarRef = useRef();
  const toggleBtnRef = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      if (
        // nếu menu đang mở và bấm bên ngoài cái thanh hoặc nút thì đóng
        menuOpened &&
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        setMenuOpened(false);
      }
    };

    document.addEventListener("mousedown", clickOutside); // tạo event

    return () => {
      document.removeEventListener("mousedown", clickOutside); // xoá khi ko dùng
    };
  }, [menuOpened]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setUserInfo(null);
  };
  // search
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef();

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      // nếu rỗng
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const results = books.filter(
      (book) =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
    setShowResults(true);
  };

  const handleResultClick = () => {
    // tắt khi click vào
    setShowResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        // kiểm tra cái ref đc bind vào có tồn tại && kiểm tra cái click có phải là cái đó hoặc bên trong nó
        setShowResults(false);
      } else {
        setShowResults(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // tạo event
    return () => document.removeEventListener("mousedown", handleClickOutside); // xoá event khi ko cần để ko bị tràn bộ nhớ
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full left-0 right-0 z-50 text-nowrap border-b-2 pb-1 border-slate-900/5 bg-white px-2 md:px-4">
        {/* top bar */}
        <div
          className={` bg-white py-2.5 max-padd-container flexBetween rounded transition-all duration-300 md:gap-8`}
        >
          {/* placeholder */}
          <div className="flex-1 flex gap-2 mr-2 items-center justify-center sm:justify-start order-2 lg:order-1"></div>

          {/* logo */}
          <div className="transform lg:translate-y-0 flex-1 order-1 lg:order-2">
            <ScrollToTop
              to={"/"}
              className="flex-1 gap-2 block s:flex items-center lg:justify-center "
            >
              <img
                src={logo}
                alt="logo"
                className="w-auto h-10 max-w-none rounded-xl"
              />
              <h4 className="hidden s:flex xs:bold-20 sm:bold-24 items-center justify-center">
                Học để dev
              </h4>
            </ScrollToTop>
          </div>

          {/* right side */}
          <div className="flex-1 flex items-center justify-end gap-x-3 md:gap-x-10 order-3 sm:order-3">
            {/* cart */}
            <ScrollToTop
              to={"/cart"}
              className="group flex relative ring-2 rounded-full ring-gray-200 hover:ring-gray-500 hover:bg-primary transition duration-300"
            >
              <IoCartOutline className="text-[38px] p-1.5 rounded-full" />
              <span className="medium-14 absolute left-7 -top-1 flexCenter w-5 h-5 rounded-full text-sm bg-red-500 text-white  shadow-sm transition duration-300">
                {getCartCount()}
              </span>
            </ScrollToTop>

            {/* help */}
            <ScrollToTop
              to={"/help"}
              className="hidden lg:flex hover:text-secondary transition duration-300 hover:border-gray-500 sm:border-b-2 border-white w-fit gap-1"
            >
              <IoIosHelpCircleOutline className="w-6 h-6" />
              <span className="">Trợ giúp</span>
            </ScrollToTop>

            {/* login */}
            <div className="relative group">
              <div>
                {token ? (
                  <div className="w-[38px]">
                    {userInfo?.image ? (
                      <>
                        <img
                          src={`${userInfo.image}`}
                          alt="img"
                          className="h-[36px] w-[38px] object-cover rounded-full"
                        />
                      </>
                    ) : (
                      <>
                        <FaRegUserCircle className="text-[36px] cursor-pointer" />
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    {/* <button className="hidden lg:flex btn-outline items-center justify-center gap-x-2">
                      Đăng ký{" "}
                      <MdOutlineDriveFileRenameOutline className="text-[16px]" />
                    </button> */}

                    <button
                      onClick={() => {
                        toggleLogin();
                      }}
                      className="btn-outline flexCenter gap-x-2 "
                    >
                      <span className="text-[16px]">Đăng nhập</span>{" "}
                      <FaRegUserCircle className="text-[20px]" />
                    </button>
                  </>
                )}

                {token && (
                  <>
                    <ul className="bg-white p-2 w-32 ring-1 ring-gray-300 rounded absolute right-0 top-9 z-55 group-hover:flex flex-col regular-14 shadow-md z-[999] gap-y-2 hidden ">
                      <li className="line-clamp-1 p-1">
                        <ScrollToTop
                          className="p-1 font-semibold"
                          to="/profile"
                        >
                          {userInfo?.name || "Người dùng"}
                        </ScrollToTop>
                      </li>
                      <hr />
                      <ScrollToTop className="p-1 hover:!text-secondary transition duration-200" to="/profile">
                        Thông tin
                      </ScrollToTop>
                      <ScrollToTop className="p-1 hover:!text-secondary transition duration-200" to="/orders">
                        Đơn hàng
                      </ScrollToTop>
                      {/* <ScrollToTop className="p-1" to="/settings">
                        Cài đặt
                      </ScrollToTop> */}
                      <hr />
                      <li onClick={logout} className="cursor-pointer p-1  hover:!text-red-500 transition">
                        Đăng xuất
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="bg-white py-2.5 max-padd-container flexBetween rounded transition-all duration-300 gap-4 md:gap-8">
          {/* nav btn nếu sm, liện hệ nếu lg: */}
          <div className="lg:flex-1">
            <FiSidebar
              ref={toggleBtnRef}
              onClick={toggleMenu}
              className={`text-2xl lg:hidden cursor-pointer transition duration-300 ${
                menuOpened ? "text-black" : "text-gray-300"
              } `}
            />

            <div className="hidden lg:flex gap-x-8">
              <div className=" hover:text-secondary transition duration-300 hover:border-gray-500 border-b-2 border-white">
                <div className="flex items-center gap-x-1">
                  <FaPhone size={16} /> 028 7100 0888
                </div>
              </div>

              <div className="hover:text-secondary transition duration-300 hover:border-gray-500 border-b-2 border-white">
                <a
                  href="mailto:info@B8K.com"
                  className="flex items-center gap-x-1 "
                >
                  <IoMailSharp size={16} />
                  info@B8K.com
                </a>
              </div>
            </div>
          </div>

          {/* nav + sidebar */}
          <div className="lg:flex-1 flex items-center">
            <Navbar
              ref={sideBarRef}
              menuOpened={menuOpened}
              toggleMenu={toggleMenu}
              containerStyle={`transition duration-300 ${
                menuOpened
                  ? "flex flex-col gap-y-8 h-screen w-[222px] fixed left-0 top-[125px] bg-white z-50 px-10 py-4 shadow-xl"
                  : "hidden lg:flex justify-between items-center w-full medium-15"
              }`}
            />
          </div>

          {/* Search bar */}
          <div ref={resultsRef} className="flex-1 relative">
            <SearchBar onSearch={handleSearch} />

            {/* Tìm thấy */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg w- max-h-80 overflow-y-auto xs:ml-8 mr-6 z-50">
                {searchResults.map((book) => (
                  <ScrollToTop
                    key={book._id}
                    to={`${
                      to +
                      book.category +
                      "/" +
                      book._id +
                      "-" +
                      normalizeText(book.name)
                    }`}
                    onClick={handleResultClick}
                    className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b overflow-hidden"
                  >
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-10 h-10 object-cover mr-3"
                    />
                    <div>
                      <p className="font-medium text-sm truncate max-w-[70px] xs:max-w-[150px] s:max-w-[200px] sm:max-w-[330px] md:max-w-[400px] lg:max-w-[100px] xl:max-w-[250px]">
                        {book.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {book.price.toLocaleString()}đ
                      </p>
                    </div>
                  </ScrollToTop>
                ))}
              </div>
            )}

            {/* Ko tìm thấy */}
            {showResults && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-3 z-50">
                <p className="text-gray-500">Không tìm thấy sản phẩm...</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modal */}
      {loginOpened && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-[60] flexCenter overflow-y-auto py-4 animate-fadeInBg">
          <div
            ref={loginRef}
            className="bg-white p-4 py-12 rounded-lg shadow-lg w-full max-w-md my-auto max-h-[90vh] overflow-y-auto animate-fadeIn"
          >
            <div>
              <Login toggleLogin={toggleLogin} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
