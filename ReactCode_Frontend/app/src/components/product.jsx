import React, { useState } from "react";
import axios from "axios";
import "../styles/product.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  /* background-color: red; */
  margin-bottom: 20%;
`;

const Form = styled.form`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 2rem 3rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 40%;
  margin-right: 20px;
  /* margin-left: 40%; */
  /* margin-bottom: 6rem; */
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 0.5rem;
  align-self: flex-start;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:focus {
    outline: none;
    border-color: lavender;
    box-shadow: 0 0 4px lavender;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubmitButton = styled.button`
  width: 40%;
  padding: 0.75rem;
  background-color: #4facfe;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(189, 189, 226);
  }
`;

const ProductList = styled.button`
  width: 13%;
  padding: 0.75rem;
  background-color: lavender;
  color: blueviolet;
  border: none;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  /* margin-top: 45%; */
  transition: background-color 0.3s;
  margin-top: -300px;

  &:hover {
    background-color: rgb(189, 189, 226);
    color: black;
  }
`;

const Product = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    model: "",
    cost: null,
    make: "",
    quantity: null,
  });
  const [productId, setProductId] = useState(null);
  const [accessories, setAccessories] = useState([]);
  const [newAccessory, setNewAccessory] = useState({
    accessoryName: "",
    model: "",
    cost: null,
    make: "",
    quantity: null,
  });
  const [isAccessoryMode, setIsAccessoryMode] = useState(false);

  // Toogle Accessory Mode
  const toggleAccessoryMode = () => {
    setIsAccessoryMode(!isAccessoryMode);
  };

  // Handle product submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    console.log(product);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/products",
        product
      ); 
      console.log("Product ID:", response.data); 
      setProductId(response.data); 
      alert("Product saved successfully. You can now add accessories.");
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };


// handling accessory submission...
  const handleAccessorySubmit = async (e) => {
    e.preventDefault();
    try {
      const accessoryWithProductId = { ...newAccessory, productId }; 
      const response = await axios.post(
        `http://localhost:8080/api/v1/products/${productId}/accessories`,
        accessoryWithProductId
      );
      console.log(response.data);
      setAccessories([...accessories, response.data]); 
      setNewAccessory({
        accessoryName: "",
        model: "",
        cost: 0,
        make: "",
        quantity: 0,
      }); 
      alert("Accessory added successfully.");
    } catch (error) {
      console.error("Error saving accessory:", error);
    }
  };

  return (
    <Main>
      <FormContainer>
      
        {/* Product Form */}
        
        {!isAccessoryMode && (
          <Form onSubmit={handleProductSubmit}>
            <Title>Add Product</Title>
            <Label>Product Name</Label>
            <Input
              id="productName"
              type="text"
              placeholder="Enter Product Name"
              value={product.productName}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
            />
            <Label>Product Model</Label>
            <Input
              id="productModel"
              type="text"
              placeholder="Enter Product Model"
              value={product.model}
              onChange={(e) =>
                setProduct({ ...product, model: e.target.value })
              }
            />
            <Label>Product Make</Label>
            <Input
              id="productMake"
              type="text"
              placeholder="Enter Product Make"
              value={product.make}
              onChange={(e) => setProduct({ ...product, make: e.target.value })}
            />
            <Label>Product Cost</Label>
            <Input
              id="productCost"
              type="number"
              placeholder="Enter Product Cost"
              value={product.cost}
              onChange={(e) => setProduct({ ...product, cost: e.target.value })}
            />
            <Label>Product Quantity</Label>
            <Input
              id="productQuantity"
              type="number"
              placeholder="Enter Product Quantity"
              value={product.quantity}
              onChange={(e) =>
                setProduct({ ...product, quantity: e.target.value })
              }
            />
            <SubmitButton type="submit">Save Product</SubmitButton>
          </Form>
        )}

        {/* Accessory Form */}
        {productId && (
          <Form onSubmit={handleAccessorySubmit}>
            <Title>Add Accessory</Title>
            <Label htmlFor="accessoryName">Accessory Name</Label>
            <Input
              id="accessoryName"
              type="text"
              placeholder="Enter Accessory Name"
              value={newAccessory.accessoryName}
              onChange={(e) =>
                setNewAccessory({
                  ...newAccessory,
                  accessoryName: e.target.value,
                })
              }
            />

            <Label htmlFor="accessoryModel">Accessory Model</Label>
            <Input
              id="accessoryModel"
              type="text"
              placeholder="Enter Accessory Model"
              value={newAccessory.model}
              onChange={(e) =>
                setNewAccessory({ ...newAccessory, model: e.target.value })
              }
            />

            <Label htmlFor="accessoryModel">Accessory Make</Label>
            <Input
              id="accessoryMake"
              type="text"
              placeholder="Enter Accessory Make"
              value={newAccessory.make}
              onChange={(e) =>
                setNewAccessory({ ...newAccessory, make: e.target.value })
              }
            />

            <Label htmlFor="accessoryCost">Accessory Cost</Label>
            <Input
              id="accessoryCost"
              type="number"
              placeholder="Enter Accessory Cost"
              value={newAccessory.cost}
              onChange={(e) =>
                setNewAccessory({ ...newAccessory, cost: e.target.value })
              }
            />

            <Label htmlFor="accessoryCost">Accessory Quantity</Label>
            <Input
              id="accessoryQuantity"
              type="number"
              placeholder="Enter Accessory Quantity"
              value={newAccessory.quantity}
              onChange={(e) =>
                setNewAccessory({ ...newAccessory, quantity: e.target.value })
              }
            />

            <SubmitButton type="submit">Add Accessory</SubmitButton>
          </Form>
        )}
      </FormContainer>
      <ProductList onClick={() => navigate("/productlist")}>
        
        View Product List
      </ProductList>
    </Main>
  );
};

export default Product;
