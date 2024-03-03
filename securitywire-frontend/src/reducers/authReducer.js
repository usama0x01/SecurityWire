import * as actionTypes from "../actions/types";
const initial_state = {
  data: [],
  isLoading: null,
  isSuccess: null,
  isError: null,
  errorMessage: null,
};

export const authReducer = (state = initial_state, action) => {
  const { type, payload } = action;
  console.log("Payload   ", payload);
  switch (type) {
    case actionTypes.LOGIN_LOADING:
    case actionTypes.REGISTER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGIN_LOAD_SUCCESS:
    case actionTypes.REGISTER_LOAD_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.LOGIN_LOAD_FAIL:
    case actionTypes.REGISTER_LOAD_FAIL:
      return {
        ...state,
        data: null,
        isSuccess: false,
        isLoading: false,
        isError: true,
        errorMessage: payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        data: [],
        isLoading: null,
        isSuccess: null,
        isError: null,
        errorMessage: null,
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
