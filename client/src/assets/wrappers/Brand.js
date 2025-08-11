import styled from "styled-components";

const Wrapper = styled.section`
  padding: 0 !important;
  font-size: 18px;
  font-family: var(--main-font);
  background-color: var(--secondary);
  height: unset !important;

  .brand-section {
    background: linear-gradient(to bottom, #85521d, #e4d8cc);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .brand-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .brand-details-card {
    background: #fff;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .brand-details-card-inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .brand-name h1 {
    font-size: 2rem;
    margin: 0;
    color: #333;
  }

  .brand-info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .brand-cat span,
  .brand-desc span {
    font-size: 1rem;
    color: #555;
  }

  .brand-featured .badge {
    background-color: gold;
    color: #000;
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-weight: bold;
    font-size: 0.875rem;
    display: inline-block;
    width: fit-content;
  }

  .back-btn {
    margin-top: 2rem;
  }

  .back-btn a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s ease;
  }

  .back-btn a:hover {
    color: #0056b3;
  }
`;

export default Wrapper;
