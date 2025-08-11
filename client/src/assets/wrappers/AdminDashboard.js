import styled from "styled-components";
import bgImg from "../images/background/background-1.jpg";

const Wrapper = styled.section`
  /* height: 100vh; */
  background-color: var(--bg-secondary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url(${bgImg});
  /* background-image: linear-gradient(
      to bottom,
      rgba(133, 82, 29, 0.1),
      rgba(228, 216, 204, 0.85)
    ),
    url("../src/assets/images/background/background-1.jpg"); */
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
    background-color: unset;
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

  .cis-container {
    padding: 24px;
    background-color: var(--wht);
    border-radius: 10px;
  }

  .cis-prod-card {
    border: 1px solid var(--danger);
    border-radius: 8px;
    margin-top: 12px;
    padding: 14px;
    background-color: #fff7f7;
  }

  .prod-name {
    font-weight: bold;
    color: var(--danger-dark);
  }

  .sub-header {
    font-size: 16px;
    color: var(--text-muted);
  }

  .overview-group {
    margin-bottom: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .overview-card {
    flex: 1 1 200px;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h3 {
      font-family: var(--secondary-font);
      font-size: 24px;
      margin-bottom: 14px;
    }

    p {
      font-size: 24px;
    }
  }

  .cis-search {
    width: 100%;
    max-width: 300px;
    padding: 8px;
    margin: 1rem 0;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
  }

  .pagination button {
    padding: 0.5rem 1rem;
    border-radius: 6px;
    border: none;
    background-color: #0077cc;
    color: white;
    cursor: pointer;
  }

  .pagination button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default Wrapper;
