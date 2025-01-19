

package com.assignment.app.controller;

import com.assignment.app.dto.Product;
import com.assignment.app.dto.Accessory;
import com.assignment.app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/products")
@CrossOrigin(origins = "http://localhost:5173") 
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Get all products
    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }
    
//    Get product by id
    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }

    // Add a new product
    @PostMapping
    public Long addProduct(@RequestBody Product product) {
    	Product savedProduct = productService.addNewProduct(product);
        return savedProduct.getId();
    }
    
    

    // Update an existing product
    @PutMapping("/{productId}")
    public void updateProduct(
            @PathVariable Long productId,
            @RequestBody Product updatedProduct
    ) {
        productService.updateProduct(productId, updatedProduct);
    }
    
//    Update a specific accessory 
    @PutMapping("/{productId}/accessories/{accessoryId}")
    public void updateAccessory(
            @PathVariable Long productId,
            @PathVariable Long accessoryId,
            @RequestBody Accessory accessoryDetails) {  // Accept the whole accessory object
        productService.updateAccessory(productId, accessoryId, accessoryDetails);
    }
    
    // Delete a product
    @DeleteMapping("/{productId}")
    public void deleteProduct(@PathVariable Long productId) {	
        productService.deleteProduct(productId);
    }

    // Add an accessory to a product
    @PostMapping("/{productId}/accessories")
    public void addAccessoryToProduct(@PathVariable Long productId, @RequestBody Accessory accessory) {
        productService.addAccessoryToProduct(productId, accessory);
    }

 // Get all accessories for a specific product
    @GetMapping("/{productId}/accessories")
    public List<Accessory> getAccessoriesForProduct(@PathVariable Long productId) {
        return productService.getAccessoriesForProduct(productId);
    }
    
 // Get a specific accessory for a specific product
    @GetMapping("/{productId}/accessories/{accessoryId}")
    public Accessory getAccessoryForProduct(@PathVariable Long productId, @PathVariable Long accessoryId) {
        return productService.getAccessoryForProduct(productId, accessoryId);
    }
    
    // Calculate total cost of a product including accessories
    @GetMapping("/{productId}/total-cost")
    public Long calculateTotalCost(@PathVariable Long productId) {
        return productService.calculateTotalCost(productId);
    }

    // Search for products and accessories
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String query) {
        return productService.searchProducts(query);
    }
}
