import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { FiArrowLeftCircle } from "react-icons/fi";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/RecipeContainer";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/dashboard/recipes/recipe-container/${params.type}`
    );
    data.type = params.type;
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // return redirect("/admin/main-products");
  }
};

const RecipeContainer = () => {
  const recipes = useLoaderData().recipe;
  const type = useLoaderData().type;
  //   console.log(useLoaderData());

  return (
    <Wrapper>
      <section id="recipe" className="recipe section recipe-section">
        <div className="section-title">
          <h1>{type}</h1>
        </div>

        <div className="container">
          <div className="recipe-container">
            {recipes.length === 0 ? (
              <p>No Recipes found.</p>
            ) : (
              recipes.map((recipe) => {
                return (
                  <div className="recipe-card" key={recipe._id}>
                    <div className="recipe-card-inner">
                      <div className="recipe-info">
                        <div className="recipe-name">
                          <h3>{recipe.recipeName}</h3>
                        </div>
                        <div className="recipe-author">
                          <span>{recipe.recipeAuthor}</span>
                        </div>
                        <div className="recipe-view-btn">
                          <Link to={`${recipe._id}`}>
                            <button className="btn view-recipe-btn">
                              View Recipe
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <Link to={"/dashboard/recipes"} className="btn-back">
            <FiArrowLeftCircle /> Back
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};
export default RecipeContainer;
