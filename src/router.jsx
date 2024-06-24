import { Outlet, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Home from "./pages/Home/Home";
import EmployeeSignup from "./pages/signup/employeeSignup/EmployeeSignup";
import Project from "./components/project/Project";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import UpdateProjectForm from "./components/project/UpdateProjectForm";
import ProjectDetails from "./components/project/ProjectDetails";
import Queue from "./components/queue/Queue";
import UserSignup from "./pages/signup/userSignup/UserSignup";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";

import AcceptancePage from "./pages/projectAcceptance/AcceptancePage";
import VerifyEmail from './pages/login/VerifyEmail';

 

function UserLayout() {
  return (
    <div className="m-0 p-0">
     
    <Navbar />
      <div className="container my-0" style={{ paddingTop: "85px", minHeight: "calc(100vh - 104px)" }}>
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
        path: "/forgot-password",
        element: <PrivateRoute element={<ForgotPassword/>} />
      },
      {
        path: "/reset-password/:token",
        element: <PrivateRoute element={<ResetPassword/>} />
      },
      {
        path: "/verify-email",
        element: <PrivateRoute element={<VerifyEmail/>} />
      },
      {
        path: "/acceptance/:id",
        element: <PrivateRoute element={<AcceptancePage />} />
      },
      {
        path: "/projects",
        element: <PrivateRoute element={<ProjectList/>} />
      },{
        path: "/createproject",
        element: <PrivateRoute element={<ProjectForm/>} />
      },{
        path: '/projects/:projectId',
        element: <PrivateRoute element={<UpdateProjectForm/>} />
      },{
        path: '/projectdetails/:projectId',
        element: <PrivateRoute element={<ProjectDetails/>} />
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
