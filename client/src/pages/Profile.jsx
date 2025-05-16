import Wrapper from "../assets/wrappers/Profile";
import customFetch from "../utils/customFetch";
import { FormRow, SubmitBtn } from "../components/";
import { redirect, Form, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/admin/current-user");
    return data;
  } catch (error) {
    // return redirect("/");
    // alert("hoy!");
    // console.log("hoy");
  }
};

const Profile = () => {
  // const { user } = useQuery(userQuery).data;
  const { user } = useOutletContext();

  // console.log(user);
  // const user = { userEmail: "sample@sscgi.com", userUsername: "sample" };

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
                      <label htmlFor="userID">ID</label>
                      <input
                        type="text"
                        className="userID form-control"
                        defaultValue={user._id}
                        readOnly
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="userID">ID</label>
                      <input
                        type="text"
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
                        className="userLastName form-control"
                        defaultValue={user.userLastName}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="userFirstName">First Name</label>
                      <input
                        type="text"
                        className="userFirstName form-control"
                        defaultValue={user.userFirstName}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="userMiddleName">Middle Name</label>
                      <input
                        type="text"
                        className="userMiddleName form-control"
                        defaultValue={user.userMiddleName}
                        placeholder="(Optional)"
                      />
                    </div>
                  </div>
                  <div className="profile-group row">
                    <div className="col-sm-4">
                      <label htmlFor="userAddressNoStBrgy">Address</label>
                      <input
                        type="text"
                        className="userAddressNoStBrgy form-control"
                        // defaultValue={user.userAddressNoStBrgy}
                        placeholder="House/Blk/Lot/Unit No. Street/Barangay"
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="userAddressCityMunicipality form-control"
                        // defaultValue={user.userAddressCityMunicipality}
                        placeholder="City/Municipality"
                      />
                    </div>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="userProvince form-control"
                        // defaultValue={user.userProvince}
                        placeholder="Province"
                      />
                    </div>
                  </div>
                  <div className="profile-group row">
                    <div className="col-sm-6">
                      <label htmlFor="userEmail">Email</label>
                      <input
                        type="text"
                        className="userEmail form-control"
                        defaultValue={user.userEmail}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="userUsername">Username</label>
                      <input
                        type="text"
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
