import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import auth from '../services/authService';

const rootReducer = {
  userRegister: userReducer.userRegisterReducer,
  userLogin: userReducer.userLoginReducer,
  user: userReducer.userDetailsReducer,
  userUpdate: userReducer.userUpdateReducer,
  userDelete: userReducer.deleteUserAccountReducer,
};

const user = auth.getCurrentUser();
const token = auth.getAuthToken();

const preloadedState = {
  userLogin: {
    isLoggedIn: !!(user && token),
    user,
    token,
  },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState,
});

export default store;
