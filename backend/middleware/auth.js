import jwt from "jsonwebtoken";

// middleware này dùng để xác thực người dùng
// kiểm tra xem người dùng đã đăng nhập hay chưa bằng cách kiểm tra token headers
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
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    req.json({ success: false, message: error.message });
  }
};
export default authUser
