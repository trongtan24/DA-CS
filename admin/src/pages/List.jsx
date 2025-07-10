import axios from "axios";
import React, { useState, useEffect } from "react";
import { backend_url } from "../App";
import { TbTrash, TbSearch } from "react-icons/tb";
import { toast } from "react-toastify";
import { EditModal, AddModal } from "../components";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const openModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const fetchList = async (setSearch) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${backend_url}/api/product/list`);
      if (res.data.success) {
        setList([...res.data.products].reverse());
        setSearchList([...res.data.products].reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setSearchList(list);
    } else {
      const filtered = list.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      setSearchList(filtered);
    }
  }, [search, list]);

  const deleteProduct = async (id) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backend_url}/api/product/delete`,
        { id },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  if (!token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center border bg-white py-4 rounded-xl">
            Danh Sách Sản Phẩm
          </h2>
          <div className="bg-white rounded-xl text-center text-gray-500 p-6">
            Đang xử lý...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center border bg-white py-4 rounded-xl">
          Danh Sách Sản Phẩm
        </h2>

        <div className="flexCenter gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TbSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 transition"
          >
            + Thêm sản phẩm
          </button>
          <button
            onClick={() => {
              fetchList();
              setSearch("");
            }}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 transition"
          >
            Làm mới
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 text-center font-semibold text-sm text-white bg-secondary py-3 px-4">
            <div>Hình ảnh</div>
            <div className="col-span-2 text-left">Tên sản phẩm</div>
            <div>Loại</div>
            <div>Giá tiền</div>
            <div>Đã bán</div>
            <div>Xoá</div>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {" "}
            {/* dùng overflow vs max height để scroll */}
            {searchList.length > 0 ? (
              searchList.map((item) => (
                <div
                  key={item._id}
                  onClick={() => openModal(item)}
                  className="grid grid-cols-7 items-center text-center border-t border-gray-200 py-3 px-4 hover:bg-gray-100 transition duration-200 cursor-pointer"
                >
                  <div className="flex justify-center">
                    <img
                      src={item.image}
                      alt="product"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div className="col-span-2 text-left text-sm font-medium text-gray-900">
                    {item.name}
                  </div>
                  <p className="text-sm text-gray-700">{item.category}</p>
                  <p className="text-sm font-semibold text-green-600">
                    {item.price.toLocaleString()}đ
                  </p>
                  <p className="text-sm text-gray-700">{item.sales}</p>
                  <div className="flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        confirm(`Bạn có muốn xoá ${item.name}`) &&
                          deleteProduct(item._id);
                      }}
                      className="text-xl text-gray-500 hover:text-red-500 transition duration-200"
                      aria-label={`Xóa sản phẩm ${item.name}`}
                    >
                      <TbTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 p-6">
                Không có sản phẩm nào.
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && editingProduct && (
        <EditModal
          product={editingProduct}
          token={token}
          onClose={closeModal}
          onUpdated={fetchList}
        />
      )}
      {isAddModalOpen && (
        <AddModal
          token={token}
          onClose={() => setIsAddModalOpen(false)}
          onCreated={fetchList}
        />
      )}
    </div>
  );
};

export default List;
