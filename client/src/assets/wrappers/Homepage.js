import styled from "styled-components";

const Wrapper = styled.section`
  margin: 0 !important;
  padding: 0 !important;
  font-size: 18px;
  background-color: var(--bg-primary);
  font-family: var(--main-font);

  /*--------------------------------------------------------------
# Additional CSS
--------------------------------------------------------------*/
  .header .logo img {
    border-radius: 50%;
  }

  .homepage {
    background-color: var(--bg-primary);
  }

  .homepage-section-container {
    height: 85vh;
    border-radius: 25px;
    padding: 42px;
  }

  .section-title {
    color: var(--bg-primary);
  }

  /* FOTM */
  .homepage-fotm-section {
    background-color: var(--bg-primary);
  }

  .homepage-fotm-section .homepage-section-container {
    background-color: var(--primary);
    /* padding: 42px; */
    box-shadow: var(--lgtShadow);
  }

  .homepage-fotm-section .homepage-section-container span {
    color: var(--bg-primary);
  }

  .fotm-container {
    display: flex;
    /* align-items: center; */
    gap: 24px;
    padding: 24px;
    box-shadow: var(--lgtShadow);
  }

  .fotm-container .fotm-img-container img {
    width: 100%;
    border-radius: 25px;
  }

  .fotm-details-container {
    padding: 24px;
  }

  h3.fotm-prod-name {
    font-size: 32px;
    margin-bottom: 24px;
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .fotm-details-container p {
    font-size: 24px;
  }

  /* BEST SELLERS */
  .homepage-best-sellers-section {
    background-color: var(--primary);
  }

  .homepage-best-sellers-section .homepage-section-container {
    background-color: var(--bg-primary);
    /* padding: 42px; */
    box-shadow: var(--drkShadow);
  }

  .homepage-best-sellers-section .homepage-section-container h1 {
    color: var(--primary);
  }

  .homepage-best-sellers-section .homepage-section-container span {
    color: var(--accent-color);
  }

  .best-sellers-container {
    display: grid;
    grid-template-columns: 300px 300px 300px;
    grid-template-rows: 300px 300px;
    gap: 24px;
    justify-content: center;
  }

  .best-sellers-container img {
    width: 300px;
    border-radius: 25px;
  }

  /* COLLECTIONS */
  .homepage-collection-section {
    background-color: var(--bg-primary);
  }

  .homepage-collection-section .homepage-section-container {
    background-color: var(--primary);
    box-shadow: var(--lgtShadow);
  }

  .homepage-collection-section .homepage-section-container span {
    color: var(--bg-primary);
  }

  .collection-cards-container {
    display: flex;
    gap: 10px;
  }

  .collection-card-container {
    border-radius: 10px;
    background-color: var(--secondary);
    padding: 10px;
    text-align: center;
  }

  .collection-card-img {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    padding: 14px;
  }

  .collection-card-img img {
    width: 90px;
  }
`;

export default Wrapper;
