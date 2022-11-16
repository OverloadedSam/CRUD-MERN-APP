import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavMenu from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <NavMenu />
      <ToastContainer />
      <Routes>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
