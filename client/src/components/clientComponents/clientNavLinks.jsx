import ClientLink from "../../utils/clientLinks";
import { NavLink } from "react-router-dom";
import LogoutContainer from "../logoutContainer";
import { useHomepageLayoutContext } from "../../pages/HomepageLayout";

const clientNavLinks = () => {
  const { toggleMobileNavbar } = useHomepageLayoutContext();

  return (
    <ul className="nav-links">
      {ClientLink.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={toggleMobileNavbar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
      <LogoutContainer />
    </ul>
  );
};
export default clientNavLinks;
