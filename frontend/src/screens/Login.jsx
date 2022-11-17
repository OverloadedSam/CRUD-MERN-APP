import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import Form from '../common/Form';
import Container from 'react-bootstrap/Container';
import FormBootstrap from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

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

  performSubmit = () => {
    const payload = this.state.data;
    this.props.loginUser(payload);
  };

  componentDidUpdate() {
    const { success, error } = this.props.userLogin;

    if (success) {
      window.location = '/';
    }
    if (error) {
      this.setState({ responseError: error });
      this.props.resetLoginUser();
    }
  }

  render() {
    const { loading, isLoggedIn } = this.props.userLogin;
    const { responseError } = this.state;
    if (isLoggedIn) {
      toast('Your are already logged in!');

      return <Navigate to='/' />;
    }

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
      label: loading ? 'Please wait...' : 'Login',
      variant: 'danger',
      type: 'submit',
      disabled: !!loading,
      block: true,
    };

    return (
      <Container>
        <FormBootstrap className='login my-5 mx-auto shadow p-5 rounded'>
          <h2 className='text-center mb-5'>Login</h2>
          {responseError && (
            <p className='text-center fw-bold text-danger mb-2'>
              {responseError}
            </p>
          )}
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

const mapStateToProps = (state) => ({ userLogin: state.userLogin });

const mapDispatchToProps = (dispatch) => ({
  loginUser: (payload) => dispatch(userActions.loginUser(payload)),
  resetLoginUser: () => dispatch(userActions.resetLoginUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
