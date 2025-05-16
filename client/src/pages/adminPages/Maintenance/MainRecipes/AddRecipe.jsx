import Wrapper from "../../../../assets/wrappers/AddRecipe";
import customFetch from "../../../../utils/customFetch";
import { FormRow, SubmitBtn, FormRowSelect } from "../../../../components/";
import { RECIPE_CAT } from "../../../../../../utils/contants";

import { Link, redirect, Form } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Editor from "react-simple-wysiwyg";
import { useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/admin/add-recipe", data);
    toast.success("Recipe Created successful");
    return redirect("/admin/main-recipes");
    window.location.reload();
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const AddRecipe = () => {
  const [html, setHtml] = useState();

  function onChange(e) {
    setHtml(e.target.value);
  }

  return (
    <Wrapper>
      <main className="main">
        {/* Add Recipe */}
        <section id="add-recipe" className="container add-recipe">
          {/* Section Title */}
          <div className="section-title">
            <h1>Add Recipe</h1>
          </div>
          {/* End Section Title */}

          <Form method="post" className="add-recipe-form">
            <div className="add-recipe-container">
              <FormRow
                type="text"
                id="recipeName"
                name="recipeName"
                className="form-input"
                placeholder="Recipe Name"
              />
              <FormRow
                type="text"
                id="recipeAuthor"
                name="recipeAuthor"
                className="form-input"
                placeholder="Recipe Author"
              />
              <textarea
                id="recipeDesc"
                name="recipeDesc"
                className="form-input"
                placeholder="Recipe Description"
                // rows="10"
              />
              {/* <Editor
                value={html}
                onChange={onChange}
                id="recipeDesc"
                name="recipeDesc"
                className="form-wysiwyg"
              /> */}
              <FormRowSelect
                id="recipeCat"
                name="recipeCat"
                className="form-input form-select"
                defaultValue={RECIPE_CAT.DEFAULT}
                list={Object.values(RECIPE_CAT)}
              />
              <div className="text-center add-recipe-buttons">
                <SubmitBtn className="btn add-recipe-btn add-recipe-submit" />
                <Link to={"/admin/main-recipes"}>
                  <Button
                    type="button"
                    className="btn add-recipe-btn add-recipe-back"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        </section>
        {/* /End Add Recipe */}
      </main>
    </Wrapper>
  );
};
export default AddRecipe;
