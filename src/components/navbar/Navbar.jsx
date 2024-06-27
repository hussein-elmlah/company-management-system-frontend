import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { getMyNotifications, readAllNotifications } from '../../axios/notifications';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../locales/LanguageSwitcher';
import { io } from 'socket.io-client';
import { fetchUserData, selectUser } from '../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const fetchMyNotifications = async (id) => {
  try {
    const myNotifications = await getMyNotifications(id);
    return myNotifications.data;
  } catch (error) {
    console.error("err:", error);
  }
};

const markAsRead = async (id) => {
  try {
    await readAllNotifications(id);
    return true;
  } catch (error) {
    console.error("err:", error);
  }
};

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Navbar = () => {
  const socket = useRef(null);

  useEffect(() => {
    // Establish the socket connection only once
    socket.current = io("http://127.0.0.1:3001");

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket.current) {
      // socket.current.on('message', (message) => {
      //   console.log('New message:', message);
      // });

      return () => {
        socket.current.off("message");
      };
    }
  }, []);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState("");
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get("isAuth");

  if (data) {
    // console.log("isAuth=true");
  } else {
    // console.log("isAuth=");
  }

  const dispatch = useDispatch();
  let user = useSelector(selectUser);

  useEffect(() => {
    if (user && user._id) {
      const handleNotification = () => {
        fetchMyNotifications(user._id).then((data) => {
          const countOfUnread = data.filter((n) => !n.isRead).length;
          if (countOfUnread > 0) {
            new Audio("notification.wav").play();
          }
          setUnreadNotificationsCount(countOfUnread);
          setNotifications(data);
        });
      };

      socket.current.on("branchManager-channel", handleNotification);
      socket.current.on(`${user._id}-channel`, handleNotification);

      fetchMyNotifications(user._id).then((data) => {
        setUnreadNotificationsCount(data.filter((n) => !n.isRead).length);
        setNotifications(data);
      });

      return () => {
        socket.current.off("branchManager-channel", handleNotification);
        socket.current.off(`${user._id}-channel`, handleNotification);
      };
    }
  }, [user]);

  useEffect(() => {
    // console.log("token: ", !!localStorage.getItem("token"));
    setIsLoggedIn(!!localStorage.getItem("token"));
    if (!!localStorage.getItem("token")) {
      dispatch(fetchUserData());
      try {
        const tokenPayload = localStorage.getItem("token").split(".")[1];
        const decodedPayload = atob(tokenPayload);
        const payload = JSON.parse(decodedPayload);
        setRole(payload.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        setRole("");
      }
    }
  }, [!!localStorage.getItem("token")]);

  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(!!localStorage.getItem("token"));
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top ltr">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src="./src/assets/images/navlogo.png"
            className="p-0 m-0 w-10"
            alt="logo"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    {t("home")}
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && role === "branchManager" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/queue">
                    {t("projects")}
                  </NavLink>
                </li>
              </>
            )}

            {isLoggedIn && role === "client" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/createproject">
                    {t("add project")}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/projects">
                    {t("my projects")}
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="btn btn-outline-primary" to="/login">
                    {t("login")}
                  </NavLink>
                </li>

                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    id="dropdown-basic"
                  >
                    {t("register")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/signEmp">
                      {t("employee")}
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/signUser">
                      {t("client")}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <li className="nav-item dropdown no-arrow mx-1">
                  {user && user._id && (
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="alertsDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      onClick={() => markAsRead(user._id)}
                      aria-expanded="false"
                    >
                      <i className="fas fa-bell fa-2x"></i>

                      <span className="badge badge-danger badge-counter">
                        {unreadNotificationsCount > 0 ? (
                          unreadNotificationsCount
                        ) : (
                          <></>
                        )}
                      </span>
                    </a>
                  )}

                  <div
                    className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="alertsDropdown"
                    style={{
                      "max-height": "250px",
                      width: "300px",
                      "overflow-y": "auto",
                    }}
                  >
                    <h6 className="dropdown-header">Notifications Center</h6>
                    {notifications.map((e, i) => (
                      <NavLink
                        key={i}
                        to={`${e.redirectURL}`}
                        className="dropdown-item d-flex align-items-center"
                        style={{
                          backgroundColor: e.isRead ? "" : "#eaecf4",
                          cursor: "pointer",
                        }}
                      >
                        <div className="mr-3">
                          <div className="icon-circle">
                            <i className="fa-solid fa-bullhorn"></i>
                          </div>
                        </div>
                        <div>
                          <div className="small text-gray-500">
                            {formatDate(e.createdAt)}
                          </div>
                          <div
                            style={{ "white-space": "pre" }}
                            className="font-weight-bold"
                          >
                            {e.message}
                          </div>{" "}
                          &nbsp; &nbsp;
                          {e.isRead == false ? (
                            <span class="badge badge-success">New!!</span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </NavLink>
                    ))}
                    <a
                      className="dropdown-item text-center small text-gray-500"
                      href="#"
                    >
                      Show All Notifications
                    </a>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user && <span className="px-1 ">{user.firstName}</span>}
                    <i className="fa fa-user fa-2x"></i>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="userDropdown"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="/profile">
                        {t("profile")}
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={logOut}>
                        {t("logout")}
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li className="nav-item">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
