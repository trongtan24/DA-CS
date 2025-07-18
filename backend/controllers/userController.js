import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import validator from "validator";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import otpGenerator from "otp-generator";

const otpValidate = async (user, otp) => {
  if (!otp) {
    return { valid: false, message: "Vui lòng nhập mã OTP!" };
  }

  const now = new Date();
  if (now > user.otp.expired_date) {
    return { valid: false, message: "Mã OTP đã hết hạn!" };
  }

  if (user.otp.isUsed) {
    return { valid: false, message: "Mã OTP đã được sử dụng!" };
  }

  if (user.otp.attempts >= 5) {
    return { valid: false, message: "Vượt quá số lần, hãy tạo mã OTP mới!" };
  }

  const isMatch = await bcrypt.compare(otp, user.otp.otpCode);

  if (!isMatch) {
    await userModel.findByIdAndUpdate(user._id, {
      $inc: { "otp.attempts": 1 },
    });
    return { valid: false, message: "Mã OTP không đúng!" };
  }

  return { valid: true };
};

// Zod schema để kiểm tra mật khẩu
const passwordSchema = z
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .superRefine((password, ctx) => {
    // superRefine để kiểm tra nhiều điều kiện
    const conditions = [
      { regex: /[a-z]/, type: "Chữ thường" },
      { regex: /[A-Z]/, type: "Chữ in" },
      { regex: /\d/, type: "số" },
      { regex: /[@$!%*?&]/, type: "Ký tự đặc biệt" },
    ];

    // Kiểm tra từng điều kiện
    const failedConditions = conditions
      .filter(({ regex }) => !regex.test(password)) // Lọc các điều kiện không đạt
      .map(({ type }) => type); // Lấy các điều kiện không đạt

    if (failedConditions.length >= 2) {
      // Nếu có ít nhất 2 điều kiện không đạt
      ctx.addIssue({
        code: z.ZodIssueCode.custom, // Mã lỗi tùy chỉnh
        message: `Cần ít nhất một: ${failedConditions.join(", ")}`, // Liệt kê các điều kiện không đạt
      });
    }
  });

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
        isAdmin: true,
        message: "Đăng nhập thành công!",
      });
    } else {
      res.json({
        success: false,
        message: "Tài khoản sai hoặc không tồn tại!",
        isAdmin: false,
      });
    }
  } catch (error) {
    console.log("ERROR - userController.js - login: " + error);
    res.json({ success: false, message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Tài khoản sai hoặc không tồn tại!",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Tài khoản sai hoặc không tồn tại!",
      });
    }

    (user.login_date = new Date()), await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({
      success: true,
      message: "Đăng nhập thành công!",
      token,
    });
  } catch (error) {
    console.log("Failed - userController.js - login" + error);
    return res.json({ success: false, message: error.message });
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin!",
      });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const isText = /^[\p{L}\s]*$/u;
    const nameRegex = /^(?:\p{L}{2,})(?: \p{L}{2,})*$/u;

    if (trimmedName.length === 0) {
      return res.json({
        success: false,
        message: "Tên không được để trống!",
      });
    }

    if (!isText.test(trimmedName)) {
      return res.json({
        success: false,
        message: "Tên chỉ được chứa chữ cái và khoảng trắng!",
      });
    }

    if (!nameRegex.test(trimmedName)) {
      return res.json({
        success: false,
        message: "Mỗi từ trong tên phải có ít nhất 2 ký tự!",
      });
    }

    if (trimmedEmail.length === 0) {
      return res.json({
        success: false,
        message: "Email không được để trống!",
      });
    }

    if (!validator.isEmail(trimmedEmail)) {
      return res.json({
        success: false,
        message: "Địa chỉ email không hợp lệ!",
      });
    }

    const existingUser = await userModel.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email đã được đăng ký!",
      });
    }

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Mật khẩu không giống nhau!",
      });
    }

    const passwordValidation = passwordSchema.safeParse(password);
    if (!passwordValidation.success) {
      return res.json({
        success: false,
        message: passwordValidation.error.errors[0].message,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name: trimmedName,
      email: trimmedEmail,
      password: hashedPassword,
      created_date: new Date(),
      updated_date: new Date(),
      login_date: new Date(),
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    return res.json({ success: true, token });
  } catch (error) {
    console.log("ERROR - userController.js - register: " + error);
    res.json({ success: false, message: error.message });
  }
};

const userGetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({
        success: false,
        message: "Vui lòng nhập email!",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Tài khoản sai hoặc không tồn tại!",
      });
    }

    if (user.otp.otpCode && user.otp.created_date) {
      const now = new Date();
      const otpCreatedTime = new Date(user.otp.created_date);
      const timeElapsed = (now - otpCreatedTime) / 1000;

      if (timeElapsed < 30) {
        return res.json({
          success: false,
          message: "Vui lòng đợi 30 giây trước khi gửi lại OTP!",
        });
      }
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
    });

    const salt = await bcrypt.genSalt(10);
    const hashedOTP = await bcrypt.hash(otp, salt);

    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        otp: {
          otpCode: hashedOTP,
          for: "password_reset",
          isUsed: false,
          attempts: 0,
          created_date: new Date(),
          expired_date: new Date(Date.now() + 30 * 60 * 1000),
        },
      },
      { new: true }
    );

    await updatedUser.save();

    await sendEmail({
      to: user.email,
      subject: "Xác nhận đơn hàng từ B8K",
      html: `
        <h2>Xin chào ${user.name},</h2>
        <p>Chúng tôi xin gửi mã OTP cho bạn.</p>
        <p><strong>OTP:</strong> ${otp} </p>
        <p>Mã được tạo từ </strong> ${new Date(
          user.otp.created_date
        ).toLocaleString()} </p>
        <p>Và sẽ bị vô hiệu hoá trong: </strong> ${new Date(
          user.otp.expired_date
        ).toLocaleString()} </p>
      `,
    });

    return res.json({
      success: true,
      message: "Đã gửi mã OTP!",
      email: email,
    });
  } catch (error) {
    console.log("Failed - userController.js - login" + error);
    return res.json({ success: false, message: error.message });
  }
};

const userVerifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Tài khoản sai hoặc không tồn tại!",
      });
    }

    const validate = await otpValidate(user, otp);
    if (!validate.valid) {
      return res.json({
        success: false,
        message: validate.message,
      });
    }

    await userModel.findByIdAndUpdate(user._id, {
      otp: { isUsed: true },
    });

    return res.json({
      success: true,
      message: "Mã xác nhận thành công!",
      otp: user.otp,
    });
  } catch (error) {
    console.log("Failed - userController.js - login" + error);
    return res.json({ success: false, message: error.message });
  }
};

const userResetPassword = async (req, res) => {
  try {
    const { newPassword, email } = req.body;

    if (!newPassword) {
      return res.json({
        success: false,
        message: "Vui lòng nhập mật khẩu mới!",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Tài khoản sai hoặc không tồn tại!",
      });
    }

    const passwordValidation = passwordSchema.safeParse(newPassword);
    if (!passwordValidation.success) {
      return res.json({
        success: false,
        message: passwordValidation.error.errors[0].message,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await userModel.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    const token = createToken(user._id);
    return res.json({
      success: true,
      message: "Đổi mật khẩu thành công!",
      token,
    });
  } catch (error) {
    console.log("Failed - userController.js - login" + error);
    return res.json({ success: false, message: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password"); // Không trả về mật khẩu
    if (!userData) {
      return res.json({ success: false, message: "Người dùng không tồn tại!" });
    }
    res.json({ success: true, userData });
  } catch (error) {
    console.log("ERROR - userController.js - getUserInfo: " + error);
    res.json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId, user } = req.body;

    if (!userId || !user) {
      return res.json({
        success: false,
        message: "Thiếu thông tin userId hoặc user!",
      });
    }

    const trimmedUser = {
      ...user,
      name: user.name?.trim() || "",
      email: user.email?.trim() || "",
      phone: user.phone?.trim() || "",
      address: {
        city: user.address?.city?.trim() || "",
        district: user.address?.district?.trim() || "",
        ward: user.address?.ward?.trim() || "",
        location: user.address?.location?.trim() || "",
      },
    };

    const existingUser = await userModel.findOne({ _id: userId });
    if (!existingUser) {
      return res.json({
        success: false,
        message: "Không tìm thấy người dùng!",
      });
    }

    const isUnchanged =
      trimmedUser.name === existingUser.name &&
      trimmedUser.email === existingUser.email &&
      trimmedUser.phone === existingUser.phone &&
      trimmedUser.address.location === existingUser.address?.location &&
      trimmedUser.address.city === existingUser.address?.city &&
      trimmedUser.address.district === existingUser.address?.district &&
      trimmedUser.address.ward === existingUser.address?.ward &&
      (!req.file || user.image === existingUser.image);

    if (isUnchanged) {
      return res.json({
        success: false,
        message: "Không có thay đổi nào để cập nhật",
      });
    }

    const isText = /^[\p{L}\s]*$/u;
    const nameRegex = /^(?:\p{L}{2,})(?: \p{L}{2,})*$/u;

    if (trimmedUser.name) {
      if (!isText.test(trimmedUser.name)) {
        return res.json({
          success: false,
          message: "Tên phải dưới dạng chữ!",
        });
      }

      if (!nameRegex.test(trimmedUser.name)) {
        return res.json({
          success: false,
          message: "Vui lòng nhập ít nhất 2 ký tự mỗi từ!",
        });
      }
    }

    if (trimmedUser.phone && trimmedUser.phone !== existingUser.phone) {
      const phoneRegex =
        /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

      if (!phoneRegex.test(trimmedUser.phone)) {
        return res.json({
          success: false,
          message: "Số điện thoại không hợp lệ!",
        });
      }

      const phoneExists = await userModel.findOne({
        phone: trimmedUser.phone,
        _id: { $ne: userId },
      });

      if (phoneExists) {
        return res.json({
          success: false,
          message: "Số điện thoại đã được sử dụng!",
        });
      }
    }

    if (trimmedUser.address) {
      const { city, district, ward, location } = trimmedUser.address;

      if (city && city.length < 2) {
        return res.json({
          success: false,
          message: "Tên thành phố phải có ít nhất 2 ký tự!",
        });
      }

      if (district && district.length < 2) {
        return res.json({
          success: false,
          message: "Tên quận/huyện phải có ít nhất 2 ký tự!",
        });
      }

      if (ward && ward.length < 2) {
        return res.json({
          success: false,
          message: "Tên phường/xã phải có ít nhất 2 ký tự!",
        });
      }

      if (location && location.length < 5) {
        return res.json({
          success: false,
          message: "Địa chỉ cụ thể phải có ít nhất 5 ký tự!",
        });
      }
    }

    let imageUrl = existingUser.image || "https://placehold.co/600x400";

    if (req.file) {
      console.log("Uploaded File:", req.file);
      imageUrl = await cloudinary.uploader
        .upload(req.file.path, { resource_type: "image" })
        .then((res) => res.secure_url);
    }

    const updateData = {
      name: trimmedUser.name || existingUser.name,
      phone: trimmedUser.phone || existingUser.phone,
      image: imageUrl,
      address: {
        city: trimmedUser.address.city || existingUser.address?.city,
        district:
          trimmedUser.address.district || existingUser.address?.district,
        ward: trimmedUser.address.ward || existingUser.address?.ward,
        location:
          trimmedUser.address.location || existingUser.address?.location,
      },
      updated_date: new Date(),
    };

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData);

    if (!updatedUser) {
      return res.json({
        success: false,
        message: "Cập nhật người dùng thất bại!",
      });
    }

    res.json({ success: true, message: "Cập nhật người dùng thành công!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  userLogin,
  userRegister,
  adminLogin,
  getUserInfo,
  updateUser,
  userGetOtp,
  userVerifyOTP,
  userResetPassword,
};
