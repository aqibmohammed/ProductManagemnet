import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin-bottom: 8%;
`;

const Form = styled.form`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
  padding: 1rem 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 40%;
  margin-right: 20px;
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

const Button = styled.button`
  width: 10%;
  padding: 0.75rem;
  background-color: lavender;
  color: blueviolet;
  border: none;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  /* margin-top: 45%; */
  transition: background-color 0.3s;
  margin-top: -200px;
  margin-right: 20px;

  &:hover {
    background-color: rgb(189, 189, 226);
    color: black;
  }
`;

const ButtonCnt = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;

  /* margin-top: -180px; */
`;
const EditAccessory = () => {
  const [accessoryData, setAccessoryData] = useState({
    model: "",
    accessoryName: "",
    make: "",
    cost: "",
    quantity: "",
  });

  const { productId, accessoryId } = useParams(); 
  const navigate = useNavigate(); 
  const { model, accessoryName, make, cost, quantity } = accessoryData;

  useEffect(() => {
    const fetchAccessoryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/${productId}/accessories/${accessoryId}`
        );
        setAccessoryData(response.data);
      } catch (error) {
        console.error("Error fetching accessory details:", error);
      }
    };

    fetchAccessoryDetails();
  }, [productId, accessoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccessoryData({ ...accessoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/v1/products/${productId}/accessories/${accessoryId}`,
        accessoryData
      );
      alert("Accessory updated successfully!");
    } catch (error) {
      console.error("Error updating accessory:", error);
      alert("Failed to update accessory!");
    }
  };

  return (
    <Main>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Update Accessory</Title>
          <Label htmlFor="model">Model</Label>
          <Input
            type="text"
            id="model"
            name="model"
            value={model}
            onChange={handleInputChange}
          />

          <Label htmlFor="accessoryName">Accessory Name</Label>
          <Input
            type="text"
            id="accessoryName"
            name="accessoryName"
            value={accessoryName}
            onChange={handleInputChange}
          />

          <Label htmlFor="make">Make</Label>
          <Input
            type="text"
            id="make"
            name="make"
            value={make}
            onChange={handleInputChange}
          />

          <Label htmlFor="cost">Cost</Label>
          <Input
            type="number"
            id="cost"
            name="cost"
            value={cost}
            onChange={handleInputChange}
          />

          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleInputChange}
          />

          <SubmitButton type="submit">Update</SubmitButton>
        </Form>
      </FormContainer>

      <ButtonCnt>
        <Button onClick={() => navigate("/productlist")}>
          View Product List
        </Button>

        <Button onClick={() => navigate("/")}>Add New Product</Button>
      </ButtonCnt>
    </Main>
  );
};

export default EditAccessory;
