import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { TbTrash } from "react-icons/tb";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { Titles, CartTotal } from "../components";
import { ScrollToTop } from "../components";

const Cart = () => {
  const {
    books,
    navigate,
    cartItems,
    updateAmount,
    getCartTotalPrice,
    getCartCount,
    getUniqueCartCount,
    deliveryCharges,
    VAT,
  } = useContext(ShopContext);

  const discounted = (original, discount = 0) => {
    const decimalDiscount = discount / 100;
    const rawPrice = original * (1 - decimalDiscount);
    return Math.round(rawPrice / 100) * 100;
  };

  const subTotal = getCartTotalPrice();
  const vatAmount = (subTotal + deliveryCharges) * VAT;
  const AfterVAT =
    Math.round((subTotal + deliveryCharges + vatAmount) / 100) * 100;

  return (
    <section className="max-padd-container pt-8 pb-32 bg-primary rounded-xl">
      <div>
        <div className="flexBetween bg-white rounded-xl p-6 border border-gray-300">
          <Titles
            title1={"Giỏ hàng"}
            title2={"( " + getUniqueCartCount() + " sản phẩm khác nhau)"}
            titleStyle1={""}
            titleStyle2={""}
          />
        </div>

        <div className="mt-8">
          {getCartCount() <= 0 ? (
            <div className="flexCenter flex-col gap-6 py-32">
              <h3 className="bold-24">Bạn chưa có sản phẩm nào</h3>
              <p className="text-gray-500">
                Hãy mua sắm ngay để có những trải nghiệm tuyệt vời!
              </p>
              <button
                onClick={() => navigate("/")}
                className="btn-secondaryToOne !px-4 !py-2 text-sm"
              >
                Mua sắm ngay
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-300 rounded-lg p-4 mt-8">
              {/* Table Header */}
              <div className="hidden sm:flex justify-between text-sm font-semibold border-b pb-2 text-gray-700">
                <div className="w-2/5 text-[20px]">Sản phẩm</div>
                <div className="w-1/5 text-[20px] text-center">Số lượng</div>
                <div className="w-1/5 text-[20px] text-center">Thành tiền</div>
                <div className="w-1/10 text-[20px] text-end">Xoá</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-gray-300">
                {books.map((book) => {
                  if (cartItems[book._id] > 0) {
                    return (
                      <div
                        key={book._id}
                        className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4"
                      >
                        {/* Product Info */}
                        <div className="flexCenter flex-col sm:justify-start sm:items-start sm:flex-row sm:w-2/5 gap-4">
                          <img
                            src={book.image}
                            alt={book.name}
                            className="w-20 h-28 object-cover rounded"
                          />
                          <div className="flex flex-col justify-between">
                            <div>
                              <h5 className="h5 !my-0 line-clamp-2">
                                {book.name}
                              </h5>
                              <p className="flexCenter sm:justify-start sm:items-start text-sm text-gray-500 mb-1.5">
                                {book.category}
                              </p>
                            </div>
                            <h4 className="flexCenter sm:justify-start sm:items-start">
                              {discounted(
                                book.price,
                                book.discount
                              ).toLocaleString()}
                              đ
                            </h4>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="sm:w-1/5 flexCenter">
                          <div className="flex items-center ring-1 ring-slate-900/5 rounded-full bg-primary overflow-hidden">
                            <button
                              onClick={() =>
                                cartItems[book._id] > 1
                                  ? updateAmount(
                                      book._id,
                                      cartItems[book._id] - 1
                                    )
                                  : updateAmount(book._id, cartItems[book._id])
                              }
                              className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-20/50 transition-colors"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <p className="px-3 min-w-[24px] text-center">
                              {cartItems[book._id]}
                            </p>
                            <button
                              onClick={() =>
                                updateAmount(book._id, cartItems[book._id] + 1)
                              }
                              className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-20/50 transition-colors"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>
                        </div>

                        {/* Total Price */}
                        <div className="sm:w-1/5 text-center text-lg font-medium flexCenter">
                          {(
                            discounted(book.price, book.discount) *
                            cartItems[book._id]
                          ).toLocaleString()}
                          đ
                        </div>

                        {/* Remove Button */}
                        <div className="flexCenter sm:w-1/10 text-end">
                          <button
                            onClick={() => updateAmount(book._id, 0)}
                            className="flexCenter gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <div className="sm:hidden">Xoá</div>{" "}
                            <TbTrash className="text-xl text-gray-500 hover:text-red-500 transition-colors" />
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              {/* Total */}
              <div className="flex justify-center items-center mt-20">
                <div className="w-full flex flex-col items-center">
                  <CartTotal />
                  <ScrollToTop
                    to={"/place-order"}
                    className="btn-secondaryOne mt-7 !px-2 xs:!px-8 s:!px-16 text-nowrap"
                  >
                    Thanh toán
                  </ScrollToTop>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed items-center sm:hidden p-1 bottom-0 left-0 right-0 bg-white h-12 z-50 border border-t-gray-300">
        <div className="flexBetween">
          <div className="flex font-bold gap-2">
            <div className="hidden 3xs:flex">Tổng: </div> {AfterVAT.toLocaleString()}đ
          </div>
          <div className="flex">
            <ScrollToTop
              to={"/place-order"}
              className="btn-secondaryOne !px-2 xs:!px-8 s:!px-16 text-nowrap"
            >
              Thanh toán
            </ScrollToTop>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
