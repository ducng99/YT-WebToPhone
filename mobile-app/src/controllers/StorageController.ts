import Storage from "../models/Storage";

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
export async function SaveID(id: string): Promise<void> {
    let ids = await GetIDs();
    
    ids = [...new Set([...ids, id])];
    Storage.Instance.SetItem('ids', JSON.stringify(ids));
}