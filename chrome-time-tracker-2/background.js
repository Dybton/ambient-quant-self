
const targetWebsites = [
  'facebook.com',
  'twitter.com',
  'linkedin.com',
];

let timeSpent = {
  'facebook.com': 0, 
  'twitter.com': 0,
  'linkedin.com': 0,
};

let focusedWebsite = null; // the website that is currently focused

// Get target website from URL
const getCurrentTargetWebsite = (url) => {
  const urlObject = new URL(url);
  const hostname = urlObject.hostname;

  for (const website of targetWebsites) {
    if (hostname.includes(website)) {
      return website;
    }
  }
  return null;
};

// Update focusedWebsite and timeSpent
const checkfocusedWebsite = () => {
  chrome.windows.getLastFocused({ populate: true }, (window) => {
    const activeTab = window.tabs.find((tab) => tab.active);

    const currentTargetWebsite = getCurrentTargetWebsite(activeTab.url);

    if (currentTargetWebsite !== focusedWebsite) {
      focusedWebsite = currentTargetWebsite;
}
    updateSpentTime(focusedWebsite);
  });
};

// Increment time spent on the focused website
const updateSpentTime = (website) => {
  if (website) {
    if (isNaN(timeSpent[website])) {
      timeSpent[website] = 0;
    }
    timeSpent[website] += 1;
    console.log(`Time spent on ${website}: ${timeSpent[website]} seconds`);
    chrome.storage.local.set({ timeSpent });
  }
};

// Reset time spent on websites weekly
const resetTimeSpentIfNeeded = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  
  chrome.storage.local.get(['lastResetDate'], (result) => {

    const lastResetDate = result.lastResetDate ? new Date(result.lastResetDate) : null;

    // reset timeSpent if it's Monday and the lastResetDate is not today
    
    if (!lastResetDate || (dayOfWeek === 1 && today.toDateString() !== lastResetDate.toDateString())) {
      for (const website in timeSpent) {
        timeSpent[website] = 0;
      }

      chrome.storage.local.set({ timeSpent }); // set the timeSpent to 0
      chrome.storage.local.set({ lastResetDate: today.toISOString() }); // set the lastResetDate to today
    }
  });
};

// Event Listeners

// triggers when tab is updated (refresh / open new tab)
chrome.tabs.onUpdated.addListener((changeInfo) => {
  if (changeInfo.status === 'complete') { // when tab is loaded
    checkfocusedWebsite();
  }
});

// triggers when tab is activated (switched to)
chrome.tabs.onActivated.addListener(() => {
  checkfocusedWebsite();
});

// triggers when window is focused
chrome.windows.onFocusChanged.addListener((windowId) => {
  // WINDOW_ID_NONE is when the browser loses focus 
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    focusedWebsite = null;
  } else {
    checkfocusedWebsite();
  }
});

// Initialize timeSpent and send data to the server
(async () => {
  await chrome.storage.local.get(['timeSpent'], (result) => {
    if (result.timeSpent) {
      timeSpent = result.timeSpent;
    }
    resetTimeSpentIfNeeded();
    sendDataToServer(timeSpent);
  });
})();

const sendDataToServer = (timeSpent) => {
  console.log('Sending data to server:', timeSpent);
  fetch('http://localhost:4000/api/website-time', { // fetch location of server to send data to
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(timeSpent),
  })
    .then((response) => response.text()) // convert response to text
    .then((responseText) => console.log('Server response:', responseText)) // log response
    .catch((error) => console.error('Error:', error));
};

setInterval(checkfocusedWebsite, 1000);

setInterval(() => {
  sendDataToServer(timeSpent);
}, 1800); 
