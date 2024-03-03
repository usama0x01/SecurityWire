import * as actionTypes from "./types";
import axios from "axios";
import API from "./api";
import React from "react";
import download from "downloadjs";
import { toast } from "react-toastify";

export const programsToApprove = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`${API}/programs/toApprove`, config);
    dispatch({
      type: actionTypes.GET_PROGRAMS_APPROVE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error.response);
    dispatch({
      type: actionTypes.GET_PROGRAMS_APPROVE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getResearchers = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(
      `${API}/users/admin/security-researcher`,
      config
    );
    dispatch({
      type: actionTypes.GET_ALL_RESEARCHERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error.response);
    dispatch({
      type: actionTypes.GET_ALL_RESEARCHERS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getCustomers = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`${API}/users/admin/customer`, config);
    dispatch({
      type: actionTypes.GET_ALL_CUSTOMERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error.response);
    dispatch({
      type: actionTypes.GET_ALL_CUSTOMERS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const submissionsToApprove = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`${API}/submissions/toApprove`, config);
    dispatch({
      type: actionTypes.GET_SUBMISSIONS_APPROVE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error.response);
    dispatch({
      type: actionTypes.GET_SUBMISSIONS_APPROVE_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const approveProgram = (programId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`${API}/programs/${programId}/approve`, config);
    if (res.status === 201) {
      toast.success("Approve success", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(programsToApprove());
    }
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
};

export const approveSubmission = (submissionId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.patch(
      `${API}/submissions/${submissionId}/approve`,
      null,
      config
    );
    if (res.status === 201) {
      toast.success("Approve success", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(submissionsToApprove());
      return res;
    }
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
};

export const suspendUser = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`${API}/users/suspend/${user._id}`, config);
    if (res.status === 200) {
      toast.error("User suspended!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      user.role === "customer"
        ? dispatch(getCustomers())
        : dispatch(getResearchers());
      return res;
    }
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
};

export const unSuspendUser = (user) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`${API}/users/unsuspend/${user._id}`, config);
    if (res.status === 200) {
      toast.success("User un-suspended!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      user.role === "customer"
        ? dispatch(getCustomers())
        : dispatch(getResearchers());
      return res;
    }
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
};
