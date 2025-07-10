import styled from "styled-components";

const Wrapper = styled.section`
  /* height: 100vh; */
  background-color: var(--bg-secondary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url("../src/assets/images/background/background-1.jpg");
  background-size: cover;
  background-attachment: fixed;

  .admin-dashboard-container {
    margin-top: 100px;
    margin-bottom: 100px;
  }

  .admin-dashboard-container h1 {
    color: var(--primary);
    font-family: var(--secondary-font);
    text-align: center;
    margin-bottom: 14px;
  }

  .critical-items-section {
    border-radius: 25px 0 25px 0;
  }

  .cis-container h2 {
    font-family: var(--secondary-font);
    margin-bottom: 14px;
  }

  .cis-container .sub-header {
    font-family: var(--secondary-font);
  }

  .cis-prod-card {
    margin-top: 14px;
    font-size: 20px;
  }

  .prod-name {
    font-size: 24px;
  }

  .prod-info {
    display: block;
    margin-top: 5px;
  }
`;

export default Wrapper;
