import { NavigationContainer, StackActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { CombinedDarkTheme } from './src/Preferences';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/views/Home';
import DevicesView from './src/views/DevicesView';
import AddDeviceView from './src/views/AddDeviceView';
import ScannerView from './src/views/ScannerView';
import { RootSiblingParent } from 'react-native-root-siblings';

const Stack = createStackNavigator();

export default function App() {
    return (
        <PaperProvider theme={CombinedDarkTheme}>
            <RootSiblingParent>
                <NavigationContainer theme={CombinedDarkTheme}>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Devices" component={DevicesView} />
                        <Stack.Screen name="Add device" component={AddDeviceView} />
                        <Stack.Screen name="Scanner" component={ScannerView} />
                    </Stack.Navigator>
                </NavigationContainer>
                <StatusBar style="light" />
            </RootSiblingParent>
        </PaperProvider>
    );
}
