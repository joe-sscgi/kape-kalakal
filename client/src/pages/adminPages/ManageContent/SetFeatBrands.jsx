import Wrapper from "../../../assets/wrappers/SetContent";
import customFetch from "../../../utils/customFetch";
import { SubmitBtn } from "../../../components";
import { BRAND_CAT } from "../../../../../utils/contants";

// ICONS
import { FaRegCheckCircle } from "react-icons/fa";
import { FiArrowLeftCircle } from "react-icons/fi";

import { toast } from "react-toastify";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  redirect,
  Link,
  Form,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;
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
    if (category) {
      queryParams.append("category", category);
    }

    if (search) {
      queryParams.append("search", search);
    }

    const { data } = await customFetch.get(
      `/admin/set-content/featured-brands/?${queryParams.toString()}`
    );

    return data;
  } catch (error) {
    console.error(error);
    return { brands: [], currentPage: 1, totalPages: 1 };
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(
      `/admin/set-content/featured-brands/${data.manageID}`,
      data
    );

    toast.success("Product edited successfully");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const SetFeat = () => {
  const { brands, currentPage, totalPages, countFeature } = useLoaderData();
  const list = Object.values(BRAND_CAT);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  // const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "brandName";
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
    modalShow();
  };

  const modalShow = () => setShowM(true);

  return (
    <Wrapper>
      <section id="set-content" className="set-content section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Brands - Set Featured</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container">
          <div className="filters-container">
            {/* Input Search */}
            <input
              type="text"
              value={search}
              onInput={(e) => setSearch(e.target.value)}
              onChange={(e) => setDebouncedSearch(e.target.value)}
              placeholder="Search brands..."
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
              {list.map((itemValue) => {
                return (
                  <option key={itemValue} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => updateQueryParams({ sortBy: e.target.value })}
              className="form-control"
            >
              <option value="brandName">Sort by Name</option>
              <option value="brandCat">Sort by Category</option>
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
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => {
                return (
                  <tr key={brand._id}>
                    <td>
                      {countFeature > 3 ? (
                        <Button
                          type="button"
                          className="btn edit-brand-btn main-btn"
                          variant="primary"
                          onClick={viewDetails.bind(
                            null,
                            "Brand",
                            brand,
                            "Set",
                            "Featured"
                          )}
                        >
                          <FaRegCheckCircle /> <span>SET</span>
                        </Button>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{brand.brandName}</td>
                    <td>{brand.brandCat}</td>
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
          <Link to={"/admin/set-content"} className="btn-back">
            <FiArrowLeftCircle /> Back
          </Link>
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
export default SetFeat;
