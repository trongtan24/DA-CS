import React, { useState, useEffect } from "react";
import { backend_url } from "../App";
import { TfiPackage } from "react-icons/tfi";
import axios from "axios";
import { toast } from "react-toastify";
import { TbSearch } from "react-icons/tb";

const GuestOrder = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchOrders, setSearchOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backend_url}/api/order/listguest`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setOrders([...res.data.guestOrders].reverse());
        setSearchOrders([...res.data.guestOrders].reverse());
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

  const statusHandler = async (e, orderId, method) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${backend_url}/api/order/gueststatus`,
        { orderId, status: e.target.value, method },
        { headers: { token } }
      );
      if (res.data.success) {
        await fetchAllOrders();
        toast.success(res.data.message);
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
      setSearchOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.guestInfo.email.toLowerCase().includes(search.toLowerCase())
      );
      setSearchOrders(filtered);
    }
  }, [search, orders]);

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  if (isLoading) {
    return (
      <div className="pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center border bg-white py-4 rounded-xl">
            Danh Sách Đơn Hàng (Khách)
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border text-center bg-white py-4 rounded-xl">
          Danh Sách Đơn Hàng (Khách)
        </h2>
        <div className="flexCenter gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TbSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm theo email..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary sm:text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              fetchAllOrders();
              setSearch("");
            }}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 transition"
          >
            Làm mới
          </button>
        </div>
        {searchOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            Không có đơn hàng nào
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="max-h-[60vh] overflow-y-auto">
              {Array.isArray(searchOrders) &&
                searchOrders.map((order) => (
                  <div key={order._id} className={`py-2 border-t border-gray-200 hover:bg-gray-100 ${order.status === "Huỷ" ? "!bg-red-200/70" : ""}`}>
                    <p className="pb-4 pl-2">
                      <span className="!text-black">orderId:</span> #{order._id}
                    </p>
                    <div
                      key={order._id}
                      className="grid grid-cols-1 sm:grid-cols-2 mdlg:grid-cols-[0.5fr_2fr_1fr_0.5fr_1fr] p-2 gap-4 items-start p-4transition duration-200"
                    >
                      <div className="hidden mdlg:flex items-center justify-center p-4 bg-gray-100 rounded-md">
                        <TfiPackage className="text-3xl text-blue-600" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-medium text-gray-700">
                            Sản phẩm:
                          </span>
                          <div className="flex flex-col text-sm text-gray-900">
                            {order.items.map((item, i) => (
                              <p key={i}>
                                {item.name} x {item.amount}
                              </p>
                            ))}
                          </div>
                        </div>
                        <p>
                          <span className="text-sm font-medium text-gray-700">
                            Họ và tên:{" "}
                          </span>
                          <span className="text-sm text-gray-900">
                            {order.guestInfo.name}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm font-medium text-gray-700">
                            Email:{" "}
                          </span>
                          <span className="text-sm text-gray-900">
                            {order.guestInfo.email}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm font-medium text-gray-700">
                            SĐT:{" "}
                          </span>
                          <span className="text-sm text-gray-900">
                            {order.guestInfo.phone}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm font-medium text-gray-700">
                            Địa chỉ:{" "}
                          </span>
                          <span className="text-sm text-gray-900">
                            {`${order.address.city}, ${order.address.ward}, ${
                              order.address.district
                            }${
                              order.address?.location
                                ? `, ${order.address.location}`
                                : ""
                            }`}
                          </span>
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p>
                          <span className="text-sm font-medium text-gray-700">
                            Tổng sản phẩm:{" "}
                          </span>
                          <span className="text-sm text-gray-900">
                            {order.items.length}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm font-medium text-gray-700">
                            Phương thức:{" "}
                          </span>
                          <span className="text-sm text-gray-900">
                            {order.paymentMethod}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm font-medium text-gray-700">
                            Thanh toán:{" "}
                          </span>
                          <span
                            className={`text-sm text-gray-900 ${
                              order.payment
                                ? "!text-green-600"
                                : "!text-red-600"
                            }`}
                          >
                            {order.payment ? "Hoàn thành" : "Chờ"}
                          </span>
                        </p>
                        <p>
                          <span className="text-sm font-medium text-gray-700">
                            Thời gian:{" "}
                          </span>
                          <span className="text-sm text-gray-900">
                            {new Date(order.created_date).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <p>
                        <span className="text-sm font-medium text-gray-700">
                          Giá tiền:{" "}
                        </span>
                        <span className="text-sm font-semibold text-green-600">
                          {order.amount.toLocaleString()}đ
                        </span>
                      </p>
                      <select
                        onChange={(e) =>
                          statusHandler(e, order._id, order.paymentMethod)
                        }
                        value={order.status || "Chờ xác nhận"}
                        className="w-full max-w-36 px-2 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-900 focus:outline-none focus:border-blue-500 transition duration-200"
                      >
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đóng gói">Đóng gói</option>
                        <option value="Đang giao">Đang giao</option>
                        <option value="Đã hoàn tất">Đã hoàn tất</option>
                        <option hidden={true} value="Huỷ">Huỷ</option>
                      </select>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestOrder;
