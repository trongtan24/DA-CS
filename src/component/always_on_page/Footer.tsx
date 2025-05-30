import {SiteLogo, Map, ScrollToTopLink} from '../reuseable/';

function Footer() {
  const email = "test@gmail.com";
  const phone = "0123456789";

  return (
    <>
      {/* Footer */}
      <div className={`bottom-0 left-0 w-full bg-white transition-transform duration-300 z-40 mb-20`}>
        <footer className="flex flex-col p-4 lg:justify-between lg:flex-row gap-8">
          <div className='flex flex-col gap-2 justify-center items-center lg:items-baseline'>
            <SiteLogo/>
            <div className='text-gray-500 text-md'><strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. HCM</div>
            <div className='text-gray-500 text-md'><strong>Điện thoại/Zalo:</strong> <a className='underline underline-offset-4 transition duration-300 hover:text-black ' target='_blank' href={`https://zalo.me/${phone}`}>{phone} </a></div>
            <div className='text-gray-500 text-md'><strong>Email:</strong> <a className='underline underline-offset-4 transition duration-300 hover:text-black ' target='_blank' href={`mailto:${email}`}>{email}</a></div>
            <div className='text-gray-500 text-md'><strong>Giờ mở cửa:</strong> 8:00 - 22:00</div>
          </div>

          <div className='flex justify-center items-center'>
            <Map />
          </div>

          <div className='flex flex-col gap-4 w-full lg:max-w-[300px]'>
            <div className='flex p-2 text-2xl justify-center items-center align-middle'>Về Web</div>
            <ScrollToTopLink to="/about" className='flex flex-row text-gray-500 font-light text-md justify-center items-center underline underline-offset-4 transition duration-300 hover:text-black '>Giới thiệu</ScrollToTopLink>
            <ScrollToTopLink to="/about" className='flex flex-row text-gray-500 font-light text-md justify-center items-center underline underline-offset-4 transition duration-300 hover:text-black '>Liên hệ</ScrollToTopLink>
            <ScrollToTopLink to="/about" className='flex flex-row text-gray-500 font-light text-md justify-center items-center underline underline-offset-4 transition duration-300 hover:text-black '>Điều khoản</ScrollToTopLink>
            <ScrollToTopLink to="/about" className='flex flex-row text-gray-500 font-light text-md justify-center items-center underline underline-offset-4 transition duration-300 hover:text-black '>Bảo mật</ScrollToTopLink>
          </div>
        </footer>
      </div>
      <footer className="text-center text-sm text-gray-500 pt-4 mb-20 md:mb-0">
          © 2025 B8K
        </footer>
    </>
  );
}
{/* – Nền tảng sách lập trình cho tương lai. */}
export default Footer;