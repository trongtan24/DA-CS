import React, { useContext } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiMessageSquare,
} from "react-icons/fi";
import { ShopContext } from "../context/ShopContext";
import { Map } from "../components";

const Contact = () => {
  const { token, toggleLogin } = useContext(ShopContext);
  const contactMethods = [
    {
      icon: <FiPhone className="text-2xl text-blue-600" />,
      title: "Điện thoại",
      description: "Gọi cho chúng tôi để được hỗ trợ nhanh nhất",
      details: ["Hotline: 028 7100 0888", "Hỗ trợ kỹ thuật: 028 7100 0888"],
      action: "Gọi ngay",
    },
    {
      icon: <FiMail className="text-2xl text-blue-600" />,
      title: "Email",
      description: "Gửi email cho chúng tôi bất kỳ lúc nào",
      details: [
        "Hỗ trợ khách hàng: info@B8K.com",
        // "Hợp tác: partner@bookstore.vn"
      ],
      action: "Gửi email",
    },
    {
      icon: <FiMessageSquare className="text-2xl text-blue-600" />,
      title: "Chat trực tuyến",
      description: "Trò chuyện với nhân viên hỗ trợ",
      details: [
        "Thời gian: 8:00 - 22:00 hàng ngày",
        "Truy cập góc phải màn hình để bắt đầu chat",
      ],
      action: "Bắt đầu chat",
    },
  ];

  const storeLocations = [
    {
      city: "Hồ Chí Minh",
      address: "736 Nguyễn Trãi, Phường 11, Quận 5",
      hours: "06:30 - 17:30 hàng ngày",
      phone: "028 7100 0888",
      map: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.75593178441!2d106.6603784!3d10.7532842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ef6ca551517%3A0xc331bdcaa0992e4b!2zNzM2IE5ndXnhu4VuIFRyw6NpLCBQaMaw4budbmcgMTEsIFF14bqtbiA1LCBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1751472293817!5m2!1svi!2s"
          width="100%"
          height="250"
          style={{ border: 0 }}
          className="rounded-xl"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
    {
      city: "Hồ Chí Minh",
      address: "37 Đ. Kinh Dương Vương, Phường 12, Quận 6",
      hours: "7:00 - 17:00 hàng ngày",
      phone: "028 7100 0888",
      map: (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.7654075015403!2d106.63021587573591!3d10.75255485963223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fe8b6889e01%3A0xfb7ef9f4a3e8650d!2zMzcgxJAuIEtpbmggRMawxqFuZyBWxrDGoW5nLCBQaMaw4budbmcgMTIsIFF14bqtbiA2LCBI4buTIENow60gTWluaCA3MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1751472468535!5m2!1svi!2s"
          width="100%"
          height="250"
          style={{ border: 0 }}
          className="rounded-xl"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
    // {
    //   city: "Hồ Chí Minh",
    //   address: "",
    //   hours: "8:00 - 21:00 hàng ngày",
    //   phone: "028 7100 0888"
    // }
  ];

  const faqs = [
    {
      question: "Thời gian phản hồi email trong bao lâu?",
      answer: "Chúng tôi phản hồi email trong vòng 24 giờ làm việc.",
    },
    // {
    //   question: "Có thể đến trực tiếp cửa hàng để được tư vấn không?",
    //   answer:
    //     "Hoàn toàn có thể! Chúng tôi luôn sẵn lòng đón tiếp bạn tại các cửa hàng trong giờ làm việc.",
    // },
    {
      question: "Làm cách nào để phản ánh về chất lượng dịch vụ?",
      answer:
        "Bạn có thể gửi email đến info@B8K.com hoặc gọi hotline 028 7100 0888.",
    },
  ];

  return (
    <div className="max-padd-container bg-white mx-auto py-12 rounded-xl">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Liên hệ với chúng tôi
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy chọn phương thức
          liên hệ phù hợp nhất với bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">{method.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">
                {method.title}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">{method.description}</p>
            <ul className="space-y-2 mb-6">
              {method.details.map((detail, i) => (
                <li key={i} className="text-gray-700">
                  {detail}
                </li>
              ))}
            </ul>
            <button
              onClick={
                method.action === "Bắt đầu chat" && !token ? toggleLogin : null
              }
              className="text-blue-600 font-medium hover:text-blue-800 flex items-center"
            >
              {method.action} <span className="ml-1">→</span>
            </button>
          </div>
        ))}
      </div>

      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Gửi tin nhắn cho chúng tôi</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên*</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Chủ đề*</label>
            <select
              id="subject"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Chọn chủ đề</option>
              <option value="order">Hỏi về đơn hàng</option>
              <option value="product">Hỏi về sản phẩm</option>
              <option value="return">Đổi trả/hoàn tiền</option>
              <option value="other">Khác</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Nội dung*</label>
            <textarea
              id="message"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Gửi tin nhắn
            </button>
          </div>
        </form>
      </div> */}

      <div className="mb-16">
        <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">
          Vị trí cửa hàng trên bản đồ
        </h2>

        <div className="grid grid-cols-1 md:flexEvenly gap-6">
          {storeLocations.map((location, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start mb-4">
                  <FiMapPin className="text-blue-600 text-xl mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {location.city}
                    </h3>
                    <p className="text-gray-600">{location.address}</p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <FiClock className="text-gray-400 mr-3" />
                  <span className="text-gray-700">{location.hours}</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="text-gray-400 mr-3" />
                  <span className="text-gray-700">{location.phone}</span>
                </div>
              </div>
              <div>{location.map}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl py-8">
        <h2 className="text-2xl md:text-center font-bold text-gray-800 mb-6">
          Câu hỏi thường gặp
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                {faq.question}
              </h3>
              <span className="text-blue-600">{faq.answer}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
