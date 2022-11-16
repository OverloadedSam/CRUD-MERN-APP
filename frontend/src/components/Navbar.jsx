import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavMenu() {
  return (
    <>
      <Navbar key='sm' bg='dark' variant='dark' expand='sm'>
        <Container fluid className='mx-4'>
          <Navbar.Brand href='#'>CRUD App</Navbar.Brand>
          <Navbar.Toggle aria-controls='offcanvasNavbar-expand-sm' />
          <Navbar.Offcanvas
            id='offcanvasNavbar-expand-sm'
            aria-labelledby='offcanvasNavbarLabel-expand-sm'
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id='offcanvasNavbarLabel-expand-sm'>
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='flex-grow-1 pe-3'>
                <Link className='nav-link' to='/'>
                  Home
                </Link>
                <Link className='nav-link' to='/about'>
                  About
                </Link>
                <Link className='nav-link' to='/services'>
                  Services
                </Link>
                <Link className='nav-link' to='/contact'>
                  Contact
                </Link>
              </Nav>
              <Form className='d-flex'>
                <Form.Control
                  type='search'
                  placeholder='Search'
                  className='me-2'
                  aria-label='Search'
                />
                <Button variant='outline-primary'>Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavMenu;
