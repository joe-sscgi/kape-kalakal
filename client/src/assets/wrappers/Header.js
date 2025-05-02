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

  /* RESPONSIVE */
  @media (max-width: 320px) {
    .logo {
      display: none;
    }
  }
`;

export default Wrapper;
