import { Link, redirect, Form } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../../assets/wrappers/AddUser";
import customFetch from "../../../utils/customFetch";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../components/";
import { USER_TYPE } from "../../../../../utils/contants";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/admin/add-user", data);
    toast.success("User Created successful");
    return redirect("/admin/main-users");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const AddUser = () => {
  return (
    <Wrapper>
      <main className="main">
        {/* Add User */}
        <section id="add-user" className="container add-user">
          {/* Section Title */}
          <div className="section-title">
            <h1>Add User</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="add-user-form">
            <div className="add-user-container">
              <FormRow
                type="email"
                id="userEmail"
                name="userEmail"
                className="form-input"
                placeholder="email"
              />
              <FormRow
                type="text"
                id="userUsername"
                name="userUsername"
                className="form-input"
                placeholder="username"
              />
              <FormRow
                type="password"
                id="userPassword"
                name="userPassword"
                className="form-input"
                placeholder="password"
              />
              <FormRowSelect
                name="userUserType"
                defaultValue={USER_TYPE.DEFAULT}
                list={Object.values(USER_TYPE)}
              />
              <div className="text-center add-user-buttons">
                <SubmitBtn className="btn add-user-btn add-user-submit" />
                <a
                  type="button"
                  href="/admin/main-users"
                  className="btn add-user-btn add-user-back"
                >
                  Cancel
                </a>
              </div>
            </div>
          </Form>
        </section>
        {/* /End Add User */}
      </main>
    </Wrapper>
  );
};
export default AddUser;
