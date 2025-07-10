import jwt from "jsonwebtoken";

// middleware này dùng để xác thực người dùng là admin
// Kiểm tra xem người dùng đã đăng nhập với quyền admin hay chưa bằng cách kiểm tra token giống với email password của .env
const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Bạn chưa xác thực" });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Bạn chưa xác thực" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
