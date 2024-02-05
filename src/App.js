import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Crud from "./crud";
import AddProduct from "./AddProduct";
import { Container, Navbar, Nav } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Product CRUD</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/add-product">
                Add Product
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Crud />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
