const targetWebsites = [
  'facebook.com',
  'twitter.com',
  'linkedin.com',
];
let activeWebsite = null;
let timeSpent = {
  'facebook.com': 0, 
  'twitter.com': 0,
  'linkedin.com': 0,
};

const dev = false;

if (dev) {
  // we start by resetting the timeSpent object
  resetTimeSpentIfNeeded();
}

function getCurrentWebsite(url) {
  const urlObject = new URL(url);
  const hostname = urlObject.hostname;

  for (const website of targetWebsites) {
    if (hostname.includes(website)) {
      return website;
    }
  }
  return null;
}


function updateSpentTime(currentWebsite) {
  if (currentWebsite) {
    if (isNaN(timeSpent[currentWebsite])) {
      timeSpent[currentWebsite] = 0;
    }
    timeSpent[currentWebsite] += 1; // Increment time spent by 1 second
    console.log(`Time spent on ${currentWebsite}: ${timeSpent[currentWebsite]} seconds`);
    chrome.storage.local.set({ timeSpent }); // Save the updated data to storage
  }
}


function resetTimeSpentIfNeeded() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

  chrome.storage.local.get(['lastResetDate'], (result) => {
    const lastResetDate = result.lastResetDate ? new Date(result.lastResetDate) : null;

    if (!lastResetDate || (dayOfWeek === 1 && today.toDateString() !== lastResetDate.toDateString())) {
      // If there's no lastResetDate, or if today is Monday and not equal to the last reset date, reset the data
      for (const website in timeSpent) {
        timeSpent[website] = 0; // Reset the time spent on each website
      }
      chrome.storage.local.set({ timeSpent }); // Save the reset data to storage
      chrome.storage.local.set({ lastResetDate: today.toISOString() }); // Save the new last reset date
    }
  });
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
async () => {
  await chrome.storage.local.get(['timeSpent'], (result) => {
    if (result.timeSpent) {
      timeSpent = result.timeSpent;
    }
    resetTimeSpentIfNeeded();
    sendDataToServer(timeSpent);
  });
}

function sendDataToServer(timeSpent) {
  console.log('Sending data to server:', timeSpent);
  fetch('http://localhost:4000/api/website-time', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timeSpent),
  })
    .then((response) => response.text())
    .then((responseText) => console.log('Server response:', responseText))
    .catch((error) => console.error('Error:', error));
}

sendDataToServer(timeSpent);

setInterval(checkActiveWebsite, 1000);

setInterval(() => {
  sendDataToServer(timeSpent);
}, 36000); 