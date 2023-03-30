const targetWebsites = [
  'facebook.com',
  'twitter.com',
  '9gag.com',
];
let activeWebsite = null;
let timeSpent = {
  'facebook.com': 0,
  'twitter.com': 0,
  '9gag.com': 0,
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
  if (currentWebsite) {
    timeSpent[currentWebsite] += 1; // Increment time spent by 1 second
    console.log(`Time spent on ${currentWebsite}: ${timeSpent[currentWebsite]} seconds`);
    chrome.storage.local.set({ timeSpent }); // Save the updated data to storage
  }
}

function checkActiveWebsite() {
  chrome.windows.getLastFocused({ populate: true }, (window) => {
    const activeTab = window.tabs.find((tab) => tab.active);
    const currentWebsite = getCurrentWebsite(activeTab.url);

    if (currentWebsite !== activeWebsite) {
      activeWebsite = currentWebsite;
    }

    updateSpentTime(activeWebsite);
  });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    checkActiveWebsite();
  }
});

chrome.tabs.onActivated.addListener(() => {
  checkActiveWebsite();
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    activeWebsite = null;
  } else {
    checkActiveWebsite();
  }
});

// Load the previous data from storage
chrome.storage.local.get(['timeSpent'], (result) => {
  if (result.timeSpent) {
    timeSpent = result.timeSpent;
  }
});

function sendDataToServer(timeSpent) {
  fetch('http://localhost:4000/api/website-time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timeSpent),
  })
    .then((response) => response.text())
    .then((responseText) => console.log(responseText))
    .catch((error) => console.error('Error:', error));
}


// Check the active website and update time spent every second
setInterval(checkActiveWebsite, 1000);
setInterval(() => {
  sendDataToServer(timeSpent);
}, 36000);