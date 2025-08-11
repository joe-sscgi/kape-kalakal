import styled from "styled-components";
import bgImg from "../images/background/background-2.jpg";

const Wrapper = styled.section`
  background-color: var(--bg-secondary);
  font-family: var(--main-font);
  font-size: 18px;
  color: var(--bg-primary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url(${bgImg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  .fotm-prod,
  .best-prod,
  .feat-brand {
    margin: 100px 24px;
    padding: 24px;
    border-radius: 25px 0 25px 0;
    box-shadow: var(--lgtShadow);
  }

  .section-title {
    padding-bottom: 12px;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .manage-content-info h3,
  p {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
    text-align: center;
    margin-bottom: 14px;
  }

  .prod-col {
    padding: 14px;
  }

  td {
    align-content: center;
  }

  .best-prod {
    background-color: var(--secondary);
    color: var(--bg-secondary);
  }

  .best-prod .section-title h1 {
    color: var(--bg-secondary);
  }

  .best-prod .manage-content-info h3,
  p {
    font-family: var(--secondary-font);
    color: var(--bg-secondary);
    text-align: center;
  }

  /* RESPONSIVE */
  @media (max-width: 426px) {
    td .main-btn {
      margin-bottom: 14px;
    }
    td .main-btn.del-prod-btn {
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    .main-btn span {
      display: none;
    }
  }
`;

export default Wrapper;
