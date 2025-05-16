import Wrapper from "../../../../assets/wrappers/DelRecipe";
import customFetch from "../../../../utils/customFetch";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components/";
import { RECIPE_CAT } from "../../../../../../utils/contants";

import { Link, redirect, Form, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/admin/edit-recipe/${params.id}`);
    return data.recipeData;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    // return redirect("/admin/main-recipes");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.delete(`/admin/edit-recipe/${params.id}`, data);

    toast.success("Recipe edited successfully");
    return redirect("/admin/main-recipes");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const DelRecipe = () => {
  const recipe = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        {/* Del Recipe */}
        <section id="del-recipe" className="container del-recipe">
          {/* Section Title */}
          <div className="section-title">
            <h1>Delete Recipe</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="del-recipe-form">
            <div className="del-recipe-container">
              <FormRow
                type="text"
                id="recipeID"
                name="recipeID"
                className="form-input hidden"
                placeholder="recipeID"
                defaultValue={recipe._id}
                dis={"true"}
              />
              <FormRow
                type="text"
                id="recipeName"
                name="recipeName"
                className="form-input"
                placeholder="Recipe Name"
                defaultValue={recipe.recipeName}
                dis={"true"}
              />
              <FormRow
                type="text"
                id="recipeAuthor"
                name="recipeAuthor"
                className="form-input"
                placeholder="Recipe Author"
                defaultValue={recipe.recipeAuthor}
                dis={"true"}
              />
              <textarea
                id="recipeDesc"
                name="recipeDesc"
                className="form-input"
                placeholder="Recipe Description"
                // rows="10"
                defaultValue={recipe.recipeDesc}
                disabled
              />
              <FormRowSelect
                name="recipeCat"
                className="form-input"
                defaultValue={recipe ? recipe.recipeCat : RECIPE_CAT.DEFAULT}
                list={Object.values(RECIPE_CAT)}
                dis={"true"}
              />
              <div className="text-center del-recipe-buttons">
                <SubmitBtn
                  className="btn del-recipe-btn del-recipe-submit"
                  buttonText="Update"
                />
                <Link to={"/admin/main-recipes"}>
                  <Button
                    type="button"
                    className="btn del-recipe-btn del-recipe-back"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        </section>
        {/* /End Del Recipe */}
      </main>
    </Wrapper>
  );
};
export default DelRecipe;
