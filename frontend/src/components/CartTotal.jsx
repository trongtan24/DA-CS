import React, { useContext } from "react";
import { Titles } from "./";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const {
    books,
    navigate,
    cartItems,
    updateAmount,
    getCartTotalPrice,
    deliveryCharges,
    VAT,
  } = useContext(ShopContext);

  const subTotal = getCartTotalPrice();
  const vatAmount = (subTotal + deliveryCharges) * VAT;
  const AfterVAT =
    Math.round((subTotal + deliveryCharges + vatAmount) / 100) * 100;

  return (
    <div className="w-full bg-white p-6 rounded-lg border border-gray-300 shadow-sm">
      <div className="flexCenter mb-4">
        <Titles
          title1={"Tổng chi phí"}
          title2={""}
          titleStyle1={"text-xl font-bold"}
          titleStyle2={"h3"}
        />
      </div>

      <div className="space-y-3">
        <div className="flex flex-col s:flex-row s:flexBetween">
          <span className="text-gray-600">Tổng giá sản phẩm:</span>
          <span className="font-medium">{subTotal.toLocaleString()}đ</span>
        </div>

        <div className="flex flex-col s:flex-row s:flexBetween">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="font-medium">
            {subTotal === 0 ? "0" : `${deliveryCharges.toLocaleString()}đ`}
          </span>
        </div>

        <div className="flex flex-col s:flex-row s:flexBetween">
          <span className="text-gray-600">VAT:</span>
          <span className="font-medium">
            {subTotal === 0 ? "0" : `${(VAT * 100).toLocaleString()}%`}
          </span>
        </div>

        <div className="border-t border-gray-300 my-3"></div>

        <div className="flex flex-col s:flex-row s:flexBetween">
          <span className="text-lg font-bold">Tổng (Sau VAT):</span>
          <span className="text-lg font-bold">
            {subTotal === 0 ? "0" : AfterVAT.toLocaleString()}đ
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
