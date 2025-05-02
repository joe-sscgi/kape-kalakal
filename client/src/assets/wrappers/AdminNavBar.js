import styled from "styled-components";

const Wrapper = styled.div`
  /* RESPONSIVE */
  @media (max-width: 1199px) {
    .mobile-nav-active .navmenu {
      width: 50vw;
      height: 50vh;
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
