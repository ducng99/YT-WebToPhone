import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GenerateRandomString } from '../Utils';
import CryptoES from 'crypto-es';

export default class Storage {
    private static _instance?: Storage;
    static get Instance() {
        if (!Storage._instance) {
            Storage._instance = new Storage();
        }

        return Storage._instance;
    }
    
    private _isInitialized = false;
    
    get IsInitialized() { return this._isInitialized; }
    
    private set IsInitialized(value) {
        this._isInitialized = value;
    }
    
    private readonly PASSPHRASE_KEY = 'storagePassphrase';
    
    private constructor() {}
    
    async Init() {
        if (!this.IsInitialized) {
            const passphrase = await SecureStore.getItemAsync(this.PASSPHRASE_KEY);
            
            if (!passphrase) {
                await SecureStore.setItemAsync('storagePassphrase', GenerateRandomString());
            }
            
            this.IsInitialized = true;
        }
    }
    
    async GetItem(key: string) {
        await this.Init();
        
        try {
            const passphrase = await SecureStore.getItemAsync(this.PASSPHRASE_KEY);
            const encrypted_value = await AsyncStorage.getItem(key);
            
            if (passphrase && encrypted_value) {
                return CryptoES.AES.decrypt(encrypted_value, passphrase).toString(CryptoES.enc.Utf8);
            }
        }
        catch (ex) {
            console.error(ex);
            throw new Error("Failed to retrieve data for key: " + key);
        }
    }
    
    async SetItem(key: string, value: any) {
        await this.Init();
        
        try {
            const passphrase = await SecureStore.getItemAsync('storagePassphrase');
            
            if (passphrase) {
                const encrypted_value = CryptoES.AES.encrypt(value, passphrase).toString();
                await AsyncStorage.setItem(key, encrypted_value);
            }
        }
        catch (ex) {
            console.error(ex);
            throw new Error("Failed to set data for key: " + key);
        }
    }
}