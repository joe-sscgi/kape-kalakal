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

  .cart-outer-container {
    margin: 0 24px;
    background-color: var(--primary);
    padding: 14px;
    border: 1px solid var(--bg-primary);
    box-shadow: var(--lgtShadow);
  }

  .cart-header {
    /* display: flex; */
    /* justify-content: space-around; */
    margin-bottom: 24px;
    display: grid;

    grid-template-columns: 10% 58% 12% 10% 10%;
  }

  .cart-header h4 {
    font-family: var(--secondary-font);
  }

  .header-qty {
    text-align: center;
  }

  .header-price,
  .header-total,
  .header-price {
    text-align: right;
  }
  .cart-info {
    /* display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 14px;
    color: var(--bg-primary);
    gap: 14px; */

    display: grid;
    grid-template-columns: 10% 58% 12% 10% 10%;

    margin-bottom: 14px;
    align-items: center;
  }

  .cart-info span {
    font-size: 20px;
  }

  .cart-prod {
    display: flex;
    gap: 14px;
    align-items: center;
  }

  .cart-name {
    word-break: break-all;
  }

  .cart-qty {
    display: flex;
    /* gap: 14px; */
    /* margin-right: 14px; */
    height: 50px;
    width: 150px;
    justify-self: center;
    justify-content: center;
  }

  .cart-qty-btn {
    width: 30px;
    min-width: 30px;
  }

  .cart-inc-qty-btn {
    border-radius: 5px 0 0 5px;
  }

  .form-control {
    border-radius: 0px;
    border-style: none;
    width: 60px;
  }

  .form-control:focus {
    border-color: unset;
    box-shadow: unset;
  }

  .cart-dec-qty-btn {
    border-radius: 0 5px 5px 0;
  }

  .cart-price {
    text-align: right;
  }

  .cart-total {
    text-align: right;
  }

  .cart-btn {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  .cart-btn:hover {
    background-color: var(--secondary);
    color: var(--bg-secondary);
  }

  .del-to-cart-btn svg {
    display: none;
  }

  .cart-prod-img img {
    height: 150px;
    width: 150px;
  }

  .cart-del-to-cart-btn {
    text-align: center;
  }

  .cart-checkout {
    /* margin: 0 24px; */
    text-align: right;
  }

  .cart-sub-total {
    /* display: flex;
    justify-content: flex-end;
    gap: 34px;
    align-items: flex-end;
    margin-right: 150px;*/
    margin-bottom: 14px;
    text-align: right;
  }

  .cart-sub-total h4,
  .cart-sub-total span {
    font-family: var(--secondary-font);
    font-size: 24px;

    display: inline-block;
    vertical-align: middle;
    margin: 0 5px;
  }

  .cart-sub-total span {
    font-size: 24px;
    text-align: right;
  }

  .btn-checkout {
    background-color: var(--bg-secondary);
    width: 380px;
  }

  .btn-checkout:hover {
    background-color: var(--secondary);
  }

  @media (max-width: 1200px) {
    .del-to-cart-btn span {
      font-size: 18px;
    }
  }

  @media (max-width: 1024px) {
    .del-to-cart-btn span {
      font-size: 14px;
    }
  }

  @media (max-width: 960px) {
    .del-to-cart-btn span {
      font-size: 10px;
    }

    .cart-qty {
      flex-direction: column;
      align-items: center;
    }

    .cart-qty-btn {
      width: 60px;
      min-width: 60px;
    }
    .cart-inc-qty-btn {
      border-radius: 5px 5px 0 0;
    }

    .form-control {
      text-align: center;
    }

    .cart-dec-qty-btn {
      border-radius: 0 0 5px 5px;
    }
  }

  @media (max-width: 768px) {
    .cart-info span {
      font-size: 16px;
    }

    .del-to-cart-btn span {
      display: none;
    }

    .del-to-cart-btn svg {
      display: block;
    }
  }

  @media (max-width: 720px) {
    .cart-header {
      grid-template-columns: 15% 48% 16% 10% 10%;
    }

    .cart-info {
      grid-template-columns: 15% 85%;
      grid-template-rows: auto auto;
    }

    .cart-prod-info-mobile {
      grid-column: 1 / 3; /* span both columns */
      grid-row: 2 / 3;
      display: flex;
      /* justify-content: space-between; */
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      padding-top: 10px;
    }

    .cart-qty {
      flex-direction: row;
    }

    .cart-qty-btn {
      width: 30px;
      min-width: 30px;
    }

    .cart-inc-qty-btn {
      border-radius: 5px 0 0 5px;
    }

    .form-control {
      border-radius: 0px;
      border-style: none;
      width: 60px;
    }

    .form-control:focus {
      border-color: unset;
      box-shadow: unset;
    }

    .cart-dec-qty-btn {
      border-radius: 0 5px 5px 0;
    }
  }

  @media (max-width: 579px) {
    .cart-prod {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 499px) {
    .header-qty,
    .header-price,
    .header-total {
      display: none;
    }

    .cart-prod-img {
      align-self: center;
    }

    .cart-prod-info-mobile {
      flex-wrap: wrap;
    }

    @media (max-width: 455px) {
      .btn-checkout {
        width: 100%;
      }
    }
  }
`;
export default Wrapper;
