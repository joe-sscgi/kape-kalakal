import { redirect, Form } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../../../../assets/wrappers/EditUser";
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
    await customFetch.patch(`/admin/edit-user/${params.id}`, data);

    toast.success("User edited successfully");
    return redirect("/admin/main-users");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditUser = () => {
  // const id = useLoaderData();
  // console.log(useQuery(userQuery(id)));
  // const user = useQuery(userQuery(id)).data.userData;
  const user = useLoaderData();
  // console.log(user);

  return (
    <Wrapper>
      <main className="main">
        {/* Edit User */}
        <section id="edit-user" className="container edit-user">
          {/* Section Title */}
          <div className="section-title">
            <h1>Edit User</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="edit-user-form">
            <div className="edit-user-container">
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
              />
              <FormRow
                type="text"
                id="userUsername"
                name="userUsername"
                className="form-input"
                placeholder="username"
                defaultValue={user.userUsername}
              />
              <div className="text-center edit-user-buttons">
                <SubmitBtn
                  className="btn edit-user-btn edit-user-submit"
                  buttonText="Update"
                />
                <a
                  type="button"
                  href="/admin/main-users"
                  className="btn edit-user-btn edit-user-back"
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
export default EditUser;
