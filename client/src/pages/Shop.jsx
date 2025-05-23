import {
  Link,
  useLoaderData,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/Shop";
import logo from "../assets/images/logo/kape-kalakal-logo.jpg";

// export const loader = async () => {
//   try {
//     const { data } = await customFetch.get("/dashboard/shop");
//     return data;
//   } catch (error) {
//     // return redirect("/admin");
//     console.log(error);
//   }
// };

// const Shop = () => {
//   const prodData = useLoaderData().productsData;
//   //   console.log(prodData);

//   const [products, setProducts] = useState([]);
//   const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });
//   const [loading, setLoading] = useState(false);

//   return (
//     <Wrapper>
//       <section id="shop" className="shop section shop-section">
//         {/* <!-- Section Title --> */}
//         <div className="section-title">
//           <div>
//             <h1>Welcome to our Shop</h1>
//           </div>
//         </div>
//         {/* <!-- End Section Title --> */}
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="container">
//             <div className="shop-container">
//               {prodData.map((prod) => {
//                 var img = "";
//                 var imgUrl = "";
//                 if (prod.prodImg) {
//                   img = prod.prodImg;
//                   imgUrl = img.prodImgUrl;
//                 }
//                 return (
//                   <div className="shop-prod-card">
//                     <div className="shop-prod-card-inner">
//                       <div className="shop-prod-img">
//                         {imgUrl ? <img src={imgUrl} /> : <img src={logo} />}
//                       </div>
//                       <div className="shop-prod-info">
//                         <div className="shop-prod-name">
//                           <span>{prod.prodName}</span>
//                         </div>
//                         <div className="shop-prod-info-align">
//                           <div className="shop-prod-price">
//                             <span>₱{Number(prod.prodPrice).toFixed(2)}</span>
//                           </div>
//                           <div className="shop-prod-add-to-cart">
//                             <button
//                               type="button"
//                               className="btn main-btn add-to-cart-btn"
//                             >
//                               Add to Cart
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </section>
//     </Wrapper>
//   );
// };

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 6;
    const sortBy = url.searchParams.get("sortBy") || "prodName";
    const sortOrder = url.searchParams.get("sortOrder") || "asc";
    const category = url.searchParams.get("category") || "";

    const queryParams = new URLSearchParams({
      page,
      limit,
      sortBy,
      sortOrder,
    });
    if (category) {
      queryParams.append("category", category);
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

  const updateQueryParams = (newParams) => {
    const searchParams = new URLSearchParams(location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    if (!newParams.page) {
      searchParams.set("page", 1);
    }
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      updateQueryParams({ page });
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get("sortBy") || "prodName";
  const sortOrder = searchParams.get("sortOrder") || "asc";
  const category = searchParams.get("category") || "";

  return (
    <Wrapper>
      <section id="shop" className="shop section shop-section">
        <div className="section-title">
          <h1>Welcome to our Shop</h1>
        </div>

        <div
          className="filters-container"
          style={{
            marginBottom: "1rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) =>
              updateQueryParams({ category: e.target.value || null })
            }
          >
            <option value="">All Categories</option>
            <option value="Coffee">Coffee</option>
            <option value="Brewing gear">Brewing Gear</option>
            <option value="Tea">Tea</option>
            <option value="ccessories">Accessories</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => updateQueryParams({ sortBy: e.target.value })}
          >
            <option value="prodName">Sort by Name</option>
            <option value="prodPrice">Sort by Price</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => updateQueryParams({ sortOrder: e.target.value })}
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
                        <img src={imgUrl} alt={prod.prodName} />
                      </div>
                      <div className="shop-prod-info">
                        <div className="shop-prod-name">
                          <span>{prod.prodName}</span>
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

          <div
            className="pagination-controls"
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn"
            >
              Prev
            </button>
            <span style={{ margin: "0 1rem" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn"
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
