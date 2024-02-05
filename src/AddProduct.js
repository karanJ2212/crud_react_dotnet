// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Container, Form, Button } from "react-bootstrap";
// import { addProduct } from "./features/products/productSlice"; // Update this path to the actual path of your product slice
// import { useNavigate } from "react-router-dom";

// function AddProduct() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     price: 0,
//     isActive: false,
//   });

//   const handleChange = (e) => {
//     const { id, value, checked, type } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       [id]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     dispatch(addProduct(product));

//     console.log("Form submitted", product);

//     setProduct({
//       name: "",
//       description: "",
//       price: 0,
//       isActive: false,
//     });

//     navigate("/");
//   };

//   return (
//     <Container style={{ marginTop: "20px" }}>
//       <h2>Add New Product</h2>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group className="mb-3" controlId="name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter product name"
//             value={product.name}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="description">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Product description"
//             value={product.description}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="price">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Price"
//             value={product.price}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group className="mb-3" controlId="isActive">
//           <Form.Check
//             type="checkbox"
//             label="IsActive"
//             checked={product.isActive}
//             onChange={handleChange}
//           />
//         </Form.Group>

//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </Container>
//   );
// }

// export default AddProduct;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { addProduct } from "./features/products/productSlice"; // Update this path to the actual path of your product slice
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    isActive: false,
  });

  // State to hold any form submission errors
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    // Clear error when user starts editing
    setError("");
    setProduct((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for empty required fields and set error message
    if (!product.name || !product.description || !product.price) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      await dispatch(addProduct(product)).unwrap();

      // Reset form state
      setProduct({
        name: "",
        description: "",
        price: 0,
        isActive: false,
      });

      navigate("/");
    } catch (rejectedValueOrSerializedError) {
      // Handle API error response
      setError("Failed to add product. Please try again.");
      console.error(rejectedValueOrSerializedError);
    }
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2>Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Product description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="isActive">
          <Form.Check
            type="checkbox"
            label="IsActive"
            checked={product.isActive}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
