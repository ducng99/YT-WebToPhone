import * as Notifications from 'expo-notifications';
import { Subscription } from 'expo-modules-core';
import { Linking } from 'react-native';

let listener: Subscription|null = null;

export function StartTask() {
    if (!listener) {
        listener = Notifications.addNotificationReceivedListener(notification => {
            if (notification.request.content.data.url) {
                Linking.openURL(<string>notification.request.content.data.url);
            }
        });
    }
}

export function StopTask() {
    if (listener) {
        Notifications.removeNotificationSubscription(listener);
        listener = null;
    }
}

export function IsTaskRunning() {
    return listener != null;
}