import React from 'react';
import { Navbar} from 'react-bootstrap';

const NavBar: React.FC = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
            <Navbar.Brand href="/" >PAW MailMerge</Navbar.Brand>
    </Navbar>
  );
};

export default NavBar;