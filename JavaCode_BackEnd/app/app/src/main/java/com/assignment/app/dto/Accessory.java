package com.assignment.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Accessory {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	private String model;
	private String accessoryName;
	private String make;
	private Long cost;
	private Integer quantity;
		
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false) 
    @JsonIgnore 
    private Product product;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Accessory(Long id, String model, String accessoryName, String make, Long cost,
			Integer quantity) {
		super();
		Id = id;
		this.model = model;
		this.accessoryName = accessoryName;
		this.make = make;
		this.cost = cost;
		this.quantity = quantity;
	}
	
public Accessory() {
	
	}

	//	Getter's and Setter's
	public Long getId() {
		return Id;
	}
	public String getModel() {
		return model;
	}
	public String getAccessoryName() {
		return accessoryName;
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
	public void setAccessoryName(String accessoryName) {
		this.accessoryName = accessoryName;
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
		return "Accesory [Id=" + Id + ", model=" + model +  "AccessoryName =" + accessoryName + ", make=" + make
				+ ", cost=" + cost + ", quantity=" + quantity + "]";
	}
	
	
	
}
