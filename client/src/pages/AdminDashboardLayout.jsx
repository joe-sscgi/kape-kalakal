import {
  Outlet,
  redirect,
  useNavigate,
  useNavigation,
  useLoaderData,
} from "react-router-dom";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";
import { Header, Loading, Footer } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/admin/current-user");

    if (data?.user?.userUserType?.toLowerCase() === "customer") {
      toast.error("Unauthorized access! Redirecting to dashboard.");
      return redirect("/dashboard");
    }
    return data;
  } catch (error) {
    // toast.error("Unauthorized access! Redirecting to dashboard.");
    // return redirect("/dashboard");
  }
};

const AdminDashboardLayoutContext = createContext();

const AdminDashboardLayout = () => {
  const { user } = useLoaderData();

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobileActive, setMobileActive] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleMobileNavbar = () => {
    if (!isMobileActive) {
      setMobileActive(true);
    } else {
      setMobileActive(false);
    }
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    // queryClient.invalidateQueries();
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
        toggleMobileNavbar,
        isMobileActive,
        logoutUser,
      }}
    >
      <Header />
      <main className="dashboard">
        <div>
          <div className="dashboard-page">
            {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
          </div>
        </div>
      </main>
      <Footer />
    </AdminDashboardLayoutContext.Provider>
  );
};
export const useAdminDashboardLayoutContext = () =>
  useContext(AdminDashboardLayoutContext);
export default AdminDashboardLayout;
