import axios from "axios";
import {
  CONTRACT_CREATE_FAIL,
  CONTRACT_CREATE_REQUEST,
  CONTRACT_CREATE_SUCCESS,
} from "../constants/contractConstants";
import { logout } from "./userActions";

export const createContract = (contract) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONTRACT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/contracts`, contract, config);

    dispatch({
      type: CONTRACT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONTRACT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
