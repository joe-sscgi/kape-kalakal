import Wrapper from "../../../assets/wrappers/MaintenanceDashboard";
import customFetch from "../../../utils/maintenanceLinks";
import MainLinks from "../../../utils/maintenanceLinks";

import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const MaintenanceDashboard = () => {
  return (
    <Wrapper>
      <section id="main-dashboard" className="main-dashboard section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Maintenance Dashboard</h1>
        </div>
        {/* <!-- End Section Title --> */}
        <div className="container">
          <div className="maintenance-container">
            {MainLinks.map((link) => {
              const { text, path } = link;
              return (
                <NavLink to={path} key={text} className="nav-link" end>
                  <button className="btn main-btn">{text}</button>
                </NavLink>
              );
            })}
          </div>
        </div>
      </section>
    </Wrapper>
  );
};
export default MaintenanceDashboard;
