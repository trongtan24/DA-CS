import {Header, Footer, LeftSidebar} from './component/always_on_page/'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import {ZaloPopup, ToTheTopButton} from "./component/reuseable/";

function Layout() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="flex flex-col h-screen transition duration-300">
      {/* Top: Header*/}
      <Header onToggleSidebar={() => setIsOpen(!isOpen)}  />

      {/* Main content area*/}
      <div className="flex flex-1 pt-32 border-b-2 border-gray-200 ">

        {/* Left: Sidebar*/}
        <div className="fixed h-[calc(100vh-4rem)] bottom-32 md:top-30 left-0 z-40"> 
          <LeftSidebar isOpen={isOpen} onToggle={setIsOpen} />
        </div>

        {/* Right: Page content*/}
        <main className="flex-1 sm:p-4 pr-6 lg:ml-20 ml-0 pl-8 sm:pl-16 mr-6 sm:mr-20 relative mb-20">
          <div className='fixed flex flex-col items-center bottom-20 md:bottom-4 right-2 gap-4 max-w-[52px] w-full'>
            <ToTheTopButton window_scrollY={200} />
            <ZaloPopup/>
          </div>
          <Outlet />
        </main>
      </div>
      
      {/* Bottom: Footer */}
      <div className='xl:pl-32 pl-16 pr-6 xl:ml-32 mr-12 mt-12'>
        <Footer/>
      </div>
      
    </div>
    
  )
}

export default Layout