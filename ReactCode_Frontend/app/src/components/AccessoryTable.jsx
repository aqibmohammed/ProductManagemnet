// Accessory Table Component
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Table = styled.table`
  width: 70%;
  border-collapse: collapse;
  margin-top: 40px;
`;

const TableHeader = styled.th`
  border: 2px solid black;
  padding: 10px;
  text-align: left;
  background-color: #f2f2f2;
`;

const TableCell = styled.td`
  border: 2px solid black;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Button = styled.button`
  background-color: #ff7377;
  width: 40%;
  padding: 5px;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 3px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(189, 189, 226);
  }
`;

const Main = styled.main`
  padding-left: 20%;
  width: 100%;
  background-color: aliceblue;
`;

const SearchLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  width: 50%;
  margin-top: 30px;
  padding: 10px;
  border: 2px solid lavender;

  &::placeholder {
    margin-left: 30px;
  }

  &:focus {
    outline: none;
    border-color: lavender;
    box-shadow: 0 0 4px black;
  }
`;

export const AccessoryTable = ({ product }) => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessoriesData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/products/${product.id}/accessories`
        );
        setAccessories(response.data);
      } catch (err) {
        console.error("Error fetching accessories:", err);
        setError("Failed to load accessories.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccessoriesData();
  }, [product.id]);

  if (loading) {
    return <div>Loading accessories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <tbody>
      {accessories.length === 0 ? (
        <tr>
          <TableCell colSpan={6}>No accessories available.</TableCell>
        </tr>
      ) : (
        accessories.map((accessory) => (
          <TableRow key={accessory.id}>
            <TableCell>{accessory.accessoryName}</TableCell>
            <TableCell>{accessory.model}</TableCell>
            <TableCell>{accessory.cost.toLocaleString()}</TableCell>
            <TableCell>{accessory.make}</TableCell>
            <TableCell>{product.productName}</TableCell>{" "}
            {/* Accessory For column */}
            <TableCell>{accessory.quantity}</TableCell>
            <TableCell>
              <Button
                onClick={() =>
                  navigate(
                    `/product/${product.id}/accessory/${accessory.id}/edit`
                  )
                }
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))
      )}
    </tbody>
  );
};
