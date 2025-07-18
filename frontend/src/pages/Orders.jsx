import React, { use } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { TbTrash } from "react-icons/tb";
import { toast } from "react-toastify";
import { IoMdRefresh } from "react-icons/io";
import { Titles } from "../components";

const Orders = () => {
  const { backendUrl, token, navigate, toggleLogin, getProducts } =
    useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderOld, setOrderOld] = useState([]);
  const [orderCancel, setOrderCancel] = useState([]);
  const [state, setState] = useState("new");
  const [isLoading, setIsLoading] = useState(false);

  const loadOrderData = async () => {
    setIsLoading(true);
    try {
      if (!token) {
        return null;
      }
      const res = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        let allOrders = [];
        res.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["created_date"] = order.date || order.created_date;
          });
          allOrders.push(order);
        });
        setOrderData(allOrders.filter((o) => o.status !== "Huỷ").reverse());
        setOrder(allOrders.filter((o) => o.status !== "Huỷ").reverse());
        setOrderOld(
          [...allOrders]
            .reverse()
            .filter((o) => o.status !== "Huỷ")
            .reverse()
        );
        setOrderCancel(allOrders.filter((o) => o.status === "Huỷ").reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    setIsLoading(true);

    try {
      if (!token) {
        return null;
      }
      const res = await axios.post(
        backendUrl + "/api/order/usercancelorder",
        { orderId },
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await loadOrderData();
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

  const verifyOrderPayment = async (orderId, amount) => {
    setIsLoading(true);
    try {
      if (!token) {
        return null;
      }
      const res = await axios.post(backendUrl + "/api/order/momostatus", {
        orderId,
        amount,
      });
      if (res.data.success) {
        toast.success(res.data.momoRes);
        await loadOrderData();
      } else {
        toast.error(res.data.momoRes);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  useEffect(() => {
    let filter;
    if (state === "new") {
      filter = order;
    } else if (state === "old") {
      filter = orderOld;
    } else if (state === "completed") {
      filter = order.filter((o) => o.status === "Đã hoàn tất");
    } else if (state === "incomplete") {
      filter = order.filter((o) => o.status !== "Đã hoàn tất");
    } else if (state === "payed") {
      filter = order.filter((o) => o.payment === true);
    } else if (state === "notpay") {
      filter = order.filter((o) => o.payment === false);
    } else if (state === "cancel") {
      filter = orderCancel;
    }
    setOrderData(filter);
  }, [order, state]);

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

  if (!token && !isLoading) {
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
            <div className="flexCenter flex-col gap-6 py-32 rounded-xl">
              <h3 className="bold-24">Bạn chưa đăng nhập</h3>
              <p className="text-gray-500">
                Hãy đăng nhập để trải nghiệm tính năng này!
              </p>
              <button
                onClick={() => {
                  toggleLogin();
                }}
                className="btn-secondaryToOne !px-4 !py-2 text-sm rounded-xl"
                style={{ width: "fit-content" }}
              >
                Đăng nhập ngay!
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
        <div className="flexBetween bg-white rounded-xl p-6 border border-gray-300">
          <Titles
            title1={"Đơn hàng"}
            title2={""}
            titleStyle1={""}
            titleStyle2={""}
          />
          <select
            onChange={(e) => setState(e.target.value)}
            value={state}
            className=" bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-200 cursor-pointer"
          >
            <option value="new">Mới nhất</option>
            <option value="old">Cũ nhất</option>
            <option value="completed">Hoàn thành</option>
            <option value="incomplete">Chưa hoàn thành</option>
            <option value="payed">Thanh toán</option>
            <option value="notpay">Chưa thanh toán</option>
            <option value="cancel">Đã huỷ</option>
          </select>
          <button
            onClick={loadOrderData}
            className="btn-secondaryToOne !px-1.5 !py-2 text-xs "
          >
            Cập nhật đơn hàng
          </button>
        </div>
        {orderData.length === 0 ? (
          <div className="flexCenter flex-col mt-8 gap-6 py-24">
            <h3 className="bold-24">Không tìm thấy đơn hàng</h3>
            <p className="text-gray-500">
              {state === "notcancel" && "Bạn chưa có đơn hàng nào còn tồn tại."}
              {state === "new" && "Bạn chưa có đơn hàng mới."}
              {state === "old" && "Bạn chưa có đơn hàng cũ."}
              {state === "completed" && "Bạn chưa có đơn hàng hoàn thành nào."}
              {state === "incomplete" &&
                "Bạn chưa có đơn hàng chưa hoàn thành nào."}
              {state === "payed" && "Bạn chưa có đơn hàng đã thanh toán nào."}
              {state === "notpay" &&
                "Bạn chưa có đơn hàng chưa thanh toán nào."}
              {state === "cancel" && "Bạn chưa huỷ đơn hàng nào."}
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
          orderData.map((orderItem) => (
            <div
              key={orderItem._id}
              className="bg-white border border-gray-300 rounded-lg p-4 mt-8"
            >
              <div className="block sm:flexBetween mb-2">
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
                  className="flex gap-4 items-start border-t border-gray-300 py-4"
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
                          : orderItem.status === "Huỷ"
                          ? "text-red-600"
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
                    onClick={() => {verifyOrderPayment(orderItem._id, orderItem.amount)}}
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
                        deleteOrder(orderItem._id);
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

export default Orders;
