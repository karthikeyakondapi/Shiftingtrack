
package com.hcl.hybridshifttracker.controller;

import com.hcl.hybridshifttracker.entity.Shift;
import com.hcl.hybridshifttracker.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/shifts")
@CrossOrigin(origins = "*")
public class ShiftController {

    @Autowired
    private ShiftRepository shiftRepository;

    @PostMapping
    public Shift saveShift(@RequestBody Shift shift) {
        // If shift already exists for this employee and date, find and update it or just save with same ID
        List<Shift> existing = shiftRepository.findByEmployeeId(shift.getEmployeeId());
        for (Shift s : existing) {
            if (s.getDate().equals(shift.getDate())) {
                shift.setId(s.getId());
                break;
            }
        }
        if (shift.getId() == null) {
            shift.setId(UUID.randomUUID().toString());
        }
        return shiftRepository.save(shift);
    }

    @GetMapping("/{employeeId}")
    public List<Shift> getShifts(@PathVariable String employeeId) {
        return shiftRepository.findByEmployeeId(employeeId);
    }

    @DeleteMapping("/{employeeId}/{date}")
    @Transactional
    public void deleteShift(@PathVariable String employeeId, @PathVariable String date) {
        List<Shift> existing = shiftRepository.findByEmployeeId(employeeId);
        for (Shift s : existing) {
            if (s.getDate().equals(date)) {
                shiftRepository.deleteById(s.getId());
            }
        }
    }
}
