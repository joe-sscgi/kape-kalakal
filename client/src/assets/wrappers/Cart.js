import styled from "styled-components";

const Wrapper = styled.section`
  /* margin: 0 !important; */
  padding: 0 !important;
  font-size: 18px;
  background-color: var(--secondary);
  font-family: var(--main-font);
  color: var(--bg-primary);

  .cart-section {
    background: linear-gradient(to bottom, #85521d, #e4d8cc);
  }

  .section-title h1 {
    color: var(--primary);
    margin-top: 24px;
  }

  .cart-container {
    margin: 0 24px;
  }

  .cart-header {
    /* display: flex; */
    /* justify-content: space-around; */
    margin-bottom: 24px;
    display: grid;

    grid-template-columns: 20% 20% 20% 20% 20%;
  }

  .cart-header h3 {
    font-family: var(--secondary-font);
  }

  .header-qty,
  .header-price,
  .header-action {
    text-align: center;
  }

  .cart-info {
    /* display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 14px;
    color: var(--bg-primary);
    gap: 14px; */

    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    margin-bottom: 14px;
  }

  .cart-info span {
    font-size: 24px;
  }

  .cart-name {
    word-break: break-all;
  }

  .cart-qty {
    display: flex;
    gap: 14px;
    margin-right: 14px;
    height: 50px;
    width: 150px;
    justify-self: center;
  }

  .cart-price {
    text-align: right;
    margin-right: 24px;
  }

  .cart-btn {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  .cart-btn:hover {
    background-color: var(--secondary);
    color: var(--bg-secondary);
  }

  .cart-prod-img img {
    height: 150px;
    width: 150px;
  }

  .cart-add-to-cart-btn {
    text-align: center;
  }

  .cart-checkout {
    margin: 0 24px;
    float: right;
  }

  .btn-checkout {
    background-color: var(--bg-secondary);
  }

  .btn-checkout:hover {
    background-color: var(--secondary);
  }
`;
export default Wrapper;
