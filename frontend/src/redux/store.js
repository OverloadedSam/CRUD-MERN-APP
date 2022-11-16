import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    userRegister: userReducer.userRegisterReducer,
  },
});

export default store;
