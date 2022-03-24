import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { FetchVideoFromID } from '../sdk';

const BACKGROUND_FETCH_TASK = 'background-fetch-video-url';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    

    return BackgroundFetch.BackgroundFetchResult.NewData;
});

export async function registerBackgroundFetchAsync() {
    if (!await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK)) {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
            minimumInterval: 5,
            stopOnTerminate: false,
            startOnBoot: true,
        });
    }
}

export async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}