import Header from './component/always_on_page/Header.tsx'
import LeftSidebar from './component/always_on_page/LeftSidebar.tsx'
import Footer from './component/always_on_page/Footer.tsx'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Top: Header*/}
      <Header />

      {/* Main content area*/}
      <div className="flex flex-1 pt-16">
        {/* Left: Sidebar*/}
        <div className="fixed h-[calc(100vh-4rem)] top-16 left-0 z-30"> 
          <LeftSidebar />
        </div>

        {/* Right: Page content*/}
        <main className="flex-1 p-4 xl:ml-32 ml-0 pl-16 xl:pl-32 mr-4 relative">
          <Outlet />
        </main>
      </div>
      
      {/* Bottom: Footer */}
      <div className='xl:pl-32 pl-16 pr-4 border-t-2 border-gray-200'>
        <Footer />
      </div>
    </div>
  )
}

export default Layout