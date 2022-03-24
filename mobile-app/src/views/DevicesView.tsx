import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { GetIDs, RemoveID } from "../controllers/StorageController";

export default function DevicesView() {
    const [devices, setDevices] = useState<string[]>([]);
    const [loadingDevices, setLoadingDevices] = useState(true);

    useEffect(() => {
        (async () => {
            const devices = await GetIDs();
            setDevices(devices);
            setLoadingDevices(false);
        })();
    }, []);

    const deleteDevice = async (id: string) => {
        await RemoveID(id);
        setDevices(await GetIDs());
    }
    
    const refreshList = async () => {
        setLoadingDevices(true);
        setDevices(await GetIDs());
        setLoadingDevices(false);
    }

    const renderItem = ({ item }: { item: string }) => {
        return (
            <React.Fragment key={item}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, flexGrow: 1 }}>{item}</Text>
                    <Button icon="delete" compact={true} labelStyle={{ fontSize: 28, color: 'red' }} onPress={() => deleteDevice(item)}></Button>
                </View>
                <Divider />
            </React.Fragment>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 16, justifyContent: "center" }}>
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