import React from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product'; 
import Cart from './Pages/Cart';
import ShopCategory from './Pages/ShopCategory'
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from "./Components/Assets/banner_mens.png"
import women_banner from "./Components/Assets/banner_women.png"
import kid_banner from "./Components/Assets/banner_kids.png"
import ToastContainer from './Components/Toast/ToastContainer';
import BackToTop from './Components/BackToTop/BackToTop';
import DarkModeToggle from './Components/DarkMode/DarkModeToggle';
import ModernHeader from './Components/Navbar/ModernHeader';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <ModernHeader />
        <Routes>
          <Route path="/" element={<Shop />}/>
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men"/>}/>
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women"/>}/>
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid"/>}/>
          <Route path="/product" element={<Product/>}>
            <Route path=":productId" element={<Product/>}/>
          </Route>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
        <ToastContainer />
        <BackToTop />
        <DarkModeToggle />
      </BrowserRouter>
    </div>
  )
}

export default App