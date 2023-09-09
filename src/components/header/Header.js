import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { UserButton, useClerk } from "@clerk/clerk-react";


const Header = () => {
  const { openSignUp } = useClerk();

  const { user} = useClerk();


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{ color: "gold" }}>
          <FontAwesomeIcon icon={faVideoSlash} />Gold
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink className="nav-link" to="/">Home</NavLink>
            { user ? (
              <NavLink className="nav-link" to="/WatchListsView">
                WatchLists
              </NavLink>
            ) : (
              <span className="nav-link">Please sign in to access Watch List and Reviews</span>
            )}
             
          </Nav>
          <NavLink className="nav-link" to="/">
            <Button onClick={openSignUp} variant="outline-info" style={{ marginRight: '10px' }}>
              Login/Register
            </Button>
          </NavLink>
          <NavLink className="nav-link" to="/">
            <UserButton />
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
