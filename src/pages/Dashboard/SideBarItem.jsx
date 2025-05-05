import { NavLink } from "react-router-dom";

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition hover:bg-blue-100 ${
          isActive ? "bg-blue-200 text-blue-800 font-semibold" : "text-gray-700"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {label}
    </NavLink>
  );
  
  export default SidebarItem