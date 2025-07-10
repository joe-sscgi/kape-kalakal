import ClientLink from "../../utils/clientLinks";
import { NavLink } from "react-router-dom";
import LogoutContainer from "../logoutContainer";
import { useHomepageLayoutContext } from "../../pages/HomepageLayout";

const clientNavLinks = () => {
  const { toggleMobileNavbar, cartCtr } = useHomepageLayoutContext();

  return (
    <ul className="nav-links">
      {ClientLink.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={text}
            id={path + "-link"}
            className={path == "cart" ? "cart-link nav-link" : "nav-link"}
            onClick={toggleMobileNavbar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
            {path == "cart" ? <sub>{cartCtr}</sub> : ""}
          </NavLink>
        );
      })}
      <LogoutContainer />
    </ul>
  );
};
export default clientNavLinks;
