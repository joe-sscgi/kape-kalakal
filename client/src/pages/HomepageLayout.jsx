// IMPORTS REACT
import { createContext, use, useContext, useEffect, useState } from "react";
import {
  Outlet,
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useLoaderData,
} from "react-router-dom";

// IMPORT PAGES
import Wrapper from "../assets/wrappers/HomepageLayout";
import customFetch from "../utils/customFetch";
import { Header, Loading, Footer } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/dashboard/get-data");
    return data;
  } catch (error) {
    // return redirect("/admin");
    console.log(error);
  }
};

const HomepageLayoutContext = createContext();

const HomepageLayout = () => {
  const { homepageData } = useLoaderData();
  const { userData, cartData } = homepageData;
  const cartCtr = cartData.length;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const [isMobileActive, setMobileActive] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);

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
    <HomepageLayoutContext.Provider
      value={{
        userData,
        homepageData,
        cartCtr,
        toggleMobileNavbar,
        isMobileActive,
        logoutUser,
      }}
    >
      <Wrapper>
        <Header />
        <div
        // className="scrolled header fixed-top"{
        //   isScrolled ? "scrolled header fixed-top" : "header fixed-top"
        // }
        >
          <main className="client-dashboard">
            <div>
              <div className="client-dashboard-page">
                {isPageLoading ? (
                  <Loading />
                ) : (
                  <Outlet context={{ userData }} />
                )}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </Wrapper>
    </HomepageLayoutContext.Provider>
  );
};
export const useHomepageLayoutContext = () => useContext(HomepageLayoutContext);
export default HomepageLayout;
