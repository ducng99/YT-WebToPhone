# YT-WebToPhone
[![Expo Build](https://github.com/ducng99/YT-WebToPhone/actions/workflows/expo-build.yml/badge.svg)](https://github.com/ducng99/YT-WebToPhone/actions/workflows/expo-build.yml)

## Are you the one?
Have you ever been watching a YouTube video on your PC or laptop, then want to continue watching on your phone right away because you are going to bed or bathroom or kitchen? Then this script is for you!

This script adds a button on YouTube player, clicking on the button will send the video straight to your phone with the time you are currently watching.

## How how how?
### Requirements
1. First, install [Tampermonkey](https://tampermonkey.net)
2. Install [this script](https://github.com/ducng99/YT-WebToPhone/raw/main/YTWeb2Phone.user.js)
3. On your phone, download and install the app: [Latest release](https://github.com/ducng99/YT-WebToPhone/releases/latest)

### Set things up
- Open YouTube website, you will see a QR code. (if you missed it, right click -> Tampermonkey -> YT Web to Phone -> View QR ID)
- Open the app on your phone
- Wait until you see "Your token:" is displaying something like `ExponentPushToken[xxxx]`
- Click `Add new device` button -> `Scan QR code`
- Point your phone camera at the QR code on the screen
- Click `Add device`
- Go back to Home screen
- Click `Turn me on`

And you are set!

There will be a button in bottom-right of the video player, click it and the video goes to your phone.

# Info
The mobile app, script provided in this repo is not associated with YouTube™.