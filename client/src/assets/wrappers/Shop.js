import styled from "styled-components";

const Wrapper = styled.section`
  /* margin: 0 !important; */
  padding: 0 !important;
  font-size: 18px;
  background-color: var(--secondary);
  font-family: var(--main-font);

  /* .header .fixed-top {
    background-color: var(--bg-primary) !important;
  } */

  .shop-section {
    /* background-color: var(--primary); */
    background: linear-gradient(to bottom, #85521d, #e4d8cc);
  }

  .section-title h1 {
    color: var(--primary);
  }

  .shop-container {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  .shop-prod-card {
    background-color: var(--secondary);
    width: 350px;
    height: 450px;
    padding: 14px;
    border-radius: 25px 0 25px 0;
  }

  .shop-prod-card-inner {
    width: 100%;
    height: 100%;
    border-radius: 250px 0 250px 0;
    background-color: var(--primary);
    justify-items: center;
  }

  .shop-prod-img img {
    width: 250px;
    height: 250px;
    margin-bottom: 24px;
    border-radius: 25px;
  }

  .shop-prod-name,
  .shop-prod-cat {
    margin-bottom: 14px;
  }

  .shop-prod-name span {
    font-size: 24px;
    font-family: var(--secondary-font);
  }

  .shop-prod-info-align {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Optional: vertically align items */
    gap: 1rem; /* Optional: spacing between the two sections */
    width: 100%;
  }

  .shop-prod-price span {
    font-size: 24px;
    font-family: var(--secondary-font);
  }

  .add-to-cart-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
  }

  .add-to-cart-btn:hover {
    background-color: var(--secondary);
    color: var(--bg-secondary);
  }
`;
export default Wrapper;
