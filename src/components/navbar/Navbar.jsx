import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { io } from 'socket.io-client';
import { getMyNotifications } from '../../axios/notifications';
const socket = io('http://127.0.0.1:3001'); // Replace with your server URL

const fetchMyNotifications = async () => {
  try {
    const myNotifications = await getMyNotifications();
    return myNotifications.data;
  } catch (error) {
    console.error("err:", error);
  }
}

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    socket.on('branchManager-channel', () => {
      fetchMyNotifications().then(setNotifications);
    });

    fetchMyNotifications().then(setNotifications);

  }, []);

  useEffect(() => {
    checkLoggedIn();
  }, []);


  const checkLoggedIn = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      try {
        const tokenPayload = token.split('.')[1];
        const decodedPayload = atob(tokenPayload);
        const payload = JSON.parse(decodedPayload);
        setRole(payload.role);
      } catch (error) {
        console.error('Error decoding token:', error);
        setRole('');
      }
    }
  };



  const logOut = () => {
    localStorage.removeItem('token');
    checkLoggedIn();
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img src="./src/assets/images/navlogo.png" className='p-0 m-0 w-10' alt="logo" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">



            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/">الرئيسية</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">تواصل معنا</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services">خدماتنا</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">من نحن</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/portfolio">أعمالنا</NavLink>
            </li> */}
            {isLoggedIn && role === 'client' && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/addclientproject">اضافة مشروع</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/viewclientprojects">رؤية المشاريع</NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    انشئ حساب
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/signEmp">موظف</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/signUser">عميل</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>

                <li className="nav-item dropdown no-arrow mx-1">
                  <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-bell fa-2x"></i>

                    <span className="badge badge-danger badge-counter">3</span>
                  </a>

                  <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="alertsDropdown">
                    <h6 className="dropdown-header">
                      Branch Manager Notifications Center
                    </h6>
                      {notifications.map((e) => (
                        <a className="dropdown-item d-flex align-items-center" href={e.redirectURL}>
                          <div className="mr-3">
                            <div className="icon-circle">
                              <i className="far fa-bell"></i>
                            </div>
                          </div>
                          <div>
                            <div className="small text-gray-500">{formatDate(e.createdAt)}</div>
                            <span className="font-weight-bold">{e.message}</span>
                            </div>
                            </a>
                          ))}
                    {/* <a className="dropdown-item text-center small text-gray-500" href="#">Show All Notifications</a> */}
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-user fa-2x"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/settings">Settings</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logOut}>Logout</button></li>
                  </ul>
                </li>

                <li className="nav-item">
                  <button className="btn btn-outline-primary" onClick={logOut}>تسجيل خروج</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
