import {
  Link,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import React from "react";
import { FiArrowLeftCircle } from "react-icons/fi";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Brand";
import { useHomepageLayoutContext } from "../pages/HomepageLayout";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/dashboard/brands/brand/${params.id}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

const Brand = () => {
  const brand = useLoaderData().brandData;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Wrapper>
      <section id="brand" className="brand section brand-section">
        <div className="container">
          <div className="brand-container">
            <div className="brand-details-card">
              <div className="brand-details-card-inner">
                <div className="brand-name">
                  <h1>{brand.brandName}</h1>
                </div>
                <div className="brand-info">
                  <div className="brand-cat">
                    <span>{brand.brandCat}</span>
                  </div>
                  <div className="brand-desc">
                    <span>
                      {brand.brandDesc || "No description available."}
                    </span>
                  </div>
                  {brand.brandIsFeatured && (
                    <div className="brand-featured">
                      <span className="badge">🌟 Featured</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="back-btn">
            <Link to={"/dashboard/brands"}>
              <span>
                <FiArrowLeftCircle /> Back to Brands
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Brand;
