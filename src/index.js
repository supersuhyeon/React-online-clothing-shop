import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App';
import reportWebVitals from './reportWebVitals';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import ProductDetail from './pages/ProductDetail';
import Mycart from './pages/Mycart';
import ProtectedRoute from './pages/ProtectedRoute';
import ShopProducts from './pages/ShopProducts';


const router = createBrowserRouter([
  {
    path : '/',
    element : <App></App>,
    errorElement : <NotFound></NotFound>,
    children: [
      {index:true, path:"/", element: <Home></Home>},
      {path: "/product/:items", element: <ShopProducts></ShopProducts>},
      {path: "/products/new", 
       element: (<ProtectedRoute requireAdmin={true}> 
        <NewProduct></NewProduct>
        </ProtectedRoute>)},
      {path: "/products/:id", element: <ProductDetail></ProductDetail>},
      {path: "/cart", 
       element:(<ProtectedRoute>
        <Mycart></Mycart>
      </ProtectedRoute>)}
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
