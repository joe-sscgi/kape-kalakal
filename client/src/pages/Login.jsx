import { Link, redirect, Form } from "react-router-dom";
import { toast } from "react-toastify";

import Wrapper from "../assets/wrappers/Login";
import customFetch from "../utils/customFetch";
import { Logo, FormRow, SubmitBtn } from "../components/";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const userLoginData = await customFetch.post("/auth/login", data);
    const userType = userLoginData.data.userData.userUserType;

    toast.success("Login successful");
    if (userType == "Super Admin" || userType == "Admin") {
      return redirect("/admin");
      // console.log("admin");
    } else {
      return redirect("/dashboard");
      // console.log("customer");
    }
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  return (
    <Wrapper>
      <main className="main">
        {/* Log in */}
        <section id="login" className="container login">
          {/* Section Title */}
          <div className="section-title">
            <h2>Log in</h2>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          {/* End Section Title */}

          <Form method="post" className="login-form">
            <div className="login-container">
              <FormRow
                type="text"
                id="userUsername"
                name="userUsername"
                className="form-input"
                placeholder="username"
                // defaultValue="superadmin"
              />
              <FormRow
                type="password"
                id="userPassword"
                name="userPassword"
                className="form-input"
                placeholder="password"
                // defaultValue="aDmin_321"
              />
              <div className="text-center login-buttons">
                <SubmitBtn className="login-submit" />
              </div>
              <p>
                <Link to="/register">
                  <span>Create an Account</span>
                </Link>
              </p>
            </div>
          </Form>
        </section>
        {/* /Log in */}
      </main>
    </Wrapper>
  );
};
export default Login;
