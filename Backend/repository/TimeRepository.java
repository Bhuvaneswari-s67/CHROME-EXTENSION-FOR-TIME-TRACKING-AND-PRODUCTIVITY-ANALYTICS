package com.example.timetracker.repository;

import com.example.timetracker.entity.TimeEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface TimeRepository extends JpaRepository<TimeEntry, Long> {

    @Query("SELECT t.domain, SUM(t.timeSpent) FROM TimeEntry t GROUP BY t.domain")
    List<Object[]> getTotalTimePerDomain();

    @Query("SELECT DATE(t.timestamp), SUM(t.timeSpent) " +
            "FROM TimeEntry t " +
            "WHERE t.timestamp >= :sevenDaysAgo " +
            "GROUP BY DATE(t.timestamp) " +
            "ORDER BY DATE(t.timestamp)")
    List<Object[]> getTimeSpentLast7Days(@Param("sevenDaysAgo") LocalDateTime sevenDaysAgo);
}
