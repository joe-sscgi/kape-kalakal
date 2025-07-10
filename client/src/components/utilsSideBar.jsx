import { useUtilitiesDashboardContext } from "../pages/adminPages/Utils/UtilitiesDashboard";
import Logo from "./logo";

import { toast } from "react-toastify";
import { NavLink, Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

const SmallSidebar = () => {
  const { showSidebar, closeSidebar } = useUtilitiesDashboardContext();

  return (
    <Offcanvas show={showSidebar} onHide={closeSidebar}>
      <Offcanvas.Header closeButton>
        <Logo />

        <Offcanvas.Title>Utilities Links</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <NavDropdown title="Archive" id="basic-nav-dropdown">
          <NavDropdown.Item
            as={NavLink}
            to="/admin/utilities/archive-brands"
            onClick={closeSidebar}
          >
            Brands Archive
          </NavDropdown.Item>
          <NavDropdown.Item
            as={NavLink}
            to="/admin/utilities/archive-products"
            onClick={closeSidebar}
          >
            Products Archive
          </NavDropdown.Item>
          <NavDropdown.Item
            as={NavLink}
            to="/admin/utilities/archive-recipes"
            onClick={closeSidebar}
          >
            Recipes Archive
          </NavDropdown.Item>
          <NavDropdown.Item
            as={NavLink}
            to="/admin/utilities/archive-users"
            onClick={closeSidebar}
          >
            Users Archive
          </NavDropdown.Item>
        </NavDropdown>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default SmallSidebar;
