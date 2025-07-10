import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userInfo: { type: Object, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Chờ xác nhận" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  momoOrderId: { type: String },
  created_date: { type: Date },
  expired_date: {
    type: Date,
    default: () => new Date(Date.now() + 60 * 60 * 1000),
  },
  updated_date: { type: Date },
});

// kiểm tra xem mô hình đã tồn tại chưa, nếu chưa thì tạo mới
// mongoose.models.order sẽ chứa các mô hình đã được định nghĩa
const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
