## CHROME-EXTENSION-FOR-TIME-TRACKING-AND-PRODUCTIVITY-ANALYTICS

 COMPANY: CODTECH IT SOLUTIONS

 NAME: BHUVANESWARI S

 DOMAIN: FULL STACK WEB DEVELOPMENT

 DURATION: 4 WEEKS

 MENTOR: NEELA SANTOSH


## WebTime – Chrome Extension for Time Tracking & Productivity Analytics

WebTime is a Chrome Extension that tracks how much time you spend on different websites, classifies them as productive or unproductive, and presents detailed productivity analytics through an interactive dashboard.

This project is built with:
-  Chrome Extension (JavaScript)
-  Spring Boot (Java Backend)
-  MySQL (Data Storage)
-  Chart.js (Dashboard Visualization)

## Features

1. Real-Time Time Tracking  

  Tracks active time spent on websites by monitoring tab switches, URL changes, and window focus.

2. Productivity Classification  

Automatically categorizes websites as 'productive'(e.g., `github.com`, `udemy.com`) or 'unproductive' (e.g., `youtube.com`, `facebook.com`).

3. Analytics Dashboard
  
Includes:
- Total time tracked
- Most visited website
- Productivity percentage
- ring chart (time per domain)
- Bar chart 
- Table view of all domains with detailed time spent

4. Backend Integration 
Time data is sent to a Spring Boot backend and stored in a database for persistent analytics.

5. Weekly Summary Support  
Provides a weekly overview of usage data and helps identify productivity trends.


## How It Works

1. `productivity-core.js` tracks active domain and time spent using Chrome APIs.
2. On every tab switch or focus change, it calculates time and sends it to  `http://localhost:8080/track`.
3. Spring Boot backend saves the time data per domain.
4. The dashboard (`dashboard.html`) fetches data from:
   - `/track/summary` → total time per domain
   - `/track/weekly`  → optional weekly stats
5. Charts and metrics are dynamically populated in the dashboard.

## Site Classification

You can customize which sites are considered productive or unproductive in `dashboard.js` and `TimeService.java`.

const productiveSites = [
  "github.com", "stackoverflow.com", "w3schools.com", "leetcode.com"
];

const unproductiveSites = [
  "facebook.com", "youtube.com", "instagram.com"
];


## Setup Instructions

 CHROME EXTENSION

. Go to chrome://extensions/

. Enable Developer mode

. Click "Load unpacked"

. Select the 'extension' folder

. Click on the extension icon → Open dashboard

## Backend (Spring Boot)

1. Start your Spring Boot application (TimeTrackerApplication)

2. Make sure it's running at http://localhost:8080

3. Ensure MySQL is connected and database tables are generated.


## Technologies Used

THECHNOLOGY  -   PURPOSE

Chrome APIs  -   Tab and window tracking
JavaScript   -   Extension logic + dashboard
Spring Boot  -   REST API and data persistence
MySQL        -   Time entry database
Chart.js     -   Dashboard charts
HTML/CSS     -   UI structure and styling


## POPUP

<img width="567" height="348" alt="Image" src="https://github.com/user-attachments/assets/55d927c3-1a8b-465b-81d1-1f34e4d7bb4a" />

## dashboardReport

<img width="1920" height="906" alt="Image" src="https://github.com/user-attachments/assets/d7f96117-ec50-4037-8ef8-5530d2f9ea34" />
