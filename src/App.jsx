import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import Bookings from './pages/Bookings';
import Events from './pages/Events';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState({
    token: null,
    userId: null
  });

  const login = (token, userId) => {
    setData({ token: token, userId: userId });
  };

  const logout = () => {
    setData({ token: null, userId: null });
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token: data.token,
            userId: data.userId,
            login: login,
            logout: logout
          }}>
          <MainNavigation />
          <main className='main-content'>
            <Routes>
              {!data.token && <Route path="/" element={<Navigate to="/auth" />} />}
              {!data.token && <Route path="/bookings" element={<Navigate to="/auth" />} />}
              {data.token && <Route path="/" element={<Navigate to="/events" />} />}
              {data.token && <Route path="/auth" element={<Navigate to="/events" />} />}
              {!data.token && <Route path="/auth" element={<Auth />} />}
              <Route path="/events" element={<Events />} />
              {data.token && <Route path="/bookings" element={<Bookings />} />}
            </Routes>
          </main>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
