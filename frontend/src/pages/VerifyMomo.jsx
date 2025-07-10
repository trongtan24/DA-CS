import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const VerifyMomo = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setCartItems, backendUrl, getProducts } = useContext(ShopContext);

  useEffect(() => {
    const verify = async () => {
      const orderId = params.get("orderId");
      const resultCode = params.get("resultCode");
      const amount = params.get("amount");

      if (!orderId) return;

      try {
        const res = await axios.post(backendUrl + "/api/order/momostatus", {
          orderId,
          amount,
        });

        if (res.data.momoRes && res.data.momoRes.resultCode === 0) {
          toast.success("Thanh toán thành công!");
          setCartItems({});
        } else {
          alert("Thanh toán thất bại hoặc chưa xác nhận.");
        }
        navigate("/orders");
      } catch (err) {
        console.error("Xác thực thất bại:", err);
        alert("Có lỗi xảy ra khi xác thực thanh toán.");
      }
    };

    verify();
  }, [params, navigate]);

  return (
    <div className="max-padd-container !py-32 text-center rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-4 py-32">
        Đang xác thực thanh toán MoMo...
      </h2>
      <p>Vui lòng đợi trong giây lát.</p>
    </div>
  );
};

export default VerifyMomo;
