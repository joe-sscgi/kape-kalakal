import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiArrowLeftCircle } from "react-icons/fi";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Product";
import { useHomepageLayoutContext } from "../pages/HomepageLayout";
import logo from "../assets/images/logo/kape-kalakal-logo.jpg";

export const loader = async ({ params }) => {
  try {
    const data = await customFetch.get(`/dashboard/shop/product/${params.id}`);

    return data;
  } catch (error) {
    console.error(error);
    // toast.error(error?.response?.data?.msg);
    // return redirect("/admin/main-products");
  }
};

const Product = () => {
  const { product } = useLoaderData().data;
  const userData = useHomepageLayoutContext().userData;
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const [selectedImg, setSelectedImg] = useState(
    product.images.length > 0 ? product.images[0].prodImgUrl : logo
  );

  const [prodQty, setProdQty] = useState(1);

  const increaseQty = () => setProdQty((prev) => prev + 1);

  const decreaseQty = () => {
    if (prodQty > 1) {
      setProdQty((prev) => prev - 1);
    }
  };

  const addToTmpCart = async (id, val) => {
    if (isLoading) return; // prevent spamming
    setIsLoading(true);

    const prodData = { ...val }; // clone to avoid direct mutation
    prodData.userID = id;
    prodData.prodID = prodData._id;
    delete prodData._id;
    prodData.prodQty = prodQty;

    prodData.prodImgUrl = prodData?.prodImg?.prodImgUrl || logo;

    try {
      await customFetch.post("/dashboard/shop", prodData);
      toast.success("Product Added to Cart");

      setTimeout(() => {
        window.location.reload(); // force full refresh after delay
      }, 1500);
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Failed to add to cart");
      setIsLoading(false); // only reset loading on error
    }
  };

  return (
    <Wrapper>
      <section id="product" className="product section product-section">
        <div className="container">
          <div className="product-container">
            <div className="product-card">
              <div className="product-card-inner">
                <div className="product-img">
                  <div className="product-img-gallery-card">
                    {product.images.length === 0 ? (
                      <p>No product gallery.</p>
                    ) : (
                      product.images.map((img) => {
                        const imgUrl = img.prodImgUrl;
                        return (
                          <div
                            className="product-img-gallery"
                            key={imgUrl}
                            onClick={() => setSelectedImg(imgUrl)}
                            style={{ cursor: "pointer" }}
                          >
                            <img src={imgUrl} alt={product.prodName} />
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="product-img-main">
                    <div className="product-badges">
                      {product.prodIsBest && (
                        <span className="badge best">🔥 Best Seller</span>
                      )}
                      {product.prodIsFotm && (
                        <span className="badge fotm">
                          🌟 Flavor of the Month
                        </span>
                      )}
                    </div>
                    <img src={selectedImg} alt={product.prodName} />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-details-card">
              <div className="product-details-card-inner">
                <div className="product-name">
                  <h1>{product.prodName}</h1>
                </div>
                <div className="product-info">
                  <div className="product-cat">
                    <span>{product.prodCat}</span>
                  </div>
                  <div className="product-desc">
                    <span>{product.prodDesc}</span>
                  </div>
                  <div className="product-price">
                    <span>₱{Number(product.prodPrice).toFixed(2)}</span>
                  </div>
                  <div className="product-stock">
                    <span>
                      {prodQty.prodQty <= 10
                        ? "Only" + product.prodQty + " stock(s) left"
                        : ""}
                    </span>
                  </div>
                  <div className="product-action-align">
                    <div className="product-qty">
                      <button
                        type="button"
                        className="btn product-btn product-qty-btn product-dec-qty-btn"
                        onClick={decreaseQty}
                        disabled={prodQty === 1 || isLoading}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        value={prodQty}
                        id="prodQty"
                        className="form-control"
                        readOnly
                      />

                      <button
                        type="button"
                        className="btn product-btn product-qty-btn product-inc-qty-btn"
                        onClick={increaseQty}
                        disabled={isLoading}
                      >
                        +
                      </button>
                    </div>
                    <div className="product-add-to-cart">
                      <button
                        type="button"
                        className="btn main-btn product-btn add-to-cart-btn"
                        onClick={addToTmpCart.bind(null, userData._id, product)}
                        disabled={isLoading}
                      >
                        {isLoading ? "Adding..." : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="back-btn">
            <Link to={"/dashboard/shop"}>
              <span>
                <FiArrowLeftCircle /> Back to Shop
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Product;
