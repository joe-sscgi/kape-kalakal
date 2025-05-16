import styled from "styled-components";

const Wrapper = styled.section`
  /* height: 100vh; */
  background-color: var(--bg-secondary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url(../src/assets/images/background/background-4.jpg);
  background-size: cover;
  background-attachment: fixed;

  .prod-gallery {
    background-color: var(--primary);
    border-radius: 10px;
    box-shadow: var(--lgtShadow);

    margin-top: 40px;
    height: 70vh;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--primary);
    margin-bottom: 14px;
  }

  .section-title h3 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .prod-img-container {
    margin-bottom: 24px;
  }

  .prod-img-container img {
    max-height: 100%;
    max-width: 100%;
  }

  .prod-gallery-buttons {
    margin-top: 24px;
  }

  .prod-gallery-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .prod-gallery-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
    width: unset;
  }

  .prod-gallery-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  /* RESPONSIVE */
  @media (max-width: 2560px) {
    /* .prod-gallery {
      margin-top: 230px;
      height: unset;
      transform: scale(1.5);
    } */
  }

  @media (max-width: 1440px) {
    .prod-gallery {
      height: 100%;
      transform: scale(0.75);
    }
  }

  @media (max-width: 1496px) {
    .prod-gallery {
      height: unset;
      transform: unset;
    }
  }
`;

export default Wrapper;
