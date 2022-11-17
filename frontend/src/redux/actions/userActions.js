import auth from '../../services/authService';
import http from '../../services/http';
import actions from '../action-types/userTypes';

const registerUser = (payload) => async (dispatch) => {
  dispatch({ type: actions.USER_REGISTER_REQUESTED });

  try {
    const { data } = await http.post('/register', payload);
    dispatch({
      type: actions.USER_REGISTER_SUCCEEDED,
      payload: data,
    });

    const { _id, firstName, lastName, email, token } = data;
    const user = {
      id: _id,
      name: `${firstName} ${lastName}`,
      email: email,
    };

    auth.saveUserAndAuthToken(user, token);
  } catch (error) {
    dispatch({
      type: actions.USER_REGISTER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const resetRegisterUser = () => (dispatch) => {
  dispatch({ type: actions.USER_REGISTER_RESET });
};

const loginUser = (payload) => async (dispatch) => {
  dispatch({ type: actions.USER_LOGIN_REQUESTED });

  try {
    const { data } = await http.post('/login', payload);
    dispatch({
      type: actions.USER_LOGIN_SUCCEEDED,
      payload: data.data,
    });

    const { _id, firstName, lastName, email, token } = data;
    const user = {
      id: _id,
      name: `${firstName} ${lastName}`,
      email: email,
    };

    auth.saveUserAndAuthToken(user, token);
  } catch (error) {
    dispatch({
      type: actions.USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const resetLoginUser = () => async (dispatch) => {
  dispatch({ type: actions.USER_LOGIN_RESET });
};

const userActions = {
  registerUser,
  resetRegisterUser,
  loginUser,
  resetLoginUser,
};

export default userActions;