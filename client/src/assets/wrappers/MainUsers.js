import styled from "styled-components";

const Wrapper = styled.section`
  /* background-color: var(--bg-secondary); */
  font-family: var(--main-font);
  font-size: 18px;
  color: var(--primary);

  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.19),
      rgb(116 35 35 / 75%)
    ),
    url("../src/assets/images/background/background-users.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  .main-user {
    background-color: unset;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--primary);
  }

  .main-btn {
    font-family: var(--main-font);
    font-size: 18px;
    /* color: var(--bg-primary); */
    margin: 0;
    margin-right: 10px;
  }

  .add-user-btn {
    /* background-color: transparent; */
    /* background-color: var(--bs-primary-bg-subtle); */
  }

  .add-user-btn span {
    text-align: center;
  }

  td {
    align-content: center;
  }

  .btn-back {
  }

  /* RESPONSIVE */

  @media (max-width: 426px) {
    td .main-btn {
      margin-bottom: 14px;
    }
    td .main-btn.del-user-btn {
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    .main-btn span {
      display: none;
    }
  }
`;

export default Wrapper;
