import * as actionTypes from "../actions/types";

const initial_state = {
  data: [],
  isLoading: null,
  isSuccess: null,
  isError: null,
  errorMessage: null,
};

export const programsAprroveReducer = (
  state = { ...initial_state },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_PROGRAMS_APPROVE_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.GET_PROGRAMS_APPROVE_FAIL:
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

export const submissionsAprroveReducer = (
  state = { ...initial_state },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_SUBMISSIONS_APPROVE_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.GET_SUBMISSIONS_APPROVE_FAIL:
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

export const researchersReducer = (state = { ...initial_state }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_RESEARCHERS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.GET_ALL_RESEARCHERS_FAIL:
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

export const customersReducer = (state = { ...initial_state }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.GET_ALL_CUSTOMERS_FAIL:
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
