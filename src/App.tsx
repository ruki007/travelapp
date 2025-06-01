import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/login/login';
import Regist from './pages/login/regist';
import CreateTravelPlanPage from './pages/Home/Newplan';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/create-plan" element={<CreateTravelPlanPage />} />
          {/* 他のルートを追加する場合はここに記述 */}
          {/* 例: <Route path="/profile" element={<Profile />} /> */}
          {/* 他のルートを追加する場合はここに記述 */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;