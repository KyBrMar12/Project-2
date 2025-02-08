import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hero from './components/hero';
import Features from './components/features';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="mx-auto pt-20 px-6 w-full">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
