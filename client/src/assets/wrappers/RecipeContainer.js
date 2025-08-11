import styled from "styled-components";

const Wrapper = styled.section`
  /* margin: 0 !important; */
  padding: 0 !important;
  font-size: 18px;
  background-color: var(--secondary);
  font-family: var(--main-font);
  color: var(--bg-primary);

  .recipe-section {
    background: linear-gradient(to bottom, #85521d, #e4d8cc);
    color: var(--bg-secondary);
  }

  .section-title h1 {
    color: var(--primary);
    margin-top: 24px;
  }

  .recipe-card {
    background-color: var(--secondary);
    padding: 24px;
    border-radius: 25px 0 25px 0;
    margin-bottom: 24px;
    position: relative;
    transition: border-radius 0.3s ease;
  }

  .recipe-card:hover {
    border-radius: 0 25px 0 25px;
  }

  .recipe-name h3 {
    font-family: var(--secondary-font);
    margin-bottom: 14px;
    color: var(--bg-secondary);
  }

  .recipe-name h3::first-letter {
    font-family: var(--heading-font);
    font-size: 34px;
    color: var(--bg-primary);
  }

  .recipe-author {
    margin-bottom: 54px;
    font-size: 20px;
    font-family: var(--main-font);
  }

  .recipe-view-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 24px;
    transition: border-radius 0.3s ease;
  }

  .view-recipe-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
    font-size: 20px;
    border-radius: 25px 0 25px 0;
  }

  .view-recipe-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--secondary);
    font-size: 24px;
    border-radius: 0 25px 0 25px;
  }

  .btn-back {
    color: var(--bg-primary);
  }

  .btn-back:hover {
    color: var(--bg-secondary);
    font-weight: 700;
  }
`;

export default Wrapper;
