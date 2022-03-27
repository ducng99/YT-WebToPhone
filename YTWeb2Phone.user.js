// ==UserScript==
// @name         YT Web to Phone
// @namespace    maxhyt.YTWeb2Phone
// @version      2.1.1
// @description  Send Youtube video to mobile
// @author       Maxhyt
// @match        https://www.youtube.com/*
// @icon         https://icons.duckduckgo.com/ip2/youtube.com.ico
// @require      https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs@master/qrcode.min.js
// @grant        GM_notification
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

(async function () {
    'use strict';

    const NAME_DEVICE_ID = "YT-WebToPhone-DeviceID";
    const GetDeviceID = () => GM_getValue(NAME_DEVICE_ID, "");

    if (!GetDeviceID()) {
        let res = await fetch("https://gateway.aws.ducng.dev/ytweb2phone/web");

        if (res.status === 201) {
            res = await res.json();
            GM_setValue(NAME_DEVICE_ID, res.id);
            ShowQR();
        }
    }

    GM_registerMenuCommand("View QR ID", () => ShowQR());

    setInterval(() => {
        if (!document.body.querySelector("#sendToMobileButton") && /watch\?v=/.test(window.location.href)) {
            let controlsBox = document.body.querySelector("div.ytp-right-controls");
            if (controlsBox) {
                let buttonDiv = document.createElement("div");
                buttonDiv.innerHTML = '<button id="sendToMobileButton" class="ytp-button" title="Send to mobile" style="vertical-align: top; padding: 7px">' +
                    '<svg width="100%" height="100%" viewBox="0 0 16 16" class="bi bi-phone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>' +
                    '</button>';
                const theButton = controlsBox.insertBefore(buttonDiv.firstChild, controlsBox.childNodes[0]);

                theButton.onclick = function () {
                    const url = GetLink();
                    SendRequest(url);
                };
            }
        }
    }, 5000);

    function GetLink() {
        let progressbar = document.body.querySelector("div.ytp-progress-bar");

        if (progressbar) {
            let time = progressbar.getAttribute("aria-valuenow");

            return (window.location.href + "&t=" + time);
        }

        return window.location.href;
    }

    async function SendRequest(url) {
        try {
            const res = await fetch("https://gateway.aws.ducng.dev/ytweb2phone/web/push", {
                method: "POST",
                body: JSON.stringify({ webDeviceID: GetDeviceID(), url })
            });

            if (res.status === 200) {
                GM_notification({ text: "Logged a request for your phone!", title: "YT Web to Phone" });
            } else {
                GM_notification({ text: "Failed send a request to your phone", title: "YT Web to Phone" });
            }
        }
        catch (ex) {
            console.error(ex);
            GM_notification({ text: "Failed to connect to server", title: "YT Web to Phone" });
        }
    }

    function ShowQR() {
        const qrContainer = document.createElement("div");
        qrContainer.style.position = "fixed";
        qrContainer.style.top = "0";
        qrContainer.style.left = "0";
        qrContainer.style.right = "0";
        qrContainer.style.bottom = "0";
        qrContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        qrContainer.style.zIndex = "9999";
        qrContainer.style.width = "100vw";
        qrContainer.style.height = "100vh";
        qrContainer.style.display = "flex";
        qrContainer.style.flexDirection = "column";
        qrContainer.style.justifyContent = "center";
        qrContainer.style.alignItems = "center";

        qrContainer.addEventListener('click', (event) => {
            if (event.target !== document.body.querySelector('#ytweb2phone_qr_info'))
                qrContainer.remove();
        });

        qrContainer.innerHTML = `<div id="ytweb2phone_qr_info" style="font-size: 18px; color: white; background: black; line-height: 1.5; padding: .5em; border-radius: .5em; margin-bottom: 1em;">
        Click anywhere outside this box to close<br/>
        To view again, right click on the page -> Tampermonkey -> YT Web To Phone -> View QR ID<br/>
        Your ID: ${GetDeviceID()}
        </div><br/>`;

        const qrcode = new QRCode(qrContainer, {
            text: GetDeviceID(),
            width: 512,
            height: 512,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        document.body.appendChild(qrContainer);
    }
})();
