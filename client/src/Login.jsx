import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ formData, setFormData, handleSubmit, loginError }) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {loginError && (
          <div className="text-red-500 mb-4">
            Invalid email or password. Please try again.
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Login
        </button>
      </form>
      <div className="mt-4 text-sm">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link>.
      </div>
    </div>
  );
};

const Login = ({ onLoginSuccess }) => {
  const [loginFormData, setLoginFormData] = React.useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = React.useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginFormData),
      });

      if (response.ok) {
        setLoginError(false);
        const { userId } = await response.json();
        onLoginSuccess(userId);
        navigate(`/profile/${userId}`);
      } else {
        setLoginError(true);
        console.error('Login failed.');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  return <LoginForm formData={loginFormData} setFormData={setLoginFormData} handleSubmit={handleLoginSubmit} loginError={loginError} />;
};

export default Login;
