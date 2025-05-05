// pages/Dashboard/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import ContainerComponents from "../../components/container/ContainerComponents";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <ContainerComponents>
      <div className="min-h-screen flex bg-gray-100 pt-16">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="bg-white rounded-xl shadow-md p-6 min-h-[400px]">
            <Outlet /> {/* This will render nested dashboard routes */}
          </div>
        </main>
      </div>
    </ContainerComponents>
  );
};

export default DashboardLayout;
