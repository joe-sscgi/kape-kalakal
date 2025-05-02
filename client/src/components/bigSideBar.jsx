import Wrapper from "../assets/wrappers/BigSideBar";
import NavLinks from "../components/adminComponents/adminNavLinks";
import Logo from "./logo";
import { useAdminDashboardLayoutContext } from "../pages/AdminDashboardLayout";
const BigSidebar = () => {
  const { showSidebar } = useAdminDashboardLayoutContext();

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container " : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>{/* <Logo /> */}</header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
