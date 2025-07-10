// IMPORTS REACT
import { createContext, useContext } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

// IMPORT PAGES
import Wrapper from "../assets/wrappers/RecipeLayout";
import customFetch from "../utils/customFetch";
import { Loading } from "../components";

const RecipeLayoutContext = createContext();

const RecipeLayout = () => {
  //   const userData = useLoaderData().userData;
  const isPageLoading = navigation.state === "loading";

  return (
    <RecipeLayoutContext.Provider value={{}}>
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
    </RecipeLayoutContext.Provider>
  );
};
export const useRecipeLayoutContext = () => useContext(RecipeLayoutContext);
export default RecipeLayout;
