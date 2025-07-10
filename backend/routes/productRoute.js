import express from "express";
import {
  createProduct,
  decreaseProductSales,
  decreaseProductStock,
  deleteProduct,
  getAllProduct,
  getProductById,
  increaseProductSales,
  increaseProductStock,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post("/create", adminAuth, upload.single("image"), createProduct);
productRouter.post("/update", adminAuth, upload.single("image"), updateProduct);
productRouter.post("/delete", adminAuth, deleteProduct);
productRouter.get("/list", getAllProduct);
productRouter.post("/single", getProductById);
productRouter.post("/increase-stock", increaseProductStock);
productRouter.post("/decrease-stock", decreaseProductStock);
productRouter.post("/increase-sale", increaseProductSales);
productRouter.post("/decrease-sale", decreaseProductSales);

export default productRouter;
