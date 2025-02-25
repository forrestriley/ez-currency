import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavBar(){
  return (
    <>
      <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">EZ-Currencey</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/Calc">Calculator</Nav.Link>
                <Nav.Link href="/Rates">Exchange Rates</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  )
}

export default NavBar