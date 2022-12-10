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


const router = createBrowserRouter([
  {
    path : '/',
    element : <App></App>,
    errorElement : <NotFound></NotFound>,
    children: [
      {index:true, element: <Home></Home>},
      {path: "/products", element: <AllProducts></AllProducts>},
      {path: "/products/new", element: <NewProduct></NewProduct>},
      {path: "/products/:id", element: <ProductDetail></ProductDetail>},
      {path: "/cart", element:<Mycart></Mycart>}
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
