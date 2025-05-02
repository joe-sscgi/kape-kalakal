import { Link, redirect, Form } from "react-router-dom";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/Register";
import customFetch from "../utils/customFetch";
import { Logo, FormRow, SubmitBtn } from "../components/";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);

    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <main className="main">
        {/* Register */}
        <section id="register" className="container register">
          {/* Section Title */}
          <div className="section-title">
            <h2>Register</h2>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {/* End Section Title */}

          <Form method="post" className="register-form">
            <div className="register-container">
              <FormRow
                type="email"
                id="userEmail"
                name="userEmail"
                className="form-input"
                placeholder="email"
              />
              <FormRow
                type="text"
                id="userUsername"
                name="userUsername"
                className="form-input"
                placeholder="username"
              />
              <FormRow
                type="password"
                id="userPassword"
                name="userPassword"
                className="form-input"
                placeholder="password"
              />
              <FormRow
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                placeholder="confirm password"
              />
              <div className="text-center register-buttons">
                <SubmitBtn className="register-submit" />
              </div>
              <p>
                Already have an account?
                <Link to="/login">
                  <span>Login</span>
                </Link>
              </p>
            </div>
          </Form>
        </section>
        {/* /Register */}
      </main>
    </Wrapper>
  );
};
export default Register;
