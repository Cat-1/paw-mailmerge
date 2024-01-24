import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
        <Container>
            <Navbar.Brand as={Link} to={"/"} >PAW MailMerge</Navbar.Brand>
        </Container>
    </Navbar>
  );
};

export default NavBar;