import styled from "styled-components";

const Wrapper = styled.section`
  height: 100vh;
  background-color: var(--bg-secondary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url("../src/assets/images/background/background-4.jpg");
  background-size: cover;
  background-position: center;
  /* background-repeat: no-repeat; */
  background-attachment: fixed;
  /* background-size: 100% 100%; */

  .add-user {
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

  .form-group {
    margin-bottom: 24px;
  }

  .add-user-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .add-user-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
    width: unset;
  }

  .add-user-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  /* RESPONSIVE */
  /* @media (max-width: 2560px) {
    .add-user {
      margin-top: 220px;
      height: unset;
      transform: scale(1.5);
    }
  } */

  /* @media (max-width: 1496px) {
    .add-user {
      height: unset;
      margin-top: 190px;
    }
  }

  @media (max-width: 1350px) {
    .add-user {
      width: 70vw;
    }
  } */
`;

export default Wrapper;
