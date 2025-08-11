import styled from "styled-components";

const Wrapper = styled.section`
  padding: 0 !important;
  font-size: 18px;
  background-color: var(--secondary);
  font-family: var(--main-font);

  .brand-section {
    background: linear-gradient(to bottom, #85521d, #e4d8cc);
  }

  .section-title h1 {
    color: var(--primary);
    margin-top: 24px;
  }

  .filters-container {
    margin: 0 14px 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  /* Stack vertically on very small screens */
  @media (max-width: 480px) {
    .filters-container {
      flex-direction: column;
      align-items: stretch;
    }
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

  .brand-container {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin: 100px 0;
    justify-content: space-around;
  }

  .brand-card {
    background-color: var(--secondary);
    width: 350px;
    height: 450px;
    padding: 14px;
    border-radius: 25px 0 25px 0;
  }

  .brand-card-inner {
    width: 100%;
    height: 100%;
    border-radius: 250px 0 250px 0;
    background-color: var(--primary);
    position: relative;
    display: grid;
    place-items: center;
  }

  .brand-img img {
    width: 250px;
    height: 250px;
    margin-bottom: 24px;
    border-radius: 25px;
  }

  .brand-info {
    width: 100%;
  }

  .brand-name,
  .brand-cat {
    margin-bottom: 14px;
    color: var(--bg-primary);
  }

  .brand-name span {
    font-size: 24px;
    font-family: var(--secondary-font);
    color: var(--bg-primary);
    text-transform: capitalize;
  }

  .brand-cat span {
    color: var(--bg-primary);
    text-transform: capitalize;
  }

  .brand-info-align {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .brand-featured {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 10;
  }

  .brand-featured .badge {
    background-color: gold;
    color: #333;
    font-weight: bold;
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 0.85rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
`;

export default Wrapper;
