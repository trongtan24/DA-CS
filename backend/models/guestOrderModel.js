import mongoose from "mongoose";

const guestOrderSchema = new mongoose.Schema({
  guestInfo: { type: Object, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Chờ xác nhận" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true },
  momoOrderId: { type: String },
  created_date: { type: Date },
  expired_date: {
    type: Date,
    default: () => new Date(Date.now() + 60 * 60 * 1000),
  },
  updated_date: { type: Date },
});

const guestOrderModel =
  mongoose.models.guestOrder || mongoose.model("guestOrder", guestOrderSchema);

export default guestOrderModel;
