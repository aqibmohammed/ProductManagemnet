import { useState } from 'react'
import './App.css'
import Product from './components/product'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import EditProduct from './components/EditProduct';
import EditAccessory from './components/EditAccessory';
function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Product/>} />
      <Route path="/productlist" element={<ProductList />} />
      <Route path="/edit-product/:id" element={<EditProduct/>}/>
      <Route path="/product/:productId/accessory/:accessoryId/edit" element={<EditAccessory />} />
    </Routes>
  </Router>
  )
}

export default App
