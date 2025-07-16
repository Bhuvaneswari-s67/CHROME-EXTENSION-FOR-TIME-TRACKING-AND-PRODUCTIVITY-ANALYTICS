document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("dashboardBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      chrome.tabs.create({ url: chrome.runtime.getURL("dashboard.html") });
    });
  }
});
