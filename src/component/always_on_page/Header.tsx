import logo from '/src/assets/B8K.png'
import searchIcon from '/src/assets/searchIcon.png'
import closeIcon from '/src/assets/close.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../reuseable/modal'
import LoginForm from '../pages/loginForm'
import RegisterForm from '../pages/registerForm'



function Header() {
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-baseline gap-4 ssm:justify-between p-2 border-b-2 border-gray-200 bg-white z-50">
        
        {/* Left: Logo */}
        <Link to="/" className='flex gap-2 items-center'>
          <img src={logo} alt="Logo" className="h-12 w-auto max-w-[120px] object-contain" />
          <div className='font-bold hidden-520 flex text-nowrap'>Book Store</div>
        </Link>

        {/* Middle: Search bar */}
        <div className="flex border-2 bg-white border-gray-200 rounded-full max-w-50 sm:max-w-screen sm:w-1/4 h-10 w-fit transition-colors duration-300 ease-in-out focus-within:border-blue-500 items-center justify-center align-middle pl-2">
          <img src={searchIcon} className='opacity-50 w-6 h-6 flex ' />
          
          <input 
            className='rounded-full pl-3 pr-4 w-full outline-none' 
            type="text" 
            placeholder="Tìm kiếm theo tên sách hoặc tác giả..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)} // khi thay đổi input thì setSearch
          />

          {search && ( // nếu có giá trị trong ô tìm kiếm thì hiện icon xóa
            <button onClick={() => setSearch('')} className='text-white rounded-full h-3 w-3 mr-3 cursor-pointer'>
              <img src={closeIcon} />
            </button>
          )}

        </div>

        {/* Right: Login/Sign Up */}
        <div className="flex gap-4 justify-between sm:justify-start">
          <button className="bg-blue-500 text-white rounded-4xl md:block hidden p-2 pl-4 pr-4 text-nowrap transition hover:bg-indigo-600 cursor-pointer" onClick={()=>(setIsModalOpen(true), setIsLogin(false))}>Đăng ký</button>
          <button className="bg-blue-500 text-white rounded-4xl p-2 pl-4 pr-4 text-nowrap transition hover:bg-indigo-600 cursor-pointer" onClick={()=>(setIsModalOpen(true), setIsLogin(true))}>Đăng nhập</button>
        </div>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isLogin ? 'Đăng nhập' : 'Đăng ký'} >
          {
            isLogin ? (
              <LoginForm switchToRegister={() => setIsLogin(false)}/>
            ) : (
              <RegisterForm switchToLogin={() => setIsLogin(true)}/>
            )
          }
        </Modal>
      </header>
    </>
  )
}

export default Header
