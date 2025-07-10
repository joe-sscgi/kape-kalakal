import Wrapper from "../assets/wrappers/Profile";
import customFetch from "../utils/customFetch";
import { SubmitBtn } from "../components/";
import { Form, Link, useLoaderData } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/admin/profile");
    return data;
  } catch (error) {
    // return redirect("/");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/admin/profile/${params.id}`, data);

    toast.success("Profile updated successfully");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Profile = () => {
  const { user } = useOutletContext();
  const { userProfile } = useLoaderData();

  return (
    <Wrapper>
      <div className="edit-profile-container">
        <div className="container">
          <h1>User Profile</h1>
          <div className="container">
            <div className="profile-container">
              <Form method="post" className="edit-profile-form">
                <div className="edit-profile-container">
                  <div className="profile-group row">
                    <div className="col-sm-6">
                      <label htmlFor="userID">Profile ID</label>
                      <input
                        type="text"
                        name="profileID"
                        className="profileID form-control"
                        defaultValue={userProfile._id}
                        readOnly
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="userID">User ID</label>
                      <input
                        type="text"
                        name="userID"
                        className="userID form-control"
                        defaultValue={user._id}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="profile-group row">
                    <div className="col-sm-4">
                      <label htmlFor="userLastName">Last Name</label>
                      <input
                        type="text"
                        name="userLastName"
                        className="userLastName form-control"
                        defaultValue={userProfile.userLastName}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="userFirstName">First Name</label>
                      <input
                        type="text"
                        name="userFirstName"
                        className="userFirstName form-control"
                        defaultValue={userProfile.userFirstName}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="userMiddleName">Middle Name</label>
                      <input
                        type="text"
                        name="userMiddleName"
                        className="userMiddleName form-control"
                        defaultValue={userProfile.userMiddleName}
                        placeholder="(Optional)"
                      />
                    </div>
                  </div>
                  <div className="profile-group row">
                    <div className="col-sm-4">
                      <label htmlFor="userAddressNoStBrgy">Address</label>
                      <input
                        type="text"
                        name="userAddressNoStBrgy"
                        className="userAddressNoStBrgy form-control"
                        defaultValue={userProfile.userAddressNoStBrgy}
                        placeholder="House/Blk/Lot/Unit No. Street/Barangay"
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        name="userAddressCityMunicipality"
                        className="userAddressCityMunicipality form-control"
                        defaultValue={userProfile.userAddressCityMunicipality}
                        placeholder="City/Municipality"
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        name="userProvince"
                        className="userProvince form-control"
                        defaultValue={userProfile.userProvince}
                        placeholder="Province"
                      />
                    </div>
                  </div>
                  <div className="profile-group row">
                    <div className="col-sm-6">
                      <label htmlFor="userEmail">Email</label>
                      <input
                        type="text"
                        name="userEmail"
                        className="userEmail form-control"
                        defaultValue={user.userEmail}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="userUsername">Username</label>
                      <input
                        type="text"
                        name="userUsername"
                        className="userUsername form-control"
                        defaultValue={user.userUsername}
                      />
                    </div>
                  </div>
                  <div className="text-center edit-profile-buttons">
                    <SubmitBtn
                      className="btn edit-profile-btn edit-profile-submit"
                      buttonText="Save"
                    />
                    <Link to={"/admin"}>
                      <Button
                        type="button"
                        className="btn edit-profile-btn edit-profile-back"
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
