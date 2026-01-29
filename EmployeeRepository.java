
package com.hcl.hybridshifttracker.repository;

import com.hcl.hybridshifttracker.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
}
