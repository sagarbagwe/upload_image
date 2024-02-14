import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import './index.css';

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Footer content here */}
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a href="https://www.linkedin.com/in/sagar-bagwe-8b353a205/" className="hover:underline">
            Linkedin
          </a>
          . All Rights Reserved Sagar bagwe.
        </span>
      </div>
    </footer>
  );
};

const App = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [userId, setUserId] = React.useState(null);

  const handleLoginSuccess = (userId) => {
    setAuthenticated(true);
    setUserId(userId);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUserId(null);
  };

  return (
    <Router>
      <header className="w-full flex justify-between items-center bg-gray-100 sm:px-8 px-4 py-4 border-b rounded-md">
        <Link to="/">
          {HeaderLogo}
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {authenticated ? (
              <>
                <li>
                  <Link to={`/profile/${userId}`} className="button text-white bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded-md">
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="button text-white bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded-md">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="button text-white bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded-md">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="button text-white bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded-md">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto mt-8 flex justify-center items-center">
        <Routes>
          {/* Welcome Message */}
          <Route
            path=""
            element={
              <div>
                <h1>Welcome to Your App!</h1>
                <p>
                  Choose an option to get started:
                  <br />
                  <Link to="/signup" className="button text-white bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded-md">
                    Signup
                  </Link>
                  <Link to="/login" className="button text-white bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded-md">
                    Login
                  </Link>
                </p>
              </div>
            }
          />

          {/* Login Step */}
          <Route
            path="/login"
            element={
              <div>
                <Login onLoginSuccess={handleLoginSuccess} />
              </div>
            }
          />

          {/* Signup Step */}
          <Route
            path="/signup"
            element={
              <div>
                <Signup />
              </div>
            }
          />

          {/* Profile Step */}
          <Route
            path="/profile/:userId"
            element={
              authenticated ? (
                <Profile userId={userId} />
              ) : (
                <div>
                  <h1>Login Required</h1>
                  <p>Please log in to view your profile.</p>
                  <Navigate to="/login" />
                </div>
              )
            }
          />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
