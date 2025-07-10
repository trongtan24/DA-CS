import React from 'react';
import { ScrollToTop } from '../components';

const ErrorPage = () => {
  return (
    <div className="flexCenter flex-col text-center max-padd-container py-16 md:py-28 xl:py-40 rounded-xl bg-white">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-medium text-gray-600 mb-6">Không tìm thấy trang</h2>
      <p className="text-gray-500 mb-8">
        Trang bạn muốn tìm hiện không tồn tại hoặc đã bị di chuyển.
      </p>
      <ScrollToTop 
        to="/" 
        className="btn-secondaryToOne"
      >
        Quay về trang chủ
      </ScrollToTop>
    </div>
  );
};

export default ErrorPage;