import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './assets/css/index.css'
import Layout from './Layout.tsx'
import Home from './component/pages/home.tsx'
import Error404 from './component/pages/error404.tsx'
import About from './component/pages/about.tsx'
import ProductPage from './component/pages/productpage.tsx'
import ProductDetail from './component/reuseable/productDetail.tsx'
import Cart from './component/pages/cart.tsx'
import Category from './component/pages/categories.tsx'

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
        path: '/testpage',
        element: <></>
      },
      {
        path: 'about',
        element: <About/>,
      },
      {
        path: 'productpage/',
        element: <ProductPage/>,
      },
      {
        path: 'productpage/:name',
        element: <ProductPage/>,
      },
      {
        path: 'product/:id', // product/ -> chỉ nhận tới trang product, /:(chữ bất kỳ) để các chữ phía sau đều chuyển trang được (check (productDetail) trong (reusable))
        element: <ProductDetail/>,
      },
      {
        path: 'cart',
        element: <Cart/>
      },
      {
        path: 'categories',
        element: <Category/>
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
