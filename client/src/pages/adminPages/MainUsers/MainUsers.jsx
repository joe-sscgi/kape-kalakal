import Wrapper from "../../../assets/wrappers/MainUsers";

// ICONS
import { FiPlusCircle } from "react-icons/fi";
import { TbEditCircle } from "react-icons/tb";
import { MdRemoveCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
  Link,
} from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import customFetch from "../../../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["userLists"],
  queryFn: async () => {
    const { data } = await customFetch.get("/admin/main-users");
    return data.usersData;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/admin");
  }
};

const MainUsers = () => {
  const users = useQuery(userQuery).data;

  return (
    <Wrapper>
      {/* {isPageLoading ? <Loading /> : <Outlet context={{ users }} />} */}
      <section id="main-user" className="main-user section">
        {/* <!-- Section Title --> */}
        <div className="container section-title">
          <h1>Users</h1>
        </div>
        {/* <!-- End Section Title --> */}

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
                return (
                  <tr>
                    <td>
                      <Link to={`/admin/edit-user/${user._id}`}>
                        <Button
                          type="button"
                          className="btn edit-user-btn main-btn"
                          variant="primary"
                        >
                          <TbEditCircle /> <span>EDIT</span>
                        </Button>
                      </Link>
                      <Link to={`/admin/del-user/${user._id}`}>
                        <Button
                          type="button"
                          className="btn del-user-btn main-btn"
                          variant="danger"
                        >
                          <MdRemoveCircleOutline /> <span>DELETE</span>
                        </Button>
                      </Link>
                    </td>
                    <td>{user.userEmail}</td>
                    <td>{user.userUsername}</td>
                    <td>{user.userUserType}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </section>
    </Wrapper>
  );
};
export default MainUsers;
