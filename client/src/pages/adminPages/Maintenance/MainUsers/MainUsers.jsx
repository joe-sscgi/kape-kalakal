import Wrapper from "../../../../assets/wrappers/MainUsers";
import customFetch from "../../../../utils/customFetch";

// ICONS
import { FiPlusCircle } from "react-icons/fi";
import { TbEditCircle } from "react-icons/tb";
import { MdRemoveCircleOutline } from "react-icons/md";
import { FiArrowLeftCircle } from "react-icons/fi";

import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useLoaderData, Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAdminDashboardLayoutContext } from "../../../AdminDashboardLayout";

export const loader = async () => {
  try {
    const { data } = await customFetch("/admin/main-users");
    // console.log(1, data.usersData);
    return data.usersData;
  } catch (error) {
    // return redirect("/admin");
  }
};

const MainUsers = () => {
  const users = useLoaderData();
  // console.log(users);

  // const users = useQuery(userQuery).data;
  // const { user } = useAdminDashboardLayoutContext();

  return (
    <Wrapper>
      {/* {isPageLoading ? <Loading /> : <Outlet context={{ users }} />} */}
      <section id="main-user" className="main-user section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Users</h1>
        </div>
        {/* <!-- End Section Title --> */}
        {/* <h2>{user.userUserType}</h2> */}
        <div className="container">
          <Table striped>
            <thead>
              <tr>
                <th>
                  <Link to={"/admin/add-user"}>
                    <Button
                      type="button"
                      className="btn add-user-btn main-btn"
                      variant="success"
                    >
                      <FiPlusCircle /> <span>ADD</span>
                    </Button>
                  </Link>
                </th>
                <th>Email</th>
                <th>Username</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                if (user.userIsDel == 0) {
                  return (
                    <tr key={user._id}>
                      <td>
                        <NavLink to={`/admin/edit-user/${user._id}`}>
                          <Button
                            type="button"
                            className="btn edit-user-btn main-btn"
                            variant="primary"
                          >
                            <TbEditCircle /> <span>EDIT</span>
                          </Button>
                        </NavLink>
                        <NavLink to={`/admin/del-user/${user._id}`}>
                          <Button
                            type="button"
                            className="btn del-user-btn main-btn"
                            variant="danger"
                          >
                            <MdRemoveCircleOutline /> <span>DELETE</span>
                          </Button>
                        </NavLink>
                      </td>
                      <td>{user.userEmail}</td>
                      <td>{user.userUsername}</td>
                      <td>{user.userUserType}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </Table>
          <Link to={"/admin/maintenance"} className="btn-back">
            <FiArrowLeftCircle /> Back
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};
export default MainUsers;
