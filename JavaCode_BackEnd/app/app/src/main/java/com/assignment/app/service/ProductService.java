package com.assignment.app.service;

import com.assignment.app.dto.Product;
import com.assignment.app.dto.Accessory;
import com.assignment.app.repository.ProductRepository;
import com.assignment.app.repository.AccessoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.stream.Collectors;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Objects;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final AccessoryRepository accessoryRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, AccessoryRepository accessoryRepository) {
        this.productRepository = productRepository;
        this.accessoryRepository = accessoryRepository;
    }

    // Fetch all products with their accessories
    public List<Product> getProducts() {
        return productRepository.findAll();
    }
    
//    Find products by id
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with id: " + productId));
    }

    // Add a new product
    public Product addNewProduct(Product product) {
        return productRepository.save(product); // JPA automatically generates and assigns the ID
    }

    // Delete a product and its accessories
    public void deleteProduct(Long productId) {
        boolean exists = productRepository.existsById(productId);
        if (!exists) {
            throw new IllegalStateException("Product with ID " + productId + " does not exist");
        }
        productRepository.deleteById(productId);
    }

    // Update a product
    @Transactional
    public void updateProduct(Long productId, Product updatedProduct) {
        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalStateException("Product with ID " + productId + " does not exist"));

        if (updatedProduct.getModel() != null && !updatedProduct.getModel().isEmpty()) {
            existingProduct.setModel(updatedProduct.getModel());
        }
        if (updatedProduct.getProductName() != null && !updatedProduct.getProductName().isEmpty()) {
            existingProduct.setProductName(updatedProduct.getProductName());
        }
        if (updatedProduct.getMake() != null && !updatedProduct.getMake().isEmpty()) {
            existingProduct.setMake(updatedProduct.getMake());
        }
        if (updatedProduct.getCost() != null) {
            existingProduct.setCost(updatedProduct.getCost());
        }
        if (updatedProduct.getQuantity() != null) {
            existingProduct.setQuantity(updatedProduct.getQuantity());
        }
    }
    
    @Transactional
    public void updateAccessory(Long productId, Long accessoryId, Accessory accessoryDetails) {
        Accessory accessory = accessoryRepository.findByIdAndProductId(accessoryId, productId)
                .orElseThrow(() -> new IllegalStateException("Accessory with ID " + accessoryId + " does not exist"));

        if (accessoryDetails.getModel() != null && accessoryDetails.getModel().length() > 0) {
            accessory.setModel(accessoryDetails.getModel());
        }
        if (accessoryDetails.getAccessoryName() != null && accessoryDetails.getAccessoryName().length() > 0) {
            accessory.setAccessoryName(accessoryDetails.getAccessoryName());
        }
        if (accessoryDetails.getMake() != null && accessoryDetails.getMake().length() > 0) {
            accessory.setMake(accessoryDetails.getMake());
        }
        if (accessoryDetails.getCost() != null) {
            accessory.setCost(accessoryDetails.getCost());
        }
        if (accessoryDetails.getQuantity() != null) {
            accessory.setQuantity(accessoryDetails.getQuantity());
        }
    }

    // Add an accessory to a product
    public void addAccessoryToProduct(Long productId, Accessory accessory) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalStateException("Product with ID " + productId + " does not exist"));

        accessory.setProduct(product); // Set the parent Product object
        accessoryRepository.save(accessory); // Save the accessory
    }
    
//    Get Accessory for that product
    public List<Accessory> getAccessoriesForProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalStateException("Product with ID " + productId + " does not exist"));

        return product.getAccessories(); // Returns the list of accessories associated with the product
    }
    
    public Accessory getAccessoryForProduct(Long productId, Long accessoryId) {
        // Fetch the accessory by productId and accessoryId from the repository
        return accessoryRepository.findByIdAndProductId(accessoryId, productId)
                .orElseThrow(() -> new IllegalStateException("Accessory with ID " + accessoryId + " does not exist for Product with ID " + productId));
    }


    // Calculate total cost of a product (product cost + accessories cost)
    public Long calculateTotalCost(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalStateException("Product with ID " + productId + " does not exist"));

        Long accessoryCost = product.getAccessories().stream()
                .mapToLong(accessory -> accessory.getCost() * accessory.getQuantity()) // Multiply by quantity for each accessory
                .sum();
       
        // Multiply the product cost by its quantity
        return (product.getCost() * product.getQuantity()) + accessoryCost;
    }

    public List<Product> searchProducts(String query) {
        List<Product> allProducts = productRepository.findAll();

        return allProducts.stream()
                .filter(product -> 
                    product.getProductName().toLowerCase().contains(query.toLowerCase()) || 
                    product.getModel().toLowerCase().contains(query.toLowerCase()) || 
                    product.getMake().toLowerCase().contains(query.toLowerCase()) ||
                    product.getAccessories().stream()
                            .anyMatch(accessory -> accessory.getAccessoryName().toLowerCase().contains(query.toLowerCase()))
                )
                .collect(Collectors.toList());
    }
}
