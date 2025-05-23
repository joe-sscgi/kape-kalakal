import Wrapper from "../../../assets/wrappers/ManageContent";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

// ICONS
import { MdRemoveCircleOutline } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FiArrowLeftCircle } from "react-icons/fi";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { redirect, Form, Link, useLoaderData } from "react-router-dom";
import { SubmitBtn } from "../../../components";

import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/admin/set-content");
    // console.log(1, data);
    return data.allData;
  } catch (error) {
    // return redirect("/admin");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  //   console.log(data);
  try {
    await customFetch.patch(`/admin/set-content/${data.manageID}`, data);

    toast.success("Product edited successfully");
    //   return redirect("/admin/main-products");
    //   window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ManageContent = () => {
  const brands = useLoaderData().brands;
  const countFeature = useLoaderData().countFeature;
  const prods = useLoaderData().prods;
  const countFotm = useLoaderData().countFotm;
  const countBest = useLoaderData().countBest;

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

  DataTable.use(DT);

  return (
    <Wrapper>
      <section id="fotm-prod" className="fotm-prod section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Flavor of the Month</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="manage-content-info">
          <h3>Set a max of 5 Flavor of the Month</h3>
        </div>
        <DataTable
          id="myTableFotm"
          name="myTableFotm"
          className="main-table myTableFotm striped"
        >
          <thead>
            <tr>
              <th>ACTION</th>
              <th>Name</th>
              <th>FotM</th>
            </tr>
          </thead>
          <tbody>
            {prods.map((prod) => {
              return (
                <tr key={prod._id} className="prod-row">
                  {prod.prodIsFotm && prod.prodIsFotm == 1 ? (
                    <td>
                      <Button
                        type="button"
                        className="btn del-prod-btn main-btn"
                        variant="danger"
                        onClick={viewDetails.bind(
                          null,
                          "Product",
                          prod,
                          "Remove",
                          "Flavor of the Month"
                        )}
                      >
                        <MdRemoveCircleOutline /> <span>REMOVE</span>
                      </Button>
                    </td>
                  ) : countFotm != 5 ? (
                    <td>
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
                  ) : (
                    <td>Max</td>
                  )}
                  <td className="prod-col">{prod.prodName}</td>
                  <td className="prod-col prod_fotm">
                    {prod.prodIsFotm ? (
                      <FaRegCheckCircle />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>
      </section>

      <section id="best-prod" className="best-prod section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Best Sellers</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="manage-content-info">
          <h3>Set a max of 12 Best Sellers</h3>
          <p>atleat 1 for each category</p>
        </div>
        <DataTable
          id="myTableBest"
          name="myTableBest"
          className="main-table myTableBest striped"
        >
          <thead>
            <tr>
              <th>ACTION</th>
              <th>Name</th>
              <th>Category</th>
              <th>Best Seller</th>
            </tr>
          </thead>
          <tbody>
            {prods.map((prod) => {
              return (
                <tr key={prod._id} className="prod-row">
                  {prod.prodIsBest && prod.prodIsBest == 1 ? (
                    <td>
                      <Button
                        type="button"
                        className="btn del-prod-btn main-btn"
                        variant="danger"
                        onClick={viewDetails.bind(
                          null,
                          "Product",
                          prod,
                          "Remove",
                          "Best Seller"
                        )}
                      >
                        <MdRemoveCircleOutline /> <span>REMOVE</span>
                      </Button>
                    </td>
                  ) : countBest != 12 ? (
                    <td>
                      <Button
                        type="button"
                        className="btn edit-prod-btn main-btn"
                        variant="primary"
                        onClick={viewDetails.bind(
                          null,
                          "Product",
                          prod,
                          "Set",
                          "Best Seller"
                        )}
                      >
                        <FaRegCheckCircle /> <span>SET</span>
                      </Button>
                    </td>
                  ) : (
                    <td>Max</td>
                  )}
                  <td className="prod-col">{prod.prodName}</td>
                  <td className="prod-col">{prod.prodCat}</td>
                  <td className="prod-col prod_best">
                    {prod.prodIsBest ? (
                      <FaRegCheckCircle />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>
      </section>

      <section id="feat-brand" className="feat-brand section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Featured Brands</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="manage-content-info">
          <h3>Set a max of 3 Featured Brands</h3>
        </div>
        <DataTable
          id="myTablefeatured"
          name="myTablefeatured"
          className="main-table myTablefeatured striped"
        >
          <thead>
            <tr>
              <th>ACTION</th>
              <th>Name</th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand) => {
              return (
                <tr key={brand._id} className="brand-row">
                  {brand.brandIsFeatured && brand.brandIsFeatured == 1 ? (
                    <td>
                      <Button
                        type="button"
                        className="btn del-brand-btn main-btn"
                        variant="danger"
                        onClick={viewDetails.bind(
                          null,
                          "Brand",
                          brand,
                          "Remove",
                          "Featured"
                        )}
                      >
                        <MdRemoveCircleOutline /> <span>REMOVE</span>
                      </Button>
                    </td>
                  ) : countFeature != 3 ? (
                    <td>
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
                    </td>
                  ) : (
                    <td>Max</td>
                  )}
                  <td className="brand-col">{brand.brandName}</td>
                  <td className="brand-col brand_best">
                    {brand.brandIsFeatured ? (
                      <FaRegCheckCircle />
                    ) : (
                      <MdCheckBoxOutlineBlank />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </DataTable>
        <div className="container prod-notes">
          <Link to={"/admin"} className="btn-back">
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
export default ManageContent;
