import styled from "styled-components";

const Wrapper = styled.section`
  padding: 0 !important;
  font-size: 18px;
  font-family: var(--main-font);
  background-color: var(--secondary);
  height: unset !important;

  .product-section {
    background: linear-gradient(to bottom, #85521d, #e4d8cc);
    /* height: 100%; */
  }

  .product-name {
    h1 {
      color: var(--bg-primary);
      font-family: var(--secondary-font);
      margin-bottom: 24px;
      font-size: 40px;
    }
  }

  .product-container {
    display: flex;
    gap: 14px;
    margin: 24px 0;
  }

  .product-card,
  .product-details-card {
    background-color: var(--secondary);
    width: 550px;
    height: 650px;
    padding: 14px;
  }

  .product-card {
    border-radius: 25px 0 0 0;
  }

  .product-details-card {
    border-radius: 0 0 25px 0;
  }

  .product-card-inner,
  .product-details-card-inner {
    width: 100%;
    height: 100%;
    background-color: var(--primary);
    position: relative;
  }

  .product-card-inner {
    display: flex;
    flex-direction: column;
    border-radius: 250px 0 0 0;
  }

  .product-details-card-inner {
    border-radius: 0 0 250px 0;
    display: flex;
    flex-direction: column;

    .product-info {
      line-height: 1;
    }
  }

  .product-img {
    display: flex;
    flex: 1;
    overflow: hidden;

    .product-img-gallery-card {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      height: 100%;
      padding-left: 10px;
      max-width: 70px;

      /* Hide scrollbar but keep scroll functionality */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE and Edge */

      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }

      .product-img-gallery img {
        width: 60px;
        height: 100px;
        border-radius: 10px;
        margin-bottom: 12px;
      }
    }

    .product-img-main {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      img {
        width: 350px;
        height: 596px;
        border-radius: 25px;
      }

      .product-badges {
        position: absolute;
        top: 14px;
        left: 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        z-index: 2;

        .badge {
          color: var(--primary);
          padding: 4px 10px;
          border-radius: 5px;
          font-size: 14px;
          font-weight: bold;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
          width: fit-content;
        }

        .badge.best {
          background-color: #e63946; /* same as shop 'Best Seller' */
        }

        .badge.fotm {
          background-color: #457b9d; /* same as shop 'FOTM' */
        }
      }
    }
  }

  .product-cat {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .product-desc {
    font-size: 28px;
    font-weight: 300;
    line-height: 1;
    padding: 10px;
    margin-bottom: 24px;
    max-height: 350px;
    overflow-y: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera */
    }
  }

  .product-price {
    margin-bottom: 14px;

    span {
      font-size: 32px;
    }
  }

  .product-action-align {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .product-btn {
    background-color: var(--bg-primary);
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: var(--bg-secondary);
      color: var(--primary);
    }
  }

  .add-to-cart-btn:hover {
    border-radius: 25px 0 25px 0;
  }

  .product-qty {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;

    &:hover .product-dec-qty-btn {
      border-radius: 25px 0 0 0;
    }

    &:hover .product-inc-qty-btn {
      border-radius: 0 0 25px 0;
    }

    .product-qty-btn {
      width: 30px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg-primary);
      border: none;
      cursor: pointer;
    }

    .product-dec-qty-btn {
      border-radius: 5px 0 0 5px;
    }

    .product-inc-qty-btn {
      border-radius: 0 5px 5px 0;
    }

    .form-control {
      border: none;
      width: 60px;
      height: 100%;
      text-align: center;
      font-size: 16px;
      border-radius: 0;

      &:focus {
        border-color: unset;
        box-shadow: unset;
      }
    }
  }
`;

export default Wrapper;
