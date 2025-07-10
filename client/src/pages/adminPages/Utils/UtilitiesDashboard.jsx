import Wrapper from "../../../assets/wrappers/UtilitiesDashboard";
import { UtilsSidebar } from "../../../components";

import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Button from "react-bootstrap/Button";

const UtilitiesDashboardContext = createContext();
const UtilitiesDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const closeSidebar = () => setShowSidebar(false);
  const toggleSidebar = () => setShowSidebar(true);

  return (
    <UtilitiesDashboardContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        toggleSidebar,
        closeSidebar,
      }}
    >
      <Wrapper>
        <UtilsSidebar />
        <Button className="btn main-btn side-bar-btn" onClick={toggleSidebar}>
          &gt;
        </Button>
        <section id="utils-dashboard" className="utils-dashboard section">
          {/* <!-- Section Title --> */}
          <div className="container section-title">
            <h1>Utilities Dashboard</h1>
          </div>
          {/* <!-- End Section Title --> */}
          <div className="utilities-container">
            <Outlet />
          </div>
        </section>
      </Wrapper>
    </UtilitiesDashboardContext.Provider>
  );
};
export const useUtilitiesDashboardContext = () =>
  useContext(UtilitiesDashboardContext);
export default UtilitiesDashboard;
