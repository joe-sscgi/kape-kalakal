import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Header";
import Logo from "./logo";
import AdminNavBar from "./adminComponents/adminNavBar";

const header = () => {
  return (
    <Wrapper>
      <header id="header" className="header fixed-top">
        <div className="branding">
          <div className="container position-relative d-flex align-items-center justify-content-between">
            <Link
              to="/admin"
              className="logo d-flex align-items-center logo-link"
              id="logo-link"
            >
              <Logo />
              <h1 className="sitename" id="sitename">
                Kape Kalakal
              </h1>
            </Link>
          </div>
          <AdminNavBar />
        </div>
      </header>
    </Wrapper>
  );
};
export default header;
