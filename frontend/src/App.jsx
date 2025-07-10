import React from "react";
import {
  Header,
  Footer,
  RightSidebar,
  LeftSidebar,
  ScrollToTopBtn,
} from "./components";
import {
  Home,
  Shop,
  Cart,
  PlaceOrder,
  Orders,
  Error,
  ProductDetail,
  Profile,
  Settings,
  Contact,
  Help,
  AudioBookDetail,
  GuestOrders,
  VerifyMomo,
  VerifyMomoGuest,
} from "./pages";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ShopContext } from "./context/ShopContext";
import { useContext } from "react";

const App = () => {
  return (
    <>
      <ToastContainer draggable={true} autoClose={2000} />
      <Header />
      <div className="h-[126px] bg-white max-padd-container"></div>

      <div className="flex relative mx-2 my-4 md:my-8 md:mx-4">
        {/* {isHomePage && <LeftSidebar />} */}

        <main className="flex-1 min-w-0 ">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Shop */}
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:pageCategory" element={<Shop />} />
            <Route
              path="/shop/:pageCategory/:seo"
              element={<ProductDetail />}
            />
            <Route
              path="/shop/:type/:pageCategory/:seo"
              element={<AudioBookDetail />}
            />
            <Route path="/verifymomo" element={<VerifyMomo />} />
            <Route path="/verifymomoguest" element={<VerifyMomoGuest />} />

            {/* Misc */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/guestorder/:token" element={<GuestOrders />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />

            {/* Error */}
            <Route path="*" element={<Error />} />
          </Routes>
        </main>

        {/* {isHomePage && <RightSidebar />} */}
        <ScrollToTopBtn />
      </div>

      <div className="max-padd-container"></div>
      <Footer />
    </>
  );
};

export default App;
