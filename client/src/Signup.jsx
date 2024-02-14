import React from 'react';
import SignupForm from './SignupForm';

const Signup = () => {
  // Initialize state for form data in your Signup component
  const [signupFormData, setSignupFormData] = React.useState({
    email: '',
    password: '',
    reenterPassword: '',
  });

  // Handle form submission for signup
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send signupFormData to the server
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupFormData),
      });

      // Parse the response
      const result = await response.json();

      // Log the server response
      console.log(result);

      // Handle success or error messages accordingly
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return <SignupForm formData={signupFormData} setFormData={setSignupFormData} handleSubmit={handleSignupSubmit} />;
};

export default Signup;
