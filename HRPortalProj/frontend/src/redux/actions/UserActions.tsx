import { Dispatch } from "redux";
import * as actions from "../constants/UserConstants";
import axios from "axios";

interface userLogin {
  name: string;
  password: string;
}

export const login = (user: userLogin) => async (dispatch: Dispatch) => {
  try {
    
    dispatch({ type: actions.USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("auth/login", user, config);

    dispatch({ type: actions.USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error: any) {
    dispatch({
      type: actions.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch: Dispatch) => {
  dispatch({ type: actions.USER_LOGOUT });
  localStorage.removeItem("userInfo");
};

export const detailsUser =
  (userId: ["_id"]) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({ type: actions.GET_USER_REQUEST });

      // const {
      //   userLogin: { userInfo },
      // } = getState();

      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${userInfo.token}`,
      //   },
      // };

      // const { data } = await axios.get(`/user/profile/${userId}`, config);
      const { data } = await axios.get(`/user/profile/${userId}`);

      dispatch({ type: actions.GET_USER_SUCCESS, payload: data });
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: actions.GET_USER_FAIL,
        payload: message,
      });
    }
  };

export const updateUser =
  (userId: ["_id"], userData: {}) =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({ type: actions.UPDATE_USER_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/user/profile/${userId}`, userData, config);

      dispatch({ type: actions.UPDATE_USER_SUCCESS });
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: actions.UPDATE_USER_FAIL,
        payload: message,
      });
    }
  };

export const fetchUsers =
  (currentPage: number) => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({ type: actions.FETCH_USERS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/admin/profiles", config);

      dispatch({ type: actions.FETCH_USERS_SUCCESS, payload: data });
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: actions.FETCH_USERS_FAIL,
        payload: message,
      });
    }
  };
