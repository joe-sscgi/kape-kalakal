import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Header";
import Logo from "./logo";
import AdminNavBar from "./adminComponents/adminNavBar";
import React, { useState, useEffect } from "react";

const header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust the scroll position threshold as needed
      if (scrollPosition > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper>
      <div
        className={
          isScrolled ? "scrolled header fixed-top" : "header fixed-top"
        }
      >
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
      </div>
    </Wrapper>
  );
};
export default header;
