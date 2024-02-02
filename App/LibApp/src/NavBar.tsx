import {  Col } from 'react-bootstrap';
import {useLocation, Link } from 'react-router-dom';
import "./NavBar.css"
import { useState, useEffect } from 'react';
import LogoutIcon from "./assets/logout.svg?react"

const NavigationBar = (props:{logout : () => void}) => {

    const location = useLocation();
    const [currentRoute, setCurrentRoute] = useState(location.pathname.toLowerCase());

    useEffect(() => {
        setCurrentRoute(location.pathname.toLowerCase());
    }, [location]);

    return(
        <>
        <Col className="left-sidebar">
            <div className="profile-info">
              <p>TODO Profile info</p>
              <p> {localStorage.getItem('username')}</p>
            </div>
            <div className="navigation-options">
              <ul>
                <Link className='nav-element' to="/wishlist"><li className={currentRoute.includes("wishlist") ? "nav-element-active" : "nav-element"}>Wishlist</li></Link>
                <Link className='nav-element' to="/currentreads"><li className={currentRoute.includes("currentreads") ? "nav-element-active" : "nav-element"}>Current Reads</li></Link>
                <Link className='nav-element' to="/history"><li className={currentRoute.includes("history") ? "nav-element-active" : "nav-element"}>History</li></Link>
                <Link className='nav-element' to="/stats"><li className={currentRoute.includes("stats") ? "nav-element-active" : "nav-element"}>Stats</li></Link>
              </ul>
            </div>
            <div className="footer">
              <LogoutIcon onClick={props.logout} className='logoutIcon'/>
            </div>
          </Col>
        </>
    )
}

export default NavigationBar;