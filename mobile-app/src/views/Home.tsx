import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, Divider } from "react-native-paper";
import * as BackgroundTask from "../controllers/BackgroundTask";
import * as ForegroundTask from '../controllers/ForegroundTask';
import { registerForPushNotificationsAsync } from "../controllers/PushNotification";
import { GetPushToken, SavePushToken } from "../controllers/StorageController";

export default function Home({ navigation }: { navigation: NavigationProp<any> }) {
    const [canBackgroundRun, setCanBackgroundRun] = useState(false);
    const [taskRunning, setTaskRunning] = useState(false);

    useEffect(() => {
        (async () => {
            let token = await GetPushToken();
            if (!token) {
                token = await registerForPushNotificationsAsync() ?? "";
                SavePushToken(token);
            }
            
            const _canBackgroundRun = await BackgroundTask.CanRunBackground();
            setCanBackgroundRun(_canBackgroundRun);
            if (_canBackgroundRun) {
                const isRunning = await BackgroundTask.IsTaskRunning();
                setTaskRunning(isRunning);
                if (isRunning) {
                    ForegroundTask.StartTask();
                }
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

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
        }}>
            {canBackgroundRun ?
                (
                    <>
                        <Text style={{ fontSize: 36 }}>🤖 I'm currently</Text>
                        <Text style={{ fontSize: 42 }}>{taskRunning ? "running..." : "not running!"}</Text>
                        <Button mode="contained" color={taskRunning ? "red" : "cyan"} style={{ marginTop: 20 }} onPress={() => toggleTask()}>{taskRunning ? "Kill me now" : "Turn me on?"}</Button>

                        <Divider style={{ marginVertical: 16 }} />

                        <View style={{ flexDirection: 'row' }}>
                            <Button mode="contained" onPress={() => navigation.navigate('Devices')} style={{ marginRight: 10 }}>View devices</Button>
                            <Button mode="contained" onPress={() => navigation.navigate('Add device')} style={{ marginLeft: 10 }}>Add new device</Button>
                        </View>
                    </>
                ) :
                (
                    <Text style={{ fontSize: 36, textAlign: 'center' }}>🤖 I'm not allowed to run in the background! Please allow background running for me 😥</Text>
                )
            }
        </View>
    );
}