import Wrapper from "../../assets/wrappers/AdminNavBar";
import ClientNavLinks from "../clientComponents/clientNavLinks";
import { useHomepageLayoutContext } from "../../pages/HomepageLayout";

const clientNavBar = () => {
  const { isMobileActive, toggleMobileNavbar } = useHomepageLayoutContext();

  return (
    <Wrapper>
      <div className={isMobileActive ? "mobile-nav-active" : ""}>
        <nav id="navmenu" className="navmenu">
          <ClientNavLinks />
          <i
            className="mobile-nav-toggle d-xl-none bi bi-list"
            onClick={toggleMobileNavbar}
          ></i>
        </nav>
      </div>
    </Wrapper>
  );
};
export default clientNavBar;
