import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RequireAuth from './common/RequireAuth';
import NavMenu from './components/Navbar';
import Footer from './components/Footer';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import Logout from './common/Logout';
import Profile from './screens/Profile';

function App() {
  return (
    <Router>
      <NavMenu />
      <ToastContainer />
      <Routes>
        <Route
          path='/profile'
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path='/logout' element={<Logout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
