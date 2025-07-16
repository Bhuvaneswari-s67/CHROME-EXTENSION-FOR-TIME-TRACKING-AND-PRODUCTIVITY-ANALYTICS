package com.example.timetracker.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class TimeEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String domain;
    private long timeSpent;
    private LocalDateTime timestamp;

    public TimeEntry() {}

    public TimeEntry(String domain, long timeSpent) {
        this.domain = domain;
        this.timeSpent = timeSpent;
        this.timestamp = LocalDateTime.now();
    }
}
