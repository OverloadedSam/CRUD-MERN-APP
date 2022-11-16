import React from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import Form from '../common/Form';
import Container from 'react-bootstrap/Container';
import FormBootstrap from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { toast } from 'react-toastify';

class Register extends Form {
  constructor() {
    super();

    this.state = {
      data: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        dateOfBirth: '',
        password: '',
        address: '',
      },
      errors: {},
      responseError: null,
    };
  }

  schema = {
    firstName: Joi.string()
      .min(3)
      .max(128)
      .trim()
      .required()
      .label('First name'),
    lastName: Joi.string().max(128).trim().allow('').label('Last name'),
    phone: Joi.string()
      .regex(/^[6-9]\d{9}$/gi)
      .required()
      .label('Phone number'),
    dateOfBirth: Joi.date()
      .greater('1940-01-01')
      .less('now')
      .required()
      .label('Date of Birth'),
    email: Joi.string().email().required().label('E-mail'),
    password: Joi.string().min(1).max(256).required().label('Password'),
    address: Joi.string().min(5).max(1024).trim().required().label('Address'),
  };

  performSubmit = (e) => {
    const { firstName, lastName } = this.state.data;
    const payload = {
      ...this.state.data,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };

    if (!payload.lastName) delete payload.lastName;

    return this.props.registerUser(payload);
  };

  componentDidUpdate() {
    const { success, error } = this.props.userRegister;

    if (success) {
      toast.success('Successfully Registered!');
      window.location = '/';
      return;
    }
    if (error) {
      this.setState({ responseError: error });
      toast.error(error);
      this.props.resetRegisterUser();
    }
  }

  render() {
    const { loading } = this.props.userRegister;
    const { responseError } = this.state;

    const firstNameInput = {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      placeholder: 'Your first name',
      autoFocus: true,
    };

    const lastNameInput = {
      id: 'lastName',
      type: 'text',
      label: 'Last Name',
      placeholder: 'Your last name',
    };

    const dateOfBirthInput = {
      id: 'dateOfBirth',
      type: 'date',
      label: 'Date of Birth',
    };

    const phoneInput = {
      id: 'phone',
      type: 'text',
      label: 'Phone',
      placeholder: 'Your phone number',
    };

    const emailInput = {
      id: 'email',
      type: 'email',
      label: 'E-Mail',
      placeholder: 'E.g: example@email.com',
      autoComplete: 'email',
    };

    const passwordInput = {
      id: 'password',
      type: 'password',
      label: 'Password',
      placeholder: 'Create a strong password',
      autoComplete: 'new-password',
    };

    const addressInput = {
      id: 'address',
      label: 'Address',
      placeholder: 'Your residential address',
      rows: 4,
    };

    const buttonInput = {
      label: !!loading ? 'Please wait...' : 'Register',
      variant: 'outline-success',
      type: 'submit',
      disabled: !!loading,
      block: true,
    };

    return (
      <Container>
        <FormBootstrap className='register my-5 mx-auto shadow p-5 rounded'>
          <h2 className='text-center mb-5'>Register</h2>
          {responseError && (
            <p className='text-center fw-bold text-danger mb-2'>
              {responseError}
            </p>
          )}
          <Row>
            <Col xs={12} md={6}>
              {this.renderInput(firstNameInput)}
            </Col>
            <Col xs={12} md={6}>
              {this.renderInput(lastNameInput)}
            </Col>
          </Row>
          {this.renderInput(dateOfBirthInput)}
          {this.renderInput(phoneInput)}
          {this.renderInput(emailInput)}
          {this.renderInput(passwordInput)}
          {this.renderTextArea(addressInput)}
          {this.renderButton(buttonInput)}
          <p className='text-center mt-3'>
            Already registered customer? <Link to='/login'>Log In here</Link>
          </p>
        </FormBootstrap>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (payload) => dispatch(userActions.registerUser(payload)),
  resetRegisterUser: () => dispatch(userActions.resetRegisterUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
