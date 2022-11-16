import React from 'react';
import ButtonBootstrap from 'react-bootstrap/Button';

const Button = ({ label, block, children, ...rest }) => {
  return (
    <div className={block ? 'd-grid' : ''}>
      <ButtonBootstrap {...rest}>{children}</ButtonBootstrap>
    </div>
  );
};

Button.defaultProps = {
  type: 'button',
  variant: 'primary',
  size: 'md',
  block: false,
};

export default Button;
