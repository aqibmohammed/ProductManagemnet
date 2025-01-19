package com.assignment.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.assignment.app.dto.Accessory;

import com.assignment.app.dto.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
//	public Optional<Accessory> findByIdAndProductId(Long accessoryId, Long productId);

	
}
