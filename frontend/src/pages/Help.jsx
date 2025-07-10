import React from 'react';
import { FiHelpCircle, FiTruck, FiCreditCard, FiLock, FiMail, FiPhone, FiMessageSquare } from 'react-icons/fi';

const Help = () => {
  const faqs = [
    {
      category: "Đặt hàng & Thanh toán",
      questions: [
        {
          question: "Làm thế nào để đặt hàng?",
          answer: "Bạn có thể đặt hàng bằng cách thêm sản phẩm vào giỏ hàng và tiến hành thanh toán. Chọn thanh toán phù hợp."
        },
        {
          question: "Có những phương thức thanh toán nào?",
          answer: "Chúng tôi chấp nhận thanh toán qua ví điện tử Momo, và thanh toán khi nhận hàng (COD)."
        },
        {
          question: "Làm sao kiểm tra tình trạng đơn hàng?",
          answer: "Bạn có thể kiểm tra tình trạng đơn hàng trong mục 'Đơn hàng' sau khi đăng nhập."
        }
      ]
    },
    {
      category: "Vận chuyển & Giao nhận",
      questions: [
        {
          question: "Thời gian giao hàng bao lâu?",
          answer: "Thời gian giao hàng từ 2-5 ngày làm việc đối với nội thành và 5-10 ngày đối với các tỉnh thành khác, tùy thuộc vào địa chỉ nhận hàng."
        },
        {
          question: "Phí vận chuyển được tính như thế nào?",
          answer: "Phí vận chuyển phụ thuộc vào trọng lượng đơn hàng và địa chỉ giao hàng. Miễn phí vận chuyển cho đơn hàng từ 300.000đ trở lên."
        },
        // {
        //   question: "Có thể thay đổi địa chỉ giao hàng sau khi đặt?",
        //   answer: "Bạn có thể thay đổi địa chỉ giao hàng trong vòng 1 giờ sau khi đặt. Sau thời gian này, vui lòng liên hệ bộ phận hỗ trợ."
        // }
      ]
    },
    {
      category: "Đổi trả & Hoàn tiền",
      questions: [
        {
          question: "Chính sách đổi trả như thế nào?",
          answer: "Bạn có thể đổi trả sản phẩm trong vòng 7 ngày nếu có lỗi từ nhà sản xuất hoặc giao sai hàng. Sản phẩm phải còn nguyên vẹn, chưa qua sử dụng."
        },
        {
          question: "Thời gian xử lý hoàn tiền bao lâu?",
          answer: "Thời gian hoàn tiền từ 3-5 ngày làm việc sau khi chúng tôi nhận được hàng trả lại và xác nhận điều kiện đổi trả."
        },
        {
          question: "Tôi cần chuẩn bị gì khi đổi trả hàng?",
          answer: "Vui lòng giữ lại hóa đơn, đóng gói sản phẩm nguyên vẹn như ban đầu và liên hệ bộ phận hỗ trợ để được hướng dẫn cụ thể."
        },
        {
          question: "Khoản thời gian mà tôi có thể huỷ đơn hàng?",
          answer: "Bạn chỉ có thể huỷ đơn hàng trong khoản 1 tiếng sau khi đặt."
        }
      ]
    },
    {
      category: "Tài khoản & Bảo mật",
      questions: [
        {
          question: "Làm sao để đặt lại mật khẩu?",
          answer: "Tại trang đăng nhập, nhấn vào 'Quên mật khẩu' và làm theo hướng dẫn. Một email khôi phục sẽ được gửi đến địa chỉ email đã đăng ký."
        },
        {
          question: "Làm thế nào để cập nhật thông tin cá nhân?",
          answer: "Sau khi đăng nhập, vào mục 'Thông tin' để cập nhật thông tin cá nhân, địa chỉ giao hàng."
        },
        // {
        //   question: "Thông tin thanh toán có được bảo mật không?",
        //   answer: "Chúng tôi sử dụng công nghệ mã hóa SSL để bảo vệ mọi thông tin thanh toán. Chúng tôi không lưu trữ thông tin thẻ tín dụng của bạn."
        // }
      ]
    }
  ];

  const supportOptions = [
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email hỗ trợ",
      description: "Gửi yêu cầu hỗ trợ qua email",
      contact: "support@bookstore.vn",
      action: "Gửi email"
    },
    {
      icon: <FiPhone className="text-2xl" />,
      title: "Hotline",
      description: "Gọi điện thoại để được hỗ trợ nhanh",
      contact: "1900 1234 (8:00 - 22:00 hàng ngày)",
      action: "Gọi ngay"
    },
    {
      icon: <FiMessageSquare className="text-2xl" />,
      title: "Chat trực tuyến",
      description: "Chat với nhân viên hỗ trợ",
      contact: "Có sẵn từ 8:00 - 22:00",
      action: "Bắt đầu chat"
    }
  ];

  return (
    <div className="max-padd-container bg-white pt-4 rounded-xl">
      {/* Header */}
      <div className="text-center mb-12">
        <FiHelpCircle className="mx-auto text-4xl text-blue-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hỗ trợ</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn. Tìm câu trả lời trong các câu hỏi thường gặp hoặc liên hệ trực tiếp với đội ngũ hỗ trợ của chúng tôi.
        </p>
      </div>

      {/* Search
      <div className="mb-12">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi, vấn đề cần hỗ trợ..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div> */}

      {/* Quick Links */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-blue-50 p-4 rounded-lg flex items-center">
          <FiHelpCircle className="text-blue-600 text-2xl mr-3" />
          <div>
            <h3 className="font-medium">Hướng dẫn mua hàng</h3>
            <p className="text-sm text-gray-600">Các bước đặt hàng đơn giản</p>
          </div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg flex items-center">
          <FiTruck className="text-green-600 text-2xl mr-3" />
          <div>
            <h3 className="font-medium">Theo dõi đơn hàng</h3>
            <p className="text-sm text-gray-600">Kiểm tra tình trạng giao hàng</p>
          </div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg flex items-center">
          <FiCreditCard className="text-purple-600 text-2xl mr-3" />
          <div>
            <h3 className="font-medium">Phương thức thanh toán</h3>
            <p className="text-sm text-gray-600">Các cách thanh toán an toàn</p>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg flex items-center">
          <FiLock className="text-red-600 text-2xl mr-3" />
          <div>
            <h3 className="font-medium">Bảo mật thông tin</h3>
            <p className="text-sm text-gray-600">Chính sách bảo mật của chúng tôi</p>
          </div>
        </div>
      </div> */}

      {/* FAQs */}
      <div className="pb-12">
        <h2 className="text-2xl font-bold text-gray-800 pb-6">Câu hỏi thường gặp</h2>
        <div className="space-y-8">
          {faqs.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <h3 className=" bg-primary px-4 py-3 font-medium text-gray-800">{category.category}</h3>
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, qIndex) => (
                  <div key={qIndex} className="p-4">
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span className="text-blue-600">{item.question}</span>
                        <span className="transition group-open:rotate-180">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-2 text-gray-600">{item.answer}</p>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      {/* <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Liên hệ hỗ trợ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportOptions.map((option, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">{option.icon}</div>
              <h3 className="font-medium text-lg mb-2">{option.title}</h3>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <p className="font-medium mb-4">{option.contact}</p>
              <button className="text-blue-600 font-medium hover:text-blue-800">
                {option.action} →
              </button>
            </div>
          ))}
        </div>
      </div> */}

      {/* Additional Help */}
      {/* <div className="bg-white rounded-lg p-6 pb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Bạn vẫn cần giúp đỡ?</h2>
        <p className="text-gray-600 mb-4">
          Nếu bạn không tìm thấy câu trả lời trong các câu hỏi thường gặp, vui lòng gửi yêu cầu hỗ trợ trực tiếp cho chúng tôi.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Gửi yêu cầu hỗ trợ
        </button>
      </div> */}
    </div>
  );
};

export default Help;