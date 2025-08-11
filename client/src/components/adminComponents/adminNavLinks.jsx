import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import AdminLink from "../../utils/adminLinks";
import LogoutContainer from "../logoutContainer";
import { useAdminDashboardLayoutContext } from "../../pages/AdminDashboardLayout";

const AdminNavLinks = () => {
  const { toggleMobileNavbar, user } = useAdminDashboardLayoutContext();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleBlur = (e, linkText) => {
    // Check if the blur target is outside the dropdown
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpenDropdown(null);
    }
  };

  return (
    <ul className="nav-links">
      {AdminLink.map((link) => {
        if (
          link.text === "Utilities" &&
          user?.userUserType?.toLowerCase() === "admin"
        ) {
          return null;
        }
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
                onFocus={() => setOpenDropdown(link.text)}
                onBlur={(e) => handleBlur(e, link.text)}
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
