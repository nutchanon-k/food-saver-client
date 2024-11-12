import React from 'react'
import KPI from '../../components/admin/graph/KPI'
import SalesOverTimeChart from '../../components/admin/graph/SalesOverTimeChart'
import OrdersOverTimeChart from '../../components/admin/graph/OrdersOverTimeChart'
import SalesByCategoryChart from '../../components/admin/graph/SalesByCategoryChart'
import SalesBySellerChart from '../../components/admin/graph/SalesBySellerChart'
import NewUserRegistrationsChart from '../../components/admin/graph/NewUserRegistrationsChart'
import OrdersByStatusChart from '../../components/admin/graph/OrdersByStatusChart'
import OrderProcessingTimeChart from '../../components/admin/graph/OrderProcessingTimeChart'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-4 px-6 max-w-[1200px] mx-auto'>
      <KPI />
      <OrderProcessingTimeChart />
      <SalesOverTimeChart />
      <OrdersOverTimeChart />
      <SalesByCategoryChart />
      <SalesBySellerChart />
      {/* <NewUserRegistrationsChart /> */}
      {/* <OrdersByStatusChart /> */}

    </div>

  );
};


export default Dashboard