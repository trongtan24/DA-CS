import { Link } from "react-router-dom";

function error404() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl mb-12 font-bold">404 - Không tìm thấy trang</h1>
      <Link to="/" className="underline underline-offset-8 transition duration-300 ease-in-out hover:scale-120">Quay về trang chủ</Link>
    </div>
  );
}

export default error404;