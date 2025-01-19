package com.assignment.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.assignment.app.dto.Accessory;

public interface AccessoryRepository  extends JpaRepository<Accessory, Long>{
	  List <Accessory> findByProductId(Long productId);
		public Optional<Accessory> findByIdAndProductId(Long accessoryId, Long productId);
}
