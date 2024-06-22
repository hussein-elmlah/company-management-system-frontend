import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../locales/LanguageSwitcher';
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState('');
  const { t } = useTranslation();

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
            {/* Your existing navigation links */}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <LanguageSwitcher /> 
            </li>
            {!isLoggedIn ? (
              <>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                    {t('createAccount')}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/employeesignup">{t('employee')}</Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/usersignup">{t('client')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-primary" onClick={logOut}>{t('logout')}</button>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-user"></i>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><NavLink className="dropdown-item" to="/profile">{t('profile')}</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/settings">{t('settings')}</NavLink></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logOut}>{t('logout')}</button></li>
                  </ul>
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
