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
    private passphrase: string|null = null;
    
    private constructor() {}
    
    async Init() {
        if (!this.IsInitialized) {
            this.passphrase = await SecureStore.getItemAsync(this.PASSPHRASE_KEY);
            
            if (!this.passphrase) {
                await SecureStore.setItemAsync('storagePassphrase', GenerateRandomString());
            }
            
            this.IsInitialized = true;
        }
    }
    
    async GetItem(key: string) {
        await this.Init();
        
        try {
            const encrypted_value = await AsyncStorage.getItem(key);
            
            if (this.passphrase && encrypted_value) {
                return CryptoES.AES.decrypt(encrypted_value, this.passphrase).toString(CryptoES.enc.Utf8);
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
            if (this.passphrase) {
                const encrypted_value = CryptoES.AES.encrypt(value, this.passphrase).toString();
                await AsyncStorage.setItem(key, encrypted_value);
            }
        }
        catch (ex) {
            console.error(ex);
            throw new Error("Failed to set data for key: " + key);
        }
    }
}