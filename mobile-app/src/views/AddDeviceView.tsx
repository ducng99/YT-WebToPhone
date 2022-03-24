import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput, Title, HelperText } from "react-native-paper";
import Toast from "react-native-root-toast";
import { SaveID } from "../controllers/StorageController";
import { VerifyUUIDv4 } from "../Utils";

export default function AddDeviceView({ navigation, route }: { navigation: NavigationProp<any>, route: RouteProp<any, any> }) {
    const [deviceIDInput, setDeviceIDInput] = useState("");

    useEffect(() => {
        if (route.params?.deviceID) {
            setDeviceIDInput(route.params.deviceID);
        }
    }, [route.params?.updated]);

    const onSaveID = async () => {
        try {
            const success = await SaveID(deviceIDInput);

            if (success) {
                setDeviceIDInput("");
                Toast.show('Device added!', {
                    backgroundColor: 'cyan',
                    textColor: "black",
                });
            }
            else {
                Toast.show('Device ID is invalid', {
                    backgroundColor: 'cyan',
                    textColor: "black",
                    position: 0
                });
            }
        }
        catch (ex) {
            Toast.show('Failed to add device', {
                backgroundColor: 'cyan',
                textColor: "black",
            });
        }
    }

    const onQRScanButtonClick = () => {
        navigation.navigate('Scanner');
    }

    const hasDeviceIDError = () => {
        return deviceIDInput && !VerifyUUIDv4(deviceIDInput);
    }

    return (
        <View style={{
            paddingHorizontal: 16,
        }}>
            <Title style={{ marginBottom: 16 }}>How would like to add new web ID?</Title>
            <Button mode="contained" onPress={() => onQRScanButtonClick()}>Scan QR code</Button>
            <Text style={{ marginVertical: 16 }}>or enter manually</Text>
            <TextInput label="Device ID" value={deviceIDInput} onChangeText={text => setDeviceIDInput(text)} />
            <HelperText type="error" visible={hasDeviceIDError()}>
                Invalid device ID!
            </HelperText>
            <Button mode="contained" style={{ marginTop: 16 }} onPress={() => onSaveID()}>Add device</Button>
        </View>
    )
}