// AuthForm.jsx
import React from 'react';
import { Form, Image, Button } from 'react-bootstrap';

const AuthForm = ({
  title,
  onSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  buttonText,
  checkboxText,
  linkText,
  linkHref,
  showConfirmPassword, // New prop to control whether to show the confirm password field
  confirmPassword,
  onConfirmPasswordChange,
  agreeToTerms, 
  onCheckboxChange,
}) => {
  return (
    <Form onSubmit={onSubmit} className="w-75 mx-auto mt-5">
      <Image src="/assets/wrench.png" alt="wrench icon" width="144" height="114" className="mb-4" />
      <h1 className="h3 mb-3 fw-normal">{title}</h1>

      <div className="form-floating mb-1">
        <input
          type="text"
          name="username"
          className="form-control"
          id="floatingInput"
          placeholder=""
          value={username}
          onChange={onUsernameChange}
        />
        <label className="ignoreTheme" htmlFor="floatingInput">Username</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          name="password"
          className="form-control"
          id="floatingPassword"
          placeholder=""
          value={password}
          onChange={onPasswordChange}
        />
        <label className="ignoreTheme" htmlFor="floatingPassword">Password</label>
      </div>

      {showConfirmPassword && ( 
        <div className="form-floating mb-3">
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            id="floatingConfirmPassword"
            placeholder=""
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
          />
          <label className="ignoreTheme" htmlFor="floatingConfirmPassword">Confirm Password</label>
        </div>
      )}

      <div className="checkbox mb-3">
        <label>
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={onCheckboxChange} // Handle checkbox change
          />{' '}
          {checkboxText}
        </label>
      </div>
      <Button className="w-100 btn btn-lg btn-success signBtn mb-1" type="submit" value="sign_in">
        {buttonText}
      </Button>
      <a className="w-100 btn btn-lg btn-secondary regBtn" href={linkHref}>
        {linkText}
      </a>
    </Form>
  );
};

export default AuthForm;
