import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "./features/products/productSlice";

export default function Crud() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    name: "",
    description: "",
    isActive: false,
    price: "",
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = (product) => {
    setCurrentProduct(product);
    setShow(true);
    setError("");
  };

  const handleEdit = (product) => {
    handleShow(product);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      !currentProduct.name ||
      !currentProduct.description ||
      !currentProduct.price
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    dispatch(updateProduct({ id: currentProduct.id, product: currentProduct }))
      .unwrap()
      .then(() => {
        dispatch(fetchProducts());
        handleClose();
      })
      .catch((error) => {
        setError("Failed to update product. Please try again.");
        console.error("Failed to update product:", error);
      });
  };

  return (
    <Fragment>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Description</th>
            <th>Is Active</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0
            ? products.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.description}</td>
                  <td>{emp.isActive ? "Yes" : "No"}</td>
                  <td>${emp.price}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEdit(emp)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            : "Loading..."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdate}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3" controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={currentProduct.name}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Product description"
                value={currentProduct.description}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                value={currentProduct.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="productIsActive">
              <Form.Check
                type="checkbox"
                label="IsActive"
                checked={currentProduct.isActive}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    isActive: e.target.checked,
                  })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
}
