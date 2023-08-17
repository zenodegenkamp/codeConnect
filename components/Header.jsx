import React from "react";
import { Link, NavLink } from "react-router-dom";
import imageUrl from "/assets/images/avatar-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // Make sure to import faTimes icon

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#c7c7c7",
  };

  
  const navNormal = 
  <header>
        <div>
            <Link className="site-logo" to="/">
            Code Connect
            </Link>
        </div>
        <nav>
            <NavLink
              to="/host"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Host
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              About
            </NavLink>
            <NavLink
              to="/projects"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Projects
            </NavLink>
          </nav>
          <div className="header-profile-section">
            <Link to="login" className="login-link">
              <img src={imageUrl} className="login-icon" />
            </Link>
          </div>
    </header>

  const navMobileClosed = 
  <header>
    <div>
        <Link className="site-logo" to="/">
        Code Connect
        </Link>
    </div>
    <FontAwesomeIcon
              onClick={toggleMenu}
              icon={faBars} 
              className="hamburger-icon"
    />
        <div className="header-profile-section">
        <Link to="login" className="login-link">
            <img src={imageUrl} className="login-icon" />
        </Link>
        </div>
    </header>

  const navMobileOpen = 
    <header className="header-mobile-open">
       
        <nav className="nav-column-open">
        <FontAwesomeIcon
              onClick={toggleMenu}
              icon={faTimes} 
              className="hamburger-icon"
            />
                <NavLink
                  to="/host"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                  Host
                </NavLink>
                <NavLink
                  to="/about"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                  About
                </NavLink>
                <NavLink
                  to="/projects"
                  style={({ isActive }) => (isActive ? activeStyles : null)}
                >
                  Projects
                </NavLink>
              </nav>

    </header>
  
  return (
    <>
        {isMobile ? (isMenuOpen ? navMobileOpen :navMobileClosed) : navNormal }
    </>
) 
}
