import { redirect, Form, Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../../../assets/wrappers/EditBrand";
import customFetch from "../../../../utils/customFetch";
import Button from "react-bootstrap/Button";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components/";
import { BRAND_CAT } from "../../../../../../utils/contants";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/admin/edit-brand/${params.id}`);
    console.log(data);
    return data.brandData;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // return redirect("/admin/main-brands");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/admin/edit-brand/${params.id}`, data);

    toast.success("Brand edited successfully");
    return redirect("/admin/main-brands");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditBrand = () => {
  const brand = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        {/* Add Brand */}
        <section id="edit-brand" className="container edit-brand">
          {/* Section Title */}
          <div className="section-title">
            <h1>Edit Brand</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="edit-brand-form">
            <div className="edit-brand-container">
              <FormRow
                type="text"
                id="brandName"
                name="brandName"
                className="form-input"
                placeholder="Brand Name"
                defaultValue={brand.brandName}
              />
              <FormRowSelect
                name="brandCat"
                defaultValue={brand ? brand.brandCat : BRAND_CAT.DEFAULT}
                list={Object.values(BRAND_CAT)}
              />
              <div className="text-center edit-brand-buttons">
                <SubmitBtn
                  className="btn edit-brand-btn edit-brand-submit"
                  buttonText="Update"
                />
                <Link to={"/admin/main-brands"}>
                  <Button
                    type="button"
                    className="btn edit-brand-btn edit-brand-back"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        </section>
        {/* /End Add Brand */}
      </main>
    </Wrapper>
  );
};
export default EditBrand;
