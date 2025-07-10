import Wrapper from "../../../../assets/wrappers/ProductGallery";
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

const ProdImgs = () => {
  const prodID = useParams().id;
  const prod = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        {/* Prod Imgs */}
        <section id="prod-gallery" className="container prod-gallery">
          {/* Section Title */}
          <div className="section-title">
            <h1>Product Gallery Images</h1>
            <h3>{prod.prodImgs ? "" : "No Uploaded Images"}</h3>
          </div>
          {/* End Section Title */}

          <div className="prod-img-gallery row">
            {prod.prodImgs?.map((img) => {
              // console.log(img);
              // if (img.prodImgIsDel == 0) {
              return (
                <div className="prod-img-container col-sm-4">
                  <img src={img.prodImgUrl} />
                </div>
              );
              // }
            })}
            <div className="text-center prod-gallery-buttons">
              <Link to={`/admin/product-imgs/${prodID}`}>
                <Button
                  type="button"
                  className="btn prod-gallery-btn prod-gallery-upload-btn main-btn"
                >
                  <span>Upload</span>
                </Button>
              </Link>
              <Link to={`/admin/edit-product/${prodID}`}>
                <Button
                  type="button"
                  className="btn prod-gallery-btn prod-gallery-back"
                  variant="secondary"
                >
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </section>
        {/* /End Prod Imgs */}
      </main>
    </Wrapper>
  );
};
export default ProdImgs;
