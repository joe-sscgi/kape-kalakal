import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { FiArrowLeftCircle } from "react-icons/fi";

import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/RecipeDetail";
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(
      `/dashboard/recipes/recipe-container/${params.type}/${params.id}`
    );
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // return redirect("/admin/main-products");
  }
};

const RecipeDetail = () => {
  const recipe = useLoaderData().recipe;
  //   console.log(useLoaderData());
  let type = "";
  if (recipe.recipeCat == "Coffee") {
    type = "coffee";
  } else if (recipe.recipeCat == "Non-Coffee") {
    type = "non-coffee";
  } else if (recipe.recipeCat == "Kashi Pastry") {
    type = "pastry";
  }

  return (
    <Wrapper>
      <section id="recipe" className="recipe section recipe-section">
        <div className="section-title">
          <h1>{recipe.recipeCat}</h1>
        </div>

        <div className="container">
          <div className="recipe-container">
            <div className="recipe-card" key={recipe._id}>
              <div className="recipe-card-inner">
                <div className="recipe-info">
                  <div className="recipe-name">
                    <h3>{recipe.recipeName}</h3>
                  </div>
                  <div className="recipe-author">
                    <span>{recipe.recipeAuthor}</span>
                  </div>
                  <div className="recipe-desc">
                    <pre style={{ whiteSpace: "pre-wrap", overflow: "hidden" }}>
                      {recipe.recipeDesc}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link
            to={`/dashboard/recipes/recipe-container/${type}`}
            className="btn-back"
          >
            <FiArrowLeftCircle /> Back
          </Link>
        </div>
      </section>
    </Wrapper>
  );
};
export default RecipeDetail;
