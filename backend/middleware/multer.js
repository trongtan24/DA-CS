import multer from "multer";

// middleware này dùng để xử lý file upload
// sử dụng multer để lưu trữ file trên server
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
