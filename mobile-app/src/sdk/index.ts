import { VerifyUUIDv4 } from "../Utils";

export async function RegisterPhoneToWebDevice(webDeviceID: string, token: string) {
    if (VerifyUUIDv4(webDeviceID)) {
        try {
            let res = await fetch("https://gateway.aws.ducng.dev/ytweb2phone/app", {
                method: "POST",
                body: JSON.stringify({
                    webDeviceID,
                    appPushToken: token
                })
            });

            return res.status === 201;
        }
        catch (ex) {
            console.error(ex);
        }

        return false;
    }
}