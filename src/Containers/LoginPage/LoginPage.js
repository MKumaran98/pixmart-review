import classes from "./LoginPage.module.css";
import { useState } from "react";
import { useAuth } from "../../Store/AuthReducer/AuthContext";
import { warningToast } from "../../UI/Toast/Toast";

const LoginPage = () => {
  const {
    signUpUser,
    signInUser,
    currentPage,
    setAuthCurrentPage,
    changePassword,
    setAuthLoading,
    authDispatch
  } = useAuth();

  const [userName, setUserName] = useState("");
  const [userNameValid, setUserNameValid] = useState(true);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateUserName = () => {
    if (userName.length === 0) setUserNameValid(false);
    else setUserNameValid(true);
  };

  const validateEmail = () => {
    if (
      email.length > 0 &&
      new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$").test(email)
    )
      setEmailValid(true);
    else setEmailValid(false);
  };

  const signUpSubmit = async (event) => {
    event.preventDefault();
    validateUserName();
    validateEmail();
    if (userNameValid && emailValid) {
      signUpUser(
        {
          name: userName,
          email: email,
          password: password,
        },
        setAuthLoading,
        setAuthCurrentPage
      );
    }
  };

  const signInSubmit = async (event) => {
    event.preventDefault();
    validateEmail();
    if (emailValid)
      signInUser({
        email: email,
        password: password,
      },setAuthLoading,authDispatch);
  };

  const changePasswordSubmit = async (event) => {
    event.preventDefault();
    validateEmail();
    if (password === confirmPassword) {
      changePassword({
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      },setAuthLoading,setAuthCurrentPage);
    } else {
      warningToast("Passwords do not match");
    }
  };

  const pageToRender = () => {
    if (currentPage === "SIGNUP_PAGE") {
      return (
        <>
          <h1>Sign Up:</h1>
          <form className={classes["signup-container"]} onSubmit={signUpSubmit}>
            <div>
              <input
                type="text"
                className={classes["textbox"]}
                placeholder="Username"
                required
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              {!userNameValid && (
                <p className={classes["error-text"]}>
                  Please enter a valid user name
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                className={classes["textbox"]}
                placeholder="Email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {!emailValid && (
                <p className={classes["error-text"]}>
                  Please enter a valid email
                </p>
              )}
            </div>
            <input
              type="password"
              className={classes["textbox"]}
              placeholder="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="submit"
              className={`${classes["button-solid"]} ${classes["button-primary"]}`}
            >
              Sign up!
            </button>
          </form>
        </>
      );
    } else if (currentPage === "SIGNIN_PAGE") {
      return (
        <>
          <h1>Sign In:</h1>
          <form className={classes["signup-container"]} onSubmit={signInSubmit}>
            <div>
              <input
                type="email"
                className={classes["textbox"]}
                placeholder="Email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {!emailValid && (
                <p className={classes["error-text"]}>
                  Please enter a valid email
                </p>
              )}
            </div>
            <input
              type="password"
              className={classes["textbox"]}
              placeholder="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="submit"
              className={`${classes["button-solid"]} ${classes["button-primary"]}`}
            >
              Sign In
            </button>
          </form>
        </>
      );
    } else if (currentPage === "CHANGE_PASSWORD") {
      return (
        <>
          <h1>Change Password:</h1>
          <form
            className={classes["signup-container"]}
            onSubmit={changePasswordSubmit}
          >
            <input
              type="email"
              className={classes["textbox"]}
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              type="password"
              className={classes["textbox"]}
              placeholder="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              type="password"
              className={classes["textbox"]}
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <button
              type="submit"
              className={`${classes["button-solid"]} ${classes["button-primary"]}`}
            >
              Change Password
            </button>
          </form>
        </>
      );
    }
  };

  return (
    <div className={classes["login-container"]}>
      <div className={classes["login"]}>
        <div className={classes["signin-signup-container"]}>
          {pageToRender()}
          {currentPage === "SIGNIN_PAGE" && (
            <p
              className={classes["switch-page"]}
              onClick={() => setAuthCurrentPage("CHANGE_PASSWORD")}
            >
              Forgot Password
            </p>
          )}
          {currentPage === "SIGNIN_PAGE" ? (
            <p
              className={classes["switch-page"]}
              onClick={() => setAuthCurrentPage("SIGNUP_PAGE")}
            >
              New to Pix? Sign up!
            </p>
          ) : (
            <p
              className={classes["switch-page"]}
              onClick={() => setAuthCurrentPage("SIGNIN_PAGE")}
            >
              Already have an Account? Sign In!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
