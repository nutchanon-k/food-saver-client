import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MapPage from "../pages/MapPage";
import AdminLayout from "../layouts/AdminLayout";
import ManageUser from "../pages/admin/ManageUser";
import Dashboard from "../pages/admin/Dashboard";
import ManageCharity from "../pages/admin/ManageCharity";
import ManageStore from "../pages/admin/ManageStore";
import useUserStore from "../stores/userStore";
import BuyerLayout from "../layouts/BuyerLayout";
import SellerLayout from "../layouts/SellerLayout";
import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import { useEffect, useState } from "react";
import AdminProfile from "../pages/admin/AdminProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: "Hello World",
  },
  {
    path: "/map",
    element: <MapPage />,
  },
]);

const guestRouter = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  // { path: "/login", element: <Login /> },
  // { path: "/register", element: <Register /> },
  // { path: "/reset-password/:token", element: <ResetPassword /> },
  // { path: "*", element: <Navigate to="/" /> },

]);
const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "admin-profile", element: <AdminProfile /> },
      { path: "manage-user", element: <ManageUser /> },
      { path: "manage-charity", element: <ManageCharity /> },
      { path: "manage-store", element: <ManageStore /> },
      { path: "*", element: <NotFound /> },
    ]
  },
]);
const buyerRouter = createBrowserRouter([
  {
    path: "/", 
    element: <BuyerLayout /> ,
    // children: [
    //     {index: true, element: <Dashboard />},
    //     {path: "manage-user", element: <ManageUser />},
    //     {path: "manage-charity", element: <ManageCharity />},
    //     {path: "manage-store", element: <ManageStore/>},
    //     {path: "*", element: <NotFound  />}, 
    // ]
  },
]);
const sellerRouter = createBrowserRouter([
  {
    path: "/", 
    element: <SellerLayout /> ,
    // children: [
    //     {index: true, element: <Dashboard />},
    //     {path: "manage-user", element: <ManageUser />},
    //     {path: "manage-charity", element: <ManageCharity />},
    //     {path: "manage-store", element: <ManageStore/>},
    //     {path: "*", element: <NotFound  />}, 
    // ]
  },
]);


export default function AppRoute() {
  const getMe = useUserStore(state => state.getMe)
  const [router, setRouter] = useState(null);


  useEffect(() => {
    const loadUser = async () => {
      try {
        console.log("tst")
        const result = await getMe();
        console.log(result.data.role)
        if (result?.data?.role === "ADMIN") {
          setRouter(adminRouter);
        } else if (result?.data?.role === "BUYER") {
          setRouter(buyerRouter);
        } else if (result?.data?.role === "SELLER") {
          setRouter(sellerRouter);
        } else {
          setRouter(guestRouter);
        }
      } catch (error) {
        setRouter(guestRouter);
      }
    };
    loadUser();
  }, [getMe]);

  if (!router) {
    return <div> Loading.....</div>;
  }


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}