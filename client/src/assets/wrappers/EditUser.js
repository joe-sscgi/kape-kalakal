import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--bg-secondary);
  font-family: var(--main-font);
  font-size: 18px;
  color: var(--primary);
  /* height: 100vh; */

  .edit-user {
    background-color: var(--primary);
    border-radius: 10px;
    box-shadow: var(--lgtShadow);
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
