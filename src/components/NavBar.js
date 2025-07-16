import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { PiMosqueLight  } from "react-icons/pi";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: "white", textAlign: 'center' }}>
        <nav className="navbar">
          <div className="navbar-container container" >
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu} style={{color: 'white', fontWeight:'bold', fontSize: '1vw', textAlign: 'center', margin:'2vw'}}>
      <div style={{marginLeft: '5vw', fontSize: '1.5vw'}}>    بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ<br/>
      <div style={{color: 'yellow'}}>   Welcome To Albanian American Islamic Center<br/> 
       Mirësevini në Qendrën Islamike Shqiptaro-Amerikane <br/>
       </div>
       {/* <br /><PiMosqueLight className="navbar-icon" style={{marginLeft: '-55vw', fontSize: '5vw', justifyContent: 'right'}}/> */}
      <br/> </div>
        
        <div>
          <p style={{color: 'red', marginLeft: '-30vw', fontSize: '1vw'}}><br/><br/><br/><br/><PiMosqueLight size="2vw"/> AAIC Xhamia</p>
        </div>
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/" 
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                  
                >
                 
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                 <div> About</div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
    
  );
}

export default Navbar;
