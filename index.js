// observer config
const config = { attributes: true, childList: true, subtree: true };
// skip button class
const skipBtnClass = "ytp-ad-skip-button";
// player screen id
const playerId = "player-theater-container";
// alternate: tageName and Id: ytd-player
// action callback
const actionCallback = function() {
    const skipButtons = document.getElementsByClassName(skipBtnClass);
    // skip button exists
   if (skipButtons.length > 0) {
       // click on the button & skip ad
       skipButtons[0].click();
   }
}
// dom change observer
const observer = new MutationObserver(actionCallback);
// video player screen
let playerScreen = document.getElementById(playerId);
// register the observer
observer.observe(playerScreen, config);
