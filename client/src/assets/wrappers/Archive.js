import styled from "styled-components";

const Wrapper = styled.section`
  background: unset;

  .archive {
    width: 95%;
    place-self: center;
    background-color: var(--primary);
    border-radius: 25px;
    box-shadow: var(--lgtShadow);
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .filters-container {
    margin: 0 14px 1rem;
    display: flex;
    gap: 1rem;
  }

  .pagination-controls {
    margin-top: 1rem;
    text-align: center;
  }

  .pagination-controls span {
    margin: 0 1rem;
  }

  .pagination-controls .page-btn {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  .pagination-controls .page-btn:hover {
    background-color: var(--secondary);
    color: var(--bg-secondary);
  }

  .main-btn {
    font-family: var(--main-font);
    font-size: 18px;
    margin: 0;
    margin-right: 10px;
  }

  td {
    align-content: center;
  }
  /* RESPONSIVE */

  @media (max-width: 426px) {
    td .main-btn {
      margin-bottom: 14px;
    }
    td .main-btn.del-brand-btn {
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
