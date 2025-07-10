import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

const createProduct = async (req, res) => {
  try {
    const {
      name,
      desc,
      category,
      author,
      price,
      popular,
      discount,
      sales,
      stock,
      isAudio,
      isEbook,
      isFlipBook,
      isNormalBook,
    } = req.body;

    // if (isNormalBook && (isAudio || isEbook || isFlipBook)) {
    //   return res.json({
    //     success: true,
    //     message: "Chỉ được sách giấy hoặc những thứ còn lại!",
    //   });
    // }

    // if (author && author.trim().length === 0) {
    //   return res.json({
    //     success: false,
    //     message: "Vui lòng nhập tác giả!",
    //   });
    // }

    if (category.trim().length === 0) {
      return res.json({
        success: false,
        message: "Vui lòng chọn một mục!",
      });
    }

    if (name.trim().length <= 3) {
      return res.json({
        success: false,
        message: "Bạn phải nhập tên sản phẩm với ít nhất 4 ký tự!",
      });
    }

    if (discount <= 0 && discount >= 100) {
      return res.json({
        success: false,
        message: "Khuyến mãi không được nhỏ hơn 0 hoặc lớn hơn 100!",
      });
    }

    if (price <= 0) {
      return res.json({
        success: false,
        message: "Xin vui lòng nhập một giá trị nhất định cho giá tiền!",
      });
    }

    let imageUrl = "https://placehold.co/600x400";

    if (req.file) {
      console.log("Uploaded File:", req.file);
      imageUrl = await cloudinary.uploader
        .upload(req.file.path, { resource_type: "image" })
        .then((res) => res.secure_url);
    }

    const productData = {
      name,
      image: imageUrl,
      price: Number(price * 1000),
      category,
      desc,
      popular: popular === "true",
      sales: Number(sales || 0),
      discount: Number(discount || 0),
      stock: Number(stock || 0),
      author: author?.trim() || "",
      created_date: new Date(),
      updated_date: new Date(),
      book_type: {
        isAudio: isAudio === "true",
        isEbook: isEbook === "true",
        isFlipBook: isFlipBook === "true",
        isNormalBook: isNormalBook === "true",
      },
    };

    console.log("Product data: ", productData);

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Tạo sản phẩm thành công!" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Tạo sản phẩm thất bại!",
      errorMessage: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      id,
      name,
      price,
      author,
      desc,
      discount,
      category,
      popular,
      isAudio,
      isEbook,
      isFlipBook,
      isNormalBook,
    } = req.body;

    const file = req.file;
    const product = await productModel.findById(id);
    if (!product) {
      return res.json({ success: false, message: "Không tìm thấy sản phẩm!" });
    }

    if (category.trim().length === 0) {
      return res.json({
        success: false,
        message: "Vui lòng chọn một mục!",
      });
    }

    if (name.trim().length <= 3) {
      return res.json({
        success: false,
        message: "Bạn phải nhập tên sản phẩm với ít nhất 4 ký tự!",
      });
    }

    if (discount <= 0 && discount >= 100) {
      return res.json({
        success: false,
        message: "Khuyến mãi không được nhỏ hơn 0 hoặc lớn hơn 100!",
      });
    }

    if (price <= 0) {
      return res.json({
        success: false,
        message: "Xin vui lòng nhập một giá trị nhất định cho giá tiền!",
      });
    }

    let trimauthor = author.trim().length === 0 ? "" : author.trim()

    product.name = name || product.name;
    product.price = price ? price * 1000 : product.price;
    product.desc = desc ?? product.desc;
    product.discount = discount ?? product.discount;
    product.category = category || product.category;
    product.popular = popular === "true";
    product.updated_date = new Date();
    product.author = trimauthor;

    product.book_type = {
      isAudio: isAudio === "true",
      isEbook: isEbook === "true",
      isFlipBook: isFlipBook === "true",
      isNormalBook: isNormalBook === "true",
    };

    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      });
      product.image = uploadResult.secure_url;
    }

    await product.save();

    return res.json({ success: true, message: "Cập nhật thành công!" });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      message: "Lỗi khi cập nhật!",
      errorMessage: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Xoá sản phẩm thành công!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const increaseProductStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res.json({
        success: false,
        message: `Thiếu thông tin!`,
      });
    }

    const item = await productModel.findById(productId);

    if (!item) {
      return res.json({
        success: false,
        message: `Không tìm thấy sản phẩm với id: ${productId}!`,
      });
    }

    await productModel.findByIdAndUpdate(productId, {
      $inc: { stock: quantity },
    });

    return res.json({
      success: true,
      message: `Đã tăng tồn kho cho sản phẩm: ${item.name}`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const decreaseProductStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    console.log("productId: " + productId);
    console.log("quantity: " + quantity);

    if (!productId || quantity == null) {
      return res.json({
        success: false,
        message: `Thiếu thông tin!`,
      });
    }

    const item = await productModel.findById(productId);

    if (!item) {
      return res.json({
        success: false,
        message: `Không tìm thấy sản phẩm với id: ${productId}!`,
      });
    }

    if (item.stock < quantity) {
      return res.json({
        success: false,
        message: `Không đủ tồn kho cho sản phẩm: ${item.name}!`,
      });
    }

    await productModel.findByIdAndUpdate(productId, {
      $inc: { stock: -quantity },
    });

    return res.json({
      success: true,
      message: `Đã giảm tồn kho cho sản phẩm: ${item.name}`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const increaseProductSales = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || quantity == null) {
      return res.json({
        success: false,
        message: `Thiếu thông tin!`,
      });
    }

    const item = await productModel.findById(productId);

    if (!item) {
      return res.json({
        success: false,
        message: `Không tìm thấy sản phẩm với id: ${productId}!`,
      });
    }

    await productModel.findByIdAndUpdate(productId, {
      $inc: { sales: quantity },
    });

    return res.json({
      success: true,
      message: `Đã tăng số lượng bán cho sản phẩm: ${item.name}`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const decreaseProductSales = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    console.log("productId: " + productId);
    console.log("quantity: " + quantity);

    if (!productId || quantity == null) {
      return res.json({
        success: false,
        message: `Thiếu thông tin!`,
      });
    }

    const item = await productModel.findById(productId);

    if (!item) {
      return res.json({
        success: false,
        message: `Không tìm thấy sản phẩm với id: ${productId}!`,
      });
    }

    if (item.sales < quantity) {
      return res.json({
        success: false,
        message: `Số lượng bán sản phẩm lỗi: ${item.name}!`,
      });
    }

    await productModel.findByIdAndUpdate(productId, {
      $inc: { sales: -quantity },
    });

    return res.json({
      success: true,
      message: `Đã giảm số lượng bán cho sản phẩm: ${item.name}`,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  increaseProductStock,
  decreaseProductStock,
  increaseProductSales,
  decreaseProductSales,
};
