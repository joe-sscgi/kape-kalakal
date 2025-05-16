import { redirect, Form, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../../../assets/wrappers/AddBrand";
import customFetch from "../../../../utils/customFetch";
import Button from "react-bootstrap/Button";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components/";
import { BRAND_CAT } from "../../../../../../utils/contants";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/admin/add-brand", data);
    toast.success("Brand Created successful");
    return redirect("/admin/main-brands");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const AddBrand = () => {
  return (
    <Wrapper>
      <main className="main">
        {/* Add Brand */}
        <section id="add-brand" className="container add-brand">
          {/* Section Title */}
          <div className="section-title">
            <h1>Add Brand</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="add-brand-form">
            <div className="add-brand-container">
              <FormRow
                type="text"
                id="brandName"
                name="brandName"
                className="form-input"
                placeholder="Brand Name"
              />
              <FormRowSelect
                name="brandCat"
                defaultValue={BRAND_CAT.DEFAULT}
                list={Object.values(BRAND_CAT)}
              />
              <div className="text-center add-brand-buttons">
                <SubmitBtn className="btn add-brand-btn add-brand-submit" />
                <Link to={"/admin/main-brands"}>
                  <Button
                    type="button"
                    className="btn add-brand-btn add-brand-back"
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
export default AddBrand;
