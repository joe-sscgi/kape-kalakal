import styled from "styled-components";

const Wrapper = styled.section`
  font-family: var(--main-font);
  font-size: 18px;
  color: var(--primary);

  height: 100vh;
  background-color: var(--bg-secondary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url("../src/assets/images/background/background-4.jpg");
  background-size: cover;
  background-position: center;
  /* background-repeat: no-repeat; */
  background-attachment: fixed;
  /* background-size: 100% 100%; */

  .edit-user {
    background-color: var(--primary);
    border-radius: 10px;
    box-shadow: var(--lgtShadow);
    margin-top: 40px;
  }

  .section-title h1 {
    font-family: var(--secondary-font);
    color: var(--bg-primary);
  }

  .form-group {
    margin-bottom: 24px;
  }

  .edit-user-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .edit-user-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
    width: unset;
  }

  .edit-user-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }
`;

export default Wrapper;
