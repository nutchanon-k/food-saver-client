import { useEffect, useState } from "react";
import StoreMap from "./components/map/StoreMap";
import AdminLayout from "./layouts/AdminLayout";
import { BrowserRouter } from 'react-router-dom';
import AppRoute from "./routers/AppRoute";
import useUserStore from "./stores/userStore";
// import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  return (
    <>
      {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_API_GOOGLE_CLIENT_ID}> */}
        <AppRoute />
      {/* </GoogleOAuthProvider> */}
    </>
  );
}

export default App;
