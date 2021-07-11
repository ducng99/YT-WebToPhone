# YT-WebToPhone

Have you ever been watching a Youtube video on your PC or laptop, then want to continue watching on your phone right away because you are going to bed or bathroom or kitchen? Then this script is for you!

This script adds a button on Youtube player, clicking on the button will send the video straight to your phone with the time you are currently watching.
But of course life ain’t that simple to install. We need 2 apps and a plugin to achieve this.

Pushbullet – install on your phone to receive push notification<br/>
Automate – Handle the notification and open Youtube app<br/>
Tampermonkey – a script to send the notification

How to:
- Install Pushbullet on your phone. Sign in as requested.
- Install Automate
- Install Tampermonkey
- Install the script. After installing, refresh this page, a Configure section should appear on top.
- Download this file on your phone. Open Automate app, click the 3-dots button on top-right corner, click Import. Choose the file you just downloaded. A flow named “YT Autopop” should be there, click on it and start. You might need to install/enable privileges as needed.
- Open Pushbullet website on your browser (on PC/Laptop), login and navigate to Settings page (on the left panel). Click on “Create Access Token” button to generate a token. Copy and paste in the configure section above. Device ID is only necessarry if you use Pushbullet on multiple devices, we can skip that for now.
- Click Save button in Configure section above.
