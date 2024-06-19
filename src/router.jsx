import { Outlet, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Home from "./pages/Home/Home";
import EmployeeSignup from "./pages/signup/employeeSignup/EmployeeSignup";
import Project from "./components/project/Project";
import ProjectForm from "./components/project/ProjectForm";

function UserLayout() {
  return (
    <div className="m-0 p-0">
    {/* <Navbar /> */}
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
      },{
        path: "/createpro",
        element: <PrivateRoute element={<Project/>} />
      },{
        path: "/createproject",
        element: <PrivateRoute element={<ProjectForm/>} />
      }, 
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
