let activeTabId = null;
let activeDomain = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await handleTabSwitch(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    handleTabSwitch(tabId);
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    recordTimeSpent();
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) handleTabSwitch(tabs[0].id);
    });
  }
});

async function handleTabSwitch(tabId) {
  recordTimeSpent();
  try {
    const tab = await chrome.tabs.get(tabId);
    if (!tab.url.startsWith("http")) return;

    activeTabId = tabId;
    activeDomain = new URL(tab.url).hostname.replace(/^www\./, "");
    startTime = Date.now();
  } catch (err) {
    console.error("Tab access error:", err);
  }
}

function recordTimeSpent() {
  if (!activeDomain || !startTime) return;

  const timeSpentMs = Date.now() - startTime;
  if (timeSpentMs > 2000) {
    fetch("http://localhost:8080/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        domain: activeDomain,
        timeSpent: timeSpentMs
      })
    }).catch(err => console.error("Failed to send time:", err));

    console.log(" Tracked:", activeDomain, timeSpentMs, "ms");
  }

  activeDomain = null;
  startTime = null;
}
