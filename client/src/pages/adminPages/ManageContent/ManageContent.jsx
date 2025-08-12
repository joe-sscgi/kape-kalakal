import Wrapper from "../../../assets/wrappers/ManageContent";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

// ICONS
import { FiPlusCircle } from "react-icons/fi";
import { MdRemoveCircleOutline } from "react-icons/md";
import { FiArrowLeftCircle } from "react-icons/fi";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import { SubmitBtn } from "../../../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/admin/set-content");
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
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ManageContent = () => {
  const {
    productsFotmData,
    countFotm,
    productsBestData,
    countBest,
    brandsFeatData,
    countFeature,
  } = useLoaderData();

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
      <section id="fotm-prod" className="fotm-prod section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Flavor of the Month</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="manage-content-info">
          {/* <h3>Set a max of 5 Flavor of the Month</h3> */}
          <h3>Set ONE Flavor of the Month</h3>
        </div>
        <Table striped id="myTableFotm" name="myTableFotm">
          <thead>
            <tr>
              <th>
                {countFotm == 0 ? (
                  <Link to={"/admin/set-content/fotm"}>
                    <Button
                      type="button"
                      className="btn set-fotm-btn main-btn"
                      variant="success"
                    >
                      <FiPlusCircle /> <span>Set Flavor of the Month</span>
                    </Button>
                  </Link>
                ) : (
                  ""
                )}
              </th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {productsFotmData.map((prod) => {
              return (
                <tr key={prod._id} className="prod-row">
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
                  <td className="prod-col">{prod.prodName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </section>

      <section id="best-prod" className="best-prod section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Best Sellers</h1>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="manage-content-info">
          <h3>Set a max of 12 Best Sellers</h3>
          <p>atleast 1 for each category</p>
        </div>
        <Table striped id="myTableBest" name="myTableBest">
          <thead>
            <tr>
              <th>
                {countBest <= 12 ? (
                  <Link to={"/admin/set-content/best-sellers"}>
                    <Button
                      type="button"
                      className="btn set-fotm-btn main-btn"
                      variant="success"
                    >
                      <FiPlusCircle /> <span>Set Best Sellers</span>
                    </Button>
                  </Link>
                ) : (
                  ""
                )}
              </th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {productsBestData.map((prod) => {
              return (
                <tr key={prod._id} className="prod-row">
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
                  <td className="prod-col">{prod.prodName}</td>
                  <td className="prod-col">{prod.prodCat}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
        <Table striped id="myTablefeatured" name="myTablefeatured">
          <thead>
            <tr>
              <th>
                {countFeature < 3 ? (
                  <Link to={"/admin/set-content/featured-brands"}>
                    <Button
                      type="button"
                      className="btn set-fotm-btn main-btn"
                      variant="success"
                    >
                      <FiPlusCircle />{" "}
                      <span>Set Featured Brands {countFeature}</span>
                    </Button>
                  </Link>
                ) : (
                  ""
                )}
              </th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {brandsFeatData.map((brand) => {
              return (
                <tr key={brand._id} className="brand-row">
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

                  <td className="brand-col">{brand.brandName}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </section>

      <div className="container prod-notes">
        <Link to={"/admin"} className="btn-back">
          <FiArrowLeftCircle /> Back
        </Link>
      </div>

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
