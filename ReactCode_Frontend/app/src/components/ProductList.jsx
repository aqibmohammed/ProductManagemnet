import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AccessoryTable } from "./AccessoryTable";
import { AccessoryWithCostTable } from "./AccessoryWithCostTable";

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

const ProductButton = styled.button`
  width: 12%;
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
  margin-left: 20px;

  &:hover {
    background-color: rgb(189, 189, 226);
    color: black;
  }
`;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true); 
      const response = await axios.get("http://localhost:8080/api/v1/products");
      console.log("API Response:", response.data); 
      setProducts(response.data); 
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false); 
    }
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query === "") {
      fetchProducts();
    } else {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/search?query=${query}`
      );
      setProducts(response.data);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
    fetchProducts();
  };

  return (
    <Main>
      <div>
        <h1 style={{ paddingLeft: "30%", paddingTop: "30px" }}>Product List</h1>

        {/* Search Bar */}
        <SearchLabel htmlFor="product_name">Search bar:</SearchLabel>
        <SearchInput
          type="text"
          placeholder="Search Products"
          value={searchTerm}
          onChange={handleSearch}
        />

        <ProductButton onClick={() => navigate("/")}>
          Add New Product
        </ProductButton>

        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <>
            <h3 style={{ marginTop: "50px" }}>Product Table</h3>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Product Name</TableHeader>
                  <TableHeader>Model</TableHeader>
                  <TableHeader>Cost</TableHeader>
                  <TableHeader>Make</TableHeader>
                  <TableHeader>Quantity</TableHeader>
                  <TableHeader>Update and Delete</TableHeader>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.productName}</TableCell>
                    <TableCell>{product.model}</TableCell>
                    <TableCell>{product.cost.toLocaleString()}</TableCell>
                    <TableCell>{product.make}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => navigate(`/edit-product/${product.id}`)}
                      >
                        Edit
                      </Button>

                      <Button onClick={() => handleDelete(product.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>

            {/* Accessory Table */}
            <h3 style={{ marginTop: "50px" }}>Accessories Table</h3>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Accessory Name</TableHeader>
                  <TableHeader>Model</TableHeader>
                  <TableHeader>Cost</TableHeader>
                  <TableHeader>Make</TableHeader>
                  <TableHeader>Accessory For</TableHeader>
                  <TableHeader>Quantity</TableHeader>
                  <TableHeader>Update Accessory</TableHeader>
                </tr>
              </thead>
              {products.map((product) => (
                <AccessoryTable key={product.id} product={product} />
              ))}
            </Table>

            {/* New Total Cost Table */}
            <h3 style={{ marginTop: "50px" }}>
              Total Cost for Products and Accessories
            </h3>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Product Name</TableHeader>
                  <TableHeader>Accessory Name</TableHeader>
                  <TableHeader>Total Cost</TableHeader>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <AccessoryWithCostTable key={product.id} product={product} />
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </Main>
  );
};

export default ProductList;
