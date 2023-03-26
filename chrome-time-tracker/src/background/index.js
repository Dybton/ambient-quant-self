const trackedWebsites = ["linkedin.com", "facebook.com", "youtube.com"]

const timeSpent = trackedWebsites.reduce((acc, site) => {
    acc[site] = 0;
    return acc;
  }, {});


  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      handleNavigation(tab.url);
    }
  });
  
let currentSite = null;
let lastVisitedTime = null;

function handleNavigation(url) {
  const newSite = trackedWebsites.find(site => url.includes(site));

  if (currentSite) {
    const timeSpentOnSite = Date.now() - lastVisitedTime;
    timeSpent[currentSite] += timeSpentOnSite;
  }

  currentSite = newSite;
  lastVisitedTime = Date.now();
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getTimeSpentData') {
      sendResponse(timeSpent);
    }
  });