import React, { useContext, useEffect, useState } from "react";
import { CartTotal, ScrollToTop, Titles } from "../components";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    books,
    getProducts,
    navigate,
    token,
    cartItems,
    setCartItems,
    getCartTotalPrice,
    deliveryCharges,
    backendUrl,
    userInfo,
    getCartCount,
    VAT,
  } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState("cod");
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({
    name: "", // họ tên
    email: "", // email
    phone: "", // sdt
    city: "", // tp
    district: "", // quận huyện
    ward: "", // phường xã
    location: "", // địa chỉ cụ thể
  });

  const subTotal = getCartTotalPrice();
  const vatAmount = (subTotal + deliveryCharges) * VAT;

  const AfterVAT =
    Math.round((subTotal + deliveryCharges + vatAmount) / 10) * 10;

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
        city: userInfo.address?.city || "",
        district: userInfo.address?.district || "",
        ward: userInfo.address?.ward || "",
        location: userInfo.address?.location || "",
      });
    }
  }, [userInfo]);

  const validateField = (fieldName, value) => {
    let error = "";

    const isText = /^[\p{L}\s]*$/u; // \p{L} cho phép tất cả các chữ, u - unicode
    const nameRegex = /^(?:\p{L}{2,})(?: \p{L}{2,})*$/u;

    // Common empty field check
    if (!value.trim() && fieldName !== "location") {
      error = `Vui lòng nhập ${
        fieldName === "name"
          ? "họ và tên"
          : fieldName === "phone"
          ? "số điện thoại"
          : fieldName === "email"
          ? "email"
          : fieldName === "city"
          ? "tỉnh/thành phố"
          : fieldName === "district"
          ? "quận/huyện"
          : fieldName === "ward"
          ? "phường/xã"
          : ""
      }!`;
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
      return !error;
    }

    switch (fieldName) {
      case "name":
        if (value.trim().length < 2) {
          errors.name = "Tên ít nhất phải 2 ký tự";
        }
        if (value.trim().length !== 0) {
          if (!isText.test(value)) {
            errors.name = `Tên phải dưới dạng chữ!`;
          } else if (!nameRegex.test(value)) {
            errors.name = `Vui lòng nhập ít nhất 2 ký tự mỗi từ!`;
          }
        }
        // else if (value.trim().split(/\s+/).length < 2) { -- check phải nhập cả họ và tên
        //   error = "Vui lòng nhập cả họ và tên";
        // } else if (value.length < 4) {
        //   error = "Tên phải có ít nhất 4 ký tự";
        // }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email không hợp lệ";
        }
        break;

      case "phone":
        if (
          !/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(
            value
          )
        ) {
          error = "Số điện thoại không hợp lệ";
        }
        break;

      case "city":
      case "district":
      case "ward":
        if (value.length < 2) {
          error = "Vui lòng nhập đầy đủ thông tin";
        }
        break;

      case "location":
        if (value.trim().length < 5 && value.trim().length > 0) {
          error = "Địa chỉ quá ngắn";
        }
        break;
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return !error;
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
    validateField(name, value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = books.find((book) => book._id === itemId);
          if (itemInfo) {
            orderItems.push({ ...itemInfo, amount: cartItems[itemId] });
          }
        }
      }
      let orderData;
      if (token) {
        // user
        orderData = {
          userInfo: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
          },
          items: orderItems,
          amount: AfterVAT,
          address: {
            city: formData.city,
            district: formData.district,
            ward: formData.ward,
            location: formData.location,
          },
        };
      } else {
        // khách
        orderData = {
          guestInfo: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
          },
          items: orderItems,
          amount: AfterVAT,
          address: {
            city: formData.city,
            district: formData.district,
            ward: formData.ward,
            location: formData.location,
          },
        };
      }

      switch (method) {
        case "cod":
          if (!token) {
            const res = await axios.post(
              backendUrl + "/api/order/placecodguest",
              orderData
            );
            if (res.data.success) {
              setCartItems({});
              await getProducts(); // lười
              navigate(res.data.redirectUrl);
              toast.success(res.data.message);
            } else {
              toast.error(res.data.message);
            }
            return;
          }

          const res = await axios.post(
            backendUrl + "/api/order/placecod",
            orderData,
            { headers: { token } }
          );
          if (res.data.success) {
            setCartItems({});
            await getProducts();
            navigate("/orders");
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
          break;

        case "momo":
          if (!token) {
            const resmomo = await axios.post(
              backendUrl + "/api/order/placemomoguest",
              orderData
            );
            if (resmomo.data.success) {
              window.location.href = resmomo.data.payUrl;
            } else {
              toast.error(resmomo.data.message);
            }
            return;
          }
          const resmomo = await axios.post(
            backendUrl + "/api/order/placemomo",
            orderData,
            { headers: { token } }
          );
          if (resmomo.data.success) {
            window.location.href = resmomo.data.payUrl;
          } else {
            toast.error(resmomo.data.message);
          }
          return;

        default:
          toast.error("Vui lòng chọn phương thức thanh toán!");
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="max-padd-container py-8 !pb-32 bg-white rounded-xl">
        <div className="">
          <Titles
            title1={"Thông tin"}
            title2={""}
            titleStyle1={""}
            titleStyle2={""}
          />
          <div className="mt-8">
            <div className="flexCenter flex-col gap-6 py-32">
              <h3 className="bold-24">Đang xử lý thanh toán...</h3>
              <p className="text-gray-500">Vui lòng chờ để xử lý xong!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (getCartCount() === 0) {
    return (
      <section className="max-padd-container py-8 pb-32 bg-white rounded-xl">
        <Titles
          title1={"Đơn hàng"}
          title2={""}
          titleStyle1={""}
          titleStyle2={""}
        />
        <div className="">
          <div className="mt-8">
            <div className="flexCenter flex-col gap-6 py-32">
              <h3 className="bold-24">Bạn chưa có sản phẩm nào</h3>
              <p className="text-gray-500">
                Hãy mua sắm ngay để có những trải nghiệm tuyệt vời!
              </p>
              <ScrollToTop to="/shop" className="btn-secondaryToOne">
                Mua sắm ngay!
              </ScrollToTop>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-padd-container py-8 pb-16 bg-white rounded-xl">
      <Titles title1={"Thông tin đặt hàng"} titleStyle1={"h3"} />
      <form onSubmit={onSubmitHandler}>
        <div className="flex flex-col xl:flex-row gap-20 xl:gap-28">
          {/* Left */}
          <div className="flex flex-1 flex-col gap-6 text-[95%]">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-nowrap">
              <label className="md:pl-0 min-w-[150px]" htmlFor="name">
                Họ và tên
              </label>
              <div className="flex flex-col w-full">
                <input
                  onChange={(e) => {
                    onChangeHandler(e);
                    validateField(e.target.name, e.target.value);
                  }}
                  onBlur={(e) => {
                    validateField(e.target.name, e.target.value);
                  }}
                  id="name"
                  value={formData.name}
                  type="text"
                  name="name"
                  placeholder="Nhập họ và Tên"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-full"
                />
                {errors.name && (
                  <>
                    <div className="mt-2 text-sm text-red-500">
                      {errors.name}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-nowrap">
              <label className="md:pl-0 min-w-[150px]" htmlFor="email">
                Email
              </label>
              <div className="flex flex-col w-full">
                <input
                  onChange={(e) => {
                    onChangeHandler(e);
                    validateField(e.target.name, e.target.value);
                  }}
                  onBlur={(e) => {
                    validateField(e.target.name, e.target.value);
                  }}
                  disabled={token ? true : false}
                  id="email"
                  value={formData.email}
                  type="email"
                  name="email"
                  placeholder="Nhập email"
                  required
                  className={`ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm ${
                    token ? "bg-primaryDark" : "bg-primary"
                  } outline-none w-full`}
                />
                {errors.email && (
                  <>
                    <div className="mt-2 text-sm text-red-500">
                      {errors.email}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-nowrap">
              <label className="md:pl-0 min-w-[150px]" htmlFor="phone">
                Số điện thoại
              </label>
              <div className="flex flex-col w-full">
                <input
                  onChange={(e) => {
                    onChangeHandler(e);
                    validateField(e.target.name, e.target.value);
                  }}
                  onBlur={(e) => {
                    validateField(e.target.name, e.target.value);
                  }}
                  id="phone"
                  value={formData.phone}
                  type="text"
                  name="phone"
                  placeholder="Nhập số điện thoại"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-full"
                />
                {errors.phone && (
                  <>
                    <div className="mt-2 text-sm text-red-500">
                      {errors.phone}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-nowrap">
              <label className="md:pl-0 min-w-[150px]" htmlFor="city">
                Tỉnh/Thành phố
              </label>
              <div className="flex flex-col w-full">
                <input
                  onChange={(e) => {
                    onChangeHandler(e);
                    validateField(e.target.name, e.target.value);
                  }}
                  onBlur={(e) => {
                    validateField(e.target.name, e.target.value);
                  }}
                  id="city"
                  value={formData.city}
                  type="text"
                  name="city"
                  placeholder="Nhập tỉnh/thành phố"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-full"
                />
                {errors.city && (
                  <>
                    <div className="mt-2 text-sm text-red-500">
                      {errors.city}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-nowrap">
              <label className="md:pl-0 min-w-[150px]" htmlFor="ward">
                Phường/Xã
              </label>
              <div className="flex flex-col w-full">
                <input
                  onChange={(e) => {
                    onChangeHandler(e);
                    validateField(e.target.name, e.target.value);
                  }}
                  onBlur={(e) => {
                    validateField(e.target.name, e.target.value);
                  }}
                  id="ward"
                  value={formData.ward}
                  type="text"
                  name="ward"
                  placeholder="Nhập phường/xã"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-full"
                />
                {errors.ward && (
                  <>
                    <div className="mt-2 text-sm text-red-500">
                      {errors.ward}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-nowrap">
              <label className="md:pl-0 min-w-[150px]" htmlFor="district">
                Quận/Huyện
              </label>
              <div className="flex flex-col w-full">
                <input
                  onChange={(e) => {
                    onChangeHandler(e);
                    validateField(e.target.name, e.target.value);
                  }}
                  onBlur={(e) => {
                    validateField(e.target.name, e.target.value);
                  }}
                  id="district"
                  value={formData.district}
                  type="text"
                  name="district"
                  placeholder="Nhập quận/huyện"
                  required
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-full"
                />
                {errors.district && (
                  <>
                    <div className="mt-2 text-sm text-red-500">
                      {errors.district}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-nowrap">
              <label className="md:pl-0 min-w-[150px]" htmlFor="location">
                Địa chỉ cụ thể
              </label>
              <div className="flex flex-col w-full">
                <input
                  onChange={(e) => {
                    onChangeHandler(e);
                    validateField(e.target.name, e.target.value);
                  }}
                  onBlur={(e) => {
                    validateField(e.target.name, e.target.value);
                  }}
                  id="location"
                  value={formData.location}
                  type="text"
                  name="location"
                  placeholder="Nhập địa chỉ cụ thể"
                  className="ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm bg-primary outline-none w-full"
                />
                {errors.location && (
                  <>
                    <div className="mt-2 text-sm text-red-500">
                      {errors.location}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-1 flex-col gap-4">
            <CartTotal />

            {/* Method */}
            <div className="my-6">
              <h3 className="bold-20 mb-5 text-center">
                Phương thức thanh toán
              </h3>
              <div className="flex items-center flex-col s:flex-row s:flexCenter gap-6 s:gap-12">
                <div
                  onClick={() => setMethod("momo")}
                  className={`${
                    method === "momo" ? "btn-secondary" : "btn-white"
                  } !py-1 text-xs cursor-pointer`}
                >
                  Momo
                </div>
                <div
                  onClick={() => setMethod("cod")}
                  className={`${
                    method === "cod" ? "btn-secondary" : "btn-white"
                  } !py-1 text-xs cursor-pointer`}
                >
                  Thanh toán khi nhận hàng
                </div>
              </div>
            </div>

            <div className="flexCenter">
              <button type="submit" className="btn-secondaryOne">
                Xác nhận đặt hàng
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PlaceOrder;
