import styled from "styled-components";
import bgImg from "../images/background/background-4.jpg";

const Wrapper = styled.section`
  background-color: var(--bg-secondary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url(${bgImg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;

  .prod-imgs {
    background-color: var(--primary);
    border-radius: 10px;
    box-shadow: var(--lgtShadow);

    margin-top: 40px;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
    margin-bottom: 14px;
  }

  .section-title h3 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-row {
    margin-bottom: 24px;
  }

  .prod-imgs-buttons {
    margin-top: 24px;
  }

  .prod-imgs-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .prod-imgs-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
    width: unset;
  }

  .prod-imgs-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  /* MODAL */
  .modal .prod-img-gallery .prod-img-container img {
    height: 100px !important;
  }

  /* RESPONSIVE */
  @media (max-width: 2560px) {
    /* .prod-imgs {
      margin-top: 230px;
      height: unset;
      transform: scale(1.5);
    } */
  }

  @media (max-width: 1440px) {
    .prod-imgs {
      height: 100%;
      transform: scale(0.75);
    }
  }

  @media (max-width: 1496px) {
    .prod-imgs {
      height: unset;
      transform: unset;
    }
  }
`;

export default Wrapper;
