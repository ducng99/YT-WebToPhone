import Storage from "../models/Storage";
import { VerifyUUIDv4 } from "../Utils";

/**
 * Get a list of Web IDs stored in storage
 * @returns an array containing the Web IDs
 */
export async function GetIDs(): Promise<string[]> {
    let ids: string|string[]|undefined = await Storage.Instance.GetItem('ids');
    
    if (ids && (ids = <string[]>JSON.parse(ids))) {        
        return ids;
    }
    
    return [];
}

/**
 * Save a web ID to storage
 * @param id the Web ID to store
 */
export async function SaveID(id: string): Promise<boolean> {
    if (VerifyUUIDv4(id)) {
        let ids = await GetIDs();
        
        ids = [...new Set([...ids, id])];
        await Storage.Instance.SetItem('ids', JSON.stringify(ids));
        
        return true;
    }
    
    return false;
}

export async function RemoveID(id: string): Promise<void> {
    let ids = await GetIDs();
    
    ids = ids.filter(i => i !== id);
    await Storage.Instance.SetItem('ids', JSON.stringify(ids));
}