import { Link } from "react-router-dom";

import Wrapper from "../assets/wrappers/Recipe";

const Recipe = () => {
  return (
    <Wrapper>
      <section id="recipe" className="recipe section recipe-section">
        <div className="section-title">
          <h1>Recipe</h1>
        </div>

        <div className="container">
          <div className="recipe-section-container">
            <div className="recipe-card-container">
              <div className="recipe-card">
                <div className="recipe-cat">
                  <h2>Coffee</h2>
                </div>
                <div className="recipe-cat-desc">
                  <p>
                    Home brewed coffee can just be as delicious as the ones you
                    buy at the cafe. With some simple brew gears and the right
                    recipe, you can recipe, you can recreate your Kurasu cafe
                    experience at home.
                  </p>
                </div>
                <div className="recipe-view-btn">
                  <Link to={"recipe-container/coffee"}>
                    <button className="btn view-btn">View Recipes</button>
                  </Link>
                </div>
              </div>
              <div className="recipe-card">
                <div className="recipe-cat">
                  <h2>Non-Coffee</h2>
                </div>
                <div className="recipe-cat-desc">
                  <p>
                    At Kurasu we also serve delicious non-coffee beverages. We
                    are happy to share some of the recipes so you can recreate
                    them at home.
                  </p>
                </div>
                <div className="recipe-view-btn">
                  <Link to={"recipe-container/non-coffee"}>
                    <button className="btn view-btn">View Recipes</button>
                  </Link>
                </div>
              </div>
              <div className="recipe-card">
                <div className="recipe-cat">
                  <h2>Kashi Pastry</h2>
                </div>
                <div className="recipe-cat-desc">
                  <p>
                    Missing some cafe treats that you enjoyed while you were in
                    Kyoto? Recreate some of them at home with these recipes.
                  </p>
                </div>
                <div className="recipe-view-btn">
                  <Link to={"recipe-container/pastry"}>
                    <button className="btn view-btn">View Recipes</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};
export default Recipe;
