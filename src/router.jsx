import React, { useState, useEffect } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Home from "./pages/Home/Home";
import EmployeeSignup from "./pages/signup/employeeSignup/EmployeeSignup";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import UpdateProjectForm from "./components/project/UpdateProjectForm";
import ProjectDetails from "./components/project/ProjectDetails";
import UserSignup from "./pages/signup/userSignup/UserSignup";
import Queue from "./components/queue/Queue";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/login/ForgotPassword";
import ResetPassword from "./pages/login/ResetPassword";
import AcceptancePage from "./pages/projectAcceptance/AcceptancePage";
import VerifyEmail from "./pages/login/VerifyEmail";
import UpdateUserRole from "./pages/projectAcceptance/UpdateUserRole";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserData, selectUser } from "./store/slices/userSlice";
import { QueueSpinner } from "./components/reusables/LoadingSpinner";
import Checkout from "./components/payment/Checkout";
import Success from "./components/payment/Sucess";
import { Cancel } from "@mui/icons-material";

const UserLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && !user) {
      dispatch(fetchUserData())
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, user]);

  console.log("Fetched user from router: ", user);

  if (isLoading) {
    return <QueueSpinner isLoading={isLoading} />;
  }

  return (
    <div className="m-0 p-0">
      <Navbar />
      <div className="container" style={{ paddingTop: "85px", paddingBottom: "55px" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const employees = ["junior", "senior", "branchManager", "companyOwner"];

const router = createBrowserRouter([
  {
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signEmp",
        element: <EmployeeSignup />,
      },
      {
        path: "/signUser",
        element: <UserSignup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />
      },
      {
        path: "/projects",
        element: <PrivateRoute element={<ProjectList />}  allowedRoles={[...employees,'client']} />,
      },
      {
        path: "/createproject",
        element: <PrivateRoute element={<ProjectForm />}  allowedRoles={[...employees,'client']} />,
      },
      {
        path: "/projectdetails/:projectId",
        element: <PrivateRoute element={<ProjectDetails />}  allowedRoles={[...employees,'client']} />,
      },
      {
        path: "/acceptance/:id",
        element: (
          <PrivateRoute element={<AcceptancePage />} allowedRoles={employees} />
        ),
      },
      {
        path: "/updaterole/:userId",
        element: (
          <PrivateRoute element={<UpdateUserRole />} allowedRoles={employees} />
        ),
      },
      {
        path: "/projects/:projectId",
        element: (
          <PrivateRoute
            element={<UpdateProjectForm />}
            allowedRoles={employees}
          />
        ),
      },
      {
        path: "/queue",
        element: <PrivateRoute element={<Queue />} allowedRoles={employees} />,
      },
      {
        path: "/payment",
        element:<Checkout /> ,
      },
      {
        path: "/success",
        element:<Success /> ,
      },      {
        path: "/cancel",
        element:<Cancel /> ,
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
