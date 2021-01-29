// ==UserScript==
// @name         Youtube to mobile
// @namespace    maxhyt.youtubeToMobile
// @version      1.2
// @description  try to take over the world!
// @author       Maxhyt
// @match        https://www.youtube.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @connect      api.pushbullet.com
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    
    setInterval(function addButton()
    {
        //new Promise(resolve => {
            if (document.body.querySelector("#sendToMobileButton") === null && /watch\?v=/.test(window.location.href))
            {
                let controlsBox = document.body.querySelector("div.ytp-right-controls");
                if (controlsBox !== null)
                {
                    let buttonDiv = document.createElement("div");
                    buttonDiv.innerHTML = '<button id="sendToMobileButton" class="ytp-button" title="Send to mobile" style="vertical-align: top; padding: 7px">' +
                        '<svg width="100%" height="100%" viewBox="0 0 16 16" class="bi bi-phone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>' +
                        '</button>';
                    controlsBox.insertBefore(buttonDiv.firstChild, controlsBox.childNodes[0]);

                    document.body.querySelector("#sendToMobileButton").onclick = function() {
                        getLink();
                    };
                }
            }
            
            //resolve();
        //});
    }, 5000);

    function getLink()
    {
        let progressbar = document.body.querySelector("div.ytp-progress-bar");

        if (progressbar !== null)
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
                device_iden: "ujyic81KxoqsjwWJj7SKVE"
            }),
            headers: {
                "Content-Type": "application/json",
                "Access-Token": "o.TmRSUmnhtct3CJYoayKBxYFFuZEmqbqm"
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
