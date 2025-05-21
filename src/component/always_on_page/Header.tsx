import logo from '/src/assets/B8K.png'
import searchIcon from '/src/assets/searchIcon.png'
import closeIcon from '/src/assets/close.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../reuseable/modal'
import LoginForm from '../pages/loginForm'
import RegisterForm from '../pages/registerForm'
import { MdMenuBook } from "react-icons/md";



function Header() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const phone = "0123456789";

  return (
    <>
      {/* header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        {/* Main header content */}
        <div className="flex xl:pl-64 xl:pr-16 items-center justify-between gap-4 p-2">
          {/* Left side*/}
          <Link to="/" className='flex gap-2 items-center'>
            <img src={logo} alt="Logo" className="h-12 w-auto max-w-[120px] object-contain" />
            <div className='font-bold hidden md:flex text-nowrap'>Book Store</div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="flex border-2 bg-white border-gray-200 rounded-full h-10 w-full transition-colors duration-300 ease-in-out focus-within:border-blue-500 items-center px-3">
              <img src={searchIcon} className='opacity-50 w-5 h-5' />
              <input 
                className='pl-3 pr-4 w-full outline-none bg-transparent' 
                type="text" 
                placeholder="Tìm kiếm theo tên sách hoặc tác giả..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch('')} className='ml-2'>
                  <img src={closeIcon} className="w-2.5 h-2.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right side*/}
          <div className="flex gap-2">
            <button 
              className="bg-blue-500 text-white rounded-full px-4 py-2 hidden md:block hover:bg-indigo-600 transition"
              onClick={() => { setIsModalOpen(true); setIsLogin(false); }}
            >
              Đăng ký
            </button>
            <button 
              className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-indigo-600 transition"
              onClick={() => { setIsModalOpen(true); setIsLogin(true); }}
            >
              Đăng nhập
            </button>
          </div>
        </div>

        {/* Bottom bar*/}
        <div className="border-t border-gray-200 bg-white px-4 py-2 flex items-center justify-center md:justify-between xl:pl-64">
          <button className="bg-blue-500 text-white rounded-full px-4.5 gap-1 py-2 hover:bg-indigo-600 text-nowrap flex flex-row justify-center items-center" >
           <MdMenuBook/> Danh Mục
          </button>
          

          {/* Address */}
          <div className='text-gray-500 text-md break-words line-clamp-2 md:block hidden xl:pl-32'>
            <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. HCM
          </div>

          {/* Contact Info */}
          <div className='text-gray-500 text-md text-right xl:mr-16 xl:ml-32 md:block hidden' dir="rtl">
            <strong>Điện thoại/Zalo:</strong>
            <a className='underline underline-offset-4 hover:text-black ml-1' target='_blank' href={`https://zalo.me/${phone}`}>{phone}</a>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isLogin ? 'Đăng nhập' : 'Đăng ký'}>
        {isLogin ? (
          <LoginForm switchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm switchToLogin={() => setIsLogin(true)} />
        )}
      </Modal>
    </>
  )
}

export default Header
