// skip button class
const skipBtnClass = 'ytp-ad-skip-button';

// player screen id
const playerId = 'player-theater-container';

// player tag name
const playerTagName = 'ytd-player';

// ad banner close button classname
const adBannerCloseBtnClass = 'ytp-ad-overlay-close-button';

// continue watching banner submit button
const continueWatchBtnClass = 'style-scope yt-confirm-dialog-renderer style-blue-text size-default';

// youtube URL
const youtubeUrl = 'www.youtube.com';

// interval
let pollingIntervalInstance = null;

// Counter
let skippedAds = 0;
let closedBanner = 0;
let closedContinueWatchBanner = 0;

// check if site is youtube
function isYoutubeURL() {
    const currentUrl = window.location.hostname;
    return currentUrl == youtubeUrl;
}


// check if any video is playing
function isVideoPlayerScreen() {
    // video player screen
    const player = document.getElementById(playerId);
    return !!player;
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

function skipAdvertisement() {

	if(!!pollingIntervalInstance) {
		clearInterval(pollingIntervalInstance);
  }

	pollingIntervalInstance = setInterval(function() {

    // skip youttube ads
    const skipButtons = document.getElementsByClassName(skipBtnClass);
		// ad skip button exists
		if (skipButtons.length > 0) {
			// click on the button & skip ad
      skipButtons[0].click();
      // update counter
      skippedAds++;
      // clear old counter logs and log new counter
      console.clear();
      console.log('%cSkip Youtube Ads: We just skipped ad number %d for you. Cheers.', 'color: green; font-size: 15px', skippedAds);
    }

    // ad banner exists (overlay banner on video)
    const adBannerCloseBtn = document.getElementsByClassName(adBannerCloseBtnClass);
    // if ad banner exist with close btn
    if(adBannerCloseBtn.length > 0) {
      // click and close the banner
      adBannerCloseBtn[0].click();
      // update counter
      closedBanner++
      // clear old counter logs and log new counter
      console.clear();
      console.log('%cSkip Youtube Ads: We just closed banner number %d for you. Cheers.', 'color: purple; font-size: 15px', closedBanner);
    }

    // close continue watching banner and play video
    const continueWatchBtn = document.getElementsByClassName(continueWatchBtnClass);
    // if continue watching banner exist
    if(continueWatchBtn.length > 0) {
      // click button and close banner
      continueWatchBtn[0].click();
      // update counter
      closedContinueWatchBanner++;
      console.log('%cSkip Youtube Ads: We just closed continue watch banner number %d for you. Cheers.', 'color: blue; font-size: 15px', closedContinueWatchBanner);
    }

	}, 2000);
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
        skipAdvertisement();
    }
}

function messageListener(message) {
	main();
}

// on window load
window.onload = main()

// background message listener
chrome.runtime.onMessage = messageListener(message);
