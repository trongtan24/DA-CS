import { ScrollToTopLink } from "../reuseable/";

function About() {
  return (
    <>
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">🌐 Giới thiệu về B8K – Nhà sách số dành cho lập trình viên</h1>

        <section className="mb-8">
          <p className="text-lg">
            Chào mừng bạn đến với <strong>B8K</strong>, nơi hội tụ những đầu sách chất lượng dành cho <span className="font-semibold">lập trình viên</span>, kỹ sư phần mềm, sinh viên công nghệ, và bất kỳ ai đam mê học hỏi trong lĩnh vực CNTT.
            Chúng tôi không chỉ cung cấp sách mà còn là bạn đồng hành trong hành trình phát triển sự nghiệp của bạn.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">📚 B8K có gì đặc biệt?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Kho sách lập trình phong phú:</strong> Từ sách nhập môn đến tài liệu chuyên sâu như <em>Clean Code</em>, <em>System Design</em>, v.v.</li>
            <li><strong>Cập nhật liên tục:</strong> Những đầu sách công nghệ mới nhất từ các nhà xuất bản uy tín.</li>
            <li><strong>Không chỉ sách!</strong> Còn có:
              <ul className="list-disc ml-6 mt-1 space-y-1">
                <li>Dụng cụ học tập: vở, bút, stand laptop, keycap...</li>
                <li>Sách kỹ năng: quản lý thời gian, tư duy phản biện...</li>
                <li>Sách văn học, giải trí nhẹ nhàng sau giờ code.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">💡 Sứ mệnh của chúng tôi</h2>
          <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600">
            "Giúp lập trình viên học nhanh hơn, sâu hơn và thông minh hơn."
          </blockquote>
          <p className="mt-2">Chúng tôi tin rằng <strong>một cuốn sách hay có thể thay đổi cả sự nghiệp</strong>, và B8K là nơi kết nối bạn với những cuốn sách như thế.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">🤝 Cam kết từ B8K</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>✅ Sản phẩm chính hãng</strong>, chất lượng in ấn đảm bảo.</li>
            <li><strong>🚚 Giao hàng toàn quốc</strong>, nhanh chóng và an toàn.</li>
            <li><strong>💬 Tư vấn nhiệt tình</strong>, hiểu dân công nghệ cần gì!</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-500 mb-3">📞 Liên hệ với B8K</h2>
          <ul className="space-y-1">
            <li><strong>📧 Email:</strong> support@b8k.vn</li>
            <li><strong>☎ Hotline:</strong> 1900 1234</li>
            <li><strong>🌍 Website:</strong> <ScrollToTopLink to="/" className="text-blue-600 underline">www.b8k.vn</ScrollToTopLink></li>
            <li><strong>📦 Đặt hàng:</strong> Online 24/7</li>
          </ul>
        </section>
      </main>
    </>)
}

export default About
