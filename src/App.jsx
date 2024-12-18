import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase.config';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import MainScreen from './pages/MainScreen';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import GridBackground from './components/GridBackground';
import { UserProvider } from './context/UserContext';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <UserProvider>
      <GridBackground />
      <div className="App">
        <Router>
          <Routes>
            <Route 
              path="/login" 
              element={user ? <Navigate to="/main" /> : <Login />} 
            />
            <Route 
              path="/signup" 
              element={user ? <Navigate to="/main" /> : <SignUp />} 
            />
            <Route 
              path="/main" 
              element={<MainScreen user={user} />} 
            />
            <Route 
              path="/profile" 
              element={user && !user.isAnonymous ? <Profile user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/leaderboard" 
              element={<Leaderboard user={user} />} 
            />
            <Route 
              path="/" 
              element={<Navigate to="/main" />} 
            />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
