import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Form from '../common/Form';
import Container from 'react-bootstrap/Container';
import FormBootstrap from 'react-bootstrap/Form';

class Login extends Form {
  constructor() {
    super();

    this.state = {
      data: {
        email: '',
        password: '',
      },
      errors: {},
      responseError: null,
    };
  }

  schema = {
    email: Joi.string().email().required().label('E-mail'),
    password: Joi.string().min(1).max(256).required().label('Password'),
  };

  render() {
    const emailInput = {
      id: 'email',
      type: 'email',
      label: 'E-Mail',
      placeholder: 'Enter your email',
      autoComplete: 'email',
      autoFocus: true,
    };

    const passwordInput = {
      id: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Enter your password',
      autoComplete: 'current-password',
    };

    const buttonInput = {
      label: 'Login',
      variant: 'danger',
      type: 'submit',
      block: true,
    };

    return (
      <Container>
        <FormBootstrap className='login my-5 mx-auto shadow p-5 rounded'>
          <h2 className='text-center mb-5'>Login</h2>
          {this.renderInput(emailInput)}
          {this.renderInput(passwordInput)}
          {this.renderButton(buttonInput)}
          <p className='text-center mt-3'>
            Not a registered customer? <Link to='/register'>Register now</Link>
          </p>
        </FormBootstrap>
      </Container>
    );
  }
}

export default Login;
