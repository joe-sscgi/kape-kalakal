import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;

  .main-btn {
    border-radius: 5px;
  }

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    background-color: transparent;
    font-size: 18px;
  }
  .logout-btn:hover {
    background-color: var(--bg-secondary);
  }

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    visibility: hidden;
    border-radius: var(--border-radius);
    /* background: var(--primary-500); */
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }

  .dropdown-btn:hover {
    background-color: var(--bg-secondary);
  }

  @media (max-width: 1199px) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .mobile-nav-active .navmenu {
      width: 70vw !important;
      height: 60vh;
    }

    .main-btn {
      color: var(--bg-primary);
      border: 0;
    }

    .dropdown {
      position: unset;
      top: unset;
      left: unset;
      width: unset;
    }
  }
`;

export default Wrapper;
