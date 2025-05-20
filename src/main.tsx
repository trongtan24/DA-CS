import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './css/index.css'
import Layout from './Layout.tsx'
import Home from './component/pages/home.tsx'
import Error404 from './component/pages/error404.tsx'
import About from './component/pages/about.tsx'
import ProductPage from './component/pages/productpage.tsx'


const router = createBrowserRouter([
  { 
    path: '/', 
    element: <Layout />,
    errorElement: <Error404/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: 'about',
        element: <About/>,
      },
      {
        path: 'productPage',
        element: <ProductPage/>,
      }

    ],
  },
])

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
