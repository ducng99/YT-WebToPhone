import Storage from "../models/Storage";
import { VerifyUUIDv4 } from "../Utils";

/**
 * Get a list of web device IDs stored in storage
 * @returns an array containing the web device IDs
 */
export async function GetWebDeviceIDs(): Promise<string[]> {
    let ids: string|string[]|undefined = await Storage.Instance.GetItem('ids');
    
    if (ids && (ids = <string[]>JSON.parse(ids))) {        
        return ids;
    }
    
    return [];
}

/**
 * Save a web device ID to storage
 * @param id the web device ID to store
 */
export async function SaveWebDeviceID(id: string): Promise<boolean> {
    if (VerifyUUIDv4(id)) {
        let ids = await GetWebDeviceIDs();
        
        ids = [...new Set([...ids, id])];
        await Storage.Instance.SetItem('ids', JSON.stringify(ids));
        
        return true;
    }
    
    return false;
}

export async function RemoveWebDeviceID(id: string): Promise<void> {
    let ids = await GetWebDeviceIDs();
    
    ids = ids.filter(i => i !== id);
    await Storage.Instance.SetItem('ids', JSON.stringify(ids));
}

export async function SavePushToken(token: string) {
    await Storage.Instance.SetItem('pushToken', token);
}

export async function GetPushToken() {
    return await Storage.Instance.GetItem('pushToken') ?? '';
}