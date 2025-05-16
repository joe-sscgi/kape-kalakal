import { Outlet } from "react-router";
import Wrapper from "../../assets/wrappers/AdminNavBar";
import AdminNavLinks from "../adminComponents/adminNavLinks";
import { useAdminDashboardLayoutContext } from "../../pages/AdminDashboardLayout";
import React, { useState } from "react";

const adminNavBar = () => {
  const { isMobileActive, toggleMobileNavbar } =
    useAdminDashboardLayoutContext();

  return (
    <Wrapper>
      <div className={isMobileActive ? "mobile-nav-active" : ""}>
        <nav id="navmenu" className="navmenu">
          <AdminNavLinks />
          <i
            className="mobile-nav-toggle d-xl-none bi bi-list"
            onClick={toggleMobileNavbar}
          ></i>
        </nav>
      </div>
    </Wrapper>
  );
};
export default adminNavBar;
