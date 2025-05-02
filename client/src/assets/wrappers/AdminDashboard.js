import styled from "styled-components";

const Wrapper = styled.section`
  height: 100vh;
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url(src/assets/images/background/background-1.jpg);
  background-size: cover;
  /* background-color: var(--bg-secondary); */

  .admin-dashboard-container {
    margin-top: 100px;
    margin-bottom: 100px;
  }

  .admin-dashboard-container h1 {
    color: var(--primary);
    font-family: var(--secondary-font);
    text-align: center;
  }
`;

export default Wrapper;
