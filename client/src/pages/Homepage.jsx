import { createContext, useContext, useEffect, useState } from "react";
import {
  Link,
  redirect,
  useNavigation,
  useNavigate,
  Outlet,
  useLoaderData,
} from "react-router-dom";
import { toast } from "react-toastify";

import Wrapper from "../assets/wrappers/Homepage";
import customFetch from "../utils/customFetch";
import { Logo } from "../components/";

import fotm from "../assets/images/fotm/2025/apr/El-Salvador-Don-Jaime-Pacas-Natural-Light-Roast.jpg";

import { useQuery } from "@tanstack/react-query";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return error;
  }
};

const HomepageContext = createContext();

const Homepage = ({ queryClient }) => {
  const { user } = useLoaderData();
  console.log(user);

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logging out...");
  };

  //   useEffect(() => {
  //     if (!isAuthError) return;
  //     logoutUser();
  //   }, [isAuthError]);

  return (
    <HomepageContext.Provider
      value={{
        user,
      }}
    >
      <Wrapper>
        <main className="main">
          {/* Homepage */}
          <header id="header" className="header fixed-top">
            <div className="branding d-flex align-items-center">
              <div className="container position-relative d-flex align-items-center justify-content-between">
                <Link
                  to="/"
                  className="logo d-flex align-items-center logo-link"
                  id="logo-link"
                >
                  <Logo />
                  <h1 className="sitename" id="sitename">
                    Kape Kalakal
                  </h1>
                </Link>

                <nav id="navmenu" className="navmenu">
                  <ul>
                    <li>
                      <a href="#menu" className="nav-link">
                        Products
                      </a>
                    </li>
                    <li>
                      <a href="#brands" className="nav-link">
                        Brands
                      </a>
                    </li>
                    <li>
                      <a href="#recipes" className="nav-link">
                        Recipes
                      </a>
                    </li>
                    <li>
                      <a href="#contact" className="nav-link">
                        Contact
                      </a>
                    </li>
                    <li>
                      <a href="#specials" className="nav-link">
                        Cart
                      </a>
                    </li>
                    <li>{user.username.toUpperCase()}</li>
                    <li>
                      <Link to="/" className="nav-link">
                        Logout
                      </Link>
                    </li>
                  </ul>
                  <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                </nav>
              </div>
            </div>
          </header>

          <section id="homepage" className="homepage">
            <section
              id="homepage-fotm-section"
              className="homepage-section homepage-fotm-section"
            >
              <div className="homepage-section-container container">
                {/* Section Title */}
                <div className="section-title">
                  <h1>
                    Flavor of the <span>Month</span>
                  </h1>
                </div>
                {/* End Section Title */}

                <div className="fotm-container">
                  <div className="fotm-img-container">
                    <img src={fotm} />
                  </div>
                  <div className="fotm-details-container">
                    <h3 className="fotm-prod-name">
                      El Salvador Don Jaime Pacas Natural Light Roast
                    </h3>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Distinctio, sunt laborum officiis veritatis autem
                      reprehenderit nobis et sit. Aut numquam eaque ullam, animi
                      blanditiis tempora porro architecto odit earum recusandae?
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section
              id="homepage-best-sellers-section"
              className="homepage-section homepage-best-sellers-section"
            >
              <div className="homepage-section-container container">
                {/* Section Title */}
                <div className="section-title">
                  <h1>
                    Best <span>Sellers</span>
                  </h1>
                </div>
                {/* End Section Title */}

                <div className="best-sellers-container">
                  <img src={fotm} />
                  <img src={fotm} />
                  <img src={fotm} />
                </div>
              </div>
            </section>

            <section
              id="homepage-collection-section"
              className="homepage-section homepage-collection-section"
            >
              <div className="homepage-section-container container">
                {/* Section Title */}
                <div className="section-title">
                  <h1>
                    Our <span>Collections</span>
                  </h1>
                </div>
                {/* End Section Title */}
                <div className="collection-container">
                  <div className="collection-cards-container">
                    <div className="collection-card-container">
                      <h3>Coffee</h3>
                      <div className="collection-card-img">
                        <img src={fotm} />
                        <img src={fotm} />
                        <img src={fotm} />
                        <img src={fotm} />
                      </div>
                    </div>

                    <div className="collection-card-container">
                      <h3>Brewing Gear</h3>
                      <div className="collection-card-img">
                        <img src={fotm} />
                        <img src={fotm} />
                        <img src={fotm} />
                        <img src={fotm} />
                      </div>
                    </div>

                    <div className="collection-card-container">
                      <h3>Accessories</h3>
                      <div className="collection-card-img">
                        <img src={fotm} />
                        <img src={fotm} />
                        <img src={fotm} />
                        <img src={fotm} />
                      </div>
                    </div>

                    <div className="collection-card-container">
                      <h3>Tea</h3>
                      <div className="collection-card-img">
                        <img src={fotm} />
                        <img src={fotm} />
                        <img src={fotm} />
                        <img src={fotm} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
          {/* /Homepage */}
        </main>
      </Wrapper>
    </HomepageContext.Provider>
  );
};
export const useHomepageContext = () => useContext(HomepageContext);
export default Homepage;
