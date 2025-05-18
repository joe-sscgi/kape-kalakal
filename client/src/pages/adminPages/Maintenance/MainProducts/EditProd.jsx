import Wrapper from "../../../../assets/wrappers/EditProduct";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components";
import customFetch from "../../../../utils/customFetch";
import { PROD_CAT } from "../../../../../../utils/contants";

import { redirect, Form } from "react-router-dom";
import { toast } from "react-toastify";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/admin/edit-product/${params.id}`);
    return data.prodData;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // return redirect("/admin/main-products");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/admin/edit-product/${params.id}`, data);

    toast.success("Product edited successfully");
    return redirect("/admin/main-products");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditProd = () => {
  // const id = useLoaderData();
  // const prod = useQuery(prodQuery(id)).data.prodData;
  const prod = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        {/* Edit Prod */}
        <section id="edit-prod" className="container edit-prod">
          {/* Section Title */}
          <div className="section-title">
            <h1>Edit Product</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="edit-prod-form">
            <div className="edit-prod-container">
              <FormRow
                type="text"
                id="prodName"
                name="prodName"
                className="form-input"
                placeholder="Product Name"
                defaultValue={prod._id}
              />
              <FormRow
                type="text"
                id="prodName"
                name="prodName"
                className="form-input"
                placeholder="Product Name"
                defaultValue={prod.prodName}
              />
              <textarea
                id="prodDesc"
                name="prodDesc"
                className="form-input"
                placeholder="Product Description"
                defaultValue={prod.prodDesc}
              />
              <FormRowSelect
                name="prodCat"
                defaultValue={prod.prodCat}
                list={Object.values(PROD_CAT)}
              />
              <FormRow
                type="number"
                id="prodPrice"
                name="prodPrice"
                className="form-input"
                placeholder="Product Price"
                defaultValue={prod.prodPrice}
              />
              <FormRow
                type="number"
                id="prodQty"
                name="prodQty"
                className="form-input"
                placeholder="Product Quantity"
                defaultValue={prod.prodQty}
              />
              <div className="add-prod-fotm">
                <input
                  type="checkbox"
                  id="prodIsFotm"
                  name="prodIsFotm"
                  className="form-input"
                  placeholder="Product Price"
                  value="isFotm"
                  defaultChecked={prod.prodIsFotm ? "checked" : ""}
                />
                <label htmlFor="isFotm"> Flavor of the Month</label>
              </div>
              <div className="add-prod-best">
                <input
                  type="checkbox"
                  id="prodIsBest"
                  name="prodIsBest"
                  className="form-input"
                  placeholder="Product Price"
                  value="isBest"
                  defaultChecked={prod.prodIsBest ? "checked" : ""}
                />
                <label htmlFor="isBest"> Best Seller</label>
              </div>
              <div className="text-center edit-prod-buttons">
                <SubmitBtn
                  className="btn edit-prod-btn edit-prod-submit"
                  buttonText="Update"
                />
                <Link to={`/admin/product-gallery/${prod._id}`}>
                  <Button
                    type="button"
                    className="btn edit-prod-btn main-btn"
                    variant="primary"
                  >
                    <span>Gallery</span>
                  </Button>
                </Link>
                <Link to="/admin/main-products">
                  <Button
                    type="button"
                    className="btn edit-prod-btn edit-prod-back"
                  >
                    <span>Cancel</span>
                  </Button>
                </Link>
                {/* <a
                  type="button"
                  href="/admin/main-products"
                  className="btn edit-prod-btn edit-prod-back"
                >
                  Cancel
                </a> */}
              </div>
            </div>
          </Form>
        </section>
        {/* /End Edit Prod */}
      </main>
    </Wrapper>
  );
};
export default EditProd;
