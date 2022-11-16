import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavMenu from './components/Navbar';

function App() {
  return (
    <Router>
      <NavMenu />
      <ToastContainer />
      <Routes>
      </Routes>
    </Router>
  );
}

export default App;
