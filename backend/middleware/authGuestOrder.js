import jwt from "jsonwebtoken";

// middleware này dùng để xác thực người dùng
// kiểm tra xem người dùng đã đăng nhập hay chưa bằng cách kiểm tra token trong header(orderid, name, email, phone)
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Bạn chưa xác thực, vui lòng đăng nhập lại",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!token_decode.orderid) {
      return res.json({
        success: false,
        message: "Thiếu orderId trong token!",
      });
    }
    if (!token_decode.email) {
      return res.json({
        success: false,
        message: "Thiếu email trong token!",
      });
    }
    if (!token_decode.name) {
      return res.json({
        success: false,
        message: "Thiếu tên trong token!",
      });
    }

    if (!token_decode.phone) {
      return res.json({
        success: false,
        message: "Thiếu số điện thoại trong token!",
      });
    }
    req.guestOrderId = token_decode.orderid;
    
    next();
  } catch (error) {
    console.log(error);
    req.json({ success: false, message: error.message });
  }
};
export default authUser;
