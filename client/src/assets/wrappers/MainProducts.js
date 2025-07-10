import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--primary);
  font-family: var(--main-font);
  font-size: 18px;
  color: var(--primary);

  background-image: linear-gradient(
      to top,
      rgba(15, 44, 208, 0.19),
      rgb(116 35 35 / 75%)
    ),
    url(../src/assets/images/background/background-products.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  .main-prod {
    background-color: unset;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--primary);
  }

  .container-table {
    padding: 0 14px;
  }

  .filters-container {
    margin: 0 14px 1rem;
    display: flex;
    gap: 1rem;
  }

  .pagination-controls {
    margin-top: 1rem;
    text-align: center;
  }

  .pagination-controls span {
    margin: 0 1rem;
  }

  .pagination-controls .page-btn {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }

  .pagination-controls .page-btn:hover {
    background-color: var(--secondary);
    color: var(--bg-secondary);
  }

  .prod-col {
    padding: 14px;
  }

  .prod-price {
    text-align: right;
  }

  .prod-col {
    color: var(--bg-primary) !important;
  }

  .prod-qty {
    text-align: center;
  }

  .prod-qty span {
    text-decoration: underline;
    color: var(--bg-primary) !important;
  }

  .inventory-yellow-zone span,
  .inventory-red-zone span {
    cursor: pointer;
    color: var(--bg-primary);
    font-size: 24px;
    text-decoration: underline;
  }

  .inventory-yellow-zone {
    background-color: yellow;
  }

  .inventory-red-zone {
    background-color: red;
  }

  td.prod_fotm {
    text-align: center;
  }

  td.prod_best {
    text-align: center;
  }

  .main-btn {
    font-family: var(--main-font);
    font-size: 14px;
    /* color: var(--bg-primary); */
    margin: 0;
    margin-right: 10px;
  }

  .add-prod-btn {
    /* background-color: transparent; */
    /* background-color: var(--bs-primary-bg-subtle); */
  }

  .add-prod-btn span {
    text-align: center;
  }

  td {
    align-content: center;
  }

  .prod-notes {
    color: var(--primary);
  }

  .prod-notes p {
    margin-bottom: 10px;
    font-size: 20px;
  }

  .abbrv-notes {
    color: var(--bg-primary);
    -webkit-text-stroke: 0.21px white;
  }

  .btn-back {
    font-size: 20px;
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
