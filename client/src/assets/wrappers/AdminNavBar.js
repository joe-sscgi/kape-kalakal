import styled from "styled-components";

const Wrapper = styled.div`
  .dropdown-toggle::after {
    content: none !important;
  }

  button.nav-link.dropdown-toggle {
    font-size: 18px;
    font-family: var(--nav-font);
    font-weight: 500;
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

  /* ===== MOBILE FIXES ===== */
  @media (max-width: 1199px) {
    && .mobile-nav-active .navmenu {
      width: 50vw;
      height: 60vh;
      justify-self: flex-end;
    }

    && .nav-link {
      padding: 10px 20px;
    }

    && .nav-item {
      justify-items: right;
    }

    && .dropdown-menu {
      /* background-color: transparent; */
      align-items: flex-end;
    }

    /* Force alignment + color + font override */
    && .mobile-nav-active .navmenu .nav-link {
      font-size: 18px !important;
      color: var(--bg-secondary) !important;
      text-align: right !important;
    }
  }

  @media (max-width: 475px) {
    && .mobile-nav-active .navmenu {
      width: 100vw;
      height: 50vh;
      justify-self: flex-end;
    }

    && .mobile-nav-active .navmenu .nav-link {
      font-size: 18px !important;
      color: var(--bg-secondary) !important;
      text-align: right !important;
    }
  }

  @media (max-width: 320px) {
    && .nav-links .nav-link {
      color: var(--bg-primary) !important;
      text-align: right !important;
    }
  }
`;

export default Wrapper;
