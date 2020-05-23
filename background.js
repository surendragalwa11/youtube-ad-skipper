function onUpdate(tabId, changeInfo) {
    const currentUrl = changeInfo.url;
    const isYoutube = currentUrl && currentUrl.includes('www.youtube.com');
    if(isYoutube){
        chrome.tabs.sendMessage(tabId, {currentUrl: currentUrl});
    }
}

chrome.tabs.onUpdated.addListener(onUpdate);