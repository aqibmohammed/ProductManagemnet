package com.assignment.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.assignment.app.dto.Accessory;
import com.assignment.app.repository.AccessoryRepository;

@Service 
public class AccessoryService {

    @Autowired 
    private AccessoryRepository accessoryRepository;

    public void addAccessory(Accessory accessory) {
        accessoryRepository.save(accessory);
    }

    public List<Accessory> getAllAccessories() {
        return accessoryRepository.findAll();
    }

    public List<Accessory> getAccessoriesByProductId(Long productId) {
        return accessoryRepository.findByProductId(productId); 
    }
}
