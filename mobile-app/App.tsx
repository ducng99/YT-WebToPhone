import { NavigationContainer, StackActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { CombinedDarkTheme } from './src/Preferences';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/views/Home';

const Stack = createStackNavigator();

export default function App() {
    return (
        <PaperProvider theme={CombinedDarkTheme}>
            <NavigationContainer theme={CombinedDarkTheme}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
