import auth from '../services/authService';

const Logout = () => {
  auth.logoutUser();
  window.location = '/';
  return null;
};

export default Logout;
