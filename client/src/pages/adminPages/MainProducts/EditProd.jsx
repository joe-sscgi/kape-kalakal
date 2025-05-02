import { redirect, Form } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../../assets/wrappers/EditUser";
import customFetch from "../../../utils/customFetch";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../components";
import { useLoaderData, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PROD_CAT } from "../../../../../utils/contants";

const prodQuery = (id) => {
  return {
    queryKey: ["prod", id],
    queryFn: async () => {
      const { data } = await customFetch.get(`/admin/edit-product/${id}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(prodQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return redirect("/admin/main-products");
    }
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.patch(`/admin/edit-product/${params.id}`, data);
      queryClient.invalidateQueries(["prod"]);

      toast.success("Product edited successfully");
      return redirect("/admin/main-products");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const EditProd = () => {
  const id = useLoaderData();
  const prod = useQuery(prodQuery(id)).data.prodData;

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
                <a
                  type="button"
                  href="/admin/main-products"
                  className="btn edit-prod-btn edit-prod-back"
                >
                  Cancel
                </a>
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
