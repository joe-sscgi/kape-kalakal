import {
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
  Link,
} from "react-router-dom";

import { createContext, useContext, useEffect, useState } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import { Header, BigSidebar, SmallSidebar, Loading } from "../components";
import LogoutContainer from "../components/logoutContainer";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const AdminDashboardLayoutContext = createContext();

const AdminDashboardLayout = ({ queryClient }) => {
  const { user } = useQuery(userQuery).data;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("Logging out...");
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    toast.warning("Unathorized Access! Please Log In");
    logoutUser();
  }, [isAuthError]);

  return (
    <AdminDashboardLayoutContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Header />
      <main className="dashboard">
        {/* <SmallSidebar /> */}
        {/* <BigSidebar /> */}
        <div>
          <div className="dashboard-page">
            {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
          </div>
        </div>
      </main>
    </AdminDashboardLayoutContext.Provider>
  );
};
export const useAdminDashboardLayoutContext = () =>
  useContext(AdminDashboardLayoutContext);
export default AdminDashboardLayout;
