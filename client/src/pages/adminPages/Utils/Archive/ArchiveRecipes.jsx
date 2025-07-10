import Wrapper from "../../../../assets/wrappers/Archive";
import customFetch from "../../../../utils/customFetch";
import { RECIPE_CAT } from "../../../../../../utils/contants";
import { SubmitBtn } from "../../../../components/";

// ICONS
import { TbEditCircle } from "react-icons/tb";
import { MdRemoveCircleOutline } from "react-icons/md";
import { FiArrowLeftCircle } from "react-icons/fi";

import { toast } from "react-toastify";

import {
  redirect,
  Link,
  Form,
  useLoaderData,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

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
      `/admin/utilities/archive-recipes?${queryParams.toString()}`
    );
    return data;
  } catch (error) {
    console.error(error);
    return { recipes: [], currentPage: 1, totalPages: 1 };
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    if (data.action == "restore") {
      await customFetch.patch(
        `/admin/utilities/archive-recipes/${data.ArchiveID}`,
        data
      );
      toast.success("Recipe restored successfully");
    } else if (data.action == "delete") {
      await customFetch.delete(
        `/admin/utilities/archive-recipes/${data.ArchiveID}`,
        data
      );
      toast.success("Recipe permanently deleted");
    }
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ArchiveRecipes = () => {
  const { recipes, currentPage, totalPages } = useLoaderData();
  const list = Object.values(RECIPE_CAT);
  const navigate = useNavigate();
  const location = useLocation();

  const [modalTitle, setModalTitle] = useState("");
  const [modalAction, setModalAction] = useState("");
  const [modalArchiveId, setModalArchiveId] = useState("");
  const [modalArchiveName, setModalArchiveName] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  function archiveAction(action, id, name) {
    var title = "";
    if (action == "restore") {
      title = "Restore Recipe";
    } else if (action == "delete") {
      title = "Permanent Delete Recipe";
    }

    setModalTitle(title);
    setModalAction(action);
    setModalArchiveId(id);
    setModalArchiveName(name);

    handleShowModal();
  }

  const searchParams = new URLSearchParams(location.search);
  // const search = searchParams.get("search") || "";
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
      <section id="archive" className="archive section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Recipes Archive</h1>
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
              {list.slice(1).map((itemValue) => {
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
              <option value="recipeCat">Sort by Category</option>
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
              {recipes.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    <p>No data found.</p>
                  </td>
                </tr>
              ) : (
                recipes.map((recipe) => {
                  return (
                    <tr key={recipe._id}>
                      <td>
                        <Button
                          type="button"
                          className="btn main-btn restore-btn"
                          variant="primary"
                          onClick={archiveAction.bind(
                            null,
                            "restore",
                            recipe._id,
                            recipe.recipeName
                          )}
                        >
                          <TbEditCircle /> <span>RESTORE</span>
                        </Button>
                        <Button
                          type="button"
                          className="btn del-btn main-btn"
                          variant="danger"
                          onClick={archiveAction.bind(
                            null,
                            "delete",
                            recipe._id,
                            recipe.recipeName
                          )}
                        >
                          <MdRemoveCircleOutline /> <span>DELETE</span>
                        </Button>
                      </td>
                      <td>{recipe.recipeName}</td>
                      <td>{recipe.recipeCat}</td>
                    </tr>
                  );
                })
              )}
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
              disabled={currentPage === totalPages || totalPages == 0}
              className="btn page-btn"
            >
              Next
            </button>
          </div>
          <Link to={"/admin/utilities"} className="btn-back">
            <FiArrowLeftCircle /> Back
          </Link>
        </div>
      </section>

      {/* MODAL */}
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Form method="post" className="form-action">
          <Modal.Body>
            <div className="form-action-container">
              <p>are you sure you want to {modalAction} this item?</p>
              <br />
              <input
                type="text"
                id="action"
                name="action"
                className="action hidden"
                defaultValue={modalAction}
              />
              <input
                type="text"
                id="ArchiveID"
                name="ArchiveID"
                className="ArchiveID hidden"
                defaultValue={modalArchiveId}
              />
              <input
                type="text"
                id="ArchiveName"
                name="ArchiveName"
                className="form-control ArchiveName"
                defaultValue={modalArchiveName}
                readOnly
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <SubmitBtn
              className="main-btn action-btn-submit"
              buttonText={modalAction}
            />
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Wrapper>
  );
};
export default ArchiveRecipes;
