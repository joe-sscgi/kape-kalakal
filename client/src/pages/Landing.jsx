import styled from "styled-components";
import { Link, Links, useLoaderData } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Isotope from "isotope-layout";
import "font-awesome/css/font-awesome.min.css";

import Wrapper from "../assets/wrappers/Landing";
import { Footer } from "../components";
import customFetch from "../utils/customFetch";

import logo from "../assets/images/logo/kape-kalakal-logo.jpg";
import hero1 from "../assets/images/hero-banner/hero-banner-1.jpg";
import hero2 from "../assets/images/hero-banner/hero-banner-3.jpg";
import hero3 from "../assets/images/hero-banner/hero-banner-5.jpg";

import defaultImg from "../assets/images/default-img.jpg";
import el_salvador_light_roast from "../assets/images/products/coffee/El-Salvador-Don-Jaime-Pacas-Natural-Light-Roast.jpg";
import el_salvador_medium_roast from "../assets/images/products/coffee/Seasonal-Blend-Haru-Kochi-Medium-Roast.jpg";
import haru_kochi_dark_roast from "../assets/images/products/coffee/Seasonal-Blend-Haru-Kochi-Medium-Roast.jpg";

import Kalita_Mino_yaki_Dripper from "../assets/images/products/brewing-gear/Kalita Mino-yaki Dripper.png";
import kinto_mini_pour_over_kettle_430ml from "../assets/images/products/brewing-gear/kinto-mini-pour-over-kettle-430ml.png";
import ORIGAMI_ReWork_Dripper from "../assets/images/products/brewing-gear/ORIGAMI ReWork Dripper.png";

import two_Tone_Logo_Sticker from "../assets/images/products/accessories/2 Tone Logo Sticker.png";
import Kurasu_Logo_T_shirts_Black from "../assets/images/products/accessories/Kurasu Logo T-shirts (Black).png";
import Kurasu_original_postcard from "../assets/images/products/accessories/Kurasu original postcard.jpg";

import Matcha_Kurasu_Blend_No_Sugar from "../assets/images/products/tea/Matcha Kurasu Blend (No Sugar).png";
import Matcha_Kurasu_Blend_With_Sugar from "../assets/images/products/tea/Matcha Kurasu Blend (With Sugar).jpg";
import Matcha_SUI_Blend from "../assets/images/products/tea/Matcha SUI Blend.png";

import daibo from "../assets/images/products/brands/daibo.jpg";
import simplify from "../assets/images/products/brands/simplify.png";
import claska from "../assets/images/products/brands/claska.jpg";

import author1 from "../assets/img/testimonials/testimonials-1.jpg";
import author2 from "../assets/img/testimonials/testimonials-2.jpg";
import author3 from "../assets/img/testimonials/testimonials-3.jpg";
import author4 from "../assets/img/testimonials/testimonials-4.jpg";
import author5 from "../assets/img/testimonials/testimonials-5.jpg";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/");

    return data.allData;
  } catch (error) {
    // return redirect("/admin");
  }
};

