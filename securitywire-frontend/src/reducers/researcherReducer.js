import * as actionTypes from "../actions/types";

const initial_state = {
  data: [],
  isLoading: null,
  isSuccess: null,
  isError: null,
  errorMessage: null,
};

export const publicProgramsReducer = (state = { ...initial_state }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_PUBLIC_PROGRAMS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_PUBLIC_PROGRAMS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.GET_PUBLIC_PROGRAMS_FAIL:
      return {
        ...state,
        data: null,
        isSuccess: false,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };

    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        isError: false,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export const enrolledProgramsReducer = (
  state = { ...initial_state },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ENROLLED_PROGRAMS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};
export const invitedProgramsReducer = (
  state = { ...initial_state },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_INVITED_PROGRAMS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};
export const submittedProgramsReducer = (
  state = { ...initial_state },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_SUBMITTED_PROGRAMS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};
