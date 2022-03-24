import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import { GetIDs } from "../controllers/StorageController";

export default function DevicesView() {
    const [devices, setDevices] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const devices = await GetIDs();
            setDevices(devices);
        })();
    });

    return (
        <ScrollView style={{
            paddingHorizontal: 16,
        }}>
            {
                devices.map(id => (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{ fontSize: 18, flexGrow: 1 }}>{id}</Text>
                        <Button icon="delete" compact={true} labelStyle={{ fontSize: 28 }}> </Button>
                        <Divider />
                    </View>
                ))
            }
        </ScrollView>
    );
}