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
import LoginSignUp from './component/User/LoginSignup';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile.js"
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js"

function App() {

  const {isAuthenticated, user} = useSelector((state)=>state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser())
  },[]) 
  return (
  <Router>
    <Header />
      {isAuthenticated && <UserOptions user={user} />}
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/product/:id' element={<ProductDetails/>} />
      <Route exact path="/products" element={<Products/>} />
      <Route exact path="/products/:keyword" element={<Products/>} />
      <Route exact path="/search" element={<Search/>} />
      <Route exact path="/login" element={<LoginSignUp />} />
      <Route exact path="/password/forgot" element={<ForgotPassword />} />
      <Route exact path = "/password/reset/:token" element={<ResetPassword />} />
      <Route exact path = "/cart" element={<Cart />} />

    </Routes>
    <ProtectedRoute exact path="/account" element={<Profile />} />
    <ProtectedRoute exact path="/me/update" element={<UpdateProfile />} />
    <ProtectedRoute exact path="/password/update" element={<UpdatePassword />} />
    


    <Footer />
  </Router>
  )
  
  
  
}

export default App;
