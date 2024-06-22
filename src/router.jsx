import { Outlet, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Queue from "./components/queue/Queue";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Home from "./pages/Home/Home";
import EmployeeSignup from "./pages/signup/employeeSignup/EmployeeSignup";
import UserSignup from "./pages/signup/userSignup/UserSignup";
import Login from "./pages/login/Login";

function UserLayout() {
  return (
    <div className="m-0 p-0">
      
      <div className="container my-0 py-0" style={{ paddingTop: "85px", minHeight: "calc(100vh - 104px)" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <PrivateRoute element={<Home />} />
      },  
      {
        path: "/signEmp",
        element: <PrivateRoute element={<EmployeeSignup />} />
      }, 
      {
        path: "/signUser",
        element: <PrivateRoute element={<UserSignup />} />
      },
      {
        path: "/login",
        element: <PrivateRoute element={<Login />} />
      },
      {
        path: "/queue",
        element: <Queue />
      }, 
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
