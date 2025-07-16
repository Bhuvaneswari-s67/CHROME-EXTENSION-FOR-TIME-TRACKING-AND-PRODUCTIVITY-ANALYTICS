document.addEventListener("DOMContentLoaded", async () => {
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  const barCtx = document.getElementById("barChart").getContext("2d");

  try {
    const response = await fetch("http://localhost:8080/track/summary");
    const data = await response.json();

    console.log(" /track/summary response:", data);

    let labels = Object.keys(data);
    let timeSpent = Object.values(data).map(ms => Math.round(ms / 60000)); 

    const combined = labels.map((label, i) => ({ label, time: timeSpent[i] }));
    combined.sort((a, b) => b.time - a.time);
    labels = combined.map(item => item.label);
    timeSpent = combined.map(item => item.time);

    const productiveSites = [
      "github.com", "stackoverflow.com", "w3schools.com",
      "leetcode.com", "geeksforgeeks.org", "udemy.com"
    ];

    let totalTime = 0;
    let productiveTime = 0;

    labels.forEach((site, i) => {
      const minutes = timeSpent[i];
      totalTime += minutes;
      if (productiveSites.includes(site)) productiveTime += minutes;
    });

    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
    document.getElementById("totalTime").textContent = `${hours}h ${minutes}m`;

    const productivityPercent = totalTime > 0
      ? Math.round((productiveTime / totalTime) * 100)
      : 0;
    document.getElementById("productivePercent").textContent = `${productivityPercent}%`;

    const maxIndex = timeSpent.indexOf(Math.max(...timeSpent));
    document.getElementById("topSite").textContent = labels[maxIndex] || "-";

    const pieColors = [
      "#4e79a7", "#f28e2c", "#e15759", "#76b7b2",
      "#59a14f", "#edc949", "#af7aa1", "#ff9da7",
      "#9c755f", "#bab0ab", "#d37295", "#fabfd2"
    ];
    const dynamicColors = labels.map((_, i) => pieColors[i % pieColors.length]);

    new Chart(pieCtx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{
          data: timeSpent,
          backgroundColor: dynamicColors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              generateLabels: (chart) => {
                const data = chart.data;
                return data.labels.map((label, i) => ({
                  text: `${label} (${timeSpent[i]} min)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: "#fff",
                  lineWidth: 1,
                  hidden: false,
                  index: i
                }));
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                const site = context.label;
                const h = Math.floor(value / 60);
                const m = value % 60;
                return `${site}: ${h}h ${m}m`;
              }
            }
          }
        },
        cutout: "50%"
      }
    });

    const weeklyRes = await fetch("http://localhost:8080/track/weekly");
    const weeklyData = await weeklyRes.json();

    console.log("/track/weekly response:", weeklyData);

    if (!Array.isArray(weeklyData)) {
      console.error(" weeklyData is not an array!");
    }

    const dayLabels = weeklyData.map(item => item.date);
    const dayMinutes = weeklyData.map(item => item.minutes);

    new Chart(barCtx, {
      type: "bar",
      data: {
        labels: dayLabels,
        datasets: [{
          label: "Total Minutes Per Day",
          data: dayMinutes,
          backgroundColor: "#4e79a7"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });

    const tableBody = document.querySelector("#siteTable tbody");
    tableBody.innerHTML = "";

    if (labels.length === 0) {
      const row = document.createElement("tr");
      const empty = document.createElement("td");
      empty.colSpan = 2;
      empty.textContent = "No data available";
      row.appendChild(empty);
      tableBody.appendChild(row);
      return;
    }

    labels.forEach((site, i) => {
      console.log("📄 Table row:", site, timeSpent[i]);

      const row = document.createElement("tr");

      const siteCell = document.createElement("td");
      siteCell.textContent = site;

      const h = Math.floor(timeSpent[i] / 60);
      const m = timeSpent[i] % 60;

      const timeCell = document.createElement("td");
      timeCell.textContent = `${h}h ${m}m`;

      row.appendChild(siteCell);
      row.appendChild(timeCell);
      tableBody.appendChild(row);
    });

  } catch (err) {
    console.error("Error loading data:", err);
  }
});
