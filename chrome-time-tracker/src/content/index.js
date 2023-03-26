const backgroundPort = chrome.runtime.connect({ name: 'content-background' });

function handleNavigation(url) {
  backgroundPort.postMessage({ type: 'navigation', url });
}

window.addEventListener('DOMContentLoaded', () => {
  handleNavigation(window.location.href);
});

window.addEventListener('popstate', () => {
  handleNavigation(window.location.href);
});

window.addEventListener('hashchange', () => {
    handleNavigation(window.location.href);
  });
  
const observer = new MutationObserver(() => {
handleNavigation(window.location.href);
});
observer.observe(document.documentElement, { childList: true, subtree: true });
  