import { useState } from "react";
import StoreMap from "./components/map/StoreMap";
import AdminLayout from "./layouts/AdminLayout";
import { BrowserRouter } from 'react-router-dom';
import AppRoute from "./routers/AppRoute";

function App() {
  return (
    <>

        <AppRoute />
      
    </>
  );
}

export default App;
