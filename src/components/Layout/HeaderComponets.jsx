import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import ContainerComponents from "../container/ContainerComponents";

export const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Skills", path: "/skills" },
  { label: "Services", path: "/services" },
  { label: "Contact Us", path: "/contact-us" },
];

const HeaderComponents = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="bg-[#1C1C1C] shadow-sm fixed top-0 z-50 w-full">
      <ContainerComponents>
        <div className="navbar justify-between items-center py-2">
          {/* Logo */}
          <NavLink to="/" className="text-white font-bold text-2xl">
            Mohammad <span className="text-[#00A8E8]">Umar</span>
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-6 items-center">
            <ul className="flex gap-6">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#00A8E8] font-bold"
                        : "text-[#BDC3C7] hover:text-[#00A8E8]"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <NavLink
              to="/login"
              className="btn bg-[#00A8E8] hover:bg-[#008FB3] text-white"
            >
              Login
            </NavLink>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="lg:hidden">
            <button onClick={handleToggle} className="text-white">
              <Menu />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-[#1C1C1C] px-4 pb-4">
            <ul className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#00A8E8] font-bold"
                        : "text-[#BDC3C7] hover:text-[#00A8E8]"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="btn mt-2 bg-[#00A8E8] hover:bg-[#008FB3] text-white w-full"
              >
                Login
              </NavLink>
            </ul>
          </div>
        )}
      </ContainerComponents>
    </div>
  );
};

export default HeaderComponents;
