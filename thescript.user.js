// ==UserScript==
// @name         Youtube to mobile
// @namespace    maxhyt.youtubeToMobile
// @version      1.0
// @description  try to take over the world!
// @author       Maxhyt
// @match        https://www.youtube.com/watch?v=*
// @grant        GM_xmlhttpRequest
// @connect      api.pushbullet.com
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// @run-at       document-idle
// ==/UserScript==

    
var $ = jQuery;

(function() {
    'use strict';
    
    setTimeout(() => {
        let controlsBox = $("div.ytp-right-controls");
        if (controlsBox.length > 0)
        {
            $(controlsBox[0]).prepend('<button id="sendToMobileButton" class="ytp-button" style="vertical-align: top; padding: 7px"><svg width="100%" height="100%" viewBox="0 0 16 16" fill="currentColor">' +
                                      '<path fill-rule="evenodd" d="M11 1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>' +
                                      '<path fill-rule="evenodd" d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>' +
                                      '</svg></button>');
            
            $("#sendToMobileButton").on("click", () => {
                getLink();
            });
        }
    }, 100);

    function getLink()
    {
        let progressbar = $("div.ytp-progress-bar");

        if (progressbar.length > 0)
        {
            let time = $(progressbar[0]).attr("aria-valuenow");

            push(window.location.href + "&t=" + time);
        }
    }

    function push(link)
    {
        console.info("Sent push request");
        
        GM_xmlhttpRequest({
            url: 'https://api.pushbullet.com/v2/pushes',
            method: 'POST',
            data: JSON.stringify({
                type: "link",
                title: "S3cr3tKey From Maxhyt",
                url: link,
                device_iden: "<id>"
            }),
            headers: {
                "Content-Type": "application/json",
                "Access-Token": "<token>"
            },
            responseType: 'json',
            onload: function (data) {
                //console.log(data.response);
                if (data.response.active)
                {
                    console.info("Pushed success!");
                }
            },
            onerror: function() {
                console.log("PUSH FAILED: ");
            }
        });
    }
})();
