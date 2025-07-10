import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  adminOrders,
  placeOrderCOD,
  placeOrderMomo,
  updateStatus,
  userOrders,
  placeOrderGuestCOD,
  userDeleteOrders,
  guestDeleteOrder,
  adminGuestOrders,
  updateGuestStatus,
  guestOrders,
  momoCallBack,
  momoStatus,
  placeOrderMomoGuest,
  momoCallBackGuest,
  momoStatusGuest,
} from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";
import authGuestOrder from "../middleware/authGuestOrder.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, adminOrders);
orderRouter.post("/listguest", adminAuth, adminGuestOrders);
orderRouter.post("/status", adminAuth, updateStatus);
orderRouter.post("/gueststatus", adminAuth, updateGuestStatus);

orderRouter.post("/placecod", authUser, placeOrderCOD);
orderRouter.post("/placemomo", authUser, placeOrderMomo);
orderRouter.post("/momocallback", momoCallBack);
orderRouter.post("/momostatus", momoStatus);
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.post("/usercancelorder", authUser, userDeleteOrders);

orderRouter.post("/placecodguest", placeOrderGuestCOD);
orderRouter.post("/placemomoguest", placeOrderMomoGuest);
orderRouter.post("/momocallbackguest", authGuestOrder, momoCallBackGuest);
orderRouter.post("/momostatusguest", authGuestOrder, momoStatusGuest);
orderRouter.post("/guestorders", authGuestOrder, guestOrders);
orderRouter.post("/guestcancelorder", authGuestOrder, guestDeleteOrder);

export default orderRouter;
