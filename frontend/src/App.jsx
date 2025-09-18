import React from "react";
import {
  Header,
  Footer,
  RightSidebar,
  LeftSidebar,
  ScrollToTopBtn,
} from "./components";
import * as Pages from "./pages";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ShopContext } from "./context/ShopContext";
import { useContext } from "react";

const App = () => {
  return (
    <>
      <ToastContainer draggable={true} autoClose={2000} closeOnClick={true} toastClassName={"custom-toast-container"}/>
      <Header />
      <div className="h-[126px] bg-white max-padd-container"></div>

      <div className="min-h-screen flex relative mx-2 my-4 md:my-8 md:mx-4">
        {/* {isHomePage && <LeftSidebar />} */}

        <main className="flex-1 min-w-0 ">
          <Routes>
            <Route path="/" element={<Pages.Home />} />

            {/* Shop */}
            <Route path="/shop" element={<Pages.Shop />} />
            <Route path="/shop/:pageCategory" element={<Pages.Shop />} />
            <Route
              path="/shop/:pageCategory/:seo"
              element={<Pages.ProductDetail />}
            />
            <Route
              path="/shop/:type/:pageCategory/:seo"
              element={<Pages.AudioBookDetail />}
            />
            <Route path="/verifymomo" element={<Pages.VerifyMomo />} />
            <Route path="/verifymomoguest" element={<Pages.VerifyMomoGuest />} />

            {/* Misc */}
            <Route path="/cart" element={<Pages.Cart />} />
            <Route path="/place-order" element={<Pages.PlaceOrder />} />
            <Route path="/orders" element={<Pages.Orders />} />
            <Route path="/guestorder/:token" element={<Pages.GuestOrders />} />

            <Route path="/profile" element={<Pages.Profile />} />
            <Route path="/settings" element={<Pages.Settings />} />
            <Route path="/contact" element={<Pages.Contact />} />
            <Route path="/help" element={<Pages.Help />} />

            {/* Error */}
            <Route path="*" element={<Pages.Error />} />
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
