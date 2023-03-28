const targetWebsite = '9gag.com'; // Replace with the domain you want to track
let startTime = null;
let timeSpent = 0;

function isTargetWebsite(url) {
  return url.includes(targetWebsite);
}

function updateSpentTime() {
  if (startTime) {
    const now = new Date();
    timeSpent += (now - startTime) / 1000; // Time spent in seconds
    startTime = now;
    console.log(`Time spent on ${targetWebsite}: ${timeSpent} seconds`);
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    if (isTargetWebsite(tab.url)) {
      if (!startTime) {
        startTime = new Date();
      }
    } else {
      updateSpentTime();
      startTime = null;
    }
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateSpentTime();

    if (isTargetWebsite(tab.url)) {
      startTime = new Date();
    } else {
      startTime = null;
    }
  });
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    updateSpentTime();
    startTime = null;
  } else {
    chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
      if (tabs[0] && isTargetWebsite(tabs[0].url)) {
        startTime = new Date();
      } else {
        startTime = null;
      }
    });
  }
});
