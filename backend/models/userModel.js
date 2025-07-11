import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: Object },
    password: { type: String, require: true },
    cartData: { type: Object, default: {} },
    image: { type: String },

    created_date: { type: Date },
    login_date: { type: Date },
    updated_date: { type: Date },

    otp: {
      type: {
        otpCode: { type: String },
        isUsed: { type: Boolean, default: false, required: true },
        verifyEmail: { type: Boolean, default: false },
        verifyPhone: { type: Boolean, default: false },
        attempts: { type: Number, default: 0, max: 5 },
        created_date: { type: Date, default: Date.now },
        expired_date: {
          type: Date,
          default: () => new Date(Date.now() + 15 * 60 * 1000),
        },
      },
      default: {},
    },

    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { minimize: false } // minimize: false để lưu trữ các trường có giá trị null hoặc undefined
);

// kiểm tra xem mô hình đã tồn tại chưa, nếu chưa thì tạo mới
// mongoose.models.user sẽ chứa các mô hình đã được định nghĩa
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
