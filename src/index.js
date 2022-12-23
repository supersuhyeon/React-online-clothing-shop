import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import Mycart from './pages/Mycart';
import ProtectedRoute from './pages/ProtectedRoute';
import SaleProducts from './pages/SaleProducts';


const router = createBrowserRouter([
  {
    path : '/',
    element : <App></App>,
    errorElement : <NotFound></NotFound>,
    children: [
      {index:true, element: <Home></Home>},
      {path: "/products", element: <AllProducts></AllProducts>},
      {path: "/product/:items", element: <SaleProducts></SaleProducts>},
      {path: "/products/new", 
      // 특정경로보호
      // 로그인한 사용자가 있고 어드민이라면 NewProduct페이지 보여주기 아니면 홈으로 리다이렉팅
      // 해당 조건에 맞으면 컴포넌트를 보여주고 아니면 navigate에서 홈으로 리다이렉팅.
       element: <ProtectedRoute requireAdmin={true}> 
        <NewProduct></NewProduct>
        </ProtectedRoute>},
      {path: "/products/:id", element: <ProductDetail></ProductDetail>},
      // 로그인한 사용자가 있다면 Mycart보여주기 아니면 홈으로 리다이렉팅
      {path: "/cart", 
       element:<ProtectedRoute>
        <Mycart></Mycart>
      </ProtectedRoute>}
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
