import mongoose from "mongoose";
import { RECIPE_CAT } from "../utils/contants.js";

const RecipesSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      alias: "name",
    },
    recipeAuthor: {
      type: String,
      alias: "author",
    },
    recipeDesc: {
      type: String,
      alias: "desc",
    },
    recipeCat: {
      type: String,
      alias: "category",
      enum: Object.values(RECIPE_CAT),
      default: "Coffee",
    },
    recipeIsDel: {
      type: Boolean,
      alias: "isDel",
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipes", RecipesSchema);
