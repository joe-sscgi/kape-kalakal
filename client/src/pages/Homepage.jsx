import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "font-awesome/css/font-awesome.min.css";

import Wrapper from "../assets/wrappers/Homepage";
import { useHomepageLayoutContext } from "../pages/HomepageLayout";

import logo from "../assets/images/logo/kape-kalakal-logo.jpg";

import defaultImg from "../assets/images/default-img.jpg";

const Homepage = () => {
  const HomepageData = useHomepageLayoutContext().HomepageData;
  const bestProductsData = HomepageData.bestProductsData;
  const fotmProductData = HomepageData.fotmProductData;
  // console.log(bestProductsData);
  // const { featBrandsData } = useLoaderData().featBrandsData;
  // const { prodImgs } = useLoaderData().prodImgs;
  // const { recipes } = useLoaderData().recipes;

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-out-quad", // Animation easing
      once: true, // Whether animation should happen only once
      // more settings available in the documentation
    });
  }, []);

  return (
    <Wrapper>
      <div className="homepage">
        {/* FOTM SECTION */}
        <section id="fotm" className="fotm section fotm-section">
          <div className="container fotm-section-container">
            {/* <!-- Section Title --> */}
            <div className="section-title" data-aos="fade-up">
              <div>
                <h1>
                  <span>Flavor of the </span>
                  <span className="description-title">Month</span>
                </h1>
              </div>
            </div>
            {/* <!-- End Section Title --> */}

            <div className="fotm-container row">
              <div className="fotm-img-container col-sm-6">
                <img
                  src={
                    fotmProductData.prodImg
                      ? fotmProductData.prodImg
                      : defaultImg
                  }
                  alt="Flavor of the Month"
                />
              </div>
              <div className="fotm-desc-container col-sm-6">
                <h2>{fotmProductData.prodName}</h2>
                <p>{fotmProductData.prodDesc}</p>
                <Link to={"/dashboard/shop"}>
                  <button type="button" className="btn main-btn shop-btn">
                    Shop Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* END FOTM SECTION */}

        {/* BEST SELLERS SECTION */}
        <section id="best" className="best section best-section">
          <div className="container">
            {/* <!-- Section Title --> */}
            <div className="section-title" data-aos="fade-up">
              <div>
                <h1>
                  <span>Best </span>
                  <span className="description-title">Sellers</span>
                </h1>
              </div>
            </div>
            {/* <!-- End Section Title --> */}

            <div className="best-container">
              {bestProductsData.map((prod) => {
                var img = prod.prodImg;
                var imgUrl = defaultImg;
                if (img) {
                  imgUrl = img.prodImgUrl;
                } else {
                }
                return (
                  <div className="best-container-item" key={prod._id}>
                    <div className="best-img-container">
                      <img src={imgUrl} alt="Best Seller" />
                    </div>
                    <div className="best-desc-container">
                      <h2>{prod.prodName}</h2>
                      <p>{prod.prodDesc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="best-btn-container">
              <Link to={"/dashboard/shop"}>
                <button type="button" className="btn main-btn shop-btn">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </section>
        {/* END BEST SELLERS SECTION */}

        {/* RECIPE SECTION */}
        <section id="recipes" className="recipes section recipes-section">
          {/* <!-- Section Title --> */}
          <div className="section-title" data-aos="fade-up">
            <div>
              <h1>
                <span>Our </span>
                <span className="description-title">Recipes</span>
              </h1>
            </div>
          </div>
          {/* <!-- End Section Title --> */}

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="recipes-container">
              <div className="recipe-box-container">
                <div className="recipe-box">
                  <div className="recipe-box-header">
                    <h2>Coffee Based Recipe</h2>
                  </div>
                  <div className="recipe-box-detail">
                    <p>
                      Home brewed coffee can just be as delicious as the ones
                      you buy at the cafe. With some simple brew gears and the
                      right recipe, you can recipe, you can recreate your Kurasu
                      cafe experience at home.
                    </p>
                  </div>
                  <div className="recipe-box-btn">
                    <Link to={"/dashboard/recipes/recipe-container/coffee"}>
                      <button type="button" className="btn main-btn recipe-btn">
                        View Recipe
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="recipe-box">
                  <div className="recipe-box-header">
                    <h2>Non-Coffee Based Recipe</h2>
                  </div>
                  <div className="recipe-box-detail">
                    <p>
                      At Kurasu we also serve delicious non-coffee beverages. We
                      are happy to share some of the recipes so you can recreate
                      them at home.
                    </p>
                  </div>
                  <div className="recipe-box-btn">
                    <Link to={"/dashboard/recipes/recipe-container/non-coffee"}>
                      <button type="button" className="btn main-btn recipe-btn">
                        View Recipe
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="recipe-box">
                  <div className="recipe-box-header">
                    <h2>Kashi Pastry Recipe</h2>
                  </div>
                  <div className="recipe-box-detail">
                    <p>
                      Missing some cafe treats that you enjoyed while you were
                      in Kyoto? Recreate some of them at home with these
                      recipes.
                    </p>
                  </div>
                  <div className="recipe-box-btn">
                    <Link to={"/dashboard/recipes/recipe-container/pastry"}>
                      <button type="button" className="btn main-btn recipe-btn">
                        View Recipe
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* END RECIPE SECTION */}
      </div>
    </Wrapper>
  );
};
export default Homepage;
