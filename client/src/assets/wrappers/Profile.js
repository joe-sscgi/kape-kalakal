import styled from "styled-components";
import bgImg from "../images/background/background-edit-profile.jpg";

const Wrapper = styled.section`
  background-color: var(--bg-secondary);
  background-image: linear-gradient(
      to top,
      rgba(245, 246, 252, 0.1),
      rgb(116 35 35 / 75%)
    ),
    url(${bgImg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;

  .edit-profile-container {
    margin-top: 100px;
    margin-bottom: 100px;
  }

  .edit-profile-container h1 {
    text-align: center;
    font-family: var(--secondary-font);
    color: var(--primary);
  }

  .profile-group {
    margin-bottom: 24px;
    align-items: flex-end;
  }

  .edit-profile-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .edit-profile-btn {
    background-color: var(--bg-primary);
    color: var(--primary);
    width: unset;
  }

  .edit-profile-btn:hover {
    background-color: var(--bg-secondary);
    color: var(--secondary);
  }
`;

export default Wrapper;
