import * as actionTypes from "./types";
import axios from "axios";
import API from "./api";
import React from "react";
import download from "downloadjs";
import { toast } from "react-toastify";

export const getPublicPrograms = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_PUBLIC_PROGRAMS_LOADING,
  });
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(`${API}/programs/getPublic`, config);
    dispatch({
      type: actionTypes.GET_PUBLIC_PROGRAMS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error(error.response);
    dispatch({
      type: actionTypes.GET_PUBLIC_PROGRAMS_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

export const getEnrolled = (programId) => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.get(`${API}/programs/${programId}/enroll`, config);
    if (res.status === 201) {
      toast.success("You are successfully enrolled in this program", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(getPublicPrograms());
      dispatch(getEnrolledPrograms());
      dispatch(getInvitedPrograms());
      dispatch(getSubmittedPrograms());
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

export const getInvitedPrograms = () => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.get(`${API}/users/getInvitedPrograms`, config);
    dispatch({
      type: actionTypes.GET_INVITED_PROGRAMS,
      payload: res.data,
    });
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
export const getEnrolledPrograms = () => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.get(`${API}/users/getEnrolledPrograms`, config);
    dispatch({
      type: actionTypes.GET_ENROLLED_PROGRAMS,
      payload: res.data,
    });
    return res.data;
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
export const postNewSubmission = (programId, file) => async (dispatch) => {
  try {
    toast.success("Posting Submissions", {
      position: "top-right",
      autoClose: 1000,
      // hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // "Content-Type":
        //   "multipart/form-data; boundary=--------------------------558123309875371481564807",
        "Content-Type": "application/pdf",
      },
    };
    const res = await axios.post(
      `${API}/submissions/${programId}`,
      file,
      config
    );
    dispatch({
      type: actionTypes.POST_NEW_SUBMISSION,
      payload: res.data,
    });
    if (res.status === 201) {
      toast.success("Submission upload success", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(getSubmittedPrograms());
    }
    return res.data;
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

export const updateSubmission = (submissionId, file) => async (dispatch) => {
  try {
    toast.success("Posting Submissions", {
      position: "top-right",
      autoClose: 1000,
      // hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/pdf",
      },
    };
    const res = await axios.patch(
        `${API}/submissions/${submissionId}`,
        file,
        config
    );
    if (res.status === 201) {
      toast.success("Submission update success", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(getSubmittedPrograms());
    }
    return res;
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

export const unenroll = (programId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const res = await axios.get(
      `${API}/programs/${programId}/unenroll`,
      config
    );

    if (res.status === 201) {
      toast.success("Successfully unenrolled from this program", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(getPublicPrograms());
      dispatch(getEnrolledPrograms());
      dispatch(getInvitedPrograms());
      dispatch(getSubmittedPrograms());
    }
    return res.data;
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

export const getSubmittedPrograms = () => async (dispatch) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    const res = await axios.get(`${API}/submissions/researcher`, config);
    dispatch({
      type: actionTypes.GET_SUBMITTED_PROGRAMS,
      payload: res.data,
    });
    return res.data;
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

export const downloadFile = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      responseType: "blob",
    };
    axios
      .post(`${API}/submissions/download`, data, config)
      .then((response) => {
        if (response.status === 200) {
          console.log("RESPONSE from server", response);
          const base64Data = response.data;
          var arrBuffer = base64ToArrayBuffer(base64Data);
          var newBlob = new Blob([arrBuffer], { type: "application/pdf" });
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
          }
          const url = window.URL.createObjectURL(newBlob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.pdf");
          document.body.appendChild(link);
          link.click();
        }
      })
      .catch((error) => {
        console.error(error.response);
        toast.error(
          error.response ? error.response.data.message : error.message,
          {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });

    // dispatch({
    //   type: actionTypes.GET_SUBMITTED_PROGRAMS,
    //   payload: res.data,
    // });
  } catch (error) {}
};

const base64ToArrayBuffer = (data) => {
  // var binaryString = window.atob(data);
  // var binaryLen = binaryString.length;
  // var bytes = new Uint8Array(binaryLen);
  // for (var i = 0; i < binaryLen; i++) {
  //   var ascii = binaryString.charCodeAt(i);
  //   bytes[i] = ascii;
  // }
  return data;
};
