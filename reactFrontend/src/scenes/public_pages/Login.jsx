// Login.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import AuthForm from "./AuthForm";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from useAuth
      await login(username, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container className="text-center" style={{ maxWidth: "400px" }}>
      <main className="form-signin">
        <AuthForm
          title="Please sign in"
          onSubmit={handleLogin}
          username={username}
          onUsernameChange={(e) => setUsername(e.target.value)}
          password={password}
          onPasswordChange={(e) => setPassword(e.target.value)}
          buttonText="Sign In"
          linkText="Registration"
          linkHref="SignUp"
          checkboxText="Remember Me"
        />
      </main>
    </Container>
  );
};

export default Login;
