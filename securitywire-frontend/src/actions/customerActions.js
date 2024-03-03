import * as actionTypes from "./types";
import axios from "axios";
import API from "./api";
import { showToasterNotification } from "./commonActions";
import { Intent } from "@blueprintjs/core";
import { toast } from "react-toastify";
const programsLoading = () => {
  return {
    type: actionTypes.LOADING_CREATED_PROGRAMS,
  };
};

export const loadCreatedPrograms = () => async (dispatch) => {
  dispatch(programsLoading());
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.get(`${API}/programs/`, config);
    dispatch({
      type: actionTypes.LOAD_CREATED_PROGRAMS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOAD_CREATED_PROGRAMS_FAIL,
      payload: error.message,
    });
  }
};

const createProgramLoading = () => {
  return {
    type: actionTypes.CREATE_NEW_PROGRAM_LOADING,
  };
};
export const createNewProgram = (body) => async (dispatch) => {
  dispatch(createProgramLoading());
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.post(`${API}/programs/create`, body, config);
    dispatch({
      type: actionTypes.CREATE_NEW_PROGRAM_SUCCESS,
      payload: res.data,
    });
    toast.success("Program created successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message, {
      position: "top-right",
      autoClose: 7500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: actionTypes.CREATE_NEW_PROGRAM_FAIL,
      payload: error.message,
    });
  }
};

export const clearSuccess = () => {
  return {
    type: actionTypes.CLEAR_CREATE_PROGRAM_SUCCESS,
  };
};

const updateProgramLoading = () => {
  return {
    type: actionTypes.UPDATE_PROGRAM_LOADING,
  };
};

export const updateProgram = (program) => async (dispatch) => {
  console.log("PROGRAM UPDATE: ", program);
  dispatch(updateProgramLoading());
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.patch(
      `${API}/programs/${program._id}`,
      program,
      config
    );
    dispatch(loadCreatedPrograms());
    dispatch({
      type: actionTypes.UPDATE_PROGRAM_SUCCESS,
      payload: res.data,
    });
    toast.success("Program updated successfully", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_PROGRAM_FAIL,
      payload: error.message,
    });
    toast.error(error.response ? error.response.data.message : error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

const deleteProgramLoading = () => {
  return {
    type: actionTypes.DELETE_PROGRAM_LOADING,
  };
};
export const clearDeletedProgram = () => {
  return {
    type: actionTypes.CLEAR_DELETE_PROGRAM_SUCCESS,
  };
};
export const deleteProgram = (id) => async (dispatch) => {
  dispatch(deleteProgramLoading());
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.delete(`${API}/programs/${id}`, config);
    dispatch({
      type: actionTypes.DELETE_PROGRAM_SUCCESS,
      payload: res.data,
    });
    toast.success("Program deleted successfully", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(loadCreatedPrograms());
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: actionTypes.DELETE_PROGRAM_FAIL,
      payload: error.message,
    });
  }
};

const inviteResearchersLoading = () => {
  return {
    type: actionTypes.INVITE_RESEARCHERS_LOADING,
  };
};

export const inviteResearchers = (body, programId) => async (dispatch) => {
  dispatch(inviteResearchersLoading());
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.patch(
      `${API}/programs/${programId}/invites`,
      body,
      config
    );
    dispatch({
      type: actionTypes.INVITE_RESEARCHERS_SUCCESS,
      payload: res.data,
    });
    toast.success("Researchers invite success", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(loadCreatedPrograms());
  } catch (error) {
    toast.error(error.response ? error.response.data.message : error.message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: actionTypes.INVITE_RESEARCHERS_FAIL,
      payload: error.message,
    });
  }
};

export const getSecurityResearchers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_RESEARCHERS_LOADING });
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    let res = await axios.get(`${API}/users/securityResearchers`, config);
    res = res.data;
    if (res !== null) {
      dispatch({
        type: actionTypes.GET_RESEARCHERS_SUCCESS,
        payload: res,
      });
      return res.data;
    }
    throw new Error("something went wrong!");
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: actionTypes.GET_RESEARCHERS_FAIL,
      payload: error.message,
    });
    toast.error(error.response ? error.response.data.message : error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};

export const getCreatedScans = () => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    let userScans = await axios.get(`${API}/Scanner`, config);
    console.log("THIS USER SCANS", userScans.data);
    dispatch({
      type: actionTypes.GET_SCANNED_PROGRAMS_SUCCESS,
      payload: userScans.data,
    });
    return true;
  } catch (error) {
    console.error(error.message);
    toast.error(error.response ? error.response.data.message : error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
export const scanProgram = (url) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.SCAN_PROGRAM_LOADING });
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    let res = await axios.post(`${API}/Scanner/create`, { url }, config);
    res = res.data;
    if (res !== null) {
      dispatch(getCreatedScans());
      return true;
    }
    throw new Error("something went wrong!");
  } catch (error) {
    console.error(error.message);
    toast.error(error.response ? error.response.data.message : error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return error;
  }
};
