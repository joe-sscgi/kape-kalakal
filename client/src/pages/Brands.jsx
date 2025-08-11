import {
  Link,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Brands";
import logo from "../assets/images/logo/kape-kalakal-logo.jpg";

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 15;
    const sortBy = url.searchParams.get("sortBy") || "brandName";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";
    const category = url.searchParams.get("category") || "";
    const search = url.searchParams.get("search") || "";

    const queryParams = new URLSearchParams({
      page,
      limit,
      sortBy,
      sortOrder,
    });

    if (category) queryParams.append("category", category);
    if (search) queryParams.append("search", search);

    const brandsRes = await customFetch.get(`/dashboard/brands?${queryParams}`);
    const categoriesRes = await customFetch.get("/dashboard/brands/categories");
    return {
      ...brandsRes.data,
      categories: categoriesRes.data.categories || [],
    };
  } catch (error) {
    console.error(error);
    return {
      brands: [],
      currentPage: 1,
      totalPages: 1,
      categories: [],
    };
  }
};

const Brands = () => {
  const { brands, currentPage, totalPages, categories } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const initialSearch = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "brandName";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const category = searchParams.get("category") || "";

  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);

  const updateQueryParams = (newParams) => {
    const searchParams = new URLSearchParams(location.search);
    let filtersChanged = false;

    Object.entries(newParams).forEach(([key, value]) => {
      const currentValue = searchParams.get(key);
      if (value) {
        if (currentValue !== value && key !== "page") filtersChanged = true;
        searchParams.set(key, value);
      } else {
        if (key !== "page" && searchParams.has(key)) filtersChanged = true;
        searchParams.delete(key);
      }
    });

    if (filtersChanged && !newParams.hasOwnProperty("page")) {
      searchParams.set("page", 1);
    }

    const newSearchString = searchParams.toString();
    const currentSearchString = location.search.replace(/^\?/, "");

    if (newSearchString !== currentSearchString) {
      navigate(`${location.pathname}?${newSearchString}`, { replace: true });
    }
  };

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

  return (
    <Wrapper>
      <section id="brand" className="brand-section section">
        <div className="section-title">
          <h1>Our Brands</h1>
        </div>

        <div className="filters-container">
          <input
            type="text"
            value={search}
            onInput={(e) => setSearch(e.target.value)}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            placeholder="Search brands..."
            className="form-control"
          />

          <select
            value={category}
            onChange={(e) =>
              updateQueryParams({ category: e.target.value || null })
            }
            className="form-control"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => updateQueryParams({ sortBy: e.target.value })}
            className="form-control"
          >
            <option value="brandName">Sort by Name</option>
            <option value="brandCat">Sort by Category</option>
          </select>

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
          <div className="brand-container">
            {brands.length === 0 ? (
              <p>No brands found.</p>
            ) : (
              brands.map((brand) => {
                const imgUrl = brand.brandImgUrl || logo;
                return (
                  <div className="brand-card" key={brand._id}>
                    <div className="brand-card-inner">
                      <div className="brand-img">
                        <img src={imgUrl} alt={brand.brandName} />
                      </div>
                      <div className="brand-info">
                        <div className="brand-name">
                          <span>{brand.brandName}</span>
                        </div>
                        <div className="brand-cat">
                          <span>{brand.brandCat}</span>
                        </div>
                        {brand.brandIsFeatured && (
                          <div className="brand-featured">
                            <span className="badge">🌟 Featured</span>
                          </div>
                        )}
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

export default Brands;
