import React from "react"; 
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthenticate } from "../Context";
import { FaUserEdit, FaSignOutAlt, FaDropbox } from "react-icons/fa"; 

export default function NavbarComponent() {
  const { logout } = useAuthenticate();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <Navbar bg="primary" expand="sm" className="d-flex justify-content-between">
      <Navbar.Brand as={Link} to="/" className="text-white d-flex align-items-center">
        <FaDropbox className="me-3" /> 
          &nbsp; My Dropbox
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user" className="text-white d-flex align-items-center">
          <FaUserEdit className="me-2" /> 
          &nbsp; Edit Profile
        </Nav.Link>
        <Button onClick={handleLogout} className="p-2 text-white d-flex align-items-center">
          <FaSignOutAlt className="me-2" /> 
          &nbsp; Logout
        </Button>
      </Nav>
    </Navbar>
  );
}
