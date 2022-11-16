import React from 'react';
import Form from 'react-bootstrap/Form';

const TextArea = (props) => {
  const { id, label, cols, rows, error, ...rest } = props;
  return (
    <>
      <Form.Group className='mb-3 fw-bold' controlId={id}>
        {label && <Form.Label>{label}</Form.Label>}
        <Form.Control
          name={id}
          as='textarea'
          rows={rows}
          cols={cols}
          isInvalid={!!error}
          {...rest}
        />
        {error && <Form.Text className='text-danger'>{error}</Form.Text>}
      </Form.Group>
    </>
  );
};

TextArea.defaultProps = {
  error: null,
  placeholder: '',
};

export default TextArea;
