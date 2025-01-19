import React, { useEffect, useState } from "react";
import axios from "axios";

import styled from "styled-components";


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




const fetchTotalCost = async (productId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products/${productId}/total-cost`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching total cost:", error);
    return null;
  }
};

export const AccessoryWithCostTable = ({ product }) => {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCost, setTotalCost] = useState(null); 
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

    const getTotalCost = async () => {
      const fetchedTotalCost = await fetchTotalCost(product.id);
      setTotalCost(fetchedTotalCost); 
    };

    fetchAccessoriesData();
    getTotalCost(); 
  }, [product.id]);

  if (loading) {
    return <div>Loading accessories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (totalCost === null) {
    return <div>Loading total cost...</div>;
  }


  const accessoryNames =
    accessories.map((accessory) => accessory.accessoryName).join(", ") ||
    "None";

  return (
    <TableRow>
      <TableCell>{product.productName}</TableCell>
      <TableCell>{accessoryNames}</TableCell>
      <TableCell>{totalCost.toLocaleString()}</TableCell>{" "}
    </TableRow>
  );
};
