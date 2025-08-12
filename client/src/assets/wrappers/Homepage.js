import styled from "styled-components";

const Wrapper = styled.section`
  margin: 0 !important;
  padding: 0 !important;
  font-size: 18px;
  background-color: var(--primary);
  font-family: var(--main-font);

  /*--------------------------------------------------------------
# Additional CSS
--------------------------------------------------------------*/
  .section-title h1 {
    color: var(--bg-primary);
  }

  h2 {
    font-size: 32px;
    margin-bottom: 24px;
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  /* FOTM */
  .fotm-section {
    background-color: var(--bg-secondary);
  }

  .fotm-section .section-title h1 {
    color: var(--secondary);
  }

  .fotm-section .fotm-container {
    background-color: var(--primary);
    box-shadow: var(--drkShadow);
    padding: 14px;
    border-radius: 400px 0 400px 0;
  }

  .fotm-section .fotm-container span {
    color: var(--bg-primary);
  }

  .fotm-container {
    box-shadow: var(--lgtShadow);
  }

  .fotm-container .fotm-img-container img {
    border-radius: 25px;
    max-width: 100%;
    max-height: 100%;
  }

  .fotm-desc-container {
    padding: 24px;
  }

  .fotm-desc-container p {
    font-size: 28px;
    font-weight: 350;
  }

  .shop-btn {
    margin-top: 14px;
    background-color: var(--bg-primary);
    font-size: 32px;
  }

  .shop-btn:hover {
    background-color: var(--secondary);
    color: var(--bg-secondary);
    font-size: 42px;
  }

  /* BEST SELLERS */
  .best-section {
    background-color: var(--primary);
  }

  .best-container {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    /* justify-content: center; */
    justify-content: space-between;
  }

  .best-container-item {
    margin-bottom: 14px;
    max-width: 300px;
    transition: all 0.3s ease;
  }

  .best-container-item:hover {
    box-shadow: var(--drkShadow);
    border-radius: 14px;
  }

  .best-container-item:hover .best-desc-container {
    padding: 10px;
    /* place-self: center; */
  }

  .best-img-container img {
    width: 100%;
    min-width: 300px;
    height: 300px;
    border-radius: 25px;
    transition: all 0.3s ease;
  }

  .best-container-item:hover img {
    width: 300px;
    border-radius: 14px 14px 0 0;
  }

  .best-desc-container {
    margin-top: 14px;
  }

  .best-desc-container p {
    max-height: 200px;
    min-height: 200px;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }

  .best-section .best-btn-container {
    justify-self: center;
  }

  .no-data-display {
    display: block !important;
    text-align: center;
    width: 100%;
  }

  /* RECIPES SECTION */
  .recipes-section {
    background-color: var(--secondary);
    height: unset;
  }

  .recipe-box {
    height: 250px;
    border: 1px solid brown;
    border-radius: 100px 0 100px 0;
    margin-bottom: 24px;
    padding: 14px;
    font-size: 24px;
    box-shadow: var(--drkShadow);
    position: relative;
  }

  .recipe-box:nth-child(odd) {
    background-color: var(--primary);
    border-radius: 0 100px 0 100px;
  }

  .recipe-box-btn {
    position: absolute;
    bottom: 14px;
    right: 14px;
  }

  .recipe-box:nth-child(even) .recipe-box-header {
    text-align: right;
  }

  .recipe-box:nth-child(even) .recipe-box-btn {
    left: 14px;
  }

  .recipe-btn {
    background-color: var(--bg-primary);
    font-size: 24px;
  }

  .recipe-btn:hover {
    background-color: var(--secondary);
    color: var(--bg-secondary);
    font-size: 32px;
  }
`;

export default Wrapper;
