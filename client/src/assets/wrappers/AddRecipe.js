import styled from "styled-components";
import bgImg from "../images/background/background-4.jpg";

const Wrapper = styled.section`
  background-color: var(--bg-secondary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url(${bgImg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;

  .add-recipe {
    background-color: var(--primary);
    border-radius: 10px;
    box-shadow: var(--lgtShadow);

    /* margin-top: 100px;
    margin-bottom: 100px; */
    margin-top: 40px;
    /* height: 70vh; */
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .form-input {
    margin-bottom: 24px;
  }

  /* textarea#brandDesc {
  } */

  .form-wysiwyg {
    /* margin-bottom: 14px; */
    background-color: var(--wht);
  }

  .form-select {
    margin-top: 14px;
  }

  .add-recipe-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 14px;
  }

  .add-recipe-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
    width: unset;
  }

  .add-recipe-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  /* RESPONSIVE */
  @media (max-width: 1496px) {
    .add-recipe {
      margin-top: 30px;
    }
  }

  @media (max-width: 1350px) {
    .add-recipe {
      width: 70vw;
    }
  }
`;

export default Wrapper;
