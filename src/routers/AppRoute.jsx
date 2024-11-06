import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MapPage from "../pages/MapPage";
import Login from "../pages/Auth/Login";
import SelectRegister from "../pages/Auth/SelectRegister";
import UserRegister from "../pages/Auth/UserRegister";
import MerchantRegister from "../pages/Auth/MerchantRegister";

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
import ForgetPassword from "../pages/Auth/forgetPassword";
import Cart from "../pages/Cart";
import Order from "../pages/Order";
import { use } from "framer-motion/client";








const guestRouter = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <Login /> },
  { path: "selectRegister", element: <SelectRegister /> },
  { path: "UserRegister", element: <UserRegister /> },
  { path: "MerchantRegister", element: <MerchantRegister /> },
  { path: "forgetPassword", element: <ForgetPassword /> },
  { path: "selectRegister", element: <SelectRegister /> },
  { path: "UserRegister", element: <UserRegister /> },
  { path: "*", element: <LandingPage /> },
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
      { path: "*", element: <Dashboard />},
    ]
  },
]);


const buyerRouter = createBrowserRouter([
  {
    path: "/",
    element: <BuyerLayout />,
    children: [
      { index: true, element: <MapPage /> },
      { path: "/map", element: <MapPage /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <Order /> }

    ]

  },
]);

const sellerRouter = createBrowserRouter([
  {
    path: "/",
    element: <SellerLayout />,

  },
]);


const finalRouter = (role) => {
  if (role === "ADMIN") {
    return adminRouter;
  } else if (role === "BUYER") {
    return buyerRouter;
  } else if (role === "SELLER") {
    return sellerRouter;
  } else {
    return guestRouter;
  }

}


export default function AppRoute() {
  const getMe = useUserStore(state => state.getMe)
  const user = useUserStore(state => state.user)


  useEffect(() => {
    const loadUser = async () => {
      await getMe()
    }
    loadUser()
  }, [getMe])

  console.log('test router', user?.role)

  return (
    <div>
      <RouterProvider router={finalRouter(user?.role)} />
    </div>
  )
}




// export default function AppRoute() {
//   const getMe = useUserStore(state => state.getMe)
//   const [router, setRouter] = useState(null);
//   const token = localStorage.getItem("token");


//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         console.log("tsttttt from app route")
//         const result = await getMe();
//         console.log(result.data.role)
//         if (result?.data?.role === "ADMIN") {
//           setRouter(adminRouter);
//         } else if (result?.data?.role === "BUYER") {
//           setRouter(buyerRouter);
//         } else if (result?.data?.role === "SELLER") {
//           setRouter(sellerRouter);
//         } else {
//           setRouter(guestRouter);
//         }
//       } catch (error) {
//         setRouter(guestRouter);
//       }
//     };
//     loadUser();
//   }, [getMe, token]);

//   if (!router) {
//     return <div> Loading.....</div>;
//   }


//   return (
//     <div>
//       <RouterProvider router={router} />
//     </div>
//   )
// }