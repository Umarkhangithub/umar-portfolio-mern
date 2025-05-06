import React from "react";
import { NavLink } from "react-router-dom";
import SocialLinksPage from "../../pages/socialLinks/SocialLinksPage";
import { navItems } from "./HeaderComponets";

const FooterComponents = () => {
  return (
    <footer className="bg-[#1C1C1C]  text-base-content rounded p-6 sm:p-10">
      {/* Desktop Menu */}
      <div className="hidden lg:flex flex-wrap justify-center gap-6">
        <ul className="menu menu-horizontal px-1">
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
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden flex justify-center mt-4">
        <ul className="menu menu-vertical p-4">
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
      </div>

      {/* Social Links Section */}
      <div className="mt-4 sm:mt-8 flex justify-center">
        <SocialLinksPage color='bg-transparent' />
      </div>

      {/* Copyright Section */}
      <aside className="mt-6 text-center">
        <p className="text-[#BDC3C7] ">
          Copyright © {new Date().getFullYear()} - All rights reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default FooterComponents;
