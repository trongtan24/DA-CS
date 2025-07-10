import mongoose from "mongoose";

// Kết nối đến MongoDB
// sử dụng mongoose để kết nối đến MongoDB
// mongoose là một thư viện ODM (Object Data Modeling) cho MongoDB và Node.js
const connectDB = async () => {
  try {
    // connect
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASE CONNECTED - db.js");
  } catch (error) {
    console.log("FAIL TO CONNECT DATABASE - db.js: ", error.message);
  }
};

export default connectDB;
