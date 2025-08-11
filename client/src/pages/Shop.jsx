import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Shop";
import { useHomepageLayoutContext } from "../pages/HomepageLayout";
import logo from "../assets/images/logo/kape-kalakal-logo.jpg";

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 15;
    const sortBy = url.searchParams.get("sortBy") || "prodName";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";
    const category = url.searchParams.get("category") || "";
    const search = url.searchParams.get("search") || "";

    const queryParams = new URLSearchParams({
      page,
      limit,
      sortBy,
      sortOrder,
    });
    if (category) {
      queryParams.append("category", category);
    }

    if (search) {
      queryParams.append("search", search);
    }

    const { data } = await customFetch.get(
      `/dashboard/shop?${queryParams.toString()}`
    );

    return data;
  } catch (error) {
    console.error(error);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
};

const Shop = () => {
  const { products, currentPage, totalPages } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useHomepageLayoutContext().userData;

  const searchParams = new URLSearchParams(location.search);
  // const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "prodName";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const category = searchParams.get("category") || "";

  const params = new URLSearchParams(location.search);
  const initialSearch = params.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  const updateQueryParams = (newParams) => {
    const searchParams = new URLSearchParams(location.search);
    // Track if search or filters change (anything except 'page')
    let filtersChanged = false;

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        // Check if this param value differs from current
        const currentValue = searchParams.get(key);
        if (currentValue !== value && key !== "page") {
          filtersChanged = true;
        }
        searchParams.set(key, value);
      } else {
        if (key !== "page" && searchParams.has(key)) {
          filtersChanged = true;
        }
        searchParams.delete(key);
      }
    });

    // If filters changed and no explicit page param provided, reset page to 1
    if (filtersChanged && !newParams.hasOwnProperty("page")) {
      searchParams.set("page", 1);
    }

    const newSearchString = searchParams.toString();
    const currentSearchString = location.search.replace(/^\?/, "");

    // Only navigate if URL actually changes to prevent infinite reloads
    if (newSearchString !== currentSearchString) {
      navigate(`${location.pathname}?${newSearchString}`, { replace: true });
    }
  };

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      updateQueryParams({ search: debouncedSearch });
    }, 500);

    return () => clearTimeout(handler);
  }, [debouncedSearch]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      updateQueryParams({ page });
    }
  };

  // function addToTmpCart(id, val) {
  const addToTmpCart = async (id, val) => {
    const data = val;
    data.userID = id;
    data.prodID = data._id;
    delete data._id;
    data.prodQty = 1;
    if (data.prodImg) {
      const prodImg = data.prodImg;
      data.prodImgUrl = prodImg.prodImgUrl;
    } else {
      data.prodImgUrl = { logo }.logo;
    }

    // console.log(data);
    try {
      await customFetch.post("/dashboard/shop", data);
      toast.success("Product Added to Cart");
      setTimeout(function () {
        window.location.reload();
      }, 3000);
      // return redirect("/login");
    } catch (error) {
      toast.error(error?.response?.data?.msg);

      return error;
    }
  };

  return (
    <Wrapper>
      <section id="shop" className="shop section shop-section">
        <div className="section-title">
          <h1>Welcome to our Shop</h1>
        </div>

        <div className="filters-container">
          {/* Input Search */}
          <input
            type="text"
            value={search}
            onInput={(e) => setSearch(e.target.value)}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            placeholder="Search products..."
            className="form-control"
          />

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) =>
              updateQueryParams({ category: e.target.value || null })
            }
            className="form-control"
          >
            <option value="">All Categories</option>
            <option value="Coffee">Coffee</option>
            <option value="Brewing Gear">Brewing Gear</option>
            <option value="Tea">Tea</option>
            <option value="Accessories">Accessories</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => updateQueryParams({ sortBy: e.target.value })}
            className="form-control"
          >
            <option value="prodName">Sort by Name</option>
            <option value="prodPrice">Sort by Price</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => updateQueryParams({ sortOrder: e.target.value })}
            className="form-control"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <div className="container">
          <div className="shop-container">
            {products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              products.map((prod) => {
                const imgUrl = prod.prodImg?.prodImgUrl || logo;
                return (
                  <div className="shop-prod-card" key={prod._id}>
                    <div className="shop-prod-card-inner">
                      <div className="shop-prod-img">
                        <Link to={`product/${prod._id}`}>
                          <img src={imgUrl} alt={prod.prodName} />
                        </Link>
                        {/* BADGES positioned absolutely over image */}
                        {(prod.prodIsBest || prod.prodIsFotm) && (
                          <div className="shop-prod-badge-container">
                            {prod.prodIsBest && (
                              <span className="badge best-seller">
                                🔥 Best Seller
                              </span>
                            )}
                            {prod.prodIsFotm && (
                              <span className="badge flavor">
                                🧊 Flavor of the Month
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="shop-prod-info">
                        <div className="shop-prod-name">
                          <Link to={`product/${prod._id}`}>
                            <span>{prod.prodName}</span>
                          </Link>
                        </div>
                        <div className="shop-prod-cat">
                          <span>{prod.prodCat}</span>
                        </div>
                        <div className="shop-prod-info-align">
                          <div className="shop-prod-price">
                            <span>₱{Number(prod.prodPrice).toFixed(2)}</span>
                          </div>
                          <div className="shop-prod-add-to-cart">
                            <button
                              type="button"
                              className="btn main-btn add-to-cart-btn"
                              onClick={addToTmpCart.bind(
                                null,
                                userData._id,
                                prod
                              )}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="pagination-controls">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn page-btn"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn page-btn"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};
export default Shop;
