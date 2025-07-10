import fiction from "./categories/fiction.png";
import children from "./categories/children.png";
import health from "./categories/health.png";
import business from "./categories/business.png";
import academic from "./categories/academic.png";
import religious from "./categories/religious.png";
import history from "./categories/poetry.png";
import scienece from "./categories/atom.png";
import mental from "./categories/mental.png";
import code from "./categories/code.png";
import news from "./categories/news.png";
import popular from "./categories/popular.png";
import discount from "./categories/discount.png";
import audioBook from "./categories/audioBook.png";
import office from "./categories/office.png";
import database from "./categories/database.png";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

import video_1 from "./slider/book_video_1.mp4";
import video_2 from "./slider/book_video_2.mp4";

import img_1 from "./slider/book_img_1.png";

export const categories = [
  {
    name: "Lập trình",
    category: "it",
    image: code,
  },
  {
    short: "THVP",
    name: "Tin học văn phòng",
    category: "office",
    image: office,
  },
  {
    short: "CSDL",
    name: "Cơ sở dữ liệu",
    category: "database",
    image: database,
  },
  {
    name: "Văn học",
    category: "lirature",
    image: academic,
  },
  {
    name: "Khoa học",
    category: "sciencetific",
    image: scienece,
  },
  {
    name: "Tâm lý",
    category: "mentality",
    image: mental,
  },
  {
    name: "Lịch sử",
    category: "history",
    image: history,
  },
  {
    name: "Kinh doanh",
    category: "business",
    image: business,
  },
  {
    name: "Nổi bật",
    category: "popular",
    image: popular,
  },
  {
    name: "Mới",
    category: "news",
    image: news,
  },
  {
    name: "Giảm giá",
    category: "discount",
    image: discount,
  },
  {
    name: "Sách nói",
    category: "audioBook",
    image: audioBook,
    isAudioBook: true,
  },
];

export const sliders = [
  {
    _id: "1",
    name: "",
    image: img_1,
    video: "",
    to: "it",
  },
  {
    _id: "2",
    name: "",
    image: "",
    video: video_1,
    to: "mentality/687005a3cb29d1b33afd95aa-khi-nguoi-ta-tu-duy",
  },
  {
    _id: "3",
    name: "",
    image: "",
    video: video_2,
    to: "mentality/6870076fcb29d1b33afd95c5-ac-nhan-tam",
  },
  {
    _id: "4",
    name: "",
    image: "",
    video: "",
    to: "",
  },
];

// FOOTER
export const FOOTER_LEARN_MORE = {
  title: "Về B8K",
  links: [
    { label: "Giới thiệu", to: "/about-us" },
    { label: "Điều khoản", to: "/terms" },
    { label: "Bảo mật", to: "/privacy" },
  ],
};

export const FOOTER_PRODUCT = {
  title: "Sản phẩm",
  links: [
    { label: "Sản phẩm Giảm giá", to: "/shop/discount" },
    { label: "Sản phẩm mới", to: "/shop/news" },
    { label: "Sản phẩm nổi bật", to: "/shop/popular" },
  ],
};

export const FOOTER_CONTACT_INFO = {
  title: "Liên hệ",
  links: [
    { label: "Số điện thoại", value: "028 7100 0888" },
    { label: "Địa chỉ email", value: "info@B8K.com" },
  ],
};

export const SOCIALS = {
  title: "Mạng xã hội",
  links: [
    { icon: <FaFacebook />, id: "facebook", to: "/" },
    { icon: <FaInstagram />, id: "instagram", to: "/" },
    { icon: <FaTwitter />, id: "twitter", to: "/" },
    { icon: <FaYoutube />, id: "youtube", to: "/" },
    { icon: <FaLinkedin />, id: "linkedin", to: "/" },
  ],
};
