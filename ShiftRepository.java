
package com.hcl.hybridshifttracker.repository;

import com.hcl.hybridshifttracker.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, String> {
    List<Shift> findByEmployeeId(String employeeId);
}
