import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const Home = () => {
  return (
    <section className='hero'>
      <Container className='d-sm-flex d-lg-block flex-column text-center text-lg-start'>
        <h1>We're Leading Innovators</h1>
        <p>
          Get your website made the way it should be: clean, functional, secure
          and custom. We're the web development experts who know how to bring
          customers to your digital door.
        </p>
        <div>
          <Button as={Link} to='login' variant='light'>
            Log In
          </Button>
          <Button
            as={Link}
            to='register'
            variant='outline-light'
            className='ms-4'
          >
            Register
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Home;
