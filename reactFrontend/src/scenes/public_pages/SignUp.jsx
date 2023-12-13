// SignUp.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import AuthForm from './AuthForm';


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      console.error("Please agree to the terms.");
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          confirm_password: confirmPassword,
        }),
      });
  
      if (response.ok) {
        // Handle successful signup, redirect to login page or show a success message
        console.log("Signup successful!");
      } else {
        // Handle signup failure, display an error message, etc.
        console.error("Signup failed:", response.statusText);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Container className="text-center" style={{ maxWidth: '400px' }}>
      <main className="form-signup">
        <AuthForm
          title="Please Register"
          onSubmit={handleSignUp}
          username={username}
          onUsernameChange={(e) => setUsername(e.target.value)}
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
          showConfirmPassword={true} // Set to true to display confirm password field
          confirmPassword={confirmPassword}
          onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
          buttonText="Register"
          linkText="Sign in"
          linkHref="Login"
          checkboxText="I Agree To Sell My Soul"
          agreeToTerms={agreeToTerms} 
          onCheckboxChange={() => setAgreeToTerms(!agreeToTerms)}
        />
      </main>
    </Container>
  );
};

export default SignUp;
