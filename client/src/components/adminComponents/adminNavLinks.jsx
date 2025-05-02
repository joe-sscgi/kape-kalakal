import AdminLink from "../../utils/adminLinks";
import { NavLink } from "react-router-dom";
import LogoutContainer from "../logoutContainer";

const adminNavLinks = () => {
  return (
    <ul className="nav-links">
      {AdminLink.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            // onClick={toggleMobileNavbar}
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
export default adminNavLinks;
