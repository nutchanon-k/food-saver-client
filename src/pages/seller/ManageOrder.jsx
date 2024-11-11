import React from "react";
import OrderList from "../../components/seller/OrderList";
import OrderDetail from "../../components/seller/OrderDetail";
import { Outlet } from 'react-router-dom';
import ModalFoodDetail from "../../components/seller/ModalFoodDetail";
import ProductAdd from "../../components/seller/ProductAdd";


import ConfirmOrder from "../../components/Card2/ConfirmOrder";
import FilterBar from "../../components/Card2/FilterBar";
import ModalDeactiveUser from "../../components/Card2/ModalDeactiveUser";
import FoundationCard from "../../components/Card2/FoundationCard";
import NearMe from "../../components/Card2/NearMe";
import PromoCard from "../../components/Card2/PromoCard";
import RecommendedCard from "../../components/Card2/RecommendedCard";
import RestuarantCard from "../../components/Card2/RestuarantCard";
import RestuarantIcon from "../../components/Card2/ResturantIcon";
import SearchFilterPage from "../../components/Card2/SearchFilterPage";
import Store from "../../components/Card2/Store";
import StoreDashboard from "../../components/Card2/StoreDashboard";



const ManageOrder = () => {
  return (
    <div>
      {/* <div className="justify-center flex h-screen w-full"> */}
      {/* <OrderList />
      <OrderDetail />  */}
      <ModalFoodDetail />
      <ProductAdd /> 

{/* <ConfirmOrder />
<FilterBar />
<ModalDeactiveUser />
<FoundationCard />
<NearMe />
<PromoCard />
<RecommendedCard />
<RestuarantCard />
<RestuarantIcon />
<SearchFilterPage />
<Store/>
<StoreDashboard /> */}
    </div>
  );
};

export default ManageOrder;
