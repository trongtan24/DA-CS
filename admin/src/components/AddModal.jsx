// Create a reusable AddModal component from your Add form

import React, { useState } from "react";
import upload_icon from "../assets/upload_icon.png";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url } from "../App";

const AddModal = ({ token, onClose, onCreated }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("it");
  const [popular, setPopular] = useState(false);
  const [sales, setSales] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [isAudio, setIsAudio] = useState(false);
  const [isEbook, setIsEbook] = useState(false);
  const [isFlipBook, setIsFlipBook] = useState(false);
  const [isNormalBook, setIsNormalBook] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const validPercentage = (e) => {
    if (e <= 100 && e >= 0) setDiscount(e);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const numericPrice = parseInt(price * 1000);

    if (name.trim().length <= 3) {
      toast.error("Bạn phải nhập tên sản phẩm với ít nhất 4 ký tự!");
      setIsLoading(false);
      return;
    }

    if (numericPrice <= 0 || price <= 0) {
      toast.error("Xin vui lòng nhập một giá trị hợp lệ cho giá tiền!");
      setIsLoading(false);
      return;
    }

    if (!image) {
      if (!window.confirm("Bạn chưa thêm hình ảnh, bạn có muốn tiếp tục?")) {
        setIsLoading(false);
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("author", author);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("popular", popular);
      formData.append("sales", sales);
      formData.append("discount", discount);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("isAudio", isAudio);
      formData.append("isEbook", isEbook);
      formData.append("isFlipBook", isFlipBook);
      formData.append("isNormalBook", isNormalBook);

      const res = await axios.post(
        `${backend_url}/api/product/create`,
        formData,
        {
          headers: { token },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        onCreated();
        onClose();
      } else {
        toast.error(res.data.message);
        console.error(res.data.errorMessage);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 px-12 rounded-md max-w-2xl w-full overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Thêm Sản Phẩm</h2>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tên sản phẩm
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Nhập tên sản phẩm..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tên tác giả
            </label>
            <input
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              type="text"
              placeholder="Nhập tên tác giả..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mô tả sản phẩm
            </label>
            <textarea
              rows={4}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="Nhập mô tả sản phẩm..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Giá tiền (Theo hàng nghìn)
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              placeholder="Nhập giá tiền... vd: 20, 100, 200,... "
              min={0}
              max={100000}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Khuyến mãi (%)
            </label>
            <input
              onChange={(e) => validPercentage(e.target.value)}
              value={discount}
              type="number"
              placeholder="Nhập giá trị 0 - 100..."
              min={0}
              max={100}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Loại danh mục
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200"
            >
              <option value="it">Lập trình</option>
              <option value="office">Tin học văn phòng</option>
              <option value="database">Cơ sở dữ liệu</option>
              <option value="lirature">Văn học</option>
              <option value="sciencetific">Khoa học</option>
              <option value="mentality">Tâm lý</option>
              <option value="history">Lịch sử</option>
              <option value="business">Kinh doanh</option>
            </select>
          </div>

          <div className="flex gap-4 flex-wrap">
            <label>
              <input
                type="checkbox"
                checked={popular}
                onChange={() => setPopular(!popular)}
              />{" "}
              Nổi bật
            </label>
            <label>
              <input
                type="checkbox"
                checked={isAudio}
                onChange={() => setIsAudio(!isAudio)}
              />{" "}
              Audio
            </label>
            <label>
              <input
                type="checkbox"
                checked={isEbook}
                onChange={() => setIsEbook(!isEbook)}
              />{" "}
              Ebook
            </label>
            <label>
              <input
                type="checkbox"
                checked={isFlipBook}
                onChange={() => setIsFlipBook(!isFlipBook)}
              />{" "}
              Flipbook
            </label>
            <label>
              <input
                type="checkbox"
                checked={isNormalBook}
                onChange={() => setIsNormalBook(!isNormalBook)}
              />{" "}
              Bản in
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ảnh sản phẩm
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Huỷ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-md transition duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${
      isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-secondary text-white hover:bg-secondary focus:ring-secondary"
    }`}
            >
              {isLoading ? "Đang xử lý..." : "Tạo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
