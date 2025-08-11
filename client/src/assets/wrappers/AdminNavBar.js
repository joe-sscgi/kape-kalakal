import styled from "styled-components";

const Wrapper = styled.div`
  .dropdown-toggle::after {
    content: none !important;
  }

  button.nav-link.dropdown-toggle {
    font-size: 18px;
    font-family: var(--nav-font);
  }

  .dropdown-wrapper:hover > .nav-link.dropdown-toggle {
    font-size: 32px;
    font-family: var(--secondary-font);
  }

  .nav-link.dropdown-toggle {
    transition: all 0.2s ease;
  }

  .dropdown-menu {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 232px;
  }

  .dropdown-menu .nav-link {
    font-size: 18px;
    color: var(--bg-secondary);
  }

  .dropdown-menu .nav-link:hover {
    font-size: 18px;
    color: var(--bg-secondary) !important;
  }

  /* RESPONSIVE */
  @media (max-width: 1199px) {
    .mobile-nav-active .navmenu {
      width: 50vw;
      height: 60vh;
      justify-self: flex-end;
    }
  }

  @media (max-width: 475px) {
    .mobile-nav-active .navmenu {
      width: 100vw;
      height: 50vh;
      justify-self: flex-end;
    }
  }

  @media (max-width: 320px) {
    .nav-links .nav-link {
      color: var(--bg-primary);
    }
  }
`;

export default Wrapper;
