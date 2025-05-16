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
    url("../src/assets/images/background/background-maintenance.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  .main-dashboard {
    background-color: unset;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--primary);
  }

  .maintenance-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
  }

  .main-btn {
    font-family: var(--main-font);
    font-size: 18px;
    /* color: var(--bg-primary); */
    margin: 0;
    margin-right: 10px;
    background-color: var(--bg-secondary);
    width: 25vw;
  }

  .main-btn:hover {
    color: var(--primary);
    background-color: var(--bg-primary);
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
