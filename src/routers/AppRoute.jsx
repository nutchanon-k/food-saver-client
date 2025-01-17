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
import { useEffect } from "react";
import AdminProfile from "../pages/admin/AdminProfile";
import ForgetPassword from "../pages/Auth/ForgetPassword";
import Cart from "../pages/Cart";
import Order from "../pages/Order";

import Store from "../pages/Store";
import HomePage from "../pages/HomePage";
import VerifyPayment from "../pages/VerifyPayment";
import OrderSuccess from "../pages/OrderSuccess";
import OrderFailed from "../pages/OrderFailed";

import AdminEditProfile from "../pages/admin/AdminEditProfile";

import SellerDashboard from "../pages/seller/SellerDashboard";

import ManageProduct from "../pages/seller/ManageProduct";
import ManageOrder from "../pages/seller/ManageOrder";

import SendEmailForgetPassword from "../pages/Auth/SendEmailForgetPassword";
import CreateStore from "../pages/Auth/CreateStore";
import UserEditProfile from "../pages/buyer/UserEditProfile";

import StoreProfile from "../pages/seller/StoreProfile";
import StoreEdit from "../pages/seller/StoreEdit";
import SellerProfile from "../pages/seller/SellerProfile";
import OrderHistory from "../pages/OrderHistory";
import ChatPage from "../pages/ChatPage";
import TestStoreAccess from "../components/TestStoreAccess";
import EditSellerProfile from "../pages/seller/EditSellerProfile";
import SellerMap from "../components/seller/SellerMap";
import Inbox from "../pages/seller/Inbox";
import NotificationsCard from "../pages/seller/NotificationsCard";

const guestRouter = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <Login /> },
  { path: "selectRegister", element: <SelectRegister /> },
  { path: "UserRegister", element: <UserRegister /> },
  { path: "MerchantRegister", element: <MerchantRegister /> },
  { path: "forgetPassword/:token", element: <ForgetPassword /> },
  { path: "send-email-forgetPassword", element: <SendEmailForgetPassword /> },
  { path: "createStore", element: <CreateStore /> },
  { path: "*", element: <LandingPage /> },
]);

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "admin-profile", element: <AdminProfile /> },
      { path: "admin-edit-profile", element: <AdminEditProfile /> },
      { path: "manage-user", element: <ManageUser /> },
      { path: "manage-charity", element: <ManageCharity /> },
      { path: "manage-store", element: <ManageStore /> },
      { path: "*", element: <Dashboard /> },
    ],
  },
]);

const buyerRouter = createBrowserRouter([
  {
    path: "/",
    element: <BuyerLayout />,
    children: [
      { index: true, element: <HomePage /> },

      { path: "/map", element: <MapPage /> },
      { path: "store/:storeId", element: <Store /> },
      { path: "cart", element: <Cart /> },
      { path: "order", element: <Order /> },
      { path: "verify", element: <VerifyPayment /> },
      { path: "order-success", element: <OrderSuccess /> },
      { path: "order-failed", element: <OrderFailed /> },
      { path: "userProfile", element: <UserProfile /> },
      { path: "userEdit", element: <UserEditProfile /> },
      { path: "order-history", element: <OrderHistory /> },
      { path: "chat/:chatRoomId", element: <ChatPage /> },
      { path: "test", element: <TestStoreAccess /> },
      // {index: true, element: <Dashboard />},
      // {path: "manage-user", element: <ManageUser />},
      // {path: "manage-charity", element: <ManageCharity />},
      // {path: "manage-store", element: <ManageStore/>},
      { path: "*", element: <HomePage /> },
    ],
  },

  { path: "/user", element: <UserProfile /> },
]);

const sellerRouter = createBrowserRouter([
  {
    path: "/",
    element: <SellerLayout />,
    children: [
      { index: true, element: <SellerDashboard /> },
      { path: "user", element: <UserProfile /> },
      { path: "store-profile", element: <StoreProfile /> },
      { path: "store-edit", element: <StoreEdit /> },
      { path: "seller-profile", element: <SellerProfile /> },
      { path: "seller-edit-profile", element: <EditSellerProfile /> },
      { path: "manage-product", element: <ManageProduct /> },
      { path: "inbox", element: <Inbox /> },
      { path: "notifications", element: <NotificationsCard /> },
      { path: "manage-order", element: <ManageOrder /> },
      { path: "chat/:chatRoomId", element: <ChatPage /> },
      { path: "test", element: <TestStoreAccess /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/user",
    element: <UserProfile />,
  },

  ,
]);

const finalRouter = (role, isAuthenticate, user) => {
  if (!isAuthenticate) return guestRouter;

  if (role === "SELLER" && user.store == null) {
    return createBrowserRouter([{ path: "*", element: <CreateStore /> }]);
  }

  if (role === "ADMIN") {
    return adminRouter;
  } else if (role === "BUYER") {
    return buyerRouter;
  } else if (role === "SELLER") {
    return sellerRouter;
  } else {
    return guestRouter;
  }
};

export default function AppRoute() {
  const getMe = useUserStore((state) => state.getMe);
  const user = useUserStore((state) => state.user);

  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  useEffect(() => {
    const loadUser = async () => {
      await getMe();
    };
    loadUser();
  }, []);

  const router = finalRouter(user?.role, isAuthenticated, user);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
