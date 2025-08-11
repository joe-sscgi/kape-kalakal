import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import AdminLink from "../../utils/adminLinks";
import LogoutContainer from "../logoutContainer";
import { useAdminDashboardLayoutContext } from "../../pages/AdminDashboardLayout";

const AdminNavLinks = () => {
  const { toggleMobileNavbar } = useAdminDashboardLayoutContext();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggleDropdown = (text) => {
    setOpenDropdown((prev) => (prev === text ? null : text));
  };

  return (
    <ul className="nav-links">
      {AdminLink.map((link) => {
        const hasChildren = !!link.children;

        return (
          <li key={link.text} className="nav-item">
            {hasChildren ? (
              <div
                className={`dropdown-wrapper ${
                  openDropdown === link.text ? "open" : ""
                }`}
                onMouseEnter={() => setOpenDropdown(link.text)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button className="nav-link dropdown-toggle">
                  {link.icon && <span className="icon">{link.icon}</span>}
                  {link.text}
                  <span className="arrow">
                    {openDropdown === link.text ? (
                      <FaCaretUp />
                    ) : (
                      <FaCaretDown />
                    )}
                  </span>
                </button>

                {openDropdown === link.text && (
                  <ul className="dropdown-menu">
                    {link.children.map((child) => (
                      <li key={child.text}>
                        <NavLink
                          to={child.path}
                          className="nav-link"
                          onClick={toggleMobileNavbar}
                          end
                        >
                          {child.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <NavLink
                to={link.path}
                className="nav-link"
                onClick={toggleMobileNavbar}
                end
              >
                {link.icon && <span className="icon">{link.icon}</span>}
                {link.text}
              </NavLink>
            )}
          </li>
        );
      })}

      <li>
        <LogoutContainer />
      </li>
    </ul>
  );
};

export default AdminNavLinks;
