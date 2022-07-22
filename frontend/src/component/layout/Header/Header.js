import React from "react";

const Header = () =>{
    return(
      <div className="navigation">
        <input type="checkbox" className="navigation__checkbox" id="navi-toggle" />
        <label for="navi-toggle" className="navigation__button">
          <span className="navigation__icon">
            &nbsp;
          </span>
        </label>
        
        <div className="navigation__background">&nbsp;</div>
          <nav className="navigation__nav">
            <ul className="navigation__list">					
              <li className="navigation__item"><a href="/" className="navigation__link">Home</a></li>
              <li className="navigation__item"><a href="/" className="navigation__link">Shop</a></li>
              <li className="navigation__item"><a href="/" className="navigation__link">Login</a></li>
              <li className="navigation__item"><a href="/" className="navigation__link">Register</a></li>
            </ul>
          </nav>
        
      </div>
    )

}
export default Header;