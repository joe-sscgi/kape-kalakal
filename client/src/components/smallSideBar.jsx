import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSideBar";
import { useAdminDashboardLayoutContext } from "../pages/AdminDashboardLayout";
import Logo from "./logo";
import NavLinks from "../components/adminComponents/adminNavLinks";

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAdminDashboardLayoutContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
