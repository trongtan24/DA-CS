import React from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { TbTrash } from "react-icons/tb";
import { toast } from "react-toastify";
import { ScrollToTopNav, Titles } from "../components";
import { NavLink, useParams } from "react-router-dom";

const GuestOrders = () => {
  const { backendUrl, navigate, toggleLogin, getProducts } =
    useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const loadOrderData = async () => {
    setIsLoading(true);
    try {
      if (!token) {
        setIsLoading(false);
        return;
      }

      const res = await axios.post(
        backendUrl + "/api/order/guestorders",
        {},
        { headers: { token } }
      );

      if (res.data.success) {
        const orderItem = res.data.order;
        setOrder([orderItem]);
        const allItems = orderItem.items.map((item) => ({
          ...item,
          status: orderItem.status,
          payment: orderItem.payment,
          paymentMethod: orderItem.paymentMethod,
          created_date: orderItem.created_date,
        }));
        setOrderData(allItems);

        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrder = async (token) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        backendUrl + "/api/order/guestcancelorder",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await loadOrderData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (isLoading) {
    return (
      <section className="max-padd-container py-8 !pb-32 bg-white rounded-xl">
        <div className="">
          <Titles
            title1={"Đơn hàng"}
            title2={""}
            titleStyle1={""}
            titleStyle2={""}
          />
          <div className="mt-8">
            <div className="flexCenter flex-col gap-6 py-32">
              <h3 className="bold-24">Đang xử lý đơn hàng..</h3>
              <p className="text-gray-500">Vui lòng chờ để xử lý xong!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!token) {
    return (
      <section className="max-padd-container py-8 bg-white rounded-xl">
        <Titles
          title1={"Đơn hàng"}
          title2={""}
          titleStyle1={""}
          titleStyle2={""}
        />
        <div className="">
          <div className="mt-8">
            <div className="flexCenter flex-col gap-6 py-32">
              <h3 className="bold-24">Bạn không đủ điều kiện</h3>
              <p className="text-gray-500">
                Vui lòng kiểm tra lại gmail hoặc thông báo với admin!
              </p>
              <button
                onClick={() => navigate("/")}
                className="btn-secondaryToOne !px-4 !py-2 text-sm"
                style={{ width: "fit-content" }}
              >
                Quay về trang chủ
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-padd-container pt-8 pb-32 bg-primary rounded-xl">
      <div className="pb-12">
        <div className="flex flex-col items-center gap-4 s:flexBetween s:flex-row bg-white rounded-xl p-6 border border-gray-300">
          <Titles
            title1={"Đơn hàng"}
            title2={""}
            titleStyle1={""}
            titleStyle2={""}
          />
          <button
            onClick={loadOrderData}
            className="btn-secondaryToOne !px-1.5 !py-2 text-xs "
          >
            Cập nhật đơn hàng
          </button>
        </div>
        {order.length === 0 ? (
          <div className="flexCenter flex-col mt-8 gap-6 py-24">
            <h3 className="bold-24">Bạn chưa có đơn hàng nào</h3>
            <p className="text-gray-500">
              Hãy mua sắm ngay để có những trải nghiệm tuyệt vời!
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="btn-secondaryToOne !px-4 !py-2 text-sm"
              style={{ width: "fit-content" }}
            >
              Mua sắm ngay
            </button>
          </div>
        ) : (
          order.map((orderItem) => (
            <div
              key={orderItem._id}
              className="bg-white border border-gray-300 rounded-lg p-4 mt-8"
            >
              <div className="hidden sm:flexBetween mb-2">
                <p className="text-sm text-gray-700">
                  <strong>Đơn hàng:</strong> #{orderItem._id}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Ngày tạo:</strong>{" "}
                  {new Date(orderItem.created_date).toLocaleString()}
                </p>
              </div>

              {orderItem.items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start sm:border-t border-gray-300 py-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex flex-col flex-grow">
                    <h5 className="font-medium text-base line-clamp-1">
                      {item.name}
                    </h5>
                    <div className="flex gap-x-4 text-sm text-gray-600">
                      <span>Giá: {item.price.toLocaleString()}đ</span>
                      <span>Số lượng: {item.amount}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center border-t border-gray-300 pt-4 mt-2">
                <div className="text-sm">
                  <p>
                    <strong className="text-black">Trạng thái:</strong>{" "}
                    <span
                      className={`${
                        orderItem.status === "Chờ xác nhận"
                          ? "text-red-600"
                          : orderItem.status === "Đóng gói"
                          ? "text-orange-600"
                          : orderItem.status === "Đang giao"
                          ? "text-yellow-600"
                          : orderItem.status === "Đã hoàn tất"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {orderItem.status}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-black">Thanh toán:</strong>{" "}
                    {orderItem.payment ? (
                      <span className="text-green-600">Đã thanh toán</span>
                    ) : (
                      <span className="text-red-600">Chưa thanh toán</span>
                    )}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-black">Phương thức:</strong>{" "}
                    {orderItem.paymentMethod}
                  </p>
                  <p className="text-gray-700">
                    <strong className="text-black">Tổng (Sau VAT):</strong>{" "}
                    {orderItem.amount.toLocaleString()}đ
                  </p>
                </div>

                <div className="flex gap-4">
                  {/* <button
                    className={`flexCenter gap-1 cursor-pointer hover:text-blue-500 transition-all ${
                      !(
                        orderItem.paymentMethod === "MOMO" &&
                        !orderItem.payment &&
                        orderItem.status !== "Huỷ"
                      )
                        ? "!hidden"
                        : ""
                    }`}
                    onClick={() => {}}
                  >
                    Thanh toán lại <IoMdRefresh />
                  </button> */}
                  <button
                    className={`flexCenter gap-1 cursor-pointer hover:text-red-500 transition-all ${
                      new Date() > new Date(orderItem.expired_date) ||
                      orderItem.status === "Huỷ" ||
                      orderItem.status === "Đã hoàn tất" ||
                      orderItem.status === "Đang giao"
                        ? "!hidden"
                        : ""
                    }`}
                    onClick={() => {
                      if (
                        confirm("Bạn có chắc chắn muốn huỷ đơn hàng này không?")
                      ) {
                        deleteOrder(token);
                      }
                    }}
                  >
                    Huỷ <TbTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default GuestOrders;
