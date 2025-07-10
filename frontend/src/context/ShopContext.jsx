import React, { createContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sliders } from "../assets/other/data";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const navigate = useNavigate(); // navbar
  const deliveryCharges = 5000;
  const VAT = 0.1;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState(""); // login token
  const [cartItems, setCartItems] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const [errors, setErrors] = useState(false);

  // login modal
  // dùng useRef để bind vào cái div để kiểm tra click bên ngoài
  const loginRef = useRef();
  const [loginOpened, setLoginOpened] = useState(false);

  const toggleLogin = () => {
    setLoginOpened((prev) => !prev); // tắt mở mỗi lần toggle
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        // kiểm tra cái ref đc bind vào có tồn tại && kiểm tra cái click có phải là cái đó hoặc bên trong nó
        setLoginOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // tạo event

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // xoá khi ko dùng
    };
  }, [loginOpened]);

  const addToCart = async (itemId, quantity = 1, name) => {
    // if (!token) {
    //   toggleLogin();
    //   return;
    // }

    // lấy vào id
    const cartData = { ...cartItems }; // dic item

    if (cartData[itemId]) {
      // if có sản phẩm thì [item.id] +1
      cartData[itemId] += quantity;
    } else {
      cartData[itemId] = quantity;
    }

    setCartItems(cartData); // set cartItem để dùng bên ngoài

    if (token) {
      try {
        const addToCart = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId },
          { headers: { token } }
        );

        if (addToCart.data.success) {
          toast.success(`Đã thêm x${quantity} "${name}" vào giỏ hàng!`);
        } else {
          toast.error(addToCart.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.success(`Đã thêm x${quantity} "${name}" vào giỏ hàng!`);
    }
  };

  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          // lấy từng item và + 1 cho cart
          totalCount += cartItems[item];
        }
      } catch (error) {
        console.log(error);
      }
    }
    return totalCount;
  };

  const getUniqueCartCount = () => {
    let totalUniqueItem = new Set();

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalUniqueItem.add(item);
      }
    }
    return totalUniqueItem.size;
  };

  const getCartTotalPrice = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = books.find((book) => book._id === item);
        if (itemInfo) {
          const discountPercent = itemInfo.discount || 0;
          const discountedPrice = Math.round(
            itemInfo.price * (1 - discountPercent / 100)
          );
          totalAmount += discountedPrice * cartItems[item];
        }
      }
    }

    return Math.round(totalAmount / 100) * 100;
  };

  const updateAmount = async (itemId, amount) => {
    const cartData = { ...cartItems };
    cartData[itemId] = amount;
    if (cartData[itemId] <= 0) {
      cartData[itemId] = null;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, amount },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getProducts = async (retry = 1) => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) {
        setBooks(res.data.products);
        if (retry > 1) {
          window.location.reload();
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Mất kết nối, đang kết nối lại lần " + retry + "!");
      if (retry < 6) {
        setTimeout(() => getProducts(retry + 1), 5000);
      } else {
        toast.error("Mất kết nối, vui lòng nhấn F5 hoặc reload lại trang!");
      }
    }
  };

  const getUserCart = async (token) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserInfo = async (token) => {
    if (!token) {
      setUserInfo(null);
      return;
    }

    try {
      const res = await axios.post(
        backendUrl + "/api/user/get",
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setUserInfo(res.data.userData);
      } else {
        toast.error(res.data.message);
        setUserInfo(null);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setUserInfo(null);
    }
  };

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      getUserCart(localStorage.getItem("token"));
      setToken(localStorage.getItem("token"));
      getUserInfo(localStorage.getItem("token"));
    }
    getProducts();
  }, []);

  useEffect(() => {});

  const contextValue = {
    books,
    setBooks,
    getProducts,
    navigate,
    token,
    setToken,
    sliders,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    getCartTotalPrice,
    updateAmount,
    deliveryCharges,
    VAT,
    getUniqueCartCount,
    backendUrl,
    getUserCart,
    getUserInfo,
    userInfo,
    setUserInfo,
    loginRef,
    loginOpened,
    setLoginOpened,
    toggleLogin,
  }; // dùng cho nơi khác

  return (
    // để bao bọc cái main, chỉ cần dùng 1 lần và thông qua nhiều file
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
