const targetWebsites = [
  'facebook.com',
  'linkedin.com',
  'youtube.com'
]; // Replace with the domains you want to track
let startTime = null;
let timeSpent = {
  'facebook.com': 0,
  'linkedin.com': 0,
  'youtube.com': 0,
};

function getCurrentWebsite(url) {
  for (const website of targetWebsites) {
    if (url.includes(website)) {
      return website;
    }
  }
  return null;
}

function updateSpentTime(currentWebsite) {
  if (startTime && currentWebsite) {
    const now = new Date();
    timeSpent[currentWebsite] += (now - startTime) / 1000; // Time spent in seconds
    startTime = now;
    console.log(`Time spent on ${currentWebsite}: ${timeSpent[currentWebsite]} seconds`);
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    const currentWebsite = getCurrentWebsite(tab.url);
    updateSpentTime(currentWebsite);
    startTime = currentWebsite ? new Date() : null;
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const currentWebsite = getCurrentWebsite(tab.url);
    updateSpentTime(currentWebsite);
    startTime = currentWebsite ? new Date() : null;
  });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    updateSpentTime(null);
    startTime = null;
  } else {
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      const currentWebsite = tabs[0] ? getCurrentWebsite(tabs[0].url) : null;
      updateSpentTime(currentWebsite);
      startTime = currentWebsite ? new Date() : null;
    });
  }
});
