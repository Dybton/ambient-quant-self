chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    for (let tab of tabs) {
      chrome.tabs.executeScript(
        tab.id,
        {
          code: 'console.log("hello");'
        }
      );
    }
  });
});
