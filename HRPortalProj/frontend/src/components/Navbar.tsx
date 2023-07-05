import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { persistor } from "../redux/store";
import { detailsUser } from "../redux/actions/UserActions";
import { connect } from "react-redux";
import Login from "./Login";

const Header: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const [user1, setUser1] = useState()
  useEffect(() => {
    console.log(props, "props")

  },[props])
  const { user } = useSelector((state: RootStateOrAny) => state.userDetails);

  const handleLogout = async () => {
    localStorage.removeItem("userInfo");
    await persistor.purge()
    window.location.replace("/");
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <Navbar.Brand>HR Portal</Navbar.Brand>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav className="ml-auto align-items-center">
            {props.user.user ? (
              <NavDropdown
                className="dropdown-avatar"
                title={
                  <div className="d-flex align-items-center">
                    {props.user.user.name}
                  </div>
                }
                id="basic-nav-dropdown">
                <LinkContainer to="/uploadFile">
                  <NavDropdown.Item>uploadFile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/onboarding">
                  <NavDropdown.Item>Onboarding Application</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Personal Information</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/visa">
                  <NavDropdown.Item>Visa Status</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/house">
                  <NavDropdown.Item>Housing</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <div className="d-flex align-items-center"></div>
                <button onClick={handleLogout}>Logout</button>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}
            {props.user.user && props.user.user.isAdmin && (
              <NavDropdown
                className="ms-4 dropdown-avatar"
                title="Admin"
                id="basic-nav-dropdown">
                <LinkContainer to="/profiles">
                  <NavDropdown.Item>Employee Profiles</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/hr/visa">
                  <NavDropdown.Item>Visa Status</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/hr/hire">
                  <NavDropdown.Item>Hiring</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/hr/house">
                  <NavDropdown.Item>Housing</NavDropdown.Item>
                </LinkContainer>
                <button onClick={handleLogout}>Logout</button>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function mapStateToProps(state: any){
  console.log(state, "statenavbar")
  return {user: state.userDetails}
}

const mapDispatchToProps = {
  detailsUser: detailsUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)

