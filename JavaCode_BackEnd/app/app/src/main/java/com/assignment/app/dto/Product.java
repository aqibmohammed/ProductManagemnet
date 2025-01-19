package com.assignment.app.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
@Entity
public class Product {
	@Id
	@SequenceGenerator(name = "product_sequence", sequenceName = "product_sequence", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "product_sequence")	
	private Long Id;
	private String model;
	private String productName;
	private String make;
	private Long cost;
	private Integer quantity;
	
	 @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	 @JsonIgnore
	    private List<Accessory> accessories;
	 
	public Product(Long id, String model, String product_name, String make, Long cost, Integer quantity) {
		super();
		Id = id;
		this.model = model;
		this.productName = product_name;
		this.make = make;
		this.cost = cost;
		this.quantity = quantity;
	}
	
	


	public Product() {
	
	
	}




	public List<Accessory> getAccessories() {
        return accessories; 
    }
	public void setAccessory(Accessory accessory) {
	    if (this.accessories == null) {
	        this.accessories = new ArrayList<>(); 
	    }
	    this.accessories.add(accessory);
	}
	
//	Getter's and Setter's
	public Long getId() {
		return Id;
	}

	public String getModel() {
		return model;
	}

	public String getProductName() {
		return productName;
	}

	public String getMake() {
		return make;
	}

	public Long getCost() {
		return cost;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setId(Long id) {
		Id = id;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public void setProductName(String product_name) {
		this.productName = product_name;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public void setCost(Long cost) {
		this.cost = cost;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	

	@Override
	public String toString() {
		return "Product [Id=" + Id + ", model=" + model + ", product_name=" + productName + ", make=" + make
				+ ", cost=" + cost + ", quantity=" + quantity + "]";
	}
	

	
	
	
}
