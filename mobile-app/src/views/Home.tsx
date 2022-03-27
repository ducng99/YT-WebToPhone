import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, Divider } from "react-native-paper";
import * as BackgroundTask from "../controllers/BackgroundTask";
import * as ForegroundTask from '../controllers/ForegroundTask';
import { registerForPushNotificationsAsync } from "../controllers/PushNotification";
import { GetPushToken, SavePushToken } from "../controllers/StorageController";

export default function Home({ navigation }: { navigation: NavigationProp<any> }) {
    const [taskRunning, setTaskRunning] = useState(false);
    const [token, setToken] = useState("Loading...");

    useEffect(() => {
        (async () => {
            let _token = await GetPushToken();
            if (!_token) {
                _token = await registerForPushNotificationsAsync() ?? "";
                if (_token) {
                    await SavePushToken(_token);
                    setToken(_token);
                }
                else {
                    setToken('Failed to get token');
                }
            }
            else {
                setToken(_token);
            }

            if (!await BackgroundTask.CanRunBackground()) {
                alert("Running in background might not be supported on your device.");
            }

            const isRunning = await BackgroundTask.IsTaskRunning();
            setTaskRunning(isRunning);
            if (isRunning) {
                ForegroundTask.StartTask();
            }
        })();
    }, []);

    const toggleTask = async () => {
        if (await BackgroundTask.IsTaskRunning()) {
            await BackgroundTask.StopTask();
            ForegroundTask.StopTask();
        }
        else {
            await BackgroundTask.StartTask();
            ForegroundTask.StartTask();
        }

        console.log("Background task running: " + await BackgroundTask.IsTaskRunning());
        console.log("Foreground task running: " + ForegroundTask.IsTaskRunning());

        setTaskRunning(await BackgroundTask.IsTaskRunning());
    };

    const refetchToken = async () => {
        setToken("Refetching...");

        let _token = await registerForPushNotificationsAsync() ?? "";
        if (_token) {
            await SavePushToken(_token);
            setToken(_token);
        }
        else {
            setToken('Failed to get token');
        }
    }

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
        }}>
            <Text style={{ fontSize: 36 }}>🤖 I'm currently</Text>
            <Text style={{ fontSize: 42 }}>{taskRunning ? "running..." : "not running!"}</Text>
            <Button mode="contained" color={taskRunning ? "red" : "cyan"} style={{ marginTop: 20 }} onPress={toggleTask}>{taskRunning ? "Kill me now" : "Turn me on?"}</Button>

            <Divider style={{ marginVertical: 16 }} />

            <View style={{ flexDirection: 'row', marginBottom: 16 }}>
                <Button mode="contained" onPress={() => navigation.navigate('Devices')} style={{ marginRight: 10 }}>View devices</Button>
                <Button mode="contained" onPress={() => navigation.navigate('Add device')} style={{ marginLeft: 10 }}>Add new device</Button>
            </View>
            <Text>Your token: {token}</Text>
            <Button mode="contained" onPress={refetchToken} color='red' style={{ marginTop: 16 }}>Refetch token</Button>
        </View>
    );
}