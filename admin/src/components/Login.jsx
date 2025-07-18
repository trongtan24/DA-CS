import React from "react";
import logo from "../assets/b8k_logo_w_bg.png";
import { useState } from "react";
import axios from "axios";
import { backend_url } from "../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleNavigate = () => {
    window.location.href = process.env.VITE_FRONTEND_URL;
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault(); 
      const res = await axios.post(backend_url + "/api/user/admin", {
        email,
        password,
      });
      if (res.data.success) {
        setToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      <button
        onClick={handleNavigate}
        className="absolute top-6 left-12 hover:underline"
      >
        {"<"} Quay về B8K
      </button>

      <div className="flexCenter h-full w-full">
        <div className="flexCenter w-full sm:w-1/2">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800"
          >
            <div className="w-full mb-4 flexCenter">
              <h3 className="bold-36">Trang quản lý</h3>
            </div>

            <div className="w-full">
              <label htmlFor="email" className="medium-15">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email..."
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>

            <div className="w-full mb-4">
              <label htmlFor="password" className="medium-15">
                Mật khẩu
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Mật khẩu..."
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>

            <button
              type="submit"
              className="btn-dark w-full mt-5 !py-[7px] !rounded"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
