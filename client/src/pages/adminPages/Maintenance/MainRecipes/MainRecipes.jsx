import Wrapper from "../../../../assets/wrappers/MainRecipes";
import customFetch from "../../../../utils/customFetch";
import { useAdminDashboardLayoutContext } from "../../../AdminDashboardLayout";
import { RECIPE_CAT } from "../../../../../../utils/contants";

// ICONS
import { FiPlusCircle } from "react-icons/fi";
import { TbEditCircle } from "react-icons/tb";
import { MdRemoveCircleOutline } from "react-icons/md";
import { FiArrowLeftCircle } from "react-icons/fi";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";

import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
  Link,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const loader = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;
    const sortBy = url.searchParams.get("sortBy") || "recipeName";
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
      `/admin/main-recipes?${queryParams.toString()}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return { recipes: [], currentPage: 1, totalPages: 1 };
  }
};

const MainRecipes = () => {
  const [showM, setShowM] = useState(false);
  const [modalData, setModalData] = useState("");

  const closeModal = () => setShowM(false);

  const viewDetails = (dets) => {
    // alert(dets);
    setModalData(dets);
    modalShow();
  };

  const modalShow = () => setShowM(true);

  const { recipes, currentPage, totalPages } = useLoaderData();
  const list = Object.values(RECIPE_CAT);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get("sortBy") || "recipeName";
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
      <section id="main-recipes" className="main-recipes section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Recipes</h1>
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
              placeholder="Search recipes..."
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
              <option value="recipeName">Sort by Name</option>
              <option value="recipeAuthor">Sort by Author</option>
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
                  <Link to={"/admin/add-recipe"}>
                    <Button
                      type="button"
                      className="btn add-recipe-btn main-btn"
                      variant="success"
                    >
                      <FiPlusCircle /> <span>ADD</span>
                    </Button>
                  </Link>
                </th>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => {
                if (recipe.recipeIsDel == 0) {
                  return (
                    <tr key={recipe._id}>
                      <td>
                        <Link to={`/admin/edit-recipe/${recipe._id}`}>
                          <Button
                            type="button"
                            className="btn edit-recipe-btn main-btn"
                            variant="primary"
                          >
                            <TbEditCircle /> <span>EDIT</span>
                          </Button>
                        </Link>
                        <Link to={`/admin/del-recipe/${recipe._id}`}>
                          <Button
                            type="button"
                            className="btn del-recipe-btn main-btn"
                            variant="danger"
                          >
                            <MdRemoveCircleOutline /> <span>DELETE</span>
                          </Button>
                        </Link>
                      </td>
                      <td>{recipe.recipeName}</td>
                      <td>{recipe.recipeAuthor}</td>
                      <td>{recipe.recipeCat}</td>
                      <td>
                        <Button
                          type="button"
                          variant="primary"
                          className="btn main-btn main-recipe-view"
                          onClick={viewDetails.bind(null, recipe.recipeDesc)}
                        >
                          <HiOutlineMagnifyingGlassCircle />
                          <span>View</span>
                        </Button>
                      </td>
                    </tr>
                  );
                }
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
          <Modal.Title>Recipe Details</Modal.Title>
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
export default MainRecipes;
