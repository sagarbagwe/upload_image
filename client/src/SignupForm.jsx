import React from 'react';

const SignupForm = ({ formData, setFormData, handleSubmit }) => {
  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="reenterPassword">
            Re-enter Password
          </label>
          <input
            type="password"
            id="reenterPassword"
            className="w-full border border-gray-300 p-2 rounded-md"
            value={formData.reenterPassword}
            onChange={(e) => setFormData({ ...formData, reenterPassword: e.target.value })}
            required
          />
        </div>

        <div className="mb-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
