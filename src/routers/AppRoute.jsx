import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MapPage from "../pages/MapPage";
import Login from "../pages/Auth/login";
import SelectRegister from "../pages/Auth/SelectRegister";
import UserRegister from "../pages/Auth/UserRegister";
import MerchantRegister from "../pages/Auth/MerchantRegister";


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
    path:"/auth",
    element:<Outlet />,
    children:[
      {index:true,element:<Login />},
      {path:"selectRegister" , element:<SelectRegister />},
      {path:"UserRegister" , element:<UserRegister />},
      {path:"MerchantRegister" , element:<MerchantRegister />},

    ]
  }
  
]);


  
  
      
 

export default function AppRoute() {
  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  )
}