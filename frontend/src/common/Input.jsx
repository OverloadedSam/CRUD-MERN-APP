import React from 'react';
import Form from 'react-bootstrap/Form';

const Input = (props) => {
  const { id, label, error, groupElement, ...rest } = props;
  return (
    <>
      <Form.Group className='mb-3' controlId={id}>
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control name={id} isInvalid={!!error} {...rest} />
        {error && <Form.Text className='text-danger'>{error}</Form.Text>}
      </Form.Group>
    </>
  );
};

Input.defaultProps = {
  error: null,
  placeholder: '',
  type: 'text',
};

export default Input;
