import styled from "styled-components";

const Wrapper = styled.section`
  /* height: 100vh; */
  background-color: var(--bg-secondary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url(../src/assets/images/background/background-4.jpg);
  background-size: cover;
  background-attachment: fixed;

  .add-prod {
    background-color: var(--primary);
    border-radius: 10px;
    box-shadow: var(--lgtShadow);

    /* margin-top: 100px;
    margin-bottom: 100px; */
    margin-top: 40px;
    height: 70vh;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .form-group {
    margin-bottom: 24px;
  }

  textarea#prodDesc {
    margin-bottom: 24px;
  }

  .form-row {
    margin-bottom: 24px;
  }

  .add-prod-buttons {
    margin-top: 24px;
  }

  .add-prod-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .add-prod-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
    width: unset;
  }

  .add-prod-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  /* RESPONSIVE */
  @media (max-width: 2560px) {
    /* .add-prod {
      margin-top: 230px;
      height: unset;
      transform: scale(1.5);
    } */
  }

  @media (max-width: 1440px) {
    .add-prod {
      height: 100%;
      transform: scale(0.75);
    }
  }

  @media (max-width: 1496px) {
    .add-prod {
      height: unset;
      transform: unset;
    }
  }
`;

export default Wrapper;
