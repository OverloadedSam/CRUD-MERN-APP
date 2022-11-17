import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loader = ({ className, label, animation, variant }) => {
  return (
    <div className={className}>
      <h4 className=''>
        {label}
        <Spinner animation={animation} variant={variant} />
      </h4>
    </div>
  );
};

Loader.defaultProps = {
  className: 'd-flex justify-content-center',
  label: 'Loading... ',
  animation: 'grow',
  variant: 'primary',
};

export default Loader;
