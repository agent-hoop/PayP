import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import SendMoney from './components/SendMoney'
import Notification from './components/Notification'
import Login from './components/Login'
// import AdminPassword from './components/AdminPassword'
import { WalletProvider } from './context/WalletContext'
import Activity from './components/Activity'
import Admin from './components/Admin'

export default function App() {
  const [notification, setNotification] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <WalletProvider>
      <Router>
        <Nav currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home onNotification={showNotification} />} />
          <Route path="/send" element={<SendMoney onNotification={showNotification} />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/admin-password" element={<AdminPassword />} /> */}
        </Routes>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={hideNotification}
          />
        )}
      </Router>
    </WalletProvider>
  )
}