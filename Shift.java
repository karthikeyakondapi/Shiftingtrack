
package com.hcl.hybridshifttracker.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Shift {
    @Id
    private String id;
    private String employeeId;
    private String date; // yyyy-MM-dd
    private String workMode; // WFO, WFH, HYBRID

    // Constructors, Getters, Setters
    public Shift() {}
    public Shift(String id, String employeeId, String date, String workMode) {
        this.id = id;
        this.employeeId = employeeId;
        this.date = date;
        this.workMode = workMode;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
    public String getWorkMode() { return workMode; }
    public void setWorkMode(String workMode) { this.workMode = workMode; }
}
