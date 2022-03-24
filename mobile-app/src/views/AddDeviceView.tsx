import { NavigationProp } from "@react-navigation/native";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, Title } from "react-native-paper";
import { SaveID } from "../controllers/StorageController";

export default function AddDeviceView({ navigation }: { navigation: NavigationProp<any> }) {
    const [enableQRScan, setEnableQRScan] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [deviceIDInput, setDeviceIDInput] = useState("");

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data } : BarCodeEvent) => {
        setEnableQRScan(false);
        setDeviceIDInput(data);
    }
    
    const onSaveID = async () => {
        await SaveID(deviceIDInput);
    }

    return (
        <View style={{
            paddingHorizontal: 16,
        }}>
            {
                !enableQRScan ?
                    (
                        <>
                            <Title>How would like to add new web ID?</Title>
                            <Button mode="contained" onPress={() => setEnableQRScan(true)}>Scan QR code</Button>
                            <Text>or</Text>
                            <TextInput label="Device ID" value={deviceIDInput} onChangeText={text => setDeviceIDInput(text)} />
                            <Button mode="contained" onPress={() => onSaveID()}>Add device</Button>
                        </>
                    )
                    :
                    <BarCodeScanner
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                        onBarCodeScanned={!enableQRScan ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
            }
        </View>
    )
}