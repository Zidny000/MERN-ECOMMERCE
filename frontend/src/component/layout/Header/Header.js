import {useEffect,useRef} from "react";
import {Link,useLocation} from "react-router-dom"
import { useSelector } from "react-redux";

const Header = () =>{
    const location = useLocation()
    const inputCheck = useRef(null);
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    useEffect(
      () => {
        inputCheck.current.checked = false
      },
      [location]
    )
    return(
      <div className="navigation">
          <input type="checkbox" ref={inputCheck} className="navigation__checkbox" id="navi-toggle" />
        <label for="navi-toggle" className="navigation__button">
          <span className="navigation__icon">
            &nbsp;
          </span>
        </label>
        
        <div className="navigation__background">&nbsp;</div> 
          <nav className="navigation__nav">
            <ul className="navigation__list">					
              <li className="navigation__item"><Link to="/" className="navigation__link">Home</Link></li>
              <li className="navigation__item"><Link to="/products" className="navigation__link">Shop</Link></li>
              <li className="navigation__item"><Link to="/search" className="navigation__link">Search</Link></li>
              {!isAuthenticated && <li className="navigation__item"><Link to="/login" className="navigation__link">Login</Link></li>}
            </ul>
          </nav>
        
      </div>
    )

}
export default Header;