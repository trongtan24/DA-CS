import React from "react";
import { Header, Login } from "./components";
import { Route, Routes } from "react-router-dom";
import Orders from "./pages/Orders";
import GuestOrders from "./pages/GuestOrder";
import List from "./pages/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";

export const backend_url = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""
  );

  useEffect(() => { 
    localStorage.setItem("adminToken", token);
  }, [token]);

  return (
    <main>
      <ToastContainer draggable={true} autoClose={1000} />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="bg-primary text-[#404040]">
          <div className="max-padd-contianer flex flex-col">
            <Header setToken={setToken} />
            <div className="p-[20px]"></div>
            <Routes>
              <Route path="/" element={<List token={token} />} />
              {/* <Route path="/list" element={<List token={token} />} /> */}
              <Route path="/orders" element={<Orders token={token} />} />
              <Route
                path="/guestorders"
                element={<GuestOrders token={token} />}
              />
            </Routes>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
