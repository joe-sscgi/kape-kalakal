import styled from "styled-components";

const Wrapper = styled.section`
  /* LOGIN */
  .login {
    background-color: var(--secondary);
    justify-self: center;
    height: 600px;
    width: 400px;
    border: 1px solid var(--bg-primary);
    border-radius: 15px;
    margin: 50px 0;
    padding: 30px;
    font-family: var(--main-font);
    box-shadow: var(--drkShadow);
  }

  .login .section-title {
    /* padding-bottom: 100px; */
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    padding: 0;
  }

  .login .section-title img {
    height: 150px;
    border-radius: 50%;
  }

  .login h1 {
    /* margin: 24px 0; */
    color: var(--bg-primary);
  }

  .login h2 {
    background-color: var(--primary);
  }

  .login .login-container {
    margin: 50px 0;
  }

  .login .form-group {
    margin-bottom: 24px;
  }

  .login .login-buttons {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 42px 0;
  }

  .login .login-buttons .login-submit {
    background: var(--bg-primary);
    color: var(--primary);
    box-shadow: var(--drkShadow);
    border: 0;
    padding: 13px 50px;
    transition: 0.4s;
    border-radius: 4px;
  }

  .login .login-buttons .login-submit:hover {
    background: var(--primary);
    color: var(--bg-primary);
  }

  .login .login-buttons a:link {
    color: var(--bg-primary);
  }

  .login .login-buttons a:visited {
    color: var(--bg-secondary);
    font-style: italic;
  }

  .login .login-buttons a:hover {
    color: var(--accent-color);
  }
`;

export default Wrapper;
