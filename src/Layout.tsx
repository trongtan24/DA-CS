import Header from './component/always_on_page/Header.tsx'
import LeftSidebar from './component/always_on_page/LeftSidebar.tsx'
import Footer from './component/always_on_page/Footer.tsx'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'

function Layout() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col h-screen">
      {/* Top: Header*/}
      <Header onToggleSidebar={() => setIsOpen(!isOpen)} />

      {/* Main content area*/}
      <div className="flex flex-1 pt-30 border-b-2 border-gray-200 ">
        {/* Left: Sidebar*/}
        <div className="fixed h-[calc(100vh-4rem)] bottom-32 md:top-30 left-0 z-40"> 
          <LeftSidebar isOpen={isOpen} onToggle={setIsOpen} />
        </div>

        {/* Right: Page content*/}
        <main className="flex-1 sm:p-4 pr-6 lg:ml-32 ml-0 sm:pl-16 xl:pl-32 mr-6 sm:mr-12 relative">
          <Outlet />
        </main>
      </div>
      
      {/* Bottom: Footer */}
      <div className='xl:pl-32 pl-16 pr-6 xl:ml-32 mr-12'>
        <Footer />
      </div>
    </div>
  )
}

export default Layout