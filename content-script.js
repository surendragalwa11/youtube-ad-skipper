// skip button class
const skipBtnClass = 'ytp-ad-skip-button';

// player screen id
const playerId = 'player-theater-container';

// player tag name
const playerTagName = 'ytd-player';

// youtube URL
const youtubeUrl = 'www.youtube.com';

// check if site is youtube
function isYoutubeURL() {
    const currentUrl = window.location.hostname;
    return currentUrl == youtubeUrl;
}

function debounced(delay, fn) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }

// check if any video is playing
function isVideoPlayerScreen() {
    // video player screen
    const player = document.getElementById(playerId);
    return !!player;
}

function skipAdvertisement() {
    const skipButtons = document.getElementsByClassName(skipBtnClass);
    // skip button exists
   if (skipButtons.length > 0) {
        // click on the button & skip ad
        skipButtons[0].click();
    }
}

const skipAdHandler = debounced(1000, skipAdvertisement)

function observeNode(node) {
    // observer config
    const config = { attributes: true, childList: true, subtree: true };
    // dom change observer
    const observer = new MutationObserver(skipAdHandler);
    // register the observer
    observer.observe(node, config);
}

function main() {
    // register observer on document
    observeNode(document);

    const isPlayerScreen = isVideoPlayerScreen();

    if(isPlayerScreen) {
        skipAdHandler();
    }
}

function messageListener(message) {
    main();
}

// on window load
window.addEventListener('load', main);

// background message listener
chrome.runtime.onMessage.addListener(messageListener);