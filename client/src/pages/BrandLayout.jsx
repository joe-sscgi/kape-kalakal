// IMPORTS REACT
import { createContext, useContext } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

// IMPORT PAGES
import Wrapper from "../assets/wrappers/RecipeLayout";
import customFetch from "../utils/customFetch";
import { Loading } from "../components";

const BrandLayoutContext = createContext();

const BrandLayout = () => {
  //   const userData = useLoaderData().userData;
  const isPageLoading = navigation.state === "loading";

  return (
    <BrandLayoutContext.Provider value={{}}>
      <Wrapper>
        <div>
          <main className="client-dashboard">
            <div>
              <div className="client-dashboard-page">
                {isPageLoading ? (
                  <Loading />
                ) : (
                  //   <Outlet context={{ userData }} />
                  <Outlet />
                )}
              </div>
            </div>
          </main>
        </div>
      </Wrapper>
    </BrandLayoutContext.Provider>
  );
};
export const useBrandLayoutContext = () => useContext(BrandLayoutContext);
export default BrandLayout;
