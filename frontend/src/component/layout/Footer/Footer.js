import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer" className="bg-dark text-white py-5">
   
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-12">
          <h4 className="font-rubik font-size-20">Mobile Shop</h4>
          <p className="font-size-14 font-rale text-white-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam, quas?</p>
        </div>
        <div className="col-lg-3 col-12">
          <h4 className="font-rubik font-size-20">Newsletter</h4>
          <form className="form-row ">
            <div className="col ">
              <input type="text" className="form-control mb-2" placeholder="Email" />
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
          </form>
        </div>
        <div className="col-lg-3 col-12">
          <h4 className="font-rubik font-size-20">Information</h4>
          <div className="d-flex flex-column flex-wrap">
            <a href="/" className="font-rale font-size-14 text-white-50">About Us</a>
            <a href="/" className="font-rale font-size-14 text-white-50">Delivery Information</a>
            <a href="/" className="font-rale font-size-14 text-white-50">Privacy Policy</a>
            <a href="/" className="font-rale font-size-14 text-white-50">Tearms &amp; conditions</a>
          </div>
        </div>
        <div className="col-lg-3 col-12">
          <h4 className="font-rubik font-size-20">Account</h4>
          <div className="d-flex flex-column flex-wrap">
            <a href="/" className="font-rale font-size-14 text-white-50">My Account</a>
            <a href="/" className="font-rale font-size-14 text-white-50">Order history</a>
            <a href="/" className="font-rale font-size-14 text-white-50">Wish List</a>
            <a href="/" className="font-rale font-size-14 text-white-50">Newsletter</a>
          </div>
        </div>
      </div>
    </div>
  
  </footer>
  );
};

export default Footer;