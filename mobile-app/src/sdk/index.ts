import { VerifyUUIDv4 } from "../Utils";

export async function FetchVideoFromID(id: string): Promise<string> {
    let url = '';
    
    if (VerifyUUIDv4(id)) {
        let res = await fetch('https://gateway.aws.ducng.dev/ytweb2phone?id=' + id);
        res = await res.json();
        
        if (res.url) {
            url = res.url;
        }
    }
    
    return url;
}