import { warningToast, successToast, infoToast } from "../../UI/Toast/Toast";
import axios from "../../useAxios";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN_USER":
      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.userName,
        expiresIn: action.payload.expiresIn,
      };
    case "SIGNOUT_USER":
      return {
        ...state,
        token: null,
        userName: null,
        expiresIn: null,
      };
    default:
      return state;
  }
};

export const signUpUser = async (userData, setLoading, setCurrentPage) => {
  setLoading(true);
  try {
    const { data } = await axios.post("/api/users/signup", userData);
    if (data.ok) {
      successToast("User Added Successfully");
      setCurrentPage("SIGNIN_PAGE");
      setLoading(false);
    }
  } catch (error) {
    if (+error.response.status === 409) {
      infoToast("User already exists in the pix ecosystem");
      infoToast("Please Try loging in");
      setLoading(false);
      return;
    }
    warningToast("Failed to add user");
    console.log(error);
    setLoading(false);
  }
};

export const checkAuthTimeout = (expirationTime, dispatch) => {
  setTimeout(() => {
    signOutUser(dispatch);
  }, expirationTime * 1000);
};

export const signOutUser = (dispatch) => {
  localStorage.clear();
  dispatch({
    type: "SIGNOUT_USER",
  });
};

export const onReload = (dispatch) => {
  const token = localStorage.getItem("token");
  const expiresIn = new Date(localStorage.getItem("expiresIn"));
  if (expiresIn <= new Date()) {
    signOutUser(dispatch);
  } else {
    const userName = localStorage.getItem("userName");
    checkAuthTimeout(
      (expiresIn.getTime() - new Date().getTime()) / 1000,
      dispatch
    );
    dispatch({
      type: "SIGNIN_USER",
      payload: {
        token: token,
        userName: userName,
        expiresIn: expiresIn,
      },
    });
  }
};

export const changePassword = async (userData, setLoading, setCurrentPage) => {
  setLoading(true);
  try {
    const { data } = await axios.post("/api/users/password", userData);
    if (data.ok) {
      successToast("Password changed successfully");
      setCurrentPage("SIGNIN_PAGE");
    }
    setLoading(false);
  } catch (error) {
    warningToast("Unable to change password please try again later");
    console.log(error);
    setLoading(false);
  }
};

export const signInUser = async (userData, setLoading, dispatch) => {
  setLoading(true);
  try {
    const {
      data: { data },
    } = await axios.post("/api/users/signin", userData);
    if (data.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.userName);
      const expiresIn = new Date(new Date().getTime() + 86400000);
      localStorage.setItem("expiresIn", expiresIn);
      checkAuthTimeout(86400);
      dispatch({
        type: "SIGNIN_USER",
        payload: {
          token: data.token,
          userName: data.userName,
          expiresIn: expiresIn,
        },
      });
      successToast("User Logged in Successfully");
      setLoading(false);
    }
  } catch (error) {
    warningToast("Invalid username or password");
    console.log(error);
    setLoading(false);
  }
};