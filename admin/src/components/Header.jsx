import React, { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { MdFactCheck } from "react-icons/md";
import { BiLogOut, BiMenu, BiX } from "react-icons/bi";
import logo from "../assets/b8k_logo_w_bg.png";
import { Link, NavLink } from "react-router-dom";

const Header = ({ setToken }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 
    ${
      isActive
        ? "bg-secondary/10 text-secondary font-semibold"
        : "text-gray-600 hover:text-secondary hover:bg-gray-100"
    }`;

  return (
    <header className="bg-white w-full px-4 py-3 shadow-md fixed top-0 z-50 border-b">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="text-xl font-bold text-secondary hidden sm:inline text-nowrap">
            Quản lý B8K
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            <FaListAlt className="w-5 h-5" />
            <span className="hidden lg:inline">Danh sách</span>
          </NavLink>

          <NavLink to="/orders" className={navLinkClass}>
            <MdFactCheck className="w-5 h-5" />
            <span className="hidden lg:inline">Đơn hàng người dùng</span>
          </NavLink>

          <NavLink to="/guestorders" className={navLinkClass}>
            <MdFactCheck className="w-5 h-5" />
            <span className="hidden lg:inline">Đơn hàng (khách)</span>
          </NavLink>
        </nav>

        {/* Logout + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setToken("")}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 border rounded-md text-red-600 border-red-300 hover:bg-red-50 transition"
          >
            <BiLogOut className="w-5 h-5" />
            <span className="hidden lg:inline text-sm font-medium">
              Đăng xuất
            </span>
          </button>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <BiX /> : <BiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-2 px-4 space-y-2">
          <NavLink
            to="/"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <FaSquarePlus className="w-5 h-5" />
            <span>Danh sách</span>
          </NavLink>

          <NavLink
            to="/orders"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <MdFactCheck className="w-5 h-5" />
            <span>Đơn hàng người dùng</span>
          </NavLink>

          <NavLink
            to="/guestorders"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            <MdFactCheck className="w-5 h-5" />
            <span>Đơn hàng (khách)</span>
          </NavLink>

          <button
            onClick={() => setToken("")}
            className="flex items-center gap-2 px-3 w-full py-1.5 border rounded-md text-red-600 border-red-300 hover:bg-red-50 transition"
          >
            <BiLogOut className="w-5 h-5" />
            <span className="">Đăng xuất</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
