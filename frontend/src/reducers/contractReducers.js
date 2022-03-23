import {
  CONTRACT_CREATE_FAIL,
  CONTRACT_CREATE_REQUEST,
  CONTRACT_CREATE_RESET,
  CONTRACT_CREATE_SUCCESS,
} from "../constants/contractConstants";

export const contractCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTRACT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case CONTRACT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        contract: action.payload,
      };
    case CONTRACT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CONTRACT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
