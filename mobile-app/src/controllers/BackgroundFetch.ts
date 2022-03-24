import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { FetchVideoFromID } from '../sdk';
import { GetIDs } from './StorageController';
import { Linking } from 'react-native';

const BACKGROUND_FETCH_TASK = 'background-fetch-video-url';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const ids = await GetIDs();
    
    console.dir(ids);
    
    for (const id of ids) {
        const url = await FetchVideoFromID(id);
        Linking.openURL(url);
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
});

export async function StartTask() {
    if (!await IsTaskRunning()) {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 1,
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