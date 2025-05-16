import Wrapper from "../../../../assets/wrappers/EditRecipe";
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
    await customFetch.patch(`/admin/edit-recipe/${params.id}`, data);

    toast.success("Recipe edited successfully");
    return redirect("/admin/main-recipes");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditRecipe = () => {
  const recipe = useLoaderData();

  return (
    <Wrapper>
      <main className="main">
        {/* Edit Recipe */}
        <section id="edit-recipe" className="container edit-recipe">
          {/* Section Title */}
          <div className="section-title">
            <h1>Edit Recipe</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="edit-recipe-form">
            <div className="edit-recipe-container">
              <FormRow
                type="text"
                id="recipeID"
                name="recipeID"
                className="form-input hidden"
                placeholder="recipeID"
                defaultValue={recipe._id}
              />
              <FormRow
                type="text"
                id="recipeName"
                name="recipeName"
                className="form-input"
                placeholder="Recipe Name"
                defaultValue={recipe.recipeName}
              />
              <FormRow
                type="text"
                id="recipeAuthor"
                name="recipeAuthor"
                className="form-input"
                placeholder="Recipe Author"
                defaultValue={recipe.recipeAuthor}
              />
              <textarea
                id="recipeDesc"
                name="recipeDesc"
                className="form-input"
                placeholder="Recipe Description"
                // rows="10"
                defaultValue={recipe.recipeDesc}
              />
              <FormRowSelect
                name="recipeCat"
                className="form-input"
                defaultValue={recipe ? recipe.recipeCat : RECIPE_CAT.DEFAULT}
                list={Object.values(RECIPE_CAT)}
              />
              <div className="text-center edit-recipe-buttons">
                <SubmitBtn
                  className="btn edit-recipe-btn edit-recipe-submit"
                  buttonText="Update"
                />
                <Link to={"/admin/main-recipes"}>
                  <Button
                    type="button"
                    className="btn edit-recipe-btn edit-recipe-back"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        </section>
        {/* /End Edit Recipe */}
      </main>
    </Wrapper>
  );
};
export default EditRecipe;
