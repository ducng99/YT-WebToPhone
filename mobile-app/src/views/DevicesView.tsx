import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { GetWebDeviceIDs, RemoveWebDeviceID } from "../controllers/StorageController";

export default function DevicesView() {
    const [devices, setDevices] = useState<string[]>([]);
    const [loadingDevices, setLoadingDevices] = useState(true);

    useEffect(() => {
        (async () => {
            const devices = await GetWebDeviceIDs();
            setDevices(devices);
            setLoadingDevices(false);
        })();
    }, []);

    const deleteDevice = async (id: string) => {
        await RemoveWebDeviceID(id);
        setDevices(await GetWebDeviceIDs());
    }

    const refreshList = async () => {
        setLoadingDevices(true);
        setDevices(await GetWebDeviceIDs());
        setLoadingDevices(false);
    }

    const renderItem = ({ item }: { item: string }) => {
        return (
            <React.Fragment key={item}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 }}>
                    <Text style={{ fontSize: 17 }}>{item}</Text>
                    <Button icon="delete" compact={true} labelStyle={{ fontSize: 24, color: 'red' }} onPress={() => deleteDevice(item)}></Button>
                </View>
                <Divider />
            </React.Fragment>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
            {
                devices.length > 0 ?
                    <FlatList
                        data={devices}
                        renderItem={renderItem}
                        keyExtractor={item => item}
                        refreshing={loadingDevices}
                        onRefresh={refreshList}
                    />
                    :
                    <Text style={{ fontSize: 18, textAlign: 'center' }}>No devices found!</Text>
            }
        </SafeAreaView>
    );
}