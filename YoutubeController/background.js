// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {

});
var tabs = [];
window.tabid = 0;
var count = 0;
chrome.windows.getAll({ populate: true }, getAllOpenWindows);

function getAllOpenWindows(winData) {
  for (var i in winData) {
    if (winData[i].focused === true) {
      var winTabs = winData[i].tabs;
      var totTabs = winTabs.length;
      for (var j = 0; j < totTabs; j++) {
        if (winTabs[j].url.includes("youtube.com"))
          tabs.push(winTabs[j]);
      }
    }
  }
}

chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.url.indexOf("chrome-devtools://") == -1) {
    console.log(tab)
  }
});
chrome.tabs.onUpdated.addListener(function (changeInfo, tab) {
  console.log(tab, changeInfo, tab.title, window.tabid);
  if((tab.title=="YouTube")||(tab.url=="https://www.youtube.com/"&&changeInfo==window.tabid)){
    window.tabid = 0;
    console.log("clear window.tabid");
  }
  if ((tab.status == 'loading' && tab.url.includes("youtube.com")&&tab.url.includes("watch"))||tab.title=="YouTube") {
    console.log(tab, changeInfo, tab.title, window.tabid)
    if (window.tabid != changeInfo) {
      chrome.tabs.executeScript(changeInfo, {
        file: 'inject.js'
      });
      setTimeout(() => {
        chrome.tabs.executeScript(changeInfo, {
          file: 'connect.js'
        });
        console.log("inject connect js", window.tabid, changeInfo);
      }, 3000);
      console.log("inject js", window.tabid, changeInfo);

    }
    window.tabid = changeInfo;
  }
});
/*chrome.tabs.onUpdated.addListener(function(changeInfo, tab) {
  if (changeInfo.status == 'complete') {
     tabUrl = tab.url;
     tabTitle = tab.title;
     createLink();
};*/
//var querying = browser.tabs.query({currentWindow: true, active: true});
//querying.then(getInfoForTab, onError);