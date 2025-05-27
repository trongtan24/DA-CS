import { useState } from 'react'
import Modal from '../reuseable/modal.tsx'
import { Link, useLocation } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircleOutline, IoMdMegaphone } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import DropDownButton from "../reuseable/dropDownButton.tsx"
import DropDownMenu from "../reuseable/dropDownMenu.tsx"

interface LeftSidebarProps {
  isOpen?: boolean;
  onToggle?: (value: boolean) => void;
}

function LeftSidebar({isOpen, onToggle}: LeftSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const linkClass = `w-full bg-white w-max-[100px] py-2 text-nowrap flex flex-col items-center justify-center md:border-2 border-gray-300 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200 hover:text-black`

  const links = (
    <>
      <Link to="/" className={`${linkClass} ${isActive('/') ? 'bg-gray-300' : 'bg-white'}`}> <FaHome/>Trang chủ</Link>
      <Link to="/about" className={`${linkClass} ${isActive('/about') ? 'bg-gray-300' : 'bg-white'}`}> <IoIosInformationCircleOutline/>Thông tin</Link>
    </>
  )

  const translate = (isOpen ? 'md:translate-y-0' : 'md:-translate-y-full')

  return (
    <div className='z-40 '>
      {/* Sidebar */}
      <div className={`fixed bottom-767-css md:top-16 left-0 w-32 bg-white transition-transform duration-300 z-40 border-2 border-gray-300 rounded
          ${translate}
          lg:translate-y-0 lg:static lg:h-auto lg:block w-full lg:w-fit `}>
        <nav className="flex md:flex-col flex-row gap-1 md:gap-4 md:p-4 md:mt-16 lg:mt-0 justify-evenly ssm:justify-center md:justify-between">
          <div className='flex flex-row flex-1 lg:flex-col gap-1 md:gap-4 justify-evenly  ssm:justify-center md:justify-between'>
            {links}
            <button className={linkClass} onClick={() => setIsModalOpen(true)}> {/* Open modal */ }
              <IoMdMegaphone />
              Thông báo
            </button>
          </div>
          <div className='gap-8'>
            <Link to="/categories" className={`${linkClass} p-2 md:hidden`}><MdMenuBook/>Danh mục</Link>
          </div>
        </nav>
      </div>

      {/* Sidebar after open background */}
      {isOpen && ( <div className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden md:block hidden" onClick={() => onToggle?.(false)} /> )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Thông báo">
        
      </Modal>

    </div>
  )
}

export default LeftSidebar
