import styled from "styled-components";

const Wrapper = styled.section`
  /* REGISTER */
  .register {
    background-color: var(--secondary);
    justify-self: center;
    height: 700px;
    width: 400px;
    border: 1px solid var(--bg-primary);
    border-radius: 15px;
    margin: 24px 0;
    padding: 30px;
    font-family: var(--main-font);
    box-shadow: var(--drkShadow);
  }

  .register .section-title {
    /* padding-bottom: 100px; */
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    padding: 0;
  }

  .register .section-title img {
    height: 150px;
    border-radius: 50%;
  }

  .register h1 {
    color: var(--bg-primary);
  }

  .register h2 {
    background-color: var(--primary);
  }

  .register .register-container {
    margin: 24px 0;
  }

  .register .form-group {
    margin-bottom: 24px;
  }

  .register .register-buttons {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 50px 0;
  }

  .register .register-buttons .register-submit {
    background: var(--bg-primary);
    color: var(--primary);
    box-shadow: var(--drkShadow);
    border: 0;
    padding: 13px 50px;
    transition: 0.4s;
    border-radius: 4px;
  }

  .register .register-buttons .register-submit:hover {
    background: var(--primary);
    color: var(--bg-primary);
  }

  .register .register-buttons a:link {
    color: var(--bg-primary);
  }

  .register .register-buttons a:visited {
    color: var(--bg-secondary);
    font-style: italic;
  }

  .register .register-buttons a:hover {
    color: var(--accent-color);
  }
`;

export default Wrapper;
