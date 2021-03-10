import React from "react";
import { useHistory } from "react-router-dom";
import { apiCallPost } from "../../common/api";
import { showErrorToast, showSuccessToast } from "../../common/toaster";
import { setCookie } from "../../common/utils";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  async function onSubmit(data) {
    const response = await apiCallPost("/login", data);
    if (response?.token) {
      localStorage.setItem("token", response.token);
      setCookie("token", response?.token, 1);
      setTimeout(() => window.location.reload(), 500);
      showSuccessToast("Login success!");
      history.push("/profile");
    } else {
      showErrorToast("Login failed try again...");
    }
  }

  return (
    <div className="col-4 m-3 mx-auto">
      <h2 className="text-center">Login-Form</h2>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            placeholder="Email"
            name="email"
            ref={register({
              required: true,
              //eslint-disable-next-line
              pattern: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className="text-danger">Email is required.</p>
          )}
          {errors?.email?.type === "pattern" && (
            <p className="text-dange">Enter valid email address.</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>

          <input
            className="form-control"
            placeholder="Password"
            id="password"
            name="password"
            ref={register({ required: true })}
          />
          {errors?.password && (
            <p className="text-danger">Password is required.</p>
          )}
        </div>
        <div className="mt-5 text-center">
          <input className="btn btn-primary" type="submit" value="Signin" />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
