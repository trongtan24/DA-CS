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
  } = useContext(ShopContext);

  const discounted = (original, discount = 0) => {
    const decimalDiscount = discount / 100;
    const rawPrice = original * (1 - decimalDiscount);
    return Math.round(rawPrice / 100) * 100;
  };

  return (
    <section className="max-padd-container pt-8 pb-32 bg-primary rounded-xl">
      <div className="">
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
                style={{ width: "fit-content" }}
              >
                Mua sắm ngay
              </button>
            </div>
          ) : (
            <div className="bg-white border border-gray-300 rounded-lg p-4 mt-8">
              <div className="grid grid-cols-12 gap-x-3 pb-4 border-b border-gray-200">
                <div className="col-span-6 h3 line-clamp-1">Sản phẩm</div>
                <div className="col-span-3 flex justify-center h3 line-clamp-1">
                  Số lượng
                </div>
                <div className="col-span-2 flex justify-center h3 line-clamp-1">
                  Thành tiền
                </div>
                <div className="col-span-1 flex justify-end h3 line-clamp-1">
                  Xoá
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {books.map((book) => {
                  if (cartItems[book._id] > 0) {
                    return (
                      <div
                        key={book._id}
                        className="grid grid-cols-12 gap-x-3 py-4"
                      >
                        <div className="col-span-6 flex gap-4">
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
                              <p className="text-sm text-gray-500 mb-1.5">
                                {book.category}
                              </p>
                            </div>
                            <h4 className="">
                              {discounted(
                                book.price,
                                book.discount
                              ).toLocaleString()}
                              đ
                            </h4>
                          </div>
                        </div>

                        <div className="col-span-3 flex items-center justify-center">
                          <div className="flex items-center ring-1 ring-slate-900/5 rounded-full overflow-hidden bg-primary">
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

                        <div className="col-span-2 flex items-center justify-center text-lg font-medium">
                          {(
                            discounted(book.price, book.discount) *
                            cartItems[book._id]
                          ).toLocaleString()}
                          đ
                        </div>

                        <div className="col-span-1 flex items-center justify-end">
                          <button
                            onClick={() => updateAmount(book._id, 0)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <TbTrash className="text-xl text-gray-500 hover:text-red-500 transition-colors" />
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>

              <div className="flex justify-center items-center mt-20">
                <div className="w-full flex flex-col items-center">
                  <CartTotal />
                  <ScrollToTop
                    to={"/place-order"}
                    className="btn-secondaryOne mt-7 !px-8 s:!px-16"
                  >
                    Đặt hàng
                  </ScrollToTop>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
