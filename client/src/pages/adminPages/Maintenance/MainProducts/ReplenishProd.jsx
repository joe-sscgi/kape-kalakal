import Wrapper from "../../../../assets/wrappers/EditProduct";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components";
import customFetch from "../../../../utils/customFetch";
import { PROD_CAT } from "../../../../../../utils/contants";

import { redirect, Form } from "react-router-dom";
import { toast } from "react-toastify";
import { Link, useLoaderData, useParams } from "react-router-dom";
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
  console.log(data);
  try {
    await customFetch.patch(`/admin/replenish-product/${params.id}`, data);

    toast.success("Product replenished successfully");
    return redirect("/admin/main-products");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditProd = () => {
  const prod = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        {/* Edit Prod */}
        <section id="edit-prod" className="container edit-prod">
          {/* Section Title */}
          <div className="section-title">
            <h1>Replenish Product</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="edit-prod-form">
            <div className="edit-prod-container">
              <FormRow
                type="text"
                id="prodId"
                name="prodId"
                className="form-input hidden"
                placeholder="Product Name"
                defaultValue={prod._id}
              />
              <label htmlFor="prodName">Name</label>
              <FormRow
                type="text"
                id="prodName"
                name="prodName"
                className="form-input"
                placeholder="Product Name"
                defaultValue={prod.prodName}
                dis="true"
              />
              <label htmlFor="prodDesc">Descriptpion</label>
              <textarea
                id="prodDesc"
                name="prodDesc"
                className="form-input"
                placeholder="Product Description"
                defaultValue={prod.prodDesc}
                disabled
              />
              <label htmlFor="prodCat">Category</label>
              <FormRowSelect
                name="prodCat"
                defaultValue={prod.prodCat}
                list={Object.values(PROD_CAT)}
                dis="true"
              />
              <label htmlFor="prodPrice">Price</label>
              <FormRow
                type="number"
                id="prodPrice"
                name="prodPrice"
                className="form-input"
                placeholder="Product Price"
                defaultValue={prod.prodPrice}
                dis="true"
              />
              <label htmlFor="prodQty">Current Quantity</label>
              <FormRow
                type="number"
                id="prodQty"
                name="prodQty"
                className="form-input"
                placeholder="Current Product Quantity"
                defaultValue={prod.prodQty}
                ro="true"
              />
              <label htmlFor="prodReplenishQty">Replenish Quantity</label>
              <FormRow
                type="number"
                id="prodReplenishQty"
                name="prodReplenishQty"
                className="form-input"
                placeholder="Add Product Quantity"
              />

              <div className="text-center edit-prod-buttons">
                <SubmitBtn
                  className="btn edit-prod-btn edit-prod-submit"
                  buttonText="Replenish"
                />
                <Link to="/admin/main-products">
                  <Button
                    type="button"
                    className="btn edit-prod-btn edit-prod-back"
                  >
                    <span>Cancel</span>
                  </Button>
                </Link>
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
