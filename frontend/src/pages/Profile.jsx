import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { ScrollToTop, Login, Titles } from "../components";
import { toast } from "react-toastify";
import axios from "axios";
import { FaList } from "react-icons/fa";
import {
  FiEdit,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiSave,
  FiX,
  FiShoppingBag,
} from "react-icons/fi";

const Profile = () => {
  const {
    userInfo,
    navigate,
    toggleLogin,
    token,
    setToken,
    setUserInfo,
    getUserInfo,
    backendUrl,
  } = useContext(ShopContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      location: "",
      city: "",
      district: "",
      ward: "",
    },
  });

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setUserInfo(null);
  };

  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
        address: userInfo.address || {
          location: "",
          city: "",
          district: "",
          ward: "",
        },
      });
    }
  }, [userInfo]);

  const validateForm = () => {
    const errors = {};
    const phoneRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

    const isText = /^[\p{L}\s]*$/u; // \p{L} cho phép tất cả các chữ, u - unicode
    const nameRegex = /^(?:\p{L}{2,})(?: \p{L}{2,})*$/u;

    if (formData.name && formData.name.trim().length < 2) {
      errors.name = "Tên ít nhất phải 2 ký tự";
    }

    if (formData.name && formData.name.trim().length !== 0) {
      if (!isText.test(formData.name)) {
        errors.name = `Tên phải dưới dạng chữ!`;
      } else if (!nameRegex.test(formData.name)) {
        errors.name = `Vui lòng nhập ít nhất 2 ký tự mỗi từ!`;
      }
    }

    if (formData.phone !== userInfo.phone && !phoneRegex.test(formData.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    if (
      formData.address.location &&
      formData.address.location.trim().length < 5
    ) {
      errors.location = "Địa chỉ cụ thể phải có ít nhất 5 ký tự";
    }

    if (formData.address.city && formData.address.city.trim().length < 2) {
      errors.city = "Tỉnh/Thành phố phải có ít nhất 2 ký tự";
    }

    if (
      formData.address.district &&
      formData.address.district.trim().length < 2
    ) {
      errors.district = "Quận/Huyện phải có ít nhất 2 ký tự";
    }

    if (formData.address.ward && formData.address.ward.trim().length < 2) {
      errors.ward = "Phường/Xã phải có ít nhất 2 ký tự";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));

      if (addressField === "location") {
        setFormErrors((prev) => ({ ...prev, location: "" }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (name === "phone") {
        setFormErrors((prev) => ({ ...prev, phone: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUnchanged =
      formData.name === userInfo.name &&
      formData.email === userInfo.email &&
      formData.phone === userInfo.phone &&
      formData.address.location === userInfo.address?.location &&
      formData.address.city === userInfo.address?.city &&
      formData.address.district === userInfo.address?.district &&
      formData.address.ward === userInfo.address?.ward;

    if (isUnchanged) {
      setIsEditing(false);
      toast.info("Không có thay đổi nào để cập nhật");
      setFormErrors({});
      return;
    }
    if (!validateForm()) {
      return;
    }
    setFormErrors({});

    setIsUpdating(true);
    try {
      const res = await axios.post(
        backendUrl + "/api/user/update",
        { userId: userInfo._id, user: formData },
        { headers: { token } }
      );
      if (res.data.success) {
        await setUserInfo(res.data.userData);
        await getUserInfo(token);
        toast.success("Cập nhật thông tin thành công!");
      } else {
        toast.error(res.data.message);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Cập nhật thông tin thất bại!");
    } finally {
      setIsUpdating(false);
    }
  };

  if (token && isUpdating) {
    return (
      <section className="max-padd-container py-8 !pb-32 bg-white rounded-xl">
        <div className="flex flex-col items-center justify-center h-full">
          <Titles title1={"Cập nhật thông tin"} titleStyle1={"text-center"} />
          <div className="mt-8 w-full max-w-md rounded-lg p-8 shadow-sm">
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-secondary h-12 w-12"></div>
              </div>
              <h3 className="bold-24 text-gray-800">
                Đang cập nhật thông tin...
              </h3>
              <p className="text-gray-500 text-center">
                Vui lòng chờ trong khi chúng tôi lưu thông tin của bạn
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!token) {
    return (
      <section className="max-padd-container py-8 !pb-32 bg-white rounded-xl">
        <div className="flex flex-col items-center justify-center h-full">
          <Titles title1={"Thông tin cá nhân"} titleStyle1={"text-center"} />
          <div className="mt-8 w-full max-w-md rounded-lg p-8 shadow-sm">
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="bg-primary/10 p-4 rounded-full">
                <FiUser className=" text-3xl" />
              </div>
              <h3 className="bold-24 text-gray-800">Bạn chưa đăng nhập</h3>
              <p className="text-gray-500 text-center">
                Đăng nhập để xem và cập nhật thông tin cá nhân của bạn
              </p>
              <button onClick={toggleLogin} className="btn-secondaryToOne">
                Đăng nhập ngay
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!userInfo) {
    return (
      <section className="max-padd-container py-8 !pb-32 bg-white rounded-xl">
        <div className="flex flex-col items-center justify-center h-full">
          <Titles title1={"Tải thông tin"} titleStyle1={"text-center"} />
          <div className="mt-8 w-full max-w-md rounded-lg p-8 shadow-sm">
            <div className="flex flex-col items-center gap-6 py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <h3 className="bold-24 text-gray-800">Đang tải thông tin</h3>
              <p className="text-gray-500 text-center">
                Vui lòng chờ trong khi chúng tôi tải thông tin cá nhân của bạn
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-padd-container py-8 !pb-16 bg-primary rounded-xl">
      <div className="max-w-6xl mx-auto border-gray-300">
        <div className="bg-white rounded-xl mb-8 py-2 border border-gray-300">
          <Titles
            title1={"Thông tin cá nhân"}
            titleStyle1={"text-center mb-2"}
          />

          {/* timeline */}
          <div className="hidden xs:flex flex-wrap justify-center gap-4 bg-white rounded-xl">
            {userInfo?.created_date && (
              <div className="flex items-center bg-gray-10 border border-gray-300 px-4 py-2 rounded-full text-sm">
                <FiCalendar className="mr-2 " />
                <span>
                  Thành viên từ{" "}
                  {new Date(userInfo.created_date).toLocaleDateString()}
                </span>
              </div>
            )}
            {/* {userInfo?.login_date && (
              <div className="flex items-center bg-gray-10 border border-gray-300 px-4 py-2 rounded-full text-sm">
                <FiClock className="mr-2 " />
                <span>
                  Đăng nhập lần cuối:{" "}
                  {new Date(userInfo.login_date).toLocaleString()}
                </span>
              </div>
            )} */}
            {userInfo?.updated_date && (
              <div className="flex items-center bg-gray-10 border border-gray-300 px-4 py-2 rounded-full text-sm">
                <FiEdit className="mr-2 " />
                <span>
                  Cập nhật vào:{" "}
                  {new Date(userInfo.updated_date).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* user card */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-300">
              {!isEditing ? (
                <>
                  <div className="bg-gradient-to-r border-b border-gray-300 p-6 ">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 bg-gray-100/10 hover:bg-gray-10 px-4 py-2 rounded-full transition-all"
                      >
                        <FiEdit size={16} />
                        <span>Chỉnh sửa</span>
                      </button>
                    </div>
                    <p className="mt-1 opacity-90 ">{userInfo.email}</p>
                  </div>
                  {/* user info */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <FiUser className="" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Họ và tên
                          </h3>
                          <p className="font-medium">{userInfo.name}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <FiMail className="" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Email
                          </h3>
                          <p className="font-medium">{userInfo.email}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <FiPhone className="" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">
                            Số điện thoại
                          </h3>
                          <p className="font-medium">
                            {userInfo.phone || (
                              <span className="text-gray-400">
                                Chưa cập nhật
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                        <FiMapPin className="" />
                        <span>Địa chỉ</span>
                      </h3>
                      {/* check address */}
                      {userInfo.address &&
                      (userInfo.address.city !== "" ||
                        userInfo.address.ward !== "" ||
                        userInfo.address.district !== "" ||
                        userInfo.address.location !== "") ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg">
                          {userInfo.address.city && (
                            <div className="flex items-start gap-4">
                              <span className="bg-white p-3 rounded-md shadow-xs">
                                <FiMapPin size={16} className="" />
                              </span>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                  Tỉnh/Thành phố
                                </h3>
                                <p className="font-medium">
                                  {userInfo.address.city}
                                </p>
                              </div>
                            </div>
                          )}

                          {userInfo.address.district && (
                            <div className="flex items-start gap-3">
                              <span className="bg-white p-3 rounded-md shadow-xs">
                                <FiMapPin size={16} className="" />
                              </span>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                  Quận/Huyện
                                </h3>
                                <p className="font-medium">
                                  {userInfo.address.district}
                                </p>
                              </div>
                            </div>
                          )}

                          {userInfo.address.ward && (
                            <div className="flex items-start gap-3">
                              <span className="bg-white p-3 rounded-md shadow-xs">
                                <FiMapPin size={16} className="" />
                              </span>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                  Phường/Xã
                                </h3>
                                <p className="font-medium">
                                  {userInfo.address.ward}
                                </p>
                              </div>
                            </div>
                          )}

                          {userInfo.address.location && (
                            <div className="flex items-start gap-3 md:col-span-2">
                              <span className="bg-white p-3 rounded-md shadow-xs">
                                <FiMapPin size={16} className="" />
                              </span>
                              <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                  Địa chỉ cụ thể
                                </h3>
                                <p className="font-medium">
                                  {userInfo.address.location}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-gray-10 p-4 rounded-lg text-center text-gray-500">
                          Chưa cập nhật địa chỉ
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                // edit
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Chỉnh sửa thông tin
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200 ${
                            formErrors.name
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          disabled
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200 ${
                            formErrors.phone
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                        <FiMapPin className="" />
                        <span>Địa chỉ</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-lg">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tỉnh/Thành phố
                          </label>
                          <input
                            type="text"
                            name="address.city"
                            value={formData.address.city}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200 ${
                              formErrors.city
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.city && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.city}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Quận/Huyện
                          </label>
                          <input
                            type="text"
                            name="address.district"
                            value={formData.address.district}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200 ${
                              formErrors.district
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.district && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.district}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phường/Xã
                          </label>
                          <input
                            type="text"
                            name="address.ward"
                            value={formData.address.ward}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200 ${
                              formErrors.ward
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.ward && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.ward}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Địa chỉ cụ thể
                          </label>
                          <input
                            type="text"
                            name="address.location"
                            value={formData.address.location}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition duration-200 ${
                              formErrors.location
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {formErrors.location && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormErrors({});
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-10 transition-colors"
                    >
                      <FiX size={16} />
                      <span>Hủy bỏ</span>
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg hover:bg-gray-10 transition-colors disabled:opacity-70"
                      disabled={isUpdating}
                    >
                      <FiSave size={16} />
                      <span>{isUpdating ? "Đang lưu..." : "Lưu thay đổi"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* quick actions sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 top-36">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiShoppingBag className="" />
                <span>Hành động nhanh</span>
              </h3>

              <button
                onClick={() => navigate("/orders")}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-300 hover:bg-gray-10 transition-colors mb-3"
              >
                <span>Xem đơn hàng</span>
                {/* <span className=" text-xs font-medium px-2 py-1 bg-gray-10 rounded-full">
                  {userInfo.orders?.length || 0}
                </span> */}
                <FaList />
              </button>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-300 hover:bg-gray-10 transition-colors mb-3"
                >
                  <span>Chỉnh sửa thông tin</span>
                  <FiEdit className="" />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(false)}
                  className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-300 hover:bg-gray-10 transition-colors mb-3"
                >
                  <span>Huỷ chỉnh sửa thông tin</span>
                  <FiX size={16} />
                </button>
              )}

              <button
                onClick={logout}
                className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-300 hover:bg-gray-10 transition-colors text-red-600"
              >
                <span>Đăng xuất</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>

            {/* status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-6 mt-4">
              <h3 className="text-lg font-semibold mb-4">
                Trạng thái tài khoản
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Xác minh email</span>
                  <span className="font-medium ">Chưa xác minh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số điện thoại</span>
                  <span className="font-medium">
                    {userInfo.phone ? (
                      "Đã cập nhật"
                    ) : (
                      <span className="text-gray-400">Chưa cập nhật</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Địa chỉ</span>
                  <span className="font-medium">
                    {userInfo.address ? (
                      "Đã cập nhật"
                    ) : (
                      <span className="text-gray-400">Chưa cập nhật</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
