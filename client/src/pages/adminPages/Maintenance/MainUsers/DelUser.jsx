import { redirect, Form } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../../../assets/wrappers/DelUser";
import customFetch from "../../../../utils/customFetch";
import { FormRow, SubmitBtn } from "../../../../components/";
import { useLoaderData, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/admin/edit-user/${params.id}`);
    return data.userData;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // return redirect("/admin/main-users");
  }
};
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/admin/del-user/${params.id}`, data);

    toast.success("User deleted successfully");
    return redirect("/admin/main-users");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const DelUser = () => {
  // const id = useLoaderData();
  // const user = useQuery(userQuery(id)).data.userData;
  const user = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        {/* Delete User */}
        <section id="del-user" className="container del-user">
          {/* Section Title */}
          <div className="section-title">
            <h1>Delete User</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="del-user-form">
            <div className="del-user-container">
              <FormRow
                type="text"
                id="userID"
                name="userID"
                className="form-input hidden"
                placeholder="userID"
                defaultValue={user._id}
              />
              <FormRow
                type="email"
                id="userEmail"
                name="userEmail"
                className="form-input"
                placeholder="email"
                defaultValue={user.userEmail}
                dis="true"
              />
              <FormRow
                type="text"
                id="userUsername"
                name="userUsername"
                className="form-input"
                placeholder="username"
                defaultValue={user.userUsername}
                dis="true"
              />
              <div className="text-center del-user-buttons">
                <SubmitBtn
                  className="btn del-user-btn del-user-submit"
                  buttonText="Delete"
                />
                <a
                  type="button"
                  href="/admin/main-users"
                  className="btn del-user-btn del-user-back"
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
export default DelUser;
