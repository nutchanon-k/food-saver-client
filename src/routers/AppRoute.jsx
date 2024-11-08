import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MapPage from "../pages/MapPage";
import UserProfile from "../pages/buyer/UserProfile";
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
import { useEffect, useMemo, useState } from "react";
import AdminProfile from "../pages/admin/AdminProfile";
import ForgetPassword from "../pages/Auth/forgetPassword";
import Cart from "../pages/Cart";
import Order from "../pages/Order";
import Store from "../pages/Store";



const guestRouter = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <Login /> },
  { path: "selectRegister", element: <SelectRegister /> },
  { path: "UserRegister", element: <UserRegister /> },
  { path: "MerchantRegister", element: <MerchantRegister /> },
  { path: "forgetPassword", element: <ForgetPassword /> },
  { path: "*", element: <LandingPage /> },
]);






const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
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
      {index: true, element: <MapPage />},
      { path: "/Home", element: <HomePage/> },
        {path: "/map",element: <MapPage />},
        {path:"store/:storeId",element:<Store />},
        {path:"cart",element:<Cart />},
        {path:"order",element:<Order/>},
        // {index: true, element: <Dashboard />},
        // {path: "manage-user", element: <ManageUser />},
        // {path: "manage-charity", element: <ManageCharity />},
        // {path: "manage-store", element: <ManageStore/>},
        // {path: "*", element: <NotFound  />}, 
    ]

  },
  {
    path: "/user",
    element: <UserProfile />,
  },
]);

const sellerRouter = createBrowserRouter([
  {
    path: "/",
    element: <SellerLayout />,
    children: [
        // {index: true, element: <Dashboard />},
    //     {path: "manage-user", element: <ManageUser />},
    //     {path: "manage-charity", element: <ManageCharity />},
    //     {path: "manage-store", element: <ManageStore/>},
        {path: "*", element: <NotFound  />},
    ]
  },
  {
    path: "/user",
    element: <UserProfile />,
  },
]);



const finalRouter = (role,isAuthenticate) => {
  console.log(isAuthenticate,"app router")
  if(!isAuthenticate) return guestRouter;
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
  const isAuthenticated = useUserStore(state => state.isAuthenticated)

  useEffect(() => {
    const loadUser = async () => {
      await getMe()
    }
    loadUser()
  }, [])

  // console.log(user, "router")
  // console.log(isAuthenticated, "routerxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  // console.log(user?.role, "role")

  const router = finalRouter(user?.role, isAuthenticated);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}




// import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
// import MapPage from "../pages/MapPage";
// import UserProfile from "../pages/buyer/UserProfile";
// import Login from "../pages/Auth/Login";
// import SelectRegister from "../pages/Auth/SelectRegister";
// import UserRegister from "../pages/Auth/UserRegister";
// import MerchantRegister from "../pages/Auth/MerchantRegister";
// import AdminLayout from "../layouts/AdminLayout";
// import ManageUser from "../pages/admin/ManageUser";
// import Dashboard from "../pages/admin/Dashboard";
// import ManageCharity from "../pages/admin/ManageCharity";
// import ManageStore from "../pages/admin/ManageStore";
// import useUserStore from "../stores/userStore";
// import BuyerLayout from "../layouts/BuyerLayout";
// import SellerLayout from "../layouts/SellerLayout";
// import LandingPage from "../pages/LandingPage";
// import NotFound from "../pages/NotFound";
// import { useEffect, useMemo, useState } from "react";
// import AdminProfile from "../pages/admin/AdminProfile";
// import ForgetPassword from "../pages/Auth/forgetPassword";
// import Cart from "../pages/Cart";
// import Order from "../pages/Order";
// import NotAuthorized from "../pages/NotAuthorized";
// import ProtectedRoute from "./ProtectRoute";



// // สร้าง Router เดียว
// const router = createBrowserRouter([
//   { path: "/", element: <LandingPage /> },
//   { path: "/login", element: <Login /> },
//   { path: "/selectRegister", element: <SelectRegister /> },
//   { path: "/UserRegister", element: <UserRegister /> },
//   { path: "/MerchantRegister", element: <MerchantRegister /> },
//   { path: "/forgetPassword", element: <ForgetPassword /> },
//   { path: "/not-authorized", element: <NotAuthorized /> },

//   // เส้นทางสำหรับ ADMIN
//   {
//     path: "/admin",
//     element: <ProtectedRoute children={<AdminLayout />} allowedRoles={["ADMIN"]} />, 
//     children: [
//       { index: true, element: <Dashboard /> },
//       { path: "admin-profile", element: <AdminProfile /> },
//       { path: "manage-user", element: <ManageUser /> },
//       { path: "manage-charity", element: <ManageCharity /> },
//       { path: "manage-store", element: <ManageStore /> },
//     ],
//   },

//   // เส้นทางสำหรับ BUYER
//   {
//     path: "/buyer",
//     element: <ProtectedRoute children={<BuyerLayout />} allowedRoles={["BUYER"]}/>,
//     children: [
//       { index: true, element: <MapPage /> },
//       { path: "cart", element: <Cart /> },
//       { path: "order", element: <Order /> },
//     ],
//   },
//   {
//     path: "/user",
//     element: <ProtectedRoute children={<UserProfile />} allowedRoles={["BUYER", "SELLER", "ADMIN"]}/>,

//   },

//   // เส้นทางสำหรับ SELLER
//   {
//     path: "/seller",
//     element: <ProtectedRoute children={<SellerLayout />} allowedRoles={["SELLER"]}/>,
//     children: [
//       // กำหนดเส้นทางสำหรับ seller ตามต้องการ
//     ],
//   },

//   { path: "*", element: <NotFound /> },
// ]);

// export default function AppRoute() {
//   const getMe = useUserStore(state => state.getMe);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadUser = async () => {
//       await getMe();
//       setLoading(false);
//     };
//     loadUser();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return <RouterProvider router={router} />;
// }
  