const Landing = () => {
  const brands = useLoaderData().brands;
  const prods = useLoaderData().prods;
  const prodImgs = useLoaderData().prodImgs;
  // console.log(prodImgs);

  const [isMobileActive, setMobileActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileNavbar = () => {
    if (!isMobileActive) {
      setMobileActive(true);
    } else {
      setMobileActive(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-out-quad", // Animation easing
      once: true, // Whether animation should happen only once
      // more settings available in the documentation
    });
  }, []);

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

  // init one ref to store the future isotope object
  const isotope = React.useRef();
  // store the filter keyword in a state
  const [filterKey, setFilterKey] = React.useState("*");

  // initialize an Isotope object with configs
  React.useEffect(() => {
    isotope.current = new Isotope(".filter-container", {
      itemSelector: ".filter-item",
      layoutMode: "fitRows",
    });
    // cleanup
    return () => isotope.current.destroy();
  }, []);

  // handling filter key change
  React.useEffect(() => {
    filterKey === "*"
      ? isotope.current.arrange({ filter: `*` })
      : isotope.current.arrange({ filter: `.${filterKey}` });
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => setFilterKey(key);

  return (
    <Wrapper>
      <div
        className={
          isScrolled ? "scrolled header fixed-top" : "header fixed-top"
        }
      >
        <header id="header" className="header fixed-top">
          <div className="branding d-flex align-items-center">
            <div className="container position-relative d-flex align-items-center justify-content-between">
              <Link
                to="/"
                className="logo d-flex align-items-center logo-link"
                id="logo-link"
              >
                <img
                  src={logo}
                  alt="KAPE KALAKAL LOGO"
                  className="header-logo"
                />
                <h1 className="sitename" id="sitename">
                  Kape Kalakal
                </h1>
              </Link>
              <div
                className={isMobileActive ? "mobile-nav-active" : ""}
                onClick={toggleMobileNavbar}
              >
                <nav id="navmenu" className="navmenu">
                  <ul>
                    <li>
                      <a
                        href="#menu"
                        className="nav-link"
                        onClick={toggleMobileNavbar}
                      >
                        Products
                      </a>
                    </li>
                    <li>
                      <a
                        href="#brands"
                        className="nav-link"
                        onClick={toggleMobileNavbar}
                      >
                        Brands
                      </a>
                    </li>
                    <li>
                      <a
                        href="#recipes"
                        className="nav-link"
                        onClick={toggleMobileNavbar}
                      >
                        Recipes
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="nav-link"
                        onClick={toggleMobileNavbar}
                      >
                        Contact
                      </a>
                    </li>
                    <li className="dropdown">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                      <ul>
                        <li>
                          <Link to="/register" className="nav-link">
                            Register
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <i
                    className="mobile-nav-toggle d-xl-none bi bi-list"
                    onClick={toggleMobileNavbar}
                  ></i>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main className="main">
        {/* HERO SECTION */}
        <section id="hero" className="hero section dark-background">
          <Carousel>
            <Carousel.Item interval={2000}>
              <img src={hero1} alt="" />
              <Carousel.Caption>
                <div className="carousel-container">
                  <h2>
                    <span>Kape</span> Kalakal
                  </h2>
                  <p>
                    Our all-time favourite ORIGAMI dripper is now available in
                    AS resin! With the iconic paper-folded-like ribs still in
                    shape, the new AS resin model is tougher and 50% lighter
                    than the porcelain model. It also has better heat retention
                    and improves consistency of your brew. A perfect companion
                    for both daily and outdoor pour-over; grab one for yourself
                    now!
                  </p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img src={hero2} alt="" />
              <Carousel.Caption>
                <div className="carousel-container">
                  <h2>Where Beans Become Dreams</h2>
                  <p>
                    <span>Kape Kalakal</span>
                  </p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={2000}>
              <img src={hero3} alt="" />
              <Carousel.Caption>
                <div className="carousel-container carousel-details-left">
                  <h2>Where Coffee Comes to Life</h2>
                  <p>
                    Start your day with <span>Kape Kalakal</span>
                  </p>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div className="hero-mobile-toggle hidden">
            <img src={hero2} alt="" />
            <div className="carousel-container">
              <h2>Where Beans Become Dreams</h2>
            </div>
          </div>
        </section>
        {/* /HERO SECTION */}

        {/* <!-- About Section --> */}
        <section id="about" className="about section light-background">
          <div className="container">
            {/* <!-- <div className="row gy-4">
            <div
              className="col-lg-6 position-relative align-self-start"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img src="assets/img/about.jpg" className="img-fluid" alt="" />
              <a
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                className="glightbox pulsating-play-btn"
              ></a>
            </div> --> */}
            <div
              className="col-lg-12 content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h2>
                Welcome to{" "}
                <span className="description-title">Kape Kalakal</span>
              </h2>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check2-all"></i>
                  <span>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check2-all"></i>
                  <span>
                    Duis aute irure dolor in reprehenderit in voluptate velit.
                  </span>
                </li>
                <li>
                  <i className="bi bi-check2-all"></i>
                  <span>
                    Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate trideta
                    storacalaperda mastiro dolore eu fugiat nulla pariatur.
                  </span>
                </li>
              </ul>
              <p>
                Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                aute irure dolor in reprehenderit in voluptate velit esse cillum
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident
              </p>
            </div>
            {/* </div> */}
          </div>
        </section>
        {/* <!-- /About Section --> */}

        {/* <!-- product/menu Section --> */}
        <section id="menu" className="menu section">
          {/* <!-- Section Title --> */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Products</h2>
            <div>
              <span>Check Our </span>
              <span className="description-title">Products</span>
            </div>
            <h3 className="sub-sub-header">
              These are our <span>BEST SELLERS</span>
            </h3>
          </div>
          {/* <!-- End Section Title --> */}

          <div
            className="container isotope-layout"
            data-default-filter="*"
            data-layout="masonry"
            data-sort="original-order"
          >
            <div className="row" data-aos="fade-up" data-aos-delay="100">
              <div className="col-lg-12 d-flex justify-content-center">
                <ul className="menu-filters isotope-filters">
                  <li
                    onClick={handleFilterKeyChange("*")}
                    data-filter="*"
                    className="filter-link"
                  >
                    All
                  </li>
                  <li
                    onClick={handleFilterKeyChange("filter-coffee")}
                    data-filter="filter-coffee"
                    className="filter-link"
                  >
                    Coffee
                  </li>
                  <li
                    onClick={handleFilterKeyChange("filter-brewing")}
                    data-filter="filter-brewing"
                    className="filter-link"
                  >
                    Brewing Gear
                  </li>
                  <li
                    onClick={handleFilterKeyChange("filter-accessories")}
                    data-filter="filter-accessories"
                    className="filter-link"
                  >
                    Accessories
                  </li>
                  <li
                    onClick={handleFilterKeyChange("filter-tea")}
                    data-filter="filter-tea"
                    className="filter-link"
                  >
                    Tea
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- Menu Filters --> */}

            <div
              className="row isotope-container filter-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {prods.map((prod) => {
                var catVal = "*";
                if (prod.prodCat != "Select Category") {
                  catVal = prod.prodCat.toLowerCase();
                } else if (prod.prodCat == "Brewing Grear") {
                  catVal = "brewing";
                }
                var imgVal = defaultImg;
                prodImgs.map((prodImg) => {
                  if (prodImg.prodImgProdID == prod._id) {
                    imgVal = prodImg.prodImgUrl;
                    return imgVal;
                  }
                });
                return (
                  <div
                    className={`col-lg-6 menu-item isotope-item filter-item filter-${catVal}`}
                    key={prod._id}
                  >
                    <img src={imgVal} className="menu-img" alt="" />
                    <div className="menu-content">
                      <a href="#">{prod.prodName}</a>
                      <span>₱{prod.prodPrice}</span>
                    </div>
                    <div className="menu-ingredients">
                      <p>{prod.prodDesc}</p>
                    </div>
                  </div>
                  /* <!-- Menu Item --> */
                );
              })}
            </div>
            {/* <!-- Menu Container --> */}
          </div>
        </section>
        {/* <!-- /product/menu Section --> */}

        {/* <!-- Brands Section --> */}
        <section id="brands" className="brands chefs section">
          {/* <!-- Section Title --> */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Brands</h2>
            <div>
              <span>Our </span>
              <span className="description-title">Brands</span>
            </div>
          </div>
          {/* <!-- End Section Title --> */}

          <div className="container">
            <div className="row gy-5">
              {brands.map((brand) => {
                return (
                  <div
                    className="col-lg-4 col-md-6"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <div className="brand">
                      <div className="brand-info">
                        <h4>{brand.brandName}</h4>
                      </div>
                    </div>
                  </div>
                  /* <!-- End Brand --> */
                );
              })}
            </div>
          </div>
        </section>
        {/* <!-- /Brands Section --> */}

        {/* <!-- Recipes Section --> */}
        <section id="recipes" className="recipes section">
          {/* <!-- Section Title --> */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Recipes</h2>
            <div>
              <span>Check Our </span>
              <span className="description-title">Recipes</span>
            </div>
          </div>
          {/* <!-- End Section Title --> */}

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <Tab.Container id="left-tabs-example" defaultActiveKey="coffee">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="coffee">Coffee Recipe</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="non-coffee">
                        Non-Coffee Recipe
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="kashi-pastry">
                        Kashi Pastry Recipe
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="coffee">
                      <div className="row">
                        <div className="col-lg-8 details order-2 order-lg-1">
                          <h3>Coffee Based Recipe</h3>
                          <p className="fst-italic">
                            Home brewed coffee can just be as delicious as the
                            ones you buy at the cafe. With some simple brew
                            gears and the right recipe, you can recipe, you can
                            recreate your Kurasu cafe experience at home.
                          </p>
                        </div>
                        <div className="col-lg-4 text-center order-1 order-lg-2"></div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="non-coffee">
                      <div className="row">
                        <div className="col-lg-8 details order-2 order-lg-1">
                          <h3>Non-Coffee Based Recipe</h3>
                          <p className="fst-italic">
                            At Kurasu we also serve delicious non-coffee
                            beverages. We are happy to share some of the recipes
                            so you can recreate them at home.
                          </p>
                        </div>
                        <div className="col-lg-4 text-center order-1 order-lg-2"></div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="kashi-pastry">
                      <div className="row">
                        <div className="col-lg-8 details order-2 order-lg-1">
                          <h3>Kashi Pastry Recipe</h3>
                          <p className="fst-italic">
                            Missing some cafe treats that you enjoyed while you
                            were in Kyoto? Recreate some of them at home with
                            these recipes.
                          </p>
                        </div>
                        <div className="col-lg-4 text-center order-1 order-lg-2"></div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </section>
        {/* <!-- /Recipes Section --> */}

        {/* <!-- Contact Section --> */}
        <section id="contact" className="contact section">
          {/* <!-- Section Title --> */}
          <div className="container section-title" data-aos="fade-up">
            <h2>Contact</h2>
            <div>
              <span>Check Our </span>
              <span className="description-title">Contact</span>
            </div>
          </div>
          {/* <!-- End Section Title --> */}

          <div className="container" data-aos="fade">
            <div className="row gy-5 gx-lg-5">
              <div className="col-lg-4">
                <div className="info">
                  <h3>Get in touch</h3>
                  <p>
                    Et id eius voluptates atque nihil voluptatem enim in tempore
                    minima sit ad mollitia commodi minus.
                  </p>

                  <div className="info-item d-flex">
                    <i className="bi bi-geo-alt flex-shrink-0"></i>
                    <div>
                      <h4>Location:</h4>
                      <p>A108 Adam Street, New York, NY 535022</p>
                    </div>
                  </div>
                  {/* <!-- End Info Item --> */}

                  <div className="info-item d-flex">
                    <i className="bi bi-envelope flex-shrink-0"></i>
                    <div>
                      <h4>Email:</h4>
                      <p>info@example.com</p>
                    </div>
                  </div>
                  {/* <!-- End Info Item --> */}

                  <div className="info-item d-flex">
                    <i className="bi bi-phone flex-shrink-0"></i>
                    <div>
                      <h4>Call:</h4>
                      <p>+1 5589 55488 55</p>
                    </div>
                  </div>
                  {/* <!-- End Info Item --> */}
                </div>
              </div>

              <div className="col-lg-8">
                <form
                  action="forms/contact.php"
                  method="post"
                  role="form"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        required=""
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your Email"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Subject"
                      required=""
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      placeholder="Message"
                      required=""
                    ></textarea>
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="contact-submit">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
              {/* <!-- End Contact Form --> */}
            </div>
          </div>
        </section>
        {/* <!-- /Contact Section --> */}
      </main>

      <Footer />
    </Wrapper>
  );
};
export default Landing;
