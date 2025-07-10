import Wrapper from "../../../../assets/wrappers/AddProduct";
import customFetch from "../../../../utils/customFetch";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components/";
import { PROD_CAT } from "../../../../../../utils/contants";

import { redirect, Form, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("prodImg");
  if (file && file.size > 500000) {
    toast.error("Image size too large");
    return null;
  }

  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/admin/add-product", data);
    toast.success("Product Created successful");
    return redirect("/admin/main-products");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const AddProd = () => {
  return (
    <Wrapper>
      <main className="main">
        {/* Add Prod */}
        <section id="add-prod" className="container add-prod">
          {/* Section Title */}
          <div className="section-title">
            <h1>Add Product</h1>
          </div>
          {/* End Section Title */}

          <Form
            method="post"
            className="add-prod-form"
            encType="multipart/form-data"
          >
            <div className="add-prod-container">
              <label htmlFor="prodName">Name</label>
              <FormRow
                type="text"
                id="prodName"
                name="prodName"
                className="form-input"
                placeholder="Product Name"
              />
              <label htmlFor="prodDesc">Description</label>
              <textarea
                id="prodDesc"
                name="prodDesc"
                className="form-input"
                placeholder="Product Description"
              />
              <label htmlFor="prodCat">Category</label>
              <FormRowSelect
                name="prodCat"
                defaultValue={PROD_CAT.DEFAULT}
                list={Object.values(PROD_CAT)}
              />
              <label htmlFor="prodPrice">Price</label>
              <FormRow
                type="number"
                id="prodPrice"
                name="prodPrice"
                className="form-input"
                placeholder="Product Price"
              />
              <label htmlFor="prodQty">Quantity</label>
              <FormRow
                type="number"
                id="prodQty"
                name="prodQty"
                className="form-input"
                placeholder="Product Quantity"
              />
              {/* <div className="form-group">
                <input
                  type="file"
                  id="prodImg"
                  name="prodImg"
                  className="form-input"
                  accept="image/*"
                />
              </div> */}
              {/* <div className="add-prod-fotm">
                <input
                  type="checkbox"
                  id="prodIsFotm"
                  name="prodIsFotm"
                  className="form-input"
                  placeholder="Product Price"
                  value="isFotm"
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
                />
                <label htmlFor="isBest"> Best Seller</label>
              </div> */}
              <div className="text-center add-prod-buttons">
                <SubmitBtn className="btn add-prod-btn add-prod-submit" />
                <Link to={"/admin/main-products"}>
                  <Button
                    type="button"
                    className="btn add-prod-btn add-brand-back"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        </section>
        {/* /End Add Prod */}
      </main>
    </Wrapper>
  );
};
export default AddProd;
