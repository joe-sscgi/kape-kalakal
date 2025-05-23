import { FaUserCircle, FaCaretDown, FaRegUserCircle } from "react-icons/fa";
import Wrapper from "../assets/wrappers/LogoutContainer";
import { useState } from "react";
import { useAdminDashboardLayoutContext } from "../pages/AdminDashboardLayout";
import { useHomepageLayoutContext } from "../pages/HomepageLayout";

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  let user;
  let logoutUser;
  if (useAdminDashboardLayoutContext()) {
    user = useAdminDashboardLayoutContext().user;
    logoutUser = useAdminDashboardLayoutContext().logoutUser;
  } else {
    user = useHomepageLayoutContext().userData;
    logoutUser = useHomepageLayoutContext().logoutUser;
  }

  return (
    <Wrapper>
      <a
        className="main-btn logout-btn"
        onClick={() => setShowLogout(!showLogout)}
      >
        <FaRegUserCircle />
        <span>{user?.userUsername}</span>
        <FaCaretDown />
      </a>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button
          type="button"
          className="main-btn dropdown-btn"
          onClick={logoutUser}
        >
          logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
