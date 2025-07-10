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
import { redirect, Form, Link, useLoaderData } from "react-router-dom";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import "datatables.net-select-dt";
import "datatables.net-responsive-dt";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
// import DataTable from "react-data-table-component";

// import $ from "jquery";
// import "datatables.net";

import { useQuery } from "@tanstack/react-query";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/admin/main-products");
    // console.log(1, data);
    return data.products;
  } catch (error) {
    // return redirect("/admin");
  }
};

const MainProds = () => {
  const prods = useLoaderData();
  // console.log(useLoaderData());

  const [showM, setShowM] = useState(false);
  const [modalData, setModalData] = useState("");

  const closeModal = () => setShowM(false);

  const viewDetails = (dets) => {
    setModalData(dets);
    modalShow();
  };

  const modalShow = () => setShowM(true);

  DataTable.use(DT);

  // SEARCH FILTER
  const [filteredData, setFilteredData] = useState(prods);
  // const [filteredValue, setFilteredValue] = useState("");

  // const handleSelectChange = (event) => {
  //   const value = event.target.value;
  //   setFilteredValue(value);
  // };

  // if (filteredValue) {
  //   if (filteredValue != "Select Category") {
  //     const newFilteredData = prods.filter(
  //       (item) => item.prodCat === filteredValue
  //     );
  //     setFilteredValue("");
  //     setFilteredData(newFilteredData);
  //   } else {
  //     setFilteredData(prods);
  //   }
  // }

  return (
    <Wrapper>
      <section id="main-prod" className="main-prod section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Products</h1>
        </div>
        {/* <!-- End Section Title --> */}

        {/* <div className="container"> */}
        {/* <div className="searchFormContainer">
          <div className="container search-container row">
            <div className="col-sm-4">
              <label htmlFor="searchFilter" className="lblSearchFilter">
                Filter
              </label>
              <FormRowSelect
                name="prodCat"
                className="form-input"
                defaultValue={PROD_CAT.DEFAULT}
                list={Object.values(PROD_CAT)}
                onChange={handleSelectChange}
                value={filteredValue}
              />
            </div>
          </div>
        </div> */}

        <DataTable id="myTable" name="myTable" className="main-table striped">
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
            {filteredData.map((prod) => {
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
                  <td className="prod-col">{prod.prodName}</td>
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
                  <td className="prod-col">{prod.prodPrice}</td>
                  <td className="prod-col">{prod.prodQty}</td>
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
        </DataTable>
        <div className="container prod-notes">
          <p>Flavor of the Month</p>
          <p>Best Seller</p>
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
