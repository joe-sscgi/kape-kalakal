import Wrapper from "../../../../assets/wrappers/MainProducts";
import customFetch from "../../../../utils/customFetch";
import { PROD_CAT } from "../../../../../../utils/contants";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components/";

// ICONS
import { FiPlusCircle } from "react-icons/fi";
import { TbEditCircle } from "react-icons/tb";
import { MdRemoveCircleOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FiArrowLeftCircle } from "react-icons/fi";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import {
  redirect,
  Form,
  Link,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;
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
      `/admin/main-products?${queryParams.toString()}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
};

const MainProds = () => {
  // const prods = useLoaderData();
  // console.log(useLoaderData());

  const [showM, setShowM] = useState(false);
  const [modalData, setModalData] = useState("");

  const closeModal = () => setShowM(false);

  const viewDetails = (dets) => {
    setModalData(dets);
    modalShow();
  };

  const modalShow = () => setShowM(true);

  const { products, currentPage, totalPages } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <Wrapper>
      <section id="main-prod" className="main-prod section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Products</h1>
        </div>
        {/* <!-- End Section Title --> */}
        <div className="container-table">
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

          <Table striped>
            <thead>
              <tr>
                <th>
                  <Link to={"/admin/add-product"}>
                    <Button
                      type="button"
                      className="btn search-prod-btn main-btn"
                      variant="success"
                    >
                      <FiPlusCircle /> <span>ADD</span>
                    </Button>
                  </Link>
                </th>
                <th>Name</th>
                {/* <th>Description</th> */}
                <th>Category</th>
                <th>Price</th>
                <th>Qty</th>
                <th className="text-center">FotM</th>
                <th className="text-center">Best</th>
                {/* <th>Brand</th> */}
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => {
                var oos = "";
                var inventoryDangerzone = "";
                if (prod.prodQty == 0) {
                  inventoryDangerzone = "inventory-red-zone ";
                  oos = "Out of Stock";
                } else if (prod.prodQty <= 10) {
                  inventoryDangerzone = "inventory-yellow-zone ";
                }
                return (
                  <tr key={prod._id} className="prod-row">
                    <td className="prod-col">
                      <Link to={`/admin/edit-product/${prod._id}`}>
                        <Button
                          type="button"
                          className="btn edit-prod-btn main-btn"
                          variant="primary"
                        >
                          <TbEditCircle /> <span>EDIT</span>
                        </Button>
                      </Link>
                      <Link to={`/admin/del-product/${prod._id}`}>
                        <Button
                          type="button"
                          className="btn del-prod-btn main-btn"
                          variant="danger"
                        >
                          <MdRemoveCircleOutline /> <span>DELETE</span>
                        </Button>
                      </Link>
                    </td>
                    <td className="prod-col">
                      {oos ? <sub>{"[" + oos + "]"}</sub> : ""}
                      {prod.prodName}
                    </td>
                    {/* <td>
                    <Button
                      type="button"
                      variant="primary"
                      className="btn main-btn main-recipe-view"
                      onClick={viewDetails.bind(null, prod.prodDesc)}
                    >
                      <HiOutlineMagnifyingGlassCircle />
                      <span>View</span>
                    </Button>
                  </td> */}
                    <td className="prod-col">{prod.prodCat}</td>
                    <td className="prod-col prod-price">
                      ₱{Number(prod.prodPrice).toFixed(2)}
                    </td>
                    <td className={inventoryDangerzone + "prod-col prod-qty"}>
                      <Link to={`/admin/replenish-product/${prod._id}`}>
                        <span>{prod.prodQty}</span>
                      </Link>
                    </td>
                    <td className="prod-col prod_fotm">
                      {prod.prodIsFotm ? (
                        <FaRegCheckCircle />
                      ) : (
                        <MdCheckBoxOutlineBlank />
                      )}
                    </td>
                    <td className="prod-col prod_best">
                      {prod.prodIsBest ? (
                        <FaRegCheckCircle />
                      ) : (
                        <MdCheckBoxOutlineBlank />
                      )}
                    </td>
                    {/* <td>{prod.prodBrandID}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </Table>
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
        <div className="container prod-notes">
          <p>
            <span className="abbrv-notes">
              <strong>FotM</strong>
            </span>
            <span> - Flavor of the Month</span>
          </p>
          <p>
            <span className="abbrv-notes">
              <strong>Best</strong>
            </span>
            <span> - Best Seller</span>
          </p>
          <p>
            To{" "}
            <span className="abbrv-notes">
              <strong>REPLENISH</strong>
            </span>{" "}
            inventory stock, click Product Quantity
          </p>
          <Link to={"/admin/maintenance"} className="btn-back">
            <FiArrowLeftCircle /> Back
          </Link>
        </div>
      </section>

      <Modal
        show={showM}
        onHide={closeModal}
        backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre style={{ whiteSpace: "pre-wrap" }}>{modalData}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Wrapper>
  );
};
export default MainProds;
