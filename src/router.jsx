import { Outlet, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Home from "./pages/Home/Home";

function UserLayout() {
  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: "56px", minHeight: "calc(100vh - 72px)" }}>
        <Outlet />
      </div>
      <Footer />
    </>
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
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
