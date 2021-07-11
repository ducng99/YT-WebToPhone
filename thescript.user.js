// ==UserScript==
// @name         Youtube to mobile
// @namespace    maxhyt.youtubeToMobile
// @version      1.3
// @description  Send Youtube video to mobile
// @author       Maxhyt
// @match        https://www.youtube.com/*
// @match        https://blog.ducng.dev/yt-webtophone/
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      api.pushbullet.com
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    
    const NAME_ACCESS_TOKEN = "YT-WebToPhone-PB-AccessToken";
    const NAME_DEVICE_ID = "YT-WebToPhone-PB-DeviceID";
    
    const GetAccessToken = () => { return GM_getValue(NAME_ACCESS_TOKEN, ""); }
    const GetDeviceID = () => { return GM_getValue(NAME_DEVICE_ID, ""); }
    
    if (window.location.href === "https://blog.ducng.dev/yt-webtophone/")
    {
        let configureDOM = document.body.querySelector("#yt-webtophone-configure");
        let tokenDOM = configureDOM.querySelector("#yt-webtophone-accesstoken");
        let deviceIDDOM = configureDOM.querySelector("#yt-webtophone-deviceID");
        let saveButtonDOM = configureDOM.querySelector("#yt-webtophone-save");
        
        if (configureDOM && tokenDOM && deviceIDDOM && saveButtonDOM)
        {
            configureDOM.style.display = "";
            tokenDOM.value = GetAccessToken();
            deviceIDDOM.value = GetDeviceID();
            saveButtonDOM.onclick = () => {
                GM_setValue(NAME_ACCESS_TOKEN, tokenDOM.value);
                GM_setValue(NAME_DEVICE_ID, deviceIDDOM.value);
                GM_notification("Access token and Device ID saved!");
            };
        }
    }
    
    setInterval(() =>
    {
        if (document.getElementById("sendToMobileButton") == null && /watch\?v=/.test(window.location.href))
        {
            let controlsBox = document.querySelector("div.ytp-right-controls");
            if (controlsBox)
            {
                let buttonDiv = document.createElement("div");
                buttonDiv.innerHTML = '<button id="sendToMobileButton" class="ytp-button" title="Send to mobile" style="vertical-align: top; padding: 7px">' +
                    '<svg width="100%" height="100%" viewBox="0 0 16 16" class="bi bi-phone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>' +
                    '</button>';
                controlsBox.insertBefore(buttonDiv.firstChild, controlsBox.childNodes[0]);

                document.getElementById("sendToMobileButton").onclick = function() {
                    getLink();
                };
            }
        }
    }, 5000);

    function getLink()
    {
        let progressbar = document.body.querySelector("div.ytp-progress-bar");

        if (progressbar)
        {
            let time = progressbar.getAttribute("aria-valuenow");

            push(window.location.href + "&t=" + time);
        }
    }

    function push(link)
    {
        console.log("Sent push request");
        
        GM_xmlhttpRequest({
            url: 'https://api.pushbullet.com/v2/pushes',
            method: 'POST',
            data: JSON.stringify({
                type: "link",
                title: "S3cr3tKey From Maxhyt",
                url: link,
                device_iden: GetDeviceID()
            }),
            headers: {
                "Content-Type": "application/json",
                "Access-Token": GetAccessToken()
            },
            responseType: 'json',
            onload: function (data) {
                //console.log(data.response);
                if (data.response.active)
                {
                    console.info("Pushed success!");
                    GM_notification("Pushed to mobile success!");
                }
                else
                {
                    console.error("Push failed: " + data.response.error_code);
                    GM_notification("Pushed to mobile Failed!");
                }
            },
            onerror: function() {
                console.error("Push failed: XMLHttp error");
                GM_notification("Push failed: XMLHttp error");
            }
        });
    }
})();
