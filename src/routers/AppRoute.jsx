import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MapPage from "../pages/MapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: "Hello World",
  },
  {
    path: "/map", 
    element: <MapPage/>,
  },
]);

export default function AppRoute() {
  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  )
}