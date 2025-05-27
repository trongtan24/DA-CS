import { useState } from 'react'
import {LoginForm, RegisterForm, Modal, SiteLogo} from '../reuseable/'
import { GrLogin } from "react-icons/gr"
import { TbUserCheck } from "react-icons/tb"
import searchIcon from '/src/assets/searchIcon.png'
import closeIcon from '/src/assets/close.png'
import { Link } from 'react-router-dom'
import { FaCartPlus } from "react-icons/fa";

interface HeaderProps {
  onToggleSidebar?: () => void;
}

function Header({ onToggleSidebar}: HeaderProps) {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const combineSearchBar = (
        <div className="w-full mx-4">
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
              <button onClick={() => setSearch('')} className='ml-2 cursor-pointer p-2'>
                  <img src={closeIcon} className="w-2.5 h-2.5" />
              </button>
              )}
          </div>
        </div>
  )

  return (
    <>
      {/* header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        {/* Main header content */}
        <div className="flex md:pl-64 xl:pr-16 items-center justify-between gap-4 p-2">
          
          {/* Left side until mid */}
          <div className='hidden md:block'></div>

          {/* Left side*/}
          <SiteLogo/>

          {/* Search bar hidden until md */}
          <div className='w-max flex-1 mx-4 hidden-520 block md:hidden'>
            {combineSearchBar}
          </div>

          {/* Right side*/}
          <div className="flex gap-2">
            <Link to ="/cart"
              className="flex justify-center items-center p-2 px-2.5 text-black rounded hover:bg-gray-200 hover:opacity-90 transition text-nowrap"
            >
              <FaCartPlus className=''/>
            </Link>

            <button 
              className="bg-blue-500 text-white rounded-full px-4 py-2 hidden md:block hover:bg-indigo-600 transition text-nowrap cursor-pointer"
              onClick={() => { setIsModalOpen(true); setIsLogin(false); }}
            >
              <div className='flex flex-row justify-center items-center gap-2'><TbUserCheck/> Đăng ký</div>
            </button>
            <button 
              className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-indigo-600 transition text-nowrap cursor-pointer"
              onClick={() => { setIsModalOpen(true); setIsLogin(true); }}
            >
              <div className='flex flex-row justify-center items-center gap-2'><GrLogin/> Đăng nhập</div>
            </button>
          </div>
        </div>

        {/* Bottom bar*/}
        <div className="border-b lg:pl-86 border-gray-300 bg-white p-2 flex items-center md:justify-between z-50 xl:pr-12">
          
          {/* Toggle button for mobile */}
          <button className="hidden md:block lg:hidden p-1 pl-2 pr-2 border-2 border-gray-300 rounded-md bg-white" onClick={onToggleSidebar}>
            ☰
          </button>
          <div className='hidden lg:block'></div>
          {/* Address */}
          <div className='text-gray-500 text-md break-words line-clamp-2 md:block hidden ml-60 lg:ml-0 md:-pl-32'>
            <strong className=''>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. HCM
          </div>

          <div className='w-full sm:max-w-[280px] md:w-max ml-1 mr-10 md:mx-4 block-520 hidden md:block'>
            {combineSearchBar}
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
