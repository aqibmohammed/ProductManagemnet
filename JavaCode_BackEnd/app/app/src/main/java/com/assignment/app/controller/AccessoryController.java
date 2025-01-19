package com.assignment.app.controller;


import com.assignment.app.dto.Accessory;
import com.assignment.app.service.AccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/accessories")
@CrossOrigin(origins = "http://localhost:5173") // Modify as needed
public class AccessoryController {

    private final AccessoryService accessoryService;

    @Autowired
    public AccessoryController(AccessoryService accessoryService) {
        this.accessoryService = accessoryService;
    }

    // Get all accessories
    @GetMapping
    public List<Accessory> getAllAccessories() {
        return accessoryService.getAllAccessories();
    }

    // Add a new accessory
    @PostMapping
    public void addAccessory(@RequestBody Accessory accessory) {
        accessoryService.addAccessory(accessory);
    }

    // Get accessories by product ID
    @GetMapping("/product/{productId}")
    public List<Accessory> getAccessoriesByProductId(@PathVariable Long productId) {
        return accessoryService.getAccessoriesByProductId(productId);
    }
    
}
