import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import { useLocation } from "react-router-dom";
import { path } from "express/lib/application";
// import leaf from "/images/leaf.png";

const Header = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const getPath = () => {
    const paths = ["/contract", "/bazaar", "/detector"];
    const res = {};
    if (
      (pathname.includes("/inventory") || pathname.length > 1) &&
      !paths.includes(pathname)
    ) {
      res["url"] = "/inventory";
      res["pathName"] = "Agri-Inventory";
    } else if (pathname.includes("/")) {
      res["url"] = "/";
      res["pathName"] = "Agri-Smart";
    }
    console.log(res);
    return res;
  };

  const { url, pathName } = getPath();
  const isHome = (() => url === "/")();

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={url}>
            <Navbar.Brand>{pathName}</Navbar.Brand>
          </LinkContainer>
          {!isHome && (
            <LinkContainer to="/">
              <Nav.Link>
                <span class="home">Home</span>
              </Nav.Link>
            </LinkContainer>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {!isHome && <SearchBox />}
            <Nav className="ml-auto">
              {isHome && (
                <LinkContainer to="/detector">
                  <Nav.Link>
                    <img
                      src="/images/leaf.png"
                      className="leaf"
                      alt="Plant Disease Detector"
                    />
                    Plant Disease Detector
                  </Nav.Link>
                </LinkContainer>
              )}
              {!isHome && (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i> Cart
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                !isHome && (
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                )
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      r
    </header>
  );
};

export default Header;
