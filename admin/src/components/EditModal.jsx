import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url } from "../App";

const EditModal = ({ product, token, onClose, onUpdated }) => {
  const [name, setName] = useState(product.name);
  const [author, setAuthor] = useState(product.author);
  const [price, setPrice] = useState(product.price / 1000);
  const [discount, setDiscount] = useState(product.discount || 0);
  const [desc, setDesc] = useState(product.desc || "");
  const [category, setCategory] = useState(product.category || "");
  const [popular, setPopular] = useState(product.popular || false);
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(product.image);

  const [isAudio, setIsAudio] = useState(product.book_type?.isAudio || false);
  const [isEbook, setIsEbook] = useState(product.book_type?.isEbook || false);
  const [isFlipBook, setIsFlipBook] = useState(
    product.book_type?.isFlipBook || false
  );
  const [isNormalBook, setIsNormalBook] = useState(
    product.book_type?.isNormalBook || false
  );

  const modalRef = useRef();

  const handleSave = async () => {
    setIsLoading(true);

    const numericPrice = parseInt(price * 1000);

    if (name.trim().length <= 3) {
      toast.error("Bạn phải nhập tên sản phẩm với ít nhất 4 ký tự!");
      setIsLoading(false);
      return;
    }

    if (numericPrice > 1000000) {
      const userConfirmed = window.confirm(
        "Bạn đang nhập giá trị hơn 1 triệu, bạn có muốn xác nhận?"
      );
      if (!userConfirmed) {
        setIsLoading(false);
        return;
      }
    } else if (numericPrice <= 50000 && !(numericPrice <= 0 || price <= 0)) {
      const userConfirmed = window.confirm(
        "Bạn đang nhập giá trị thấp hơn 50000đ, bạn có muốn xác nhận?"
      );
      if (!userConfirmed) {
        setIsLoading(false);
        return;
      }
    }

    if (numericPrice <= 0 || price <= 0) {
      toast.error("Xin vui lòng nhập một giá trị nhất định cho giá tiền!");
      setIsLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", product._id);
      formData.append("name", name);
      formData.append("author", author);
      formData.append("desc", desc);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("category", category);
      formData.append("popular", popular);
      formData.append("isAudio", isAudio);
      formData.append("isEbook", isEbook);
      formData.append("isFlipBook", isFlipBook);
      formData.append("isNormalBook", isNormalBook);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post(
        `${backend_url}/api/product/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token,
          },
        }
      );

      if (res.data.success) {
        toast.success("Cập nhật thành công!");
        onUpdated();
        onClose();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Lỗi khi cập nhật sản phẩm!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="bg-white p-6 px-12 w-[100%] rounded-md max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h3>
        <label className="block text-sm font-medium text-gray-700">
          Tên sản phẩm
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên sản phẩm"
          className="mb-2 w-full p-2 border rounded"
        />
        <label className="block text-sm font-medium text-gray-700">
          Tên tác giả
        </label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Tên tác giả"
          className="mb-2 w-full p-2 border rounded"
        />
        <label className="block text-sm font-medium text-gray-700">
          Mô tả sản phẩm
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Mô tả"
          className="mb-2 w-full p-2 border rounded"
          rows={3}
        />
        <label className="block text-sm font-medium text-gray-700">
          Giá tiền (Theo hàng nghìn)
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min={0}
          max={100000}
          placeholder="Nhập giá tiền... vd: 20, 100, 200,... "
          className="mb-2 w-full p-2 border rounded"
        />
        <label className="block text-sm font-medium text-gray-700">
          Khuyến mãi (%)
        </label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          min={0}
          max={100}
          placeholder="Giảm giá (%)"
          className="mb-2 w-full p-2 border rounded"
        />
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

        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={popular}
              onChange={(e) => setPopular(e.target.checked)}
            />
            Nổi bật
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={isAudio}
              onChange={(e) => setIsAudio(e.target.checked)}
            />
            Audio
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={isEbook}
              onChange={(e) => setIsEbook(e.target.checked)}
            />
            Ebook
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={isFlipBook}
              onChange={(e) => setIsFlipBook(e.target.checked)}
            />
            FlipBook
          </label>
          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={isNormalBook}
              onChange={(e) => setIsNormalBook(e.target.checked)}
            />
            Bản in
          </label>
        </div>

        <label className="text-sm font-medium text-gray-700">
          Ảnh sản phẩm
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
          }}
          className="w-full mb-2"
        />

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-auto max-h-64 object-contain mb-4 rounded-md border"
          />
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Huỷ
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className={`px-6 py-2 rounded-md transition duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${
      isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-secondary text-white hover:bg-secondary focus:ring-secondary"
    }`}
          >
            {isLoading ? "Đang xử lý..." : "Lưu sản phẩm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
