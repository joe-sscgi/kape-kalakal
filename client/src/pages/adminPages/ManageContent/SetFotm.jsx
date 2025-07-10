import Wrapper from "../../../assets/wrappers/SetContent";
import customFetch from "../../../utils/customFetch";
import { PROD_CAT } from "../../../../../utils/contants";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../components";
import { Logo } from "../../../components";

// ICONS
import { FaRegCheckCircle } from "react-icons/fa";
import { FiArrowLeftCircle } from "react-icons/fi";

import { toast } from "react-toastify";

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
    const search = url.searchParams.get("search") || "";

    const queryParams = new URLSearchParams({
      page,
      limit,
      sortBy,
      sortOrder,
    });

    if (search) {
      queryParams.append("search", search);
    }

    const { data } = await customFetch.get(
      `/admin/set-content/fotm/?${queryParams.toString()}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return { products: [], currentPage: 1, totalPages: 1 };
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/admin/set-content/fotm/${data.manageID}`, data);

    toast.success("Product edited successfully");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const SetFotm = () => {
  const { products, currentPage, totalPages } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  // const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "prodName";
  const sortOrder = searchParams.get("sortOrder") || "asc";

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

  const [showM, setShowM] = useState(false);
  const [modalData, setModalData] = useState("");

  const closeModal = () => setShowM(false);

  const viewDetails = (type, val, act, feat) => {
    // console.log(type, val, act);
    var title = type + " - " + act + " as " + feat;
    var id = "";
    var name = "";
    var feature = "";

    if (type == "Product") {
      id = val._id;
      name = val.prodName;
    } else {
      id = val._id;
      name = val.brandName;
    }

    if (feat == "Flavor of the Month") {
      feature = "fotm";
    } else if (feat == "Best Seller") {
      feature = "best";
    } else if (feat == "Featured") {
      feature = "feat";
    }

    var data = [];
    data.type = type;
    data.title = title;
    data.act = act;
    data.feat = feature;
    data.id = id;
    data.name = name;
    data.data = val;

    setModalData(data);
    console.log(modalData);
    modalShow();
  };

  const modalShow = () => setShowM(true);

  return (
    <Wrapper>
      <section id="set-content" className="set-content section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Products - Set Flavor of the Month</h1>
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
                <th>ACTION</th>
                <th>Name</th>
                <th>Image</th>
                <th>Category</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => {
                var prodImg = "";
                if (prod.prodImg) {
                  prodImg = prod.prodImg.prodImgUrl;
                }
                return (
                  <tr key={prod._id} className="prod-row">
                    <td className="prod-col">
                      <Button
                        type="button"
                        className="btn edit-prod-btn main-btn"
                        variant="primary"
                        onClick={viewDetails.bind(
                          null,
                          "Product",
                          prod,
                          "Set",
                          "Flavor of the Month"
                        )}
                      >
                        <FaRegCheckCircle /> <span>SET</span>
                      </Button>
                    </td>
                    <td className="prod-col">{prod.prodName}</td>
                    <td className="prod-col">
                      {prodImg ? <img src={prodImg} alt="" /> : <Logo />}
                    </td>
                    <td className="prod-col">{prod.prodCat}</td>
                    <td className="prod-col prod-price">
                      ₱{Number(prod.prodPrice).toFixed(2)}
                    </td>
                    <td className="prod-col prod-qty">{prod.prodQty}</td>
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

          <div className="container prod-notes">
            <Link to={"/admin/set-content"} className="btn-back">
              <FiArrowLeftCircle /> Back
            </Link>
          </div>
        </div>
      </section>

      <Modal show={showM} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Form method="post" className="manage-content-form">
          <Modal.Body>
            <h2 className="modal-title-header">{modalData.name}</h2>
            <input
              type="text"
              name="manageType"
              id="manageType"
              value={modalData.type}
              readOnly
              className="hidden"
            />
            <input
              type="text"
              name="manageID"
              id="manageID"
              value={modalData.id}
              className="hidden"
              readOnly
            />
            <input
              type="text"
              name="manageAction"
              id="manageAction"
              value={modalData.act}
              className="hidden"
              readOnly
            />
            <input
              type="text"
              name="manageFeat"
              id="manageFeat"
              value={modalData.feat}
              className="hidden"
              readOnly
            />
          </Modal.Body>
          <Modal.Footer>
            <SubmitBtn
              className="btn modal-btn manage-content-submit"
              buttonText={modalData.act}
            />
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Wrapper>
  );
};
export default SetFotm;
