import styled from "styled-components";

const Wrapper = styled.div`
  .header {
    /* background-color: brown !important; */
  }

  .header .logo img {
    border-radius: 50%;
  }

  .branding {
    height: 0;
    display: flex;
    align-items: center;
    padding: 5px 50px;
  }

  sub {
    color: var(--accent-color);
    margin-left: 2px;
    margin-top: 5px;
    font-weight: 700;
    font-family: var(--nav-font);
    font-size: 16px;
  }

  /* RESPONSIVE */
  @media (max-width: 320px) {
    .logo {
      display: none;
    }
  }
`;

export default Wrapper;
