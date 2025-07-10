import React, { useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Titles } from "./";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = ({ toggleLogin }) => {
  const {
    navigate,
    token,
    backendUrl,
    setToken,
    getUserCart,
    setCartItem,
    getUserInfo,
    userInfo,
    setUserInfo,
  } = useContext(ShopContext);
  const [currState, setCurrState] = useState("Đăng nhập");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [isTouchPassword, setisTouchPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");

  const [isValid, setIsValid] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const colorStrength = () => {
    switch (passwordStrength) {
      case 0:
        return "bg-gray-10";
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-red-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-10";
    }
  };

  const isEmptyField = (fieldName, value) => {
    let error = "";

    if (!value.trim()) {
      error = `Vui lòng nhập ${
        fieldName === "confirmPassword"
          ? "xác nhận mật khẩu"
          : fieldName === "name"
          ? "họ và tên"
          : fieldName === "phone"
          ? "số điện thoại"
          : fieldName === "email"
          ? "email"
          : fieldName === "password"
          ? "mật khẩu"
          : fieldName
      }!`;
    }

    if (
      password !== value &&
      fieldName === "confirmPassword" &&
      value.length !== 0
    ) {
      error = `Mật khẩu không giống nhau!`;
    }

    const isText = /^[\p{L}\s]*$/u; // \p{L} cho phép tất cả các chữ, u - unicode
    const nameRegex = /^(?:\p{L}{2,})(?: \p{L}{2,})*$/u;

    if (fieldName === "name" && value.length !== 0) {
      if (!isText.test(value)) {
        error = `Tên phải dưới dạng chữ!`;
      } else if (!nameRegex.test(value)) {
        error = `Vui lòng nhập ít nhất 2 ký tự mỗi từ!`;
      }
    }

    // ...prev            -- giữ nguyên các lỗi cũ, chỉ cập nhật lỗi của trường hiện tại
    // [fieldName]: error -- cập nhật lỗi cho trường hiện tại
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return !error; // Trả về true nếu không có lỗi, false nếu có lỗi
  };

  const checkPasswordStrength = (password) => {
    if (!isTouchPassword) {
      return true;
    }

    if (password.length === 0) {
      setPasswordStrength(0);
      setFeedback("");
      setPasswordFeedback("Vui lòng nhập mật khẩu!");
      return false;
    }

    if (currState === "Đăng nhập") {
      setPasswordFeedback("");
      setPasswordStrength(3);
      return true;
    }

    if (password.length < 8) {
      setPasswordStrength(1);
      setFeedback("Mật khẩu yếu!");
      setPasswordFeedback("Mật khẩu cần có ít nhất 8 ký tự!");
      return false;
    }

    const conditions = [
      { regex: /[a-z]/, type: "chữ thường" },
      { regex: /[A-Z]/, type: "chữ in hoa" },
      { regex: /\d/, type: "số" },
      { regex: /[@$!%*?&À-ÿ]/, type: "ký tự đặc biệt" },
    ];

    const passedConditions = conditions.filter(({ regex }) =>
      regex.test(password)
    ).length;
    setPasswordStrength(passedConditions);

    if (passedConditions < 3) {
      const missing = conditions
        .filter(({ regex }) => !regex.test(password))
        .map(({ type }) => type);

      setFeedback("Mật khẩu yếu!");
      setPasswordFeedback(`Thiếu: ${missing.join(", ")}.`);
      return false;
    }

    setFeedback(
      passedConditions === 4 ? "Mật khẩu mạnh!" : "Mật khẩu trung bình!"
    );
    setPasswordFeedback("");
    return true;
  };

  // kiểm tra khi submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currState === "Đăng ký" && (!name || !confirmPassword)) {
        toast.error("Vui lòng nhập đầy đủ thông tin");
        return;
      }

      if (!email || (!password && !(currState === "Quên mật khẩu"))) {
        toast.error("Vui lòng nhập email và mật khẩu");
        return;
      }
      setUserInfo(null);

      setIsLoading(true);
      if (currState === "Đăng ký") {
        const res = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
          confirmPassword,
          phone,
        });

        if (res.data.success) {
          setToken(res.data.token);

          // lưu token vào localStorage
          // lưu vào localStorage thay vì sessionStorage hoặc cookies
          // vì localStorage sẽ giữ token lâu hơn và không bị xóa khi đóng trình duyệt
          // sessionStorage hoặc cookies có thể bị xóa khi đóng trình duyệt
          localStorage.setItem("token", res.data.token);

          await getUserCart(res.data.token); // Lấy giỏ hàng của người dùng sau khi đăng ký
          await getUserInfo(res.data.token); // Lấy thông tin người dùng sau khi đăng ký

          toast.success(res.data.message);

          toggleLogin(false); // Đóng modal đăng nhập
        } else {
          toast.error(res.data.message);
        }
      } else if (currState === "Đăng nhập") {
        // Đăng nhập
        // const resAdmin = await axios.post(backendUrl + "/api/user/admin", {
        //   email,
        //   password,
        // });

        // if (resAdmin.data.success) {
        //   setToken(resAdmin.data.token);
        //   setUserInfo(null);
        //   toggleLogin(false);
        //   return;
        // }

        const resUser = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (resUser.data.success) {
          setToken(resUser.data.token);
          localStorage.setItem("token", resUser.data.token);
          await getUserCart(resUser.data.token);
          await getUserInfo(resUser.data.token);
          toggleLogin(false);
        } else {
          toast.error(resUser.data.message || "Có lỗi xảy ra");
        }
      } else {
        console.log("error - login - bottom");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      if (!email) {
        toast.error("Vui lòng nhập email");
        return;
      }

      const res = await axios.post(backendUrl + "/api/user/getotp", { email });

      if (res.data.success) {
        setOtpSent(true);
        setOtpCountdown(30);
        toast.success("Mã OTP đã được gửi đến email của bạn");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      if (!otp) {
        toast.error("Vui lòng nhập mã OTP");
        return;
      }

      const res = await axios.post(backendUrl + "/api/user/verifyotp", {
        email,
        otp,
      });

      if (res.data.success) {
        setOtpVerified(true);
        toast.success("Xác thực OTP thành công");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      if (!newPassword) {
        toast.error("Vui lòng nhập mật khẩu mới");
        return;
      }

      const res = await axios.post(backendUrl + "/api/user/resetpassword", {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Đặt lại mật khẩu thành công");
        setCurrState("Đăng nhập"); // Switch back to login
        setOtpSent(false);
        setOtpVerified(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  useEffect(() => {
    if (confirmPassword) {
      isEmptyField("confirmPassword", confirmPassword);
    }
  }, [password, confirmPassword]);

  // kiểm tra thông tin trc khi submit
  useEffect(() => {
    const nameValid =
      (!errors.name && name.trim()) ||
      currState === "Đăng nhập" ||
      currState === "Quên mật khẩu";
    const emailValid = !errors.email && email.trim();
    const passwordValid = checkPasswordStrength(password);
    const confirmValid =
      currState === "Đăng nhập" ||
      currState === "Quên mật khẩu" ||
      (!errors.confirmPassword && confirmPassword === password);

    setIsValid(nameValid && emailValid && passwordValid && confirmValid);
  }, [name, email, password, confirmPassword, currState, errors]);

  if (isLoading && currState !== "Quên mật khẩu") {
    return (
      <section className="max-padd-container py-8 bg-white">
        <div className="">
          <div className="mt-8">
            <div className="flexCenter flex-col gap-6">
              <h3 className="bold-24">Đang xử lý...</h3>
              <p className="text-gray-500">Vui lòng chờ xử lý xong!</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (currState === "Quên mật khẩu") {
    return (
      <section className="h-full w-full z-50 bg-white">
        <div className="flexCenter h-full w-full">
          <div className="flexCenter w-full">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (otpSent && !otpVerified) handleVerifyOtp();
                else if (otpVerified) handleResetPassword();
              }}
              className="flex flex-col items-center w-[90%] sm:max-w-md m-auto text-gray-800 gap-y-3"
            >
              <div className="w-full mb-4 flexCenter">
                <h3 className="bold-36">Đặt lại mật khẩu</h3>
              </div>

              {!otpVerified ? (
                <>
                  <div className="w-full">
                    <label htmlFor="email" className="pl-3 medium-14">
                      Email
                    </label>
                    <div className="flex gap-2">
                      <input
                        id="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          isEmptyField("email", e.target.value);
                        }}
                        onFocus={(e) => isEmptyField("email", e.target.value)}
                        value={email}
                        type="email"
                        placeholder="Email"
                        className={`w-full px-4 py-2 ring-1 ring-slate-900/10 rounded-full bg-primary ${
                          errors.email
                            ? "!bg-red-100 !ring-red-500 text-red-500"
                            : ""
                        }`}
                        disabled={otpSent}
                      />

                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!email || otpCountdown > 0}
                        className={`whitespace-nowrap px-4 py-2 rounded-full ${
                          !email || otpCountdown > 0 || isLoading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {otpCountdown > 0
                          ? `Gửi lại (${otpCountdown}s)`
                          : "Gửi OTP"}
                      </button>
                    </div>
                    {errors.email && (
                      <div className="pl-3 mt-2 text-sm text-red-500">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {otpSent && (
                    <div className="w-full">
                      <label htmlFor="otp" className="pl-3 medium-14">
                        Mã OTP
                      </label>
                      <input
                        id="otp"
                        onChange={(e) => setOtp(e.target.value)}
                        value={otp}
                        type="text"
                        placeholder="Nhập mã OTP"
                        className="w-full px-4 py-2 ring-1 ring-slate-900/10 rounded-full bg-primary"
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="w-full">
                    <label htmlFor="newPassword" className="pl-3 medium-14">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Nhập mật khẩu mới"
                        className="w-full px-4 py-2 ring-1 ring-slate-900/10 rounded-full bg-primary"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                  </div>
                </>
              )}
              {isLoading && (
                <>
                  <div className="pl-3 mt-2 text-sm">
                    Đang xử lý vui lòng đợi...
                  </div>
                </>
              )}
              <button
                type="submit"
                className={`btn-dark w-full mt-5 !py-[7px] !rounded ${
                  (!otpSent || !otp) && !otpVerified
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={(!otpSent || !otp) && !otpVerified}
              >
                {otpVerified ? "Đặt lại mật khẩu" : "Xác nhận OTP"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setCurrState("Đăng nhập");
                  setOtpSent(false);
                  setOtpVerified(false);
                }}
                className="text-blue-500 mt-2"
              >
                Quay lại đăng nhập
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="h-full w-full z-50 bg-white">
      <div className="flexCenter h-full w-full">
        <div className="flexCenter w-full">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto text-gray-800 gap-y-3"
          >
            <div className="w-full mb-4 flexCenter">
              <h3 className="bold-36">{currState}</h3>
            </div>
            {currState === "Đăng ký" && (
              <div className="w-full">
                <label htmlFor="name" className="pl-3 medium-14">
                  Họ và Tên
                </label>
                <input
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                    isEmptyField("name", e.target.value);
                  }}
                  onFocus={(e) => isEmptyField("name", e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Họ và tên"
                  className={`w-full px-4 py-2 ring-1 ring-slate-900/10 rounded-full bg-primary ${
                    errors.name ? "!bg-red-100 !ring-red-500 text-red-500" : ""
                  }`}
                />

                {errors.name && (
                  <div className="pl-3 mt-2 text-sm text-red-500">
                    {errors.name}
                  </div>
                )}
              </div>
            )}

            <div className="w-full">
              <label htmlFor="email" className="pl-3 medium-14">
                Email
              </label>
              <input
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  isEmptyField("email", e.target.value);
                }}
                onFocus={(e) => isEmptyField("email", e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
                className={`w-full px-4 py-2 ring-1 ring-slate-900/10 rounded-full bg-primary ${
                  errors.email ? "!bg-red-100 !ring-red-500 text-red-500" : ""
                }`}
              />
              {errors.email && (
                <div className="pl-3 mt-2 text-sm text-red-500">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="w-full relative">
              <label htmlFor="password" className="pl-3 medium-14">
                Mật khẩu
              </label>
              <div className="flexCenter">
                <input
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setisTouchPassword(true);
                    checkPasswordStrength(e.target.value);
                  }}
                  onFocus={(e) => {
                    setisTouchPassword(true);
                    if (e.target.value.length === 0 && !isTouchPassword) {
                      setPasswordFeedback("Vui lòng nhập mật khẩu!");
                    }
                    checkPasswordStrength(e.target.value);
                  }}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  className={`w-full pl-4 pr-10 py-2 ring-1 ring-slate-900/10 rounded-full bg-primary ${
                    isTouchPassword && passwordStrength <= 2
                      ? "!bg-red-100 !ring-red-500 text-red-500"
                      : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </button>
              </div>
              {isTouchPassword && passwordFeedback && (
                <div className="pl-3 mt-2 text-sm text-red-500">
                  {passwordFeedback}
                </div>
              )}
            </div>

            {currState === "Đăng ký" && (
              <div className="w-full relative">
                <label htmlFor="confirmPassword" className="pl-3 medium-14">
                  Xác nhận mật khẩu
                </label>
                <div className="flexCenter">
                  <input
                    id="confirmPassword"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      isEmptyField("confirmPassword", e.target.value);
                    }}
                    onFocus={(e) => {
                      isEmptyField("confirmPassword", e.target.value);
                    }}
                    value={confirmPassword}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Xác nhận mật khẩu"
                    className={`w-full pl-4 pr-10 py-2 ring-1 ring-slate-900/10 rounded-full bg-primary ${
                      errors.confirmPassword
                        ? "!bg-red-100 !ring-red-500 text-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 text-gray-500 hover:text-gray-700"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <FaRegEye className="h-5 w-5" />
                    ) : (
                      <FaRegEyeSlash className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="pl-3 mt-2 text-sm text-red-500">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            )}

            {currState === "Đăng ký" && (
              <div className={` flex flex-col gap-y-1 w-full relative`}>
                <div
                  className={`w-full flexBetween gap-x-2 transition-all duration-200`}
                >
                  <div
                    className={`${colorStrength()} w-full p-1 transition-all duration-200`}
                  ></div>
                  <div
                    className={`${
                      passwordStrength >= 2 ? colorStrength() : "bg-gray-10"
                    } w-full p-1 transition-all duration-200`}
                  ></div>
                  <div
                    className={`${
                      passwordStrength >= 3 ? colorStrength() : "bg-gray-10"
                    } w-full p-1 transition-all duration-200`}
                  ></div>
                  <div
                    className={`${
                      passwordStrength >= 4 ? colorStrength() : "bg-gray-10"
                    } w-full p-1 transition-all duration-200`}
                  ></div>
                </div>
                <div className="w-full text-right">
                  <span className="text-xs text-gray-600">{feedback}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`btn-dark w-full mt-5 !py-[7px] !rounded ${
                !isValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!isValid}
            >
              {currState === "Đăng ký" ? "Đăng ký" : "Đăng nhập"}
            </button>

            <div className="w-full flex flex-col gap-y-3 medium-14">
              <div className="">
                <span
                  className="hover:underline cursor-pointer"
                  onClick={() => {
                    [
                      setCurrState("Quên mật khẩu"),
                      setShowConfirmPassword(false),
                      setShowPassword(false),
                    ];
                  }}
                >
                  {" "}
                  Quên mật khẩu?
                </span>
              </div>
              {currState === "Đăng nhập" ? (
                <div>
                  Không có tài khoản?{" "}
                  <span
                    className="hover:underline cursor-pointer"
                    onClick={() => {
                      setCurrState("Đăng ký");
                    }}
                  >
                    Đăng ký
                  </span>{" "}
                </div>
              ) : (
                <div className="">
                  Đã có tài khoản?{" "}
                  <span
                    className="hover:underline cursor-pointer"
                    onClick={() => {
                      [
                        setCurrState("Đăng nhập"),
                        setShowConfirmPassword(false),
                        setShowPassword(false),
                      ];
                    }}
                  >
                    {" "}
                    Đăng nhập
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
