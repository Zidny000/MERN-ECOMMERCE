import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader"
import {useEffect} from "react"

import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import Home from "./component/Home/Home.js"
import ProductDetails from "./component/Product/ProductDetails"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  },[]) 
  return (
  <Router>
    <Header />
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/product/:id' element={<ProductDetails/>} />
      <Route exact path="/products" element={<Products/>} />
      <Route exact path="/products/:keyword" element={<Products/>} />
      <Route exact path="/search" element={<Search/>} />
    </Routes>
    <Footer />
  </Router>
  )
  
  
  
}

export default App;
