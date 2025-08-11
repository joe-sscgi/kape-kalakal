import styled from "styled-components";

const Wrapper = styled.section`
  padding: 0 !important;
  font-size: 18px;
  background-color: var(--secondary);
  font-family: var(--main-font);
  color: var(--bg-primary);

  .checkout-section {
    background: linear-gradient(to bottom, #85521d, #e4d8cc);
  }

  .checkout-user-details {
    margin-bottom: 24px;
  }

  .checkout-header h3,
  .other-address-details-header h3,
  .checkout-order-total h2,
  .checkout-order-total h5 {
    font-family: var(--secondary-font);
    margin-bottom: 14px;
    color: var(--primary);
  }

  .checkout-order-total h2,
  .checkout-order-total h5 {
    margin-bottom: 8px;
  }

  .checkout-user-details label {
    margin-bottom: 14px;
    margin-left: 14px;
  }

  span.defaultAddress {
    font-size: 24px;
  }

  .checkout-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 14px;
  }

  .checkout-prod {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 40%;
    gap: 14px;
    margin-bottom: 14px;
  }

  .checkout-prod-img img {
    width: 100px;
    height: 100px;
  }

  .checkout-form-control {
    border: none;
    background: transparent;
    border-bottom: 2px solid;
    margin-top: 14px;
  }

  .checkout-form-control:last-child {
    margin-bottom: 14px;
  }

  input.checkout-form-control:-webkit-autofill {
    background-color: transparent !important;
    -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
    transition: background-color 9999s ease-in-out 0s !important;
    -webkit-text-fill-color: var(
      --bs-body-color
    ) !important; /* ✅ your font color */
  }

  .checkout-form-control:focus {
    box-shadow: none;
  }

  .checkout-order-summary-container {
    display: flex;
  }

  .checkout-order-summary {
    overflow: auto;
    max-height: 550px;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }

  .checkout-order-total {
    width: 30%;
  }

  .checkout-item-total,
  .checkout-subtotal,
  .checkout-shipping,
  .checkout-discount,
  .checkout-grandtotal {
    display: flex;
    justify-content: space-between;
  }

  .other-address-details-header,
  .checkout-grandtotal {
    margin-top: 14px;
  }

  .checkout-grandtotal span {
    font-size: 32px;
  }

  .checkout-subtotal span {
    text-align: right;
  }

  .btn-checkout {
    width: 100%;
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  .btn-checkout:hover {
    width: 100%;
    background-color: var(--secondary);
    color: var(--bg-secondary);
  }
`;
export default Wrapper;
