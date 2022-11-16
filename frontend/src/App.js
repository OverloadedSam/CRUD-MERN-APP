import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavMenu from './components/Navbar';
import Footer from './components/Footer';
import Home from './screens/Home';
import Register from './screens/Register';

function App() {
  return (
    <Router>
      <NavMenu />
      <ToastContainer />
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
