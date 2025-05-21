import { useState } from 'react'
import Modal from '../reuseable/modal.tsx'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircleOutline, IoMdMegaphone } from "react-icons/io";

function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const linkClass = `w-full w-max-[100px] py-2 text-nowrap flex flex-col items-center justify-center border-2 border-gray-300 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200 hover:text-black`

  const links = (
    <>
      <Link to="/" className={`${linkClass} ${isActive('/') ? 'bg-gray-300' : 'bg-white'}`}> <FaHome/>Trang chủ</Link>
      <Link to="/about" className={`${linkClass} ${isActive('/about') ? 'bg-gray-300' : 'bg-white'}`}> <IoIosInformationCircleOutline/>Thông tin</Link>
    </>
  )

  return (
    <div className='z-40'>
      {/* Toggle button for mobile */}
      <button className="ml-4 mt-4 fixed p-1 pl-2 pr-2 border-2 border-gray-300 rounded-md bg-white" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`fixed top-16 left-0 w-32 bg-white transition-transform duration-300 z-40 border-2 border-gray-300 rounded
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          xl:translate-x-0 xl:static xl:h-auto xl:block`}>
        <nav className="flex flex-col p-4 mt-16 xl:mt-0 gap-2">
          {links}
          <button className={linkClass} onClick={() => setIsModalOpen(true)}> {/* Open modal */ }
            <IoMdMegaphone />
            Thông báo
          </button>
        </nav>
      </div>

      {/* Sidebar after open background */}
      {isOpen && ( <div className="fixed inset-0 bg-black opacity-30 z-30 xl:hidden" onClick={() => setIsOpen(false)} /> )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thông báo">
        
      </Modal>

    </div>
  )
}

export default LeftSidebar
