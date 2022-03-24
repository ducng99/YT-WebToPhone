import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, Divider } from "react-native-paper";
import * as BackgroundFetch from "../controllers/BackgroundFetch";

export default function Home({ navigation }: { navigation: NavigationProp<any> }) {
    const [canBackgroundRun, setCanBackgroundRun] = useState(false);
    const [taskRunning, setTaskRunning] = useState(false);

    useEffect(() => {
        (async () => {
            setCanBackgroundRun(await BackgroundFetch.CanRunBackground());
            if (canBackgroundRun) {
                setTaskRunning(await BackgroundFetch.IsTaskRunning());
            }
        })();
    }, []);

    const toggleTask = async () => {
        if (await BackgroundFetch.IsTaskRunning()) {
            await BackgroundFetch.StopTask();
        }
        else {
            await BackgroundFetch.StartTask();
        }

        setTaskRunning(await BackgroundFetch.IsTaskRunning());
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

                        <Divider style={{ marginVertical: 16}}/>

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