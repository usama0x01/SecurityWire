import * as actionTypes from "../actions/types";

const initial_state = {
  data: [],
  isLoading: null,
  isSuccess: null,
  isError: null,
  errorMessage: null,
};

export const createdProgramsReducer = (
  state = { ...initial_state },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOADING_CREATED_PROGRAMS:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOAD_CREATED_PROGRAMS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.LOAD_CREATED_PROGRAMS_FAIL:
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

export const createProgramReducer = (state = { ...initial_state }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CREATE_NEW_PROGRAM_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.CREATE_NEW_PROGRAM_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.CREATE_NEW_PROGRAM_FAIL:
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
    case actionTypes.CLEAR_CREATE_PROGRAM_SUCCESS:
      return {
        ...state,
        data: [],
        isLoading: null,
        isSuccess: null,
        isError: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export const updateProgramReducer = (state = { ...initial_state }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.UPDATE_PROGRAM_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPDATE_PROGRAM_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
        errorMessage: null,
      };
    case actionTypes.UPDATE_PROGRAM_FAIL:
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
    // case actionTypes.CLEAR_UPDATE_PROGRAM_SUCCESS:
    //   return {
    //     ...state,
    //     data: [],
    //     isLoading: null,
    //     isSuccess: null,
    //     isError: null,
    //     errorMessage: null,
    //   };
    default:
      return state;
  }
};

export const deleteProgramReducer = (state = { ...initial_state }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.DELETE_PROGRAM_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.DELETE_PROGRAM_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.DELETE_PROGRAM_FAIL:
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
    case actionTypes.CLEAR_DELETE_PROGRAM_SUCCESS:
      return {
        ...state,
        data: [],
        isLoading: null,
        isSuccess: null,
        isError: null,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export const inviteResearchersReducer = (
  state = { ...initial_state },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.INVITE_RESEARCHERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.INVITE_RESEARCHERS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.INVITE_RESEARCHERS_FAIL:
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
    // case actionTypes.CLEAR_CREATE_PROGRAM_SUCCESS:
    //   return {
    //     ...state,
    //     data: [],
    //     isLoading: null,
    //     isSuccess: null,
    //     isError: null,
    //     errorMessage: null,
    //   };
    default:
      return state;
  }
};

export const getResearchersReducer = (state = { ...initial_state }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_RESEARCHERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.GET_RESEARCHERS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.GET_RESEARCHERS_FAIL:
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

export const createdScansReducer = (state = { ...initial_state }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_SCANNED_PROGRAMS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      };
    case actionTypes.GET_SCANNED_PROGRAMS_FAIL:
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
