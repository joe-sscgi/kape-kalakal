import Wrapper from "../../../../assets/wrappers/MainRecipes";
import customFetch from "../../../../utils/customFetch";
import { useAdminDashboardLayoutContext } from "../../../AdminDashboardLayout";

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
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const loader = async () => {
  try {
    const { data } = await customFetch("/admin/main-recipes");
    // console.log(1, data);
    return data.recipesData;
  } catch (error) {
    // return redirect("/admin");
  }
};
const MainRecipes = () => {
  const recipes = useLoaderData();

  const [showM, setShowM] = useState(false);
  const [modalData, setModalData] = useState("");

  const closeModal = () => setShowM(false);

  const viewDetails = (dets) => {
    // alert(dets);
    setModalData(dets);
    modalShow();
  };

  const modalShow = () => setShowM(true);

  return (
    <Wrapper>
      <section id="main-recipes" className="main-recipes section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Recipes</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container">
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
