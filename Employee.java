
package com.hcl.hybridshifttracker.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Employee {
    @Id
    private String employeeId;
    private String name;
    private String password;
    private String role;
    private String email;
    private String department;
    private String manager;
    private String location;

    // Constructors
    public Employee() {}
    public Employee(String employeeId, String name, String password, String role, String email, String department, String manager, String location) {
        this.employeeId = employeeId;
        this.name = name;
        this.password = password;
        this.role = role;
        this.email = email;
        this.department = department;
        this.manager = manager;
        this.location = location;
    }

    // Getters and Setters
    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getManager() { return manager; }
    public void setManager(String manager) { this.manager = manager; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
}
