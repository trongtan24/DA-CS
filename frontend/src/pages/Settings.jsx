import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext.jsx";

const Settings = () => {
  const { userInfo } = useContext(ShopContext);
  return <div>Settings</div>;
};

export default Settings;
