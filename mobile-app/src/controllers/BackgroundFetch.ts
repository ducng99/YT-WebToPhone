import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { FetchVideoFromID } from '../sdk';
import { GetIDs } from './StorageController';
import { Linking } from 'react-native';
import { Sleep } from '../Utils';
import { ToastAndroid } from 'react-native';

const BACKGROUND_FETCH_TASK = 'background-fetch-video-url';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    while (true) {
        await Sleep(1000);
        
        try {
            const ids = await GetIDs();
            
            ToastAndroid.show("Running", ToastAndroid.SHORT);
            
            for (const id of ids) {
                const url = await FetchVideoFromID(id);
                if (url)
                    Linking.openURL(url);
            }

            return BackgroundFetch.BackgroundFetchResult.NewData;
        }
        catch (ex) {
            console.error(ex);
            return BackgroundFetch.BackgroundFetchResult.Failed;
        }
    }
});

export async function StartTask() {
    if (!await IsTaskRunning()) {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 0.1,
            stopOnTerminate: false,
            startOnBoot: true,
        });
    }
}

export async function StopTask() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export function IsTaskRunning() {
    return TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
}

export function CanRunBackground() {
    return TaskManager.isAvailableAsync();
}