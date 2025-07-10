import styled from "styled-components";

const Wrapper = styled.section`
  font-family: var(--main-font);
  font-size: 18px;
  color: var(--primary);

  background: linear-gradient(to bottom, #85521d, #e4d8cc);

  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.19),
      rgb(116 35 35 / 75%)
    ),
    url("../../src/assets/images/background/background-maintenance.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  .utils-dashboard {
    background-color: unset;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--primary);
  }

  .side-bar-btn {
    font-family: var(--main-font);
    font-size: 18px;
    margin: 0;
    margin-right: 10px;
    background-color: var(--bg-secondary);
  }

  .side-bar-btn:hover {
    color: var(--primary);
    background-color: var(--bg-primary);
  }

  /* RESPONSIVE */

  @media (max-width: 426px) {
    td .side-bar-btn {
      margin-bottom: 14px;
    }
    td .side-bar-btn.del-user-btn {
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    .side-bar-btn span {
      display: none;
    }
  }
`;

export default Wrapper;
