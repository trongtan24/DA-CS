import React from "react";
import { ScrollToTop } from "./";
import logo from "../assets/b8k_logo_no_bg.png";
import {
  FOOTER_CONTACT_INFO,
  FOOTER_LEARN_MORE,
  FOOTER_PRODUCT,
  SOCIALS,
} from "../assets/other/data";

const Footer = () => {

  return (
    <footer className="text-gray-400 border-t-2 border-secondary pb-8 gap-4 bg-[rgb(24,24,33)] px-2 md:px-4">
      <div className="text-gray-400 rounded-tr-3xl max-padd-container rounded-tl-3xl pt-8">
        <div className="text-gray-400 flex justify-between flex-col md:flex-row md:flex-wrap gap-8">
          {/* Logo + địa chỉ */}
          <div className="text-gray-400 flex flex-col gap-5 justify-center">
            <ScrollToTop
              to={"/"}
              className="text-gray-400 flex items-center justify-center md:justify-start"
            >
              <img src={logo} alt="" height={100} width={100} className="text-gray-400 mr-2 " />
              <h4 className="text-white flex bold-24">Học để dev</h4>
            </ScrollToTop>
            <div className="text-white text-center md:text-start gap-2 flex flex-col">
              <p className="text-gray-400">
                <b className="text-gray-400 bold-15">Địa chỉ:</b> Số 736, Nguyễn Trãi, P.11, Q.6
              </p>
              <p className="text-gray-400">
                <strong>Giờ mở cửa:</strong> 8:00 - 22:00
              </p>
            </div>
          </div>

          {/* Tìm hiểu thêm */}
          <FooterColumn title={FOOTER_LEARN_MORE.title}>
            {FOOTER_LEARN_MORE.links.map((link) => (
              <ScrollToTop
                to={link.to}
                key={`learn-more-${link.label}`}
                className="text-white flex gap-4 md:flex-col lg:flex-row justify-center"
              >
                <p className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition-all duration-300">
                  {link.label}
                </p>
              </ScrollToTop>
            ))}
          </FooterColumn>

          {/* Link sản phẩm */}
          <FooterColumn title={FOOTER_PRODUCT.title} to="/shop">
            {FOOTER_PRODUCT.links.map((link) => (
              <ScrollToTop
                to={link.to}
                key={`product-${link.label}`}
                className="text-white flex gap-4 md:flex-col lg:flex-row justify-center"
              >
                <p className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition-all duration-300">
                  {link.label}
                </p>
              </ScrollToTop>
            ))}
          </FooterColumn>

          {/* Liên hệ */}
          <FooterColumn title={FOOTER_CONTACT_INFO.title}>
            {FOOTER_CONTACT_INFO.links.map((link) => (
              <div
                key={`contact-${link.label}`}
                className="text-white flex gap-2 md:flex-col lg:flex-row justify-center"
              >
                <p className="text-gray-400 bold-15">{link.label}:</p>
                <ScrollToTop to="/">
                  <p className="text-gray-400 hover:text-white hover:underline underline-offset-4 transition-all duration-300">
                    {link.value}
                  </p>
                </ScrollToTop>
              </div>
            ))}
          </FooterColumn>

          {/* Link mạng xã hội */}
          <div className="text-white flex justify-center">
            <FooterColumn title={SOCIALS.title}>
              <ul className="text-gray-400 flex gap-4">
                {SOCIALS.links.map((link) => (
                  <ScrollToTop
                    to={link.to}
                    key={`social-${link.id}`}
                    className="text-gray-400 text-xl hover:text-white hover:underline underline-offset-4 transition-all duration-300"
                  >
                    {link.icon}
                  </ScrollToTop>
                ))}
              </ul>
            </FooterColumn>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-gray-400 medium-14 mt-8 pt-4 px-8 rounded text-center">
        <span>©2025 B8K</span>
      </p>
    </footer>
  );
};

const FooterColumn = ({ title, children, to }) => {
  return (
    <div className="text-white flex flex-col gap-5">
      {to ? (
        <ScrollToTop to={to} className="text-white bold-18 whitespace-nowrap text-center">
          <h4>{title}</h4>
        </ScrollToTop>
      ) : (
        <h4 className="text-white bold-18 whitespace-nowrap text-center">{title}</h4>
      )}
      {children}
    </div>
  );
};

export default Footer;
