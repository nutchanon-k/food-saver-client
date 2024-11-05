import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MapPage from "../pages/MapPage";
import UserProfile from "../pages/buyer/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: "Hello World",
  },
  {
    path: "/map", 
    element: <MapPage/>,
  },
  {
    path: "/user", 
    element: <UserProfile/>,
  },
]);

export default function AppRoute() {
  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  )
}