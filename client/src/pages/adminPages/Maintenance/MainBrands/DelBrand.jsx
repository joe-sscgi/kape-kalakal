import { redirect, Form, Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../../../assets/wrappers/DelBrand";
import customFetch from "../../../../utils/customFetch";
import Button from "react-bootstrap/Button";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components/";
import { BRAND_CAT } from "../../../../../../utils/contants";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/admin/edit-brand/${params.id}`);
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
    await customFetch.delete(`/admin/del-brand/${params.id}`, data);

    toast.success("Brand edited successfully");
    return redirect("/admin/main-brands");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const DelBrand = () => {
  const brand = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        {/* Add Brand */}
        <section id="del-brand" className="container del-brand">
          {/* Section Title */}
          <div className="section-title">
            <h1>Delete Brand</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="del-brand-form">
            <div className="del-brand-container">
              <FormRow
                type="text"
                id="brandName"
                name="brandName"
                className="form-input"
                placeholder="Brand Name"
                defaultValue={brand.brandName}
                dis="true"
              />
              <FormRowSelect
                name="brandCat"
                defaultValue={brand ? brand.brandCat : BRAND_CAT.DEFAULT}
                list={Object.values(BRAND_CAT)}
                dis="true"
              />
              <div className="text-center del-brand-buttons">
                <SubmitBtn
                  className="btn del-brand-btn del-brand-submit"
                  buttonText="Delete"
                />
                <Link to={"/admin/main-brands"}>
                  <Button
                    type="button"
                    className="btn del-brand-btn del-brand-back"
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
export default DelBrand;
