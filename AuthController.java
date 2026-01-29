
package com.hcl.hybridshifttracker.controller;

import com.hcl.hybridshifttracker.entity.Employee;
import com.hcl.hybridshifttracker.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Employee loginRequest) {
        Optional<Employee> employee = employeeRepository.findById(loginRequest.getEmployeeId());
        if (employee.isPresent() && employee.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(employee.get());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
