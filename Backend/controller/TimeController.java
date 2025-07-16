package com.example.timetracker.controller;

import com.example.timetracker.entity.TimeEntry;
import com.example.timetracker.service.TimeService;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/track")
@CrossOrigin(origins = "*")
public class TimeController {

    private final TimeService timeService;

    public TimeController(TimeService timeService) {
        this.timeService = timeService;
    }

    @PostMapping
    public TimeEntry saveTime(@RequestBody Map<String, Object> payload) {
        String domain = (String) payload.get("domain");
        long timeSpent = ((Number) payload.get("timeSpent")).longValue();
        return timeService.saveEntry(domain, timeSpent);
    }

    @GetMapping("/weekly")
    public List<Map<String, Object>> getWeekly() {
        List<Object[]> raw = timeService.getLast7Days();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : raw) {
            Date sqlDate = (Date) row[0]; // ✅ FIX: cast to java.sql.Date
            String dateStr = sqlDate.toLocalDate().toString();
            long minutes = ((Number) row[1]).longValue() / 60000;

            Map<String, Object> map = new HashMap<>();
            map.put("date", dateStr);
            map.put("minutes", minutes);
            result.add(map);
        }

        return result;
    }

    @GetMapping("/summary")
    public Map<String, Long> getSummary() {
        return timeService.getSummary();
    }

}
