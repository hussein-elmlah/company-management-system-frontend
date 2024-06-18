import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'; // Assuming you use react-bootstrap for dropdowns

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState('');

  const checkLoggedIn = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setRole(payload.role);
      console.log('Current role:', payload.role);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    checkLoggedIn(); // Update login status
    window.location.reload(); // Reload the page
  };

  return (
    <nav className="fixed-top navbar navbar-expand-lg navbarstyle navbar-dark bg-main shadow p-2 px-5 justify-content-center align-items-center align-content-center">
      <div className="container px-5">
        <img className="navbar-brand" src="../../assets/images/navlogo.png" width="80" alt="logo" />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="form-inline my-2 my-lg-0 mx-auto ml-0">
          <input className="form-control mr-sm-5 navbar-search" type="search" placeholder="بحث عن مشروع" aria-label="Search" />
        </form>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">الرئيسية</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/contact">تواصل معنا</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/services">خدماتنا</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/about">من نحن</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/portfolio">أعمالنا</NavLink>
            </li>
            {isLoggedIn && role === 'client' && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/addclientproject">اضافة مشروع</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/viewclientprojects">رؤية المشاريع</NavLink>
                </li>
              </>
            )}
          </ul>
          <form className="d-flex">
            {!isLoggedIn ? (
              <>
                {/* <button className="btn btn-outline-primary mx-2" onClick={viewLogin}>تسجيل دخول</button> */}
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="dropdownBasic1">
                    انشئ حساب
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="bg-dark">
                    <Dropdown.Item as={NavLink} to="employeesignup">موظف</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="usersignup">عميل</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                {role === 'client' && <button className="btn btn-outline-primary mx-2" onClick={logOut}>تسجيل خروج</button>}
                <li className="nav-item dropdown px-3 pe-4">
                  <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-bell translate-middle-y"></i>
                    <span className="badge bg-danger translate-middle-y">4</span>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end notification-ui_dd bg-dark text-light" aria-labelledby="navbarDropdown">
                    <div className="notification-ui_dd-header">
                      <h3 className="text-center">Notification</h3>
                    </div>
                    <div className="notification-ui_dd-content">
                      <div className="notification-list notification-list--unread">
                        <div className="notification-list_img">
                          <img src="https://i.imgur.com/zYxDCQT.jpg" alt="user" />
                        </div>
                        <div className="notification-list_detail p-2">
                          <p><b>John Doe</b> reacted to your post</p>
                          <p><small>10 mins ago</small></p>
                        </div>
                        <div className="notification-list_feature-img">
                          <img src="https://i.imgur.com/AbZqFnR.jpg" alt="Feature image" />
                        </div>
                      </div>
                      <a href="#!" className="btn btn-success btn-block">View All</a>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown px-3">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fa fa-user translate-middle-y"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-end bg-dark" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href="#">Profile</a>
                    <a className="dropdown-item" href="#">Settings</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={logOut}>Logout</a>
                  </div>
                </li>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
