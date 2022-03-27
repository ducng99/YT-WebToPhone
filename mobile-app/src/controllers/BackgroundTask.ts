import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { Linking, ToastAndroid } from 'react-native';
import { Subscription } from 'expo-modules-core';

const BACKGROUND_NOTI_HANDLER = 'background-notification-handler';
let listener: Subscription | null = null;

TaskManager.defineTask(BACKGROUND_NOTI_HANDLER, ({ data, error, executionInfo }) => {
    ToastAndroid.show("Received a new video!", ToastAndroid.SHORT);
    if (error) ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);

    const _data = (data as any);

    if (_data.remoteMessage?.data?.url) {
        Linking.openURL(_data.remoteMessage.data.url);
    }
    //TODO: iOS stuffs
});

export function StartTask() {
    if (!listener) {
        listener = Notifications.addNotificationResponseReceivedListener(response => {
            const url = response.notification.request.content.data.url as string;
            if (url)
                Linking.openURL(url);
        });
    }

    return Notifications.registerTaskAsync(BACKGROUND_NOTI_HANDLER);
}

export function StopTask() {
    if (listener) {
        Notifications.removeNotificationSubscription(listener);
    }

    return Notifications.unregisterTaskAsync(BACKGROUND_NOTI_HANDLER);
}

export function IsTaskRunning() {
    return TaskManager.isTaskRegisteredAsync(BACKGROUND_NOTI_HANDLER);
}

export function CanRunBackground() {
    return TaskManager.isAvailableAsync();
}