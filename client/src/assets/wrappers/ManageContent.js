import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--primary);
  font-family: var(--main-font);
  font-size: 18px;
  color: var(--bg-primary);

  background-image: linear-gradient(
      to top,
      rgba(15, 44, 208, 0.19),
      rgb(116 35 35 / 75%)
    ),
    url(../src/assets/images/background/background-2.jpg);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  .main-prod {
    background-color: unset;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .manage-content-info h3,
  p {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
    text-align: center;
  }

  div#myTable_wrapper {
    background-color: var(--primary);
    padding: 24px;
    margin-bottom: 14px;
    border: 2px solid var(--bg-primary);
  }

  .main-table {
    border-collapse: separate;
    color: var(--bg-primary);
    /* border-spacing: 0 5px; */
  }

  .main-table thead {
    background-color: #f2f2f2;
  }

  .main-table thead {
    background-color: #f2f2f2;
  }

  .main-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .prod-col {
    padding: 14px;
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

  td {
    align-content: center;
  }

  .prod-notes p {
    margin-bottom: 10px;
  }

  .best-prod {
    background-color: var(--secondary);
    color: var(--bg-secondary);
  }

  .best-prod .section-title h1 {
    color: var(--bg-secondary);
  }

  .best-prod .manage-content-info h3,
  p {
    font-family: var(--secondary-font);
    color: var(--bg-secondary);
    text-align: center;
  }

  .best-prod th {
    color: var(--bg-secondary);
  }

  .best-prod tr {
    color: var(--bg-secondary);
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
