// src/routers/navigateService.js
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const useNavigateService = () => {
  const navigate = useNavigate();

  // Function to navigate to the map page
  const navigateToMap = useCallback(() => {
    navigate("/map");
  }, [navigate]);

  // Function to navigate to the home page
  const navigateToHomePage = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  // Function to navigate to a store with a given store ID
  const navigateToStore = useCallback((storeId) => {
    navigate(`/store/${storeId}`);
    console.log(storeId)
  }, [navigate]);

  const navigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  // You can add more navigation functions here as needed
  return { navigateToMap, navigateToHomePage, navigateToStore,navigateToLogin };
};
