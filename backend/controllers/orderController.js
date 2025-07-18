import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import guestOrderModel from "../models/guestOrderModel.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import validator from "validator";
import axios from "axios";
import crypto from "crypto";
import timer from "../utils/timer.js";

const cancelTimer = { HOUR: 0, MINUTE: 30, SECOND: 0 };
var accessKey = process.env.MOMO_ACCESS_KEY;
var secretKey = process.env.MOMO_SECRET_KEY;

const createToken = (orderid, name, email, phone) => {
  return jwt.sign({ orderid, name, email, phone }, process.env.JWT_SECRET);
};

const adminOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const adminGuestOrders = async (req, res) => {
  try {
    const guestOrders = await guestOrderModel.find({});
    res.json({ success: true, guestOrders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderCOD = async (req, res) => {
  try {
    const { userId, userInfo, items, amount, address } = req.body;

    if (!userId || !userInfo || !items || !amount || !address) {
      return res.json({
        success: false,
        message: "Không được để trống các thông tin!",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.json({
        success: false,
        message: "Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.",
      });
    }

    const trimmedUserInfo = {
      name: userInfo.name?.trim() || "",
      email: userInfo.email?.trim() || "",
      phone: userInfo.phone?.trim() || "",
    };

    if (
      !trimmedUserInfo.name ||
      !trimmedUserInfo.email ||
      !trimmedUserInfo.phone
    ) {
      return res.json({
        success: false,
        message: "Vui lòng cung cấp đầy đủ thông tin người nhận!",
      });
    }

    if (!validator.isEmail(trimmedUserInfo.email)) {
      return res.json({
        success: false,
        message: "Email không hợp lệ!",
      });
    }

    const phoneRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (!phoneRegex.test(trimmedUserInfo.phone)) {
      return res.json({
        success: false,
        message: "Số điện thoại không hợp lệ!",
      });
    }

    const trimmedAddress = {
      city: address.city?.trim() || "",
      district: address.district?.trim() || "",
      ward: address.ward?.trim() || "",
      location: address.location?.trim() || "",
    };

    if (
      !trimmedAddress.city ||
      !trimmedAddress.district ||
      !trimmedAddress.ward
    ) {
      return res.json({
        success: false,
        message: "Vui lòng nhập đầy đủ địa chỉ nhận hàng!",
      });
    }

    if (
      address.city.trim().length < 2 ||
      address.ward.trim().length < 2 ||
      address.district.trim().length < 2
    ) {
      return res.json({
        success: false,
        message: "Vui lòng nhập đủ các địa chỉ!",
      });
    }

    if (
      trimmedAddress.location.length < 5 &&
      trimmedAddress.location.length > 0
    ) {
      return res.json({
        success: false,
        message: "Địa chỉ cụ thể phải có ít nhất 5 ký tự!",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    for (const item of items) {
      if (!item._id || !item.amount || item.amount <= 0) {
        return res.json({
          success: false,
          message: "Thông tin sản phẩm không hợp lệ!",
        });
      }

      try {
        const resSales = await axios.post(
          `${process.env.BACKEND_URL}/api/product/increase-sale`,
          {
            productId: item._id,
            quantity: item.amount,
          },
          {
            timeout: 5000,
          }
        );

        if (!resSales.data.success) {
          return res.json({
            success: false,
            message: `Không thể cập nhật số lượng bán cho sản phẩm: ${
              item.name || item._id
            }`,
          });
        }
      } catch (error) {
        console.error("Error updating product sales:", error);
        return res.json({
          success: false,
          message: "Lỗi hệ thống khi cập nhật thông tin sản phẩm",
        });
      }
    }

    const orderData = {
      userId,
      userInfo: trimmedUserInfo,
      items,
      amount,
      address: trimmedAddress,
      paymentMethod: "COD",
      payment: false,
      created_date: new Date(),
      updated_date: new Date(),
    };

    const newOrder = new orderModel(orderData);

    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    await sendEmail({
      to: trimmedUserInfo.email,
      subject: "Xác nhận đơn hàng từ B8K",
      html: `
    <h2>Xin chào ${trimmedUserInfo.name},</h2>
    <p>Chúng tôi đã nhận được đơn hàng của bạn.</p>
    <p><strong>Tổng tiền:</strong> ${amount.toLocaleString()} VND</p>
    <p>Cảm ơn bạn đã đặt hàng!</p>
    <p>Nếu bạn muốn xem đơn hàng, xin vui lòng nhấn vào link này: 
    <a href="${process.env.FRONTEND_URL}/orders">Xem đơn hàng</a>!</p>
    <p>Bạn có thể huỷ trong vòng ${timer(cancelTimer)}</p>
  `,
    });

    res.json({
      success: true,
      message: "Đặt hàng thành công, vui lòng kiểm tra gmail!",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderMomo = async (req, res) => {
  try {
    const { userId, userInfo, items, amount, address } = req.body;
    if (!userId || !userInfo || !items || !amount || !address) {
      return res.json({
        success: false,
        message: "Không được để trống các thông tin!",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.json({
        success: false,
        message: "Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.",
      });
    }

    const trimmedUserInfo = {
      name: userInfo.name?.trim() || "",
      email: userInfo.email?.trim() || "",
      phone: userInfo.phone?.trim() || "",
    };

    if (
      !trimmedUserInfo.name ||
      !trimmedUserInfo.email ||
      !trimmedUserInfo.phone
    ) {
      return res.json({
        success: false,
        message: "Vui lòng cung cấp đầy đủ thông tin người nhận!",
      });
    }

    if (!validator.isEmail(trimmedUserInfo.email)) {
      return res.json({
        success: false,
        message: "Email không hợp lệ!",
      });
    }

    const phoneRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (!phoneRegex.test(trimmedUserInfo.phone)) {
      return res.json({
        success: false,
        message: "Số điện thoại không hợp lệ!",
      });
    }

    const trimmedAddress = {
      city: address.city?.trim() || "",
      district: address.district?.trim() || "",
      ward: address.ward?.trim() || "",
      location: address.location?.trim() || "",
    };

    if (
      !trimmedAddress.city ||
      !trimmedAddress.district ||
      !trimmedAddress.ward
    ) {
      return res.json({
        success: false,
        message: "Vui lòng nhập đầy đủ địa chỉ nhận hàng!",
      });
    }

    if (
      address.city.trim().length < 2 ||
      address.ward.trim().length < 2 ||
      address.district.trim().length < 2
    ) {
      return res.json({
        success: false,
        message: "Vui lòng nhập đủ các địa chỉ!",
      });
    }

    if (
      trimmedAddress.location.length < 5 &&
      trimmedAddress.location.length > 0
    ) {
      return res.json({
        success: false,
        message: "Địa chỉ cụ thể phải có ít nhất 5 ký tự!",
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }

    for (const item of items) {
      if (!item._id || !item.amount || item.amount <= 0) {
        return res.json({
          success: false,
          message: "Thông tin sản phẩm không hợp lệ!",
        });
      }

      try {
        const resSales = await axios.post(
          `${process.env.BACKEND_URL}/api/product/increase-sale`,
          {
            productId: item._id,
            quantity: item.amount,
          },
          {
            timeout: 5000,
          }
        );

        if (!resSales.data.success) {
          return res.json({
            success: false,
            message: `Không thể cập nhật số lượng bán cho sản phẩm: ${
              item.name || item._id
            }`,
          });
        }
      } catch (error) {
        console.error("Error updating product sales:", error);
        return res.json({
          success: false,
          message: "Lỗi hệ thống khi cập nhật thông tin sản phẩm",
        });
      }
    }

    const orderId = "B8K" + new Date().getTime();
    await orderModel.create({
      userId,
      userInfo: trimmedUserInfo,
      items,
      amount,
      address: trimmedAddress,
      paymentMethod: "MOMO",
      payment: false,
      status: "Chờ xác nhận",
      momoOrderId: orderId,
      created_date: new Date(),
      updated_date: new Date(),
    });

    const partnerCode = "MOMO";
    const requestId = orderId;
    const orderInfo = "Thanh toán đơn hàng tại B8K";
    const redirectUrl = `${process.env.FRONTEND_URL}/verifymomo`;
    const ipnUrl = `${process.env.BACKEND_URL}/api/order/momocallback`;
    const requestType = "captureWallet";
    const extraData = "";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      accessKey,
      partnerCode,
      partnerName: "B8K",
      storeId: "B8KStore",
      requestId,
      amount: amount.toString(),
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang: "vi",
      requestType,
      autoCapture: true,
      extraData,
      signature,
    };

    const momoResponse = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return res.json({
      success: true,
      payUrl: momoResponse.data.payUrl,
      message: "Chuyển hướng đến cổng thanh toán...",
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const momoCallBack = async (req, res) => {
  // cần up lên web thật GG hết cứu
  try {
    console.log("MoMo callback:", req.body);

    const { orderId, resultCode, amount } = req.body;

    if (resultCode === 0) {
      const updatedOrder = await orderModel.findOneAndUpdate(
        { momoOrderId: orderId },
        {
          payment: true,
          updated_date: new Date(),
        },
        { new: true }
      );

      if (!updatedOrder) {
        console.error("Không tìm thấy đơn hàng với momoOrderId: ", orderId);
        return res.json({ error: "Không tìm thấy đơn hàng!" });
      }

      const order = await orderModel.findOne({ momoOrderId: orderId });
      const user = await userModel.findById(order.userId);
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

      await sendEmail({
        to: user.email,
        subject: "Xác nhận đơn hàng từ B8K",
        html: `
    <h2>Xin chào ${user.name},</h2>
    <p>Chúng tôi đã nhận được đơn hàng của bạn.</p>
    <p><strong>Tổng tiền:</strong> ${amount.toLocaleString()} VND</p>
    <p>Cảm ơn bạn đã đặt hàng!</p>
    <p>Nếu bạn muốn xem đơn hàng, xin vui lòng nhấn vào link này: 
    <a href="${process.env.FRONTEND_URL}/orders">Xem đơn hàng</a>!</p>
    <p>Bạn có thể huỷ trong vòng ${timer(cancelTimer)}</p>
  `,
      });
    } else {
      console.warn(`Thanh toán thất bại: ${orderId}. Code: ${resultCode}`);
    }

    return res.json({ message: "Callback processed" });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const momoStatus = async (req, res) => {
  // dùng từ verifymomo tạm bợ :))
  try {
    const { orderId, amount } = req.body;

    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode: "MOMO",
      requestId: orderId,
      orderId,
      signature,
      lang: "vi",
    };

    const option = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/query",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    const response = await axios(option);
    const momoRes = response.data;

    if (momoRes.resultCode === 0 && momoRes.orderId) {
      await orderModel.findOneAndUpdate(
        { momoOrderId: momoRes.orderId },
        {
          payment: true,
          updated_date: new Date(),
        }
      );
      const order = await orderModel.findOne({ momoOrderId: momoRes.orderId });
      const user = await userModel.findById(order.userId);
      await userModel.findByIdAndUpdate(order.userId, { cartData: {} });

      await sendEmail({
        to: user.email,
        subject: "Xác nhận đơn hàng từ B8K",
        html: `
    <h2>Xin chào ${user.name},</h2>
    <p>Chúng tôi đã nhận được đơn hàng của bạn.</p>
    <p><strong>Tổng tiền:</strong> ${amount.toLocaleString()} VND</p>
    <p>Cảm ơn bạn đã đặt hàng!</p>
    <p>Nếu bạn muốn xem đơn hàng, xin vui lòng nhấn vào link này: 
    <a href="${process.env.FRONTEND_URL}/orders">Xem đơn hàng</a>!</p>
    <p>Bạn có thể huỷ trong vòng ${timer(cancelTimer)}</p>
  `,
      });
    }

    return res.json({ success: true, momoRes });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status, method } = req.body;
    let payment = status === "Đã hoàn tất";

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    if (method !== "MOMO") {
      await orderModel.findByIdAndUpdate(orderId, {
        status,
        payment,
        updated_date: Date.now(),
      });
    } else {
      await orderModel.findByIdAndUpdate(orderId, {
        status,
        payment: true,
        updated_date: Date.now(),
      });
    }

    res.json({ success: true, message: "Hoàn tất cập nhật đơn!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userDeleteOrders = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Không tìm thấy đơn hàng!" });
    }

    const deleteTimer = 1;
    const now = new Date();
    if (now > order.expired_date) {
      return res.json({
        success: false,
        message: `Bạn chỉ có thể xoá đơn hàng trong vòng ${deleteTimer} tiếng sau khi đặt.`,
      });
    }

    for (const item of order.items) {
      const resSales = await axios.post(
        process.env.BACKEND_URL + "/api/product/decrease-sale",
        {
          productId: item._id,
          quantity: item.amount,
        }
      );
      console.log(resSales.data.message + " user");

      if (!resSales.data.success) {
        return res.json({
          success: false,
          message: resSales.data.message,
        });
      }
    }

    await orderModel.findByIdAndDelete(orderId);
    res.json({ success: true, message: "Xoá thành công!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Chuyển qua guestOrderController sau
// ===================================
// =---------------------------------=
// =---------------------------------=
// =----------            -----------=
// =-----      Guest Order      -----=
// =-----------           -----------=
// =---------------------------------=
// =---------------------------------=
// ===================================

const placeOrderGuestCOD = async (req, res) => {
  try {
    const { guestInfo, items, amount, address } = req.body;

    if (!guestInfo || !items || !amount || !address) {
      return res.json({
        success: false,
        message: "Không được để trống các thông tin!",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.json({
        success: false,
        message: "Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.",
      });
    }

    const trimmedUserInfo = {
      name: guestInfo.name?.trim() || "",
      email: guestInfo.email?.trim() || "",
      phone: guestInfo.phone?.trim() || "",
    };

    if (
      !trimmedUserInfo.name ||
      !trimmedUserInfo.email ||
      !trimmedUserInfo.phone
    ) {
      return res.json({
        success: false,
        message: "Vui lòng cung cấp đầy đủ thông tin người nhận!",
      });
    }

    if (!validator.isEmail(trimmedUserInfo.email)) {
      return res.json({
        success: false,
        message: "Email không hợp lệ!",
      });
    }

    const phoneRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (!phoneRegex.test(trimmedUserInfo.phone)) {
      return res.json({
        success: false,
        message: "Số điện thoại không hợp lệ!",
      });
    }

    const trimmedAddress = {
      city: address.city?.trim() || "",
      district: address.district?.trim() || "",
      ward: address.ward?.trim() || "",
      location: address.location?.trim() || "",
    };

    if (
      !trimmedAddress.city ||
      !trimmedAddress.district ||
      !trimmedAddress.ward
    ) {
      return res.json({
        success: false,
        message: "Vui lòng nhập đầy đủ địa chỉ nhận hàng!",
      });
    }

    if (
      trimmedAddress.city.length < 2 ||
      trimmedAddress.ward.length < 2 ||
      trimmedAddress.district.length < 2
    ) {
      return res.json({
        success: false,
        message: "Vui lòng nhập đủ các địa chỉ!",
      });
    }

    if (
      trimmedAddress.location.length < 5 &&
      trimmedAddress.location.length > 0
    ) {
      return res.json({
        success: false,
        message: "Địa chỉ cụ thể phải có ít nhất 5 ký tự!",
      });
    }

    for (const item of items) {
      if (!item._id || !item.amount || item.amount <= 0) {
        return res.json({
          success: false,
          message: "Thông tin sản phẩm không hợp lệ!",
        });
      }

      try {
        const resSales = await axios.post(
          `${process.env.BACKEND_URL}/api/product/increase-sale`,
          {
            productId: item._id,
            quantity: item.amount,
          },
          {
            timeout: 5000,
          }
        );

        if (!resSales.data.success) {
          return res.json({
            success: false,
            message: `Không thể cập nhật số lượng bán cho sản phẩm: ${
              item.name || item._id
            }`,
          });
        }
      } catch (error) {
        console.error("Error updating product sales:", error);
        return res.json({
          success: false,
          message: "Lỗi hệ thống khi cập nhật thông tin sản phẩm",
        });
      }
    }

    const orderData = {
      guestInfo: trimmedUserInfo,
      items,
      amount,
      address: trimmedAddress,
      paymentMethod: "COD",
      payment: false,
      created_date: new Date(),
      updated_date: new Date(),
    };

    const newGuestOrder = new guestOrderModel(orderData);

    await newGuestOrder.save();

    const token = createToken(
      newGuestOrder._id,
      trimmedUserInfo.name,
      trimmedUserInfo.email,
      trimmedUserInfo.phone
    );

    await sendEmail({
      to: trimmedUserInfo.email,
      subject: "Xác nhận đơn hàng từ B8K",
      html: `
    <h2>Xin chào ${trimmedUserInfo.name},</h2>
    <p>Chúng tôi đã nhận được đơn hàng của bạn.</p>
    <p><strong>Tổng tiền:</strong> ${amount.toLocaleString()} VND</p>
    <p>Cảm ơn bạn đã đặt hàng!</p>
    <p>Nếu bạn muốn xem đơn hàng, xin vui lòng nhấn vào link này: 
    <a href="${
      process.env.FRONTEND_URL
    }/guestorder/${token}">Xem đơn hàng</a>!</p>
    <p>Bạn có thể huỷ trong vòng ${timer(cancelTimer)}</p>
  `,
    });
    const redirectUrl = `/guestorder/${token}`;
    res.json({
      success: true,
      message: "Đặt hàng thành công (khách)!",
      redirectUrl,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message + "guest" });
  }
};

const placeOrderMomoGuest = async (req, res) => {
  try {
    const { guestInfo, items, amount, address } = req.body;

    if (!guestInfo || !items || !amount || !address) {
      return res.json({
        success: false,
        message: "Không được để trống các thông tin!",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.json({
        success: false,
        message: "Giỏ hàng trống! Vui lòng thêm sản phẩm vào giỏ hàng.",
      });
    }

    const trimmedUserInfo = {
      name: guestInfo.name?.trim() || "",
      email: guestInfo.email?.trim() || "",
      phone: guestInfo.phone?.trim() || "",
    };

    if (
      !trimmedUserInfo.name ||
      !trimmedUserInfo.email ||
      !trimmedUserInfo.phone
    ) {
      return res.json({
        success: false,
        message: "Vui lòng cung cấp đầy đủ thông tin người nhận!",
      });
    }

    if (!validator.isEmail(trimmedUserInfo.email)) {
      return res.json({
        success: false,
        message: "Email không hợp lệ!",
      });
    }

    const phoneRegex =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    if (!phoneRegex.test(trimmedUserInfo.phone)) {
      return res.json({
        success: false,
        message: "Số điện thoại không hợp lệ!",
      });
    }

    const trimmedAddress = {
      city: address.city?.trim() || "",
      district: address.district?.trim() || "",
      ward: address.ward?.trim() || "",
      location: address.location?.trim() || "",
    };

    if (
      !trimmedAddress.city ||
      !trimmedAddress.district ||
      !trimmedAddress.ward
    ) {
      return res.json({
        success: false,
        message: "Vui lòng nhập đầy đủ địa chỉ nhận hàng!",
      });
    }

    if (
      trimmedAddress.city.length < 2 ||
      trimmedAddress.ward.length < 2 ||
      trimmedAddress.district.length < 2
    ) {
      return res.json({
        success: false,
        message: "Vui lòng nhập đủ các địa chỉ!",
      });
    }

    if (
      trimmedAddress.location.length < 5 &&
      trimmedAddress.location.length > 0
    ) {
      return res.json({
        success: false,
        message: "Địa chỉ cụ thể phải có ít nhất 5 ký tự!",
      });
    }

    for (const item of items) {
      if (!item._id || !item.amount || item.amount <= 0) {
        return res.json({
          success: false,
          message: "Thông tin sản phẩm không hợp lệ!",
        });
      }

      try {
        const resSales = await axios.post(
          `${process.env.BACKEND_URL}/api/product/increase-sale`,
          {
            productId: item._id,
            quantity: item.amount,
          },
          {
            timeout: 5000,
          }
        );

        if (!resSales.data.success) {
          return res.json({
            success: false,
            message: `Không thể cập nhật số lượng bán cho sản phẩm: ${
              item.name || item._id
            }`,
          });
        }
      } catch (error) {
        console.error("Error updating product sales:", error);
        return res.json({
          success: false,
          message: "Lỗi hệ thống khi cập nhật thông tin sản phẩm",
        });
      }
    }

    const orderId = "B8K" + new Date().getTime();
    const newGuestOrder = await guestOrderModel.create({
      guestInfo,
      items,
      amount,
      address,
      paymentMethod: "MOMO",
      payment: false,
      status: "Chờ xác nhận",
      momoOrderId: orderId,
      created_date: new Date(),
      updated_date: new Date(),
    });

    const token = createToken(
      newGuestOrder._id,
      trimmedUserInfo.name,
      trimmedUserInfo.email,
      trimmedUserInfo.phone
    );

    const partnerCode = "MOMO";
    const requestId = orderId;
    const orderInfo = "Thanh toán đơn hàng tại B8K";
    const redirectUrl = `${process.env.FRONTEND_URL}/verifymomoguest`;
    const ipnUrl = `${process.env.BACKEND_URL}/api/order/momocallbackguest`;
    const requestType = "captureWallet";
    const extraData = token;

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      accessKey,
      partnerCode,
      partnerName: "B8K",
      storeId: "B8KStore",
      requestId,
      amount: amount.toString(),
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang: "vi",
      requestType,
      autoCapture: true,
      extraData,
      signature,
    };

    const momoResponse = await axios.post(
      "https://test-payment.momo.vn/v2/gateway/api/create",
      requestBody,
      {
        headers: { "Content-Type": "application/json" },
        headers: { token },
      }
    );

    return res.json({
      success: true,
      payUrl: momoResponse.data.payUrl,
      message: "Chuyển hướng đến cổng thanh toán...",
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Đặt hàng Momo thất bại!" });
  }
};

const momoCallBackGuest = async (req, res) => {
  try {
    console.log("MoMo callback received:", req.body);

    const { orderId, resultCode, amount } = req.body;
    const { token } = req.headers;

    if (resultCode === 0) {
      const updatedOrder = await guestOrderModel.findOneAndUpdate(
        { momoOrderId: orderId },
        {
          payment: true,
          updated_date: new Date(),
        },
        { new: true }
      );

      if (!updatedOrder) {
        console.error("Không tìm thấy đơn hàng với momoOrderId: ", orderId);
        return res.json({ error: "Không tìm thấy đơn hàng!" });
      }

      const order = await guestOrderModel.findOne({ momoOrderId: orderId });

      await sendEmail({
        to: order.guestInfo.email,
        subject: "Xác nhận đơn hàng từ B8K",
        html: `
    <h2>Xin chào ${order.guestInfo.name},</h2>
    <p>Chúng tôi đã nhận được đơn hàng của bạn.</p>
    <p><strong>Tổng tiền:</strong> ${amount.toLocaleString()} VND</p>
    <p>Cảm ơn bạn đã đặt hàng!</p>
    <p>Nếu bạn muốn xem đơn hàng, xin vui lòng nhấn vào link này: 
    <a href="${
      process.env.FRONTEND_URL
    }/guestorder/${token}">Xem đơn hàng</a>!</p>
    <p>Bạn có thể huỷ trong vòng ${timer(cancelTimer)}</p>
  `,
      });
    } else {
      console.warn(`Payment failed for order ${orderId}. Code: ${resultCode}`);
    }

    return res.json({ message: "Callback processed" });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const momoStatusGuest = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    const { token } = req.headers;
    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = {
      partnerCode: "MOMO",
      requestId: orderId,
      orderId,
      signature,
      lang: "vi",
    };

    const option = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/query",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    const response = await axios(option);
    const momoRes = response.data;

    if (momoRes.resultCode === 0 && momoRes.orderId) {
      const updatedOrder = await guestOrderModel.findOneAndUpdate(
        { momoOrderId: momoRes.orderId },
        {
          payment: true,
          updated_date: new Date(),
        }
      );

      if (!updatedOrder) {
        console.error("Không tìm thấy đơn hàng với momoOrderId: ", orderId);
        return res.json({ error: "Không tìm thấy đơn hàng!" });
      }

      const order = await guestOrderModel.findOne({ momoOrderId: orderId });

      await sendEmail({
        to: order.guestInfo.email,
        subject: "Xác nhận đơn hàng từ B8K",
        html: `
    <h2>Xin chào ${order.guestInfo.name},</h2>
    <p>Chúng tôi đã nhận được đơn hàng của bạn.</p>
    <p><strong>Tổng tiền:</strong> ${amount.toLocaleString()} VND</p>
    <p>Cảm ơn bạn đã đặt hàng!</p>
    <p>Nếu bạn muốn xem đơn hàng, xin vui lòng nhấn vào link này: 
    <a href="${
      process.env.FRONTEND_URL
    }/guestorder/${token}">Xem đơn hàng</a>!</p>
    <p>Bạn có thể huỷ trong vòng ${timer(cancelTimer)}</p>
  `,
      });
    }

    const redirectUrl = `/guestorder/${token}`;

    return res.json({ success: true, momoRes, redirectUrl });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateGuestStatus = async (req, res) => {
  try {
    const { orderId, status, method } = req.body;
    let payment = status === "Đã hoàn tất";
    if (method !== "MOMO") {
      await guestOrderModel.findByIdAndUpdate(orderId, {
        status,
        payment,
        updated_date: Date.now(),
      });
    } else {
      await guestOrderModel.findByIdAndUpdate(orderId, {
        status,
        payment: true,
        updated_date: Date.now(),
      });
    }
    res.json({ success: true, message: "Hoàn tất cập nhật đơn!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const guestOrders = async (req, res) => {
  try {
    const orderId = req.guestOrderId;

    const order = await guestOrderModel.findById(orderId);

    if (!order) {
      return res.json({
        success: false,
        message: "Không tìm thấy sản phẩm!",
      });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const guestDeleteOrder = async (req, res) => {
  try {
    const orderId = req.guestOrderId;

    const order = await guestOrderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Không tìm thấy đơn hàng!" });
    }

    const now = new Date();
    if (now > order.expired_date) {
      return res.json({
        success: false,
        message: `Bạn chỉ có thể xoá đơn hàng trong vòng ${timer(cancelTimer)}`,
      });
    }

    for (const item of order.items) {
      const resSales = await axios.post(
        process.env.BACKEND_URL + "/api/product/decrease-sale",
        {
          productId: item._id,
          quantity: item.amount,
        }
      );
      console.log(resSales.data.message + " guest");

      if (!resSales.data.success) {
        return res.json({
          success: false,
          message: resSales.data.message,
        });
      }
    }

    await guestOrderModel.findByIdAndDelete(orderId);
    res.json({ success: true, message: "Xoá thành công!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrderCOD,
  placeOrderMomo,
  momoCallBack,
  momoStatus,
  placeOrderGuestCOD,
  adminOrders,
  adminGuestOrders,
  userOrders,
  updateStatus,
  userDeleteOrders,
  guestDeleteOrder,
  updateGuestStatus,
  guestOrders,
  placeOrderMomoGuest,
  momoCallBackGuest,
  momoStatusGuest,
};
