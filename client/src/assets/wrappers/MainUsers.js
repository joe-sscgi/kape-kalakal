import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--bg-secondary);
  font-family: var(--main-font);
  font-size: 18px;
  color: var(--primary);

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
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
