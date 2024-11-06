import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import AppRoute from "./routers/AppRoute.jsx";

createRoot(document.getElementById("root")).render(
  <>
    {/* <AppRoute /> */}
    <App />
  </>
);
