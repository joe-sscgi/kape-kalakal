import styled from "styled-components";

const Wrapper = styled.section`
  margin: 0 !important;
  padding: 0 !important;
  font-size: 18px;
  background-color: var(--secondary);
  font-family: var(--main-font);
  color: var(--bg-primary);

  .recipe-section {
    background-image: linear-gradient(
        to top,
        rgba(74, 185, 14, 0.19),
        rgb(116 35 35 / 75%)
      ),
      url(../src/assets/images/background/background-recipes.jpg);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    /* height: 100vh; */

    /* background: linear-gradient(to bottom, #85521d, #e4d8cc); */
  }

  .section-title h1 {
    color: var(--primary);
    margin-top: 24px;
  }

  .recipe-card,
  .recipe-cat,
  .recipe-cat-desc,
  .recipe-view-btn {
    margin-bottom: 24px;
  }

  .recipe-card:nth-child(odd) {
    margin-left: 200px;
  }
  .recipe-card:nth-child(even) {
    margin-right: 200px;
  }

  .recipe-card {
    background-color: var(--secondary);
    padding: 24px;
    border-radius: 35px 0 35px 0;
    position: relative;
  }

  .recipe-cat h2 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .recipe-cat h2::first-letter {
    font-family: var(--heading-font);
    font-size: 60px;
    color: var(--accent-color);
  }

  .recipe-cat-desc p {
    font-size: 24px;
    margin-bottom: 60px;
    color: var(--bg-secondary);
  }

  .recipe-cat-desc p::first-letter {
    font-family: var(--heading-font);
    font-size: 32px;
  }

  .recipe-view-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    margin-right: 24px;
  }

  .view-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
    border-radius: 25px 0 25px 0;
    font-size: 20px;
  }

  .view-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--secondary);
    border-radius: 0 25px 0 25px;
  }
`;

export default Wrapper;
