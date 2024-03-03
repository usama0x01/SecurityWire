import * as actionTypes from "./types";
import axios from "axios";
import { toast } from "react-toastify";
import API from "./api";

export const getMessages = (user2) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`${API}/chats/${user2}`, config);
    if(res.status === 200){
      return res.data;
    }
    throw new Error('Sorry, something went wrong')
  } catch (error) {
    console.error(error.response);
    toast.error(error.response ? error.response.data.message : error.message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}

const loginLoading = () => {
  return {
    type: actionTypes.LOGIN_LOADING,
  };
};
export const login = (body) => async (dispatch) => {
  const { email, password } = body;
  dispatch(loginLoading());
  try {
    const res = await axios.post(`${API}/users/login`, { email, password });
    dispatch({
      type: actionTypes.LOGIN_LOAD_SUCCESS,
      payload: res,
    });
  } catch (error) {
    console.error(error.response);
    dispatch({
      type: actionTypes.LOGIN_LOAD_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const verify = () => async (dispatch) => {
  dispatch(loginLoading());
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`${API}/users/verify`, config);
    dispatch({
      type: actionTypes.LOGIN_LOAD_SUCCESS,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_LOAD_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

const registerLoading = () => {
  return {
    type: actionTypes.REGISTER_LOADING,
  };
};

export const register = (body) => async (dispatch) => {
  const { email, password, username, passwordConfirmation, role } = body;
  dispatch(registerLoading());
  try {
    const res = await axios.post(`${API}/users/signup`, {
      email,
      name: username,
      password,
      passwordConfirm: passwordConfirmation,
      role,
    });
    dispatch({
      type: actionTypes.REGISTER_LOAD_SUCCESS,
      payload: res,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: actionTypes.REGISTER_LOAD_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};
