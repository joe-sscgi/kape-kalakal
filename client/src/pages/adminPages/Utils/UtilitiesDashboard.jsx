import Wrapper from "../../../assets/wrappers/UtilitiesDashboard";
import { UtilsSidebar } from "../../../components";
import { useAdminDashboardLayoutContext } from "../../AdminDashboardLayout";

import { createContext, use, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const UtilitiesDashboardContext = createContext();
const UtilitiesDashboard = () => {
  const { user } = useAdminDashboardLayoutContext();
  const navigate = useNavigate();

  useEffect(() => {
    let redirectPath = "dashboard";
    if (
      user?.userUserType?.toLowerCase() !== "super admin" &&
      user?.userUserType?.toLowerCase() === "customer"
    ) {
      redirectPath = "dashboard";
      navigate("/dashboard");
    } else if (
      user?.userUserType?.toLowerCase() !== "super admin" &&
      user?.userUserType?.toLowerCase() === "admin"
    ) {
      redirectPath = "admin dashboard";
      navigate("/admin");
    }
    toast.error(`Unauthorized access! Redirecting to ${redirectPath}.`);
  }, [user, navigate]);

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
