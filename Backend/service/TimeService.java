package com.example.timetracker.service;

import com.example.timetracker.entity.TimeEntry;
import com.example.timetracker.repository.TimeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TimeService {

    private final TimeRepository timerepository;

    public static final List<String> productiveSites = List.of(
            "github.com", "stackoverflow.com", "w3schools.com", "leetcode.com"
    );
    public static final List<String> unproductiveSites = List.of(
            "facebook.com", "youtube.com", "instagram.com"
    );

    public TimeService(TimeRepository repository) {
        this.timerepository = repository;
    }

    public TimeEntry saveEntry(String domain, long timeSpent) {
        return timerepository.save(new TimeEntry(domain, timeSpent));
    }

    public Map<String, Long> getSummary() {
        List<Object[]> rawSummary = timerepository.getTotalTimePerDomain();
        Map<String, Long> summary = new HashMap<>();

        for (Object[] row : rawSummary) {
            String domain = (String) row[0];
            Long totalTime = (Long) row[1];
            summary.put(domain, totalTime);
        }

        return summary;
    }

    public List<Object[]> getLast7Days() {
        LocalDateTime sevenDaysAgo = LocalDate.now().minusDays(6).atStartOfDay();
        return timerepository.getTimeSpentLast7Days(sevenDaysAgo);
    }

}
