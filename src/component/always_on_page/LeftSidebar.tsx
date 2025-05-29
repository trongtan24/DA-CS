import { useState } from 'react'
import { Modal, ScrollToTopLink } from '../reuseable/'
import { FaHome } from "react-icons/fa";
import { IoMdMegaphone } from "react-icons/io";
import { MdMenuBook } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";

interface LeftSidebarProps {
  isOpen?: boolean;
  onToggle?: (value: boolean) => void;
  isBlock?: boolean;
}

function LeftSidebar({isOpen, onToggle, isBlock}: LeftSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const setHidden = isBlock ? "block" : "lg:hidden"

  const linkClass = `w-full bg-white w-max-[100px] py-2 px-1 text-nowrap flex items-center justify-center ${isBlock ? "" : "md:border-2 flex-col"}  border-gray-300 rounded-md md:transition md:duration-300 cursor-pointer hover:bg-gray-200 hover:text-black`

  const links = (
    <>
      <ScrollToTopLink to="/" className={`${linkClass}`}> <FaHome/> Trang chủ</ScrollToTopLink>
      <ScrollToTopLink to="/productpage/" className={`${linkClass}`}> <FaShoppingBasket/> Sản phẩm</ScrollToTopLink>
      {isBlock ? <ScrollToTopLink to="/categories" className={`${linkClass}`}> <MdMenuBook/> Danh mục</ScrollToTopLink> : <ScrollToTopLink to="/categories" className={`${linkClass} p-2 lg:hidden`}><MdMenuBook/> Danh mục</ScrollToTopLink>}
      <button className={linkClass} onClick={() => setIsModalOpen(true)}> {/* Open modal */ }
          <IoMdMegaphone /> Thông báo
        </button>
    </>
  )

  const translate = (isOpen ? 'md:translate-y-0' : 'md:-translate-y-full')

  return (
    <div className={`z-40 ${setHidden}`}>
      {/* Sidebar */}
      <div className={`fixed ${isBlock ? "xl:translate-x-[5%] transform translate-none" : " border-2"} bottom-767-css md:top-16 left-0 w-32 bg-white md:transition-transform md:duration-300 z-40 border-gray-300 rounded
          ${translate}
          lg:translate-y-0 lg:static lg:h-auto lg:block w-full lg:w-fit `}>
        <nav className={`flex ${isBlock ? "md:flex-row" : "md:flex-col md:mt-16 md:p-4"} flex-row gap-1 md:gap-4 lg:mt-0 justify-evenly ssm:justify-center md:justify-between`}>
          <div className={`flex flex-row flex-1 ${isBlock ? "lg:flex-row" : "lg:flex-col"} gap-1 md:gap-4 justify-evenly ssm:justify-center md:justify-between`}>
            {links}
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
