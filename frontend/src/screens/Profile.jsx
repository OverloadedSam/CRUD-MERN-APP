import React from 'react';
import Joi from 'joi-browser';
import { connect } from 'react-redux';
import action from '../redux/actions/userActions';
import auth from '../services/authService';
import Form from '../common/Form';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Container from 'react-bootstrap/Container';
import FormBootstrap from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loader from '../common/Loader';
import Alert from '../common/Alert';
import { toast } from 'react-toastify';

class MyProfile extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        dateOfBirth: '',
        address: '',
      },
      errors: {},
      editProfileMode: false,
      show: false,
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
    address: Joi.string().min(5).max(1024).trim().required().label('Address'),
  };

  discardEditing = () => {
    const { editProfileMode } = this.state;
    const user = { ...this.props.user.user };

    this.setState({
      editProfileMode: !editProfileMode,
      data: { ...user },
      errors: {},
    });
  };

  showModal = () => this.setState({ show: true });

  closeModal = () => this.setState({ show: false });

  deleteUser = () => {
    this.props.deleteUserAccount();
  };

  performSubmit = () => {
    const { firstName, lastName } = this.state.data;
    const payload = {
      ...this.state.data,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    };

    if (!payload.lastName) delete payload.lastName;

    return this.props.updateUserDetails(payload);
  };

  componentDidMount() {
    this.props.getUserDetails();
  }

  componentDidUpdate(prevProps) {
    const { user } = this.props.user;
    const { error: userUpdateError, userUpdatedData } = this.props.userUpdate;
    const { loading: deleteSuccess, error: deleteError } =
      this.props.userDelete;

    if (user && !prevProps.user.user) {
      const userData = { ...user };
      this.setState({ data: { ...this.state.data, ...userData } });
    }

    if (userUpdatedData && !prevProps.userUpdate.userUpdatedData) {
      const { editProfileMode, data } = this.state;
      this.setState({
        editProfileMode: !editProfileMode,
        data: {
          ...data,
        },
        errors: {},
      });
      this.props.resetUpdateUserDetails();
      toast.success('Details has been updated!');
    }

    if (userUpdateError) {
      this.props.resetUpdateUserDetails();
      toast.error(userUpdateError);
    }

    if (deleteSuccess) {
      auth.logoutUser();
      window.location = '/';
    }

    if (deleteError) {
      this.props.resetDeleteUserAccount();
      toast.error(deleteError);
    }
  }

  render() {
    const { loading, error, success } = this.props.user;
    const { loading: updating } = this.props.userUpdate;
    const { loading: deleting } = this.props.userDelete;
    const { editProfileMode } = this.state;

    const firstNameInput = {
      id: 'firstName',
      type: 'text',
      label: 'First Name',
      autoFocus: true,
      disabled: !editProfileMode,
    };
    const lastNameInput = {
      id: 'lastName',
      type: 'text',
      label: 'Last Name',
      disabled: !editProfileMode,
    };
    const dateOfBirthInput = {
      id: 'dateOfBirth',
      type: 'date',
      label: 'Date of Birth',
      placeholder: 'Enter your DOB',
      disabled: !editProfileMode,
    };
    const phoneInput = {
      id: 'phone',
      type: 'text',
      label: 'Phone',
      placeholder: 'Your phone number',
      disabled: !editProfileMode,
    };
    const emailInput = {
      id: 'email',
      type: 'email',
      label: 'E-Mail',
      placeholder: 'E.g: example@email.com',
      autoComplete: 'email',
      disabled: !editProfileMode,
    };
    const addressInput = {
      id: 'address',
      type: 'text-area',
      label: 'Address',
      placeholder: 'Your residential address',
      rows: 4,
      disabled: !editProfileMode,
    };
    const editProfileButton = {
      label: 'Edit Profile',
      variant: 'danger',
      onClickHandler: () => {
        this.setState({ editProfileMode: !this.state.editProfileMode });
      },
    };
    const discardButton = {
      label: 'Discard',
      variant: 'primary',
      className: 'mb-3',
      onClickHandler: this.discardEditing,
    };
    const updateProfileButton = {
      label: updating ? 'Updating...' : 'Update Profile',
      type: 'submit',
      variant: 'success',
      block: true,
    };
    const deleteAccountButton = {
      label: deleting ? 'Deleting...' : 'Delete Account',
      type: 'button',
      className: 'mt-3',
      variant: 'outline-danger',
      block: true,
      onClickHandler: this.showModal,
    };
    const modalProps = {
      heading: 'Warning! Danger Zone',
      message:
        'This action can not be undone! Do you want to delete this account?',
      content: (
        <>
          <Button variant='danger' onClick={this.deleteUser}>
            Yes
          </Button>{' '}
          <Button variant='success' onClick={this.closeModal}>
            No
          </Button>
        </>
      ),
      show: this.state.show,
      closeModal: this.closeModal,
    };

    return (
      <Container>
        <FormBootstrap className='register my-5 mx-auto shadow p-5 rounded'>
          <div className='d-flex justify-content-center mb-2 user-icon'>
            <img src='assets/icons/user.svg' alt='user' />
          </div>
          <h2 className='text-center mb-5'>Profile</h2>

          {loading ? (
            <Loader variant='danger' animation='border' />
          ) : error ? (
            <Alert error={error} />
          ) : success ? (
            <>
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
              {this.renderTextArea(addressInput)}
              {!editProfileMode
                ? this.renderButton(editProfileButton)
                : this.renderButton(discardButton)}{' '}
              {editProfileMode && this.renderButton(updateProfileButton)}{' '}
              {!editProfileMode && this.renderButton(deleteAccountButton)}
            </>
          ) : null}
          <Modal {...modalProps} />
        </FormBootstrap>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  userUpdate: state.userUpdate,
  userDelete: state.userDelete,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetails: () => dispatch(action.getUserDetails()),
  updateUserDetails: (payload) => dispatch(action.updateUserDetails(payload)),
  resetUpdateUserDetails: () => dispatch(action.resetUpdateUserDetails()),
  deleteUserAccount: () => dispatch(action.deleteUserAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
