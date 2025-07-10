import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  desc: { type: String },
  rating: { type: Number },
  popular: { type: Boolean },
  sales: { type: Number },
  discount: { type: Number },
  stock: { type: Number },
  author: { type: String , default: ""},

  comment: { type: Object },

  created_date: { type: Date },
  updated_date: { type: Date },

  book_text: { type: String },

  book_type: {
    isAudio: { type: Boolean, default: false },
    isEbook: { type: Boolean, default: false },
    isFlipBook: { type: Boolean, default: false },
    isNormalBook: { type: Boolean, default: false },
  },
});

// kiểm tra xem mô hình đã tồn tại chưa, nếu chưa thì tạo mới
// mongoose.models.product sẽ chứa các mô hình đã được định nghĩa
const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
