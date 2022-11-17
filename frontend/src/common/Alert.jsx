import AlertBootstrap from 'react-bootstrap/Alert';

function Alert({ heading, variant, error }) {
  return (
    <AlertBootstrap variant={variant}>
      <AlertBootstrap.Heading>{heading}</AlertBootstrap.Heading>
      <hr />
      <p className='mb-0'>{error}</p>
    </AlertBootstrap>
  );
}

Alert.defaultProps = {
  heading: 'Error! Please try again later',
  variant: 'danger',
  error: 'Oh no! Something went wrong',
};

export default Alert;
