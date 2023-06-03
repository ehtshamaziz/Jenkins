
import './App.css';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Signup from './components/Signup';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Signup />} />



      </Routes>

    </BrowserRouter>
  );
}

export default App;
