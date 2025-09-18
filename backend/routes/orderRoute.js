import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import * as order from "../controllers/orderController.js";
import * as guestOrder from "../controllers/guestOrderController.js";
import authUser from "../middleware/auth.js";
import authGuestOrder from "../middleware/authGuestOrder.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, order.adminOrders);
orderRouter.post("/status", adminAuth, order.updateStatus);
orderRouter.post("/listguest", adminAuth, guestOrder.adminGuestOrders);
orderRouter.post("/gueststatus", adminAuth, guestOrder.updateGuestStatus);

orderRouter.post("/placecod", authUser, order.placeOrderCOD);
orderRouter.post("/placemomo", authUser, order.placeOrderMomo);
orderRouter.post("/momocallback", order.momoCallBack);
orderRouter.post("/momostatus", order.momoStatus);
orderRouter.post("/userorders", authUser, order.userOrders);
orderRouter.post("/usercancelorder", authUser, order.userDeleteOrders);

orderRouter.post("/placecodguest", guestOrder.placeOrderGuestCOD);
orderRouter.post("/placemomoguest", guestOrder.placeOrderMomoGuest);
orderRouter.post("/momocallbackguest", authGuestOrder, guestOrder.momoCallBackGuest);
orderRouter.post("/momostatusguest", authGuestOrder, guestOrder.momoStatusGuest);
orderRouter.post("/guestorders", authGuestOrder, guestOrder.guestOrders);
orderRouter.post("/guestcancelorder", authGuestOrder, guestOrder.guestDeleteOrder);

export default orderRouter;
