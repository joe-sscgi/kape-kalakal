import Wrapper from "../../../../assets/wrappers/ProductImgs";
import customFetch from "../../../../utils/customFetch";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components/";
import { PROD_CAT } from "../../../../../../utils/contants";

import {
  redirect,
  Form,
  Link,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export const loader = async ({ params }) => {
  try {
    const getProdName = await customFetch.get(
      `/admin/edit-product/${params.id}`
    );

    const { data } = await customFetch.get(`/admin/product-imgs/${params.id}`);
    data.prodName = getProdName.data.prodData.prodName;
    data.prodCat = getProdName.data.prodData.prodCat;
    // console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // return redirect("/admin/main-products");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();

  try {
    await customFetch.post(`/admin/product-imgs/${params.id}`, formData);
    toast.success("Image/s uploaded successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
};

const ProdImgs = () => {
  const prodID = useParams().id;
  const prod = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        {/* Prod Imgs */}
        <section id="prod-imgs" className="container prod-imgs">
          {/* Section Title */}
          <div className="section-title">
            <h1>Upload Product Images</h1>
          </div>
          {/* End Section Title */}

          <Form
            method="post"
            className="prod-imgs-form"
            encType="multipart/form-data"
          >
            <div className="prod-imgs-container">
              <FormRow
                type="text"
                id="imgID"
                name="imgID"
                className="form-input"
                defaultValue={prodID}
              />
              <FormRow
                type="text"
                id="type"
                name="type"
                className="form-input"
                defaultValue="Products"
              />
              <FormRow
                type="text"
                id="prodName"
                name="prodName"
                className="form-input"
                defaultValue={prod.prodName}
              />
              <FormRow
                type="text"
                id="category"
                name="category"
                className="form-input"
                defaultValue={prod.prodCat}
              />
              <div className="form-group">
                <input
                  type="file"
                  id="prodImg"
                  name="prodImg"
                  className="form-input"
                  accept="image/*"
                  multiple
                />
              </div>
              <div className="text-center prod-imgs-buttons">
                <SubmitBtn className="btn prod-imgs-btn prod-imgs-submit" />
                <Link to={`/admin/product-gallery/${prodID}`}>
                  <Button
                    type="button"
                    className="btn prod-imgs-btn add-brand-back"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        </section>
        {/* /End Prod Imgs */}
      </main>
    </Wrapper>
  );
};
export default ProdImgs;
