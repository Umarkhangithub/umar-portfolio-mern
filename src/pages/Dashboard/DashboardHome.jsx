// DashboardHome.jsx
import { UserCircle, Activity, CheckCircle } from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="text-gray-800 p-6 rounded-xl bg-white shadow-md space-y-6">
      <div className="text-2xl font-bold flex items-center gap-3">
        <UserCircle className="text-primary w-8 h-8" />
        Welcome back, Admin!
      </div>

      <p className="text-gray-600 text-sm">
        Here's a quick snapshot of your dashboard. Manage your portfolio, track your activity, and stay up to date — all in one place.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div className="bg-indigo-100 p-4 rounded-lg shadow-sm flex items-center gap-3">
          <Activity className="text-indigo-600" />
          <span>Monitor recent activity</span>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-sm flex items-center gap-3">
          <CheckCircle className="text-green-600" />
          <span>Review completed tasks</span>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-sm flex items-center gap-3">
          <UserCircle className="text-yellow-600" />
          <span>Update your profile info</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
